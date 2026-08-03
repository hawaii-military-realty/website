#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function fail(message) {
  throw new Error(message);
}

function parseArgs(argv) {
  const options = { root: path.resolve(__dirname, ".."), next: false, nextBrief: false, statusRoute: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--root") options.root = path.resolve(argv[++i]);
    else if (argv[i] === "--next") options.next = true;
    else if (argv[i] === "--next-brief") options.nextBrief = true;
    else if (argv[i] === "--status") options.statusRoute = argv[++i];
    else fail("Unknown argument: " + argv[i]);
  }
  return options;
}

function parseQueue(text) {
  return text.split(/\r?\n/).filter((line) => /^\|\s*\d+\s*\|/.test(line)).map((line) => {
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length !== 6) fail("Malformed TODO row: " + line);
    const briefMatch = cells[4].match(/^\[[^\]]+\]\((pages\/[^)]+\.md)\)$/);
    if (!briefMatch) fail("Malformed brief link for " + cells[3]);
    return { priority: Number(cells[0]), status: cells[1], type: cells[2], route: cells[3], brief: briefMatch[1], reason: cells[5] };
  });
}

function words(value) {
  return String(value || "").replace(/<[^>]*>/g, " ").match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) || [];
}

function pageText(page) {
  return [page.hero && page.hero.intro, page.introLead]
    .concat(page.intro || [], (page.sidebar && page.sidebar.paragraphs) || [])
    .concat((page.sections || []).flatMap((section) => section.paragraphs || []))
    .concat(page.faq && page.faq.intro, ((page.faq && page.faq.items) || []).flatMap((item) => [item.question, item.answer]))
    .concat(page.cta && page.cta.subtitle)
    .filter(Boolean).join(" ");
}

function paragraphs(page) {
  return (page.intro || []).concat((page.sidebar && page.sidebar.paragraphs) || [], (page.sections || []).flatMap((section) => section.paragraphs || []));
}

function normalizeParagraph(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function validateBrief(text, item) {
  for (const heading of ["## Page identity", "## Search intent and audience", "## Required coverage", "## Research log", "## Completion record"]) {
    if (!text.includes(heading)) fail(item.route + " brief is missing " + heading);
  }
  if (!text.includes("`" + item.route + "`")) fail(item.route + " brief does not declare its route");
  if (item.status === "complete") {
    const researchRows = text.split(/\r?\n/).filter((line) => /^\|\s*https?:\/\//.test(line));
    if (!researchRows.length) fail(item.route + " is complete but has no authoritative research record");
    if (!/Status:\s*complete/i.test(text)) fail(item.route + " completion record is not complete");
    if (!/Build:\s*passed/i.test(text)) fail(item.route + " completion record lacks a passed build");
  }
}

function validatePage(page, item) {
  if (!page.description || words(page.description).length < 8) fail(item.route + " has a weak description");
  if (!page.hero || !page.hero.intro) fail(item.route + " is missing hero content");
  if (!Array.isArray(page.intro) || page.intro.length < 3) fail(item.route + " needs at least three intro paragraphs");
  if (!Array.isArray(page.sections) || page.sections.length < 4) fail(item.route + " needs at least four sections");
  if (!page.faq || !Array.isArray(page.faq.items) || page.faq.items.length < 4) fail(item.route + " needs at least four FAQs");
  if (!page.cta || !page.cta.title || !page.cta.subtitle) fail(item.route + " is missing its CTA");
  if (!Array.isArray(page.relatedLinks) || page.relatedLinks.length < 3) fail(item.route + " needs at least three related links");
  const minimum = item.type === "evergreen" ? 900 : 650;
  const count = words(pageText(page)).length;
  if (count < minimum) fail(item.route + " has " + count + " content words; minimum is " + minimum);
}

function loadContent(root) {
  const contentPath = path.join(root, "src", "content-seo.js");
  delete require.cache[require.resolve(contentPath)];
  return require(contentPath);
}

function validate(root) {
  const docsDir = path.join(root, "docs", "content-expansion");
  const queue = parseQueue(fs.readFileSync(path.join(docsDir, "TODO.md"), "utf8"));
  const content = loadContent(root);
  const eligible = [].concat(content.evergreenPages.map((page) => ({ type: "evergreen", page })), content.propertyPages.map((page) => ({ type: "property", page })));
  const allowed = new Map(eligible.map(({ type, page }) => [page.path, { type, page }]));
  const headerRoutes = new Set((content.site.nav || []).map((item) => item.href));

  if (eligible.length !== 37 || content.evergreenPages.length !== 19 || content.propertyPages.length !== 18) fail("Runtime allowlist must contain 19 evergreen and 18 property pages");
  if (queue.length !== allowed.size) fail("TODO must contain exactly " + allowed.size + " tasks");
  const priorities = queue.map((item) => item.priority).sort((a, b) => a - b);
  if (priorities.some((priority, index) => priority !== index + 1)) fail("TODO priorities must be unique and contiguous from 1");

  const seen = new Set();
  const validStatuses = new Set(["pending", "in_progress", "complete"]);
  const completedParagraphs = new Map();
  for (const item of queue) {
    if (!validStatuses.has(item.status)) fail("Invalid status for " + item.route + ": " + item.status);
    if (seen.has(item.route)) fail("Duplicate TODO route: " + item.route);
    seen.add(item.route);
    if (headerRoutes.has(item.route)) fail("Top-header route is forbidden: " + item.route);
    const match = allowed.get(item.route);
    if (!match) fail("TODO route is not in the SEO allowlist: " + item.route);
    if (match.type !== item.type) fail("Incorrect page type for " + item.route);
    const briefPath = path.join(docsDir, item.brief);
    if (!fs.existsSync(briefPath)) fail("Missing brief: " + item.brief);
    validateBrief(fs.readFileSync(briefPath, "utf8"), item);
    if (item.status === "complete") {
      validatePage(match.page, item);
      for (const paragraph of paragraphs(match.page)) {
        const normalized = normalizeParagraph(paragraph);
        if (words(normalized).length < 12) continue;
        if (completedParagraphs.has(normalized)) fail("Duplicate paragraph in " + item.route + " and " + completedParagraphs.get(normalized));
        completedParagraphs.set(normalized, item.route);
      }
    }
  }
  for (const route of allowed.keys()) if (!seen.has(route)) fail("Eligible route missing from TODO: " + route);

  const briefFiles = fs.readdirSync(path.join(docsDir, "pages")).filter((name) => name.endsWith(".md"));
  if (briefFiles.length !== allowed.size) fail("Brief directory must contain exactly " + allowed.size + " Markdown files");
  return { queue, complete: queue.filter((item) => item.status === "complete").length };
}

if (require.main === module) {
  try {
    const options = parseArgs(process.argv.slice(2));
    const result = validate(options.root);
    const next = result.queue.find((item) => item.status !== "complete");
    if (options.next) process.stdout.write(next ? next.route + "\n" : "DONE\n");
    else if (options.nextBrief) process.stdout.write(next ? next.brief + "\n" : "DONE\n");
    else if (options.statusRoute) {
      const item = result.queue.find((candidate) => candidate.route === options.statusRoute);
      if (!item) fail("Unknown status route: " + options.statusRoute);
      process.stdout.write(item.status + "\n");
    }
    else console.log("Content expansion harness valid: " + result.complete + "/" + result.queue.length + " complete.");
  } catch (error) {
    console.error("Content expansion validation failed: " + error.message);
    process.exit(1);
  }
}

module.exports = { parseQueue, validate };
