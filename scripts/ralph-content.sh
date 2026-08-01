#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
target_branch="content-expansion-ralph"
dry_run=false
max_iterations=0

usage() {
  echo "Usage: $0 [--dry-run] [--max-iterations N]"
}

while (($#)); do
  case "$1" in
    --dry-run) dry_run=true; shift ;;
    --max-iterations)
      [[ ${2:-} =~ ^[1-9][0-9]*$ ]] || { echo "--max-iterations requires a positive integer" >&2; exit 2; }
      max_iterations="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) usage >&2; exit 2 ;;
  esac
done

cd "$repo_root"
[[ -z "$(git status --porcelain)" ]] || { echo "Working tree must be clean before Ralph starts." >&2; exit 1; }

current_branch="$(git branch --show-current)"
if [[ "$current_branch" == "main" ]]; then
  if git show-ref --verify --quiet "refs/heads/$target_branch"; then git switch "$target_branch"; else git switch -c "$target_branch"; fi
elif [[ "$current_branch" != "$target_branch" ]]; then
  echo "Run from main or $target_branch, not $current_branch." >&2
  exit 1
fi

node scripts/validate-content-expansion.js
first_task="$(node scripts/validate-content-expansion.js --next)"
if $dry_run; then
  echo "Next task: $first_task"
  exit 0
fi

command -v codex >/dev/null || { echo "codex CLI is required." >&2; exit 1; }
iteration=0
while :; do
  task="$(node scripts/validate-content-expansion.js --next)"
  task_brief="$(node scripts/validate-content-expansion.js --next-brief)"
  [[ "$task" != "DONE" ]] || { echo "All 37 content-expansion pages are complete."; exit 0; }
  if ((max_iterations > 0 && iteration >= max_iterations)); then
    echo "Stopped after $iteration iteration(s); next task is $task."
    exit 0
  fi
  iteration=$((iteration + 1))
  before="$(git rev-parse HEAD)"

  codex --ask-for-approval never --search exec --sandbox workspace-write -C "$repo_root" - <<PROMPT
You are one iteration of the Ralph Wiggum content-expansion loop. Complete exactly one task: $task.

Mandatory workflow:
1. Read docs/content-expansion/TODO.md completely and confirm $task is the highest-priority non-complete row.
2. Read docs/content-expansion/CONTEXT.md completely.
3. Follow the brief linked from that TODO row. Read only the relevant definitions in src/content-seo.js as needed.
4. Work only on this one eligible page. Research factual claims with authoritative primary sources and record each source in the brief.
5. Edit src/content-seo.js for the work product. You may also edit this page's brief, TODO.md, and CONTEXT.md only for a genuinely reusable lesson.
6. Never edit src/content.js or any content owned by it. Header pages may only be internal-link targets.
7. Run node scripts/validate-content-expansion.js and node scripts/build-content.js. Confirm build/<selected route> exists.
8. Mark the selected row complete only after every quality gate passes. Update its completion record and reprioritize all remaining rows with unique contiguous priorities.
9. Inspect the diff. It must not contain unrelated files or any page other than the selected page.
10. Leave the verified changes uncommitted. The outer Ralph harness owns staging and committing them.

Do not select a second task. Do not run git add or git commit. If blocked, leave the task incomplete and explain the blocker.
PROMPT

  [[ "$(git branch --show-current)" == "$target_branch" ]] || { echo "Agent changed branches." >&2; exit 1; }
  [[ "$(git rev-parse HEAD)" == "$before" ]] || { echo "Agent created a commit; the outer harness must own commits." >&2; exit 1; }
  [[ ! -e src/content.js || -z "$(git diff "$before" -- src/content.js)" ]] || { echo "Forbidden src/content.js change detected." >&2; exit 1; }
  [[ -n "$(git status --porcelain)" ]] || { echo "Iteration made no working-tree changes." >&2; exit 1; }
  while IFS= read -r changed_file; do
    case "$changed_file" in
      src/content-seo.js|docs/content-expansion/TODO.md|docs/content-expansion/CONTEXT.md|"docs/content-expansion/$task_brief") ;;
      *) echo "Iteration changed an unrelated file: $changed_file" >&2; exit 1 ;;
    esac
  done < <(
    {
      git diff --name-only "$before"
      git ls-files --others --exclude-standard
    } | sort -u
  )
  [[ "$(node scripts/validate-content-expansion.js --status "$task")" == "complete" ]] || { echo "Iteration did not complete its selected task." >&2; exit 1; }
  node scripts/validate-content-expansion.js
  node scripts/build-content.js
  output="build/$task"
  [[ -f "$output" ]] || { echo "Expected generated page missing: $output" >&2; exit 1; }

  git add -- src/content-seo.js docs/content-expansion/TODO.md "docs/content-expansion/$task_brief"
  if ! git diff --quiet -- docs/content-expansion/CONTEXT.md; then
    git add -- docs/content-expansion/CONTEXT.md
  fi
  while IFS= read -r staged_file; do
    case "$staged_file" in
      src/content-seo.js|docs/content-expansion/TODO.md|docs/content-expansion/CONTEXT.md|"docs/content-expansion/$task_brief") ;;
      *) echo "Refusing to commit unrelated staged file: $staged_file" >&2; exit 1 ;;
    esac
  done < <(git diff --cached --name-only)
  [[ -n "$(git diff --cached --name-only)" ]] || { echo "No verified changes were staged." >&2; exit 1; }
  commit_slug="$(basename "$task_brief" .md)"
  git commit -m "content: expand $commit_slug"
  [[ "$(git rev-list --count "$before..HEAD")" == "1" ]] || { echo "Iteration must create exactly one commit." >&2; exit 1; }
  [[ -z "$(git status --porcelain)" ]] || { echo "Iteration commit left uncommitted changes; stopping." >&2; exit 1; }
done
