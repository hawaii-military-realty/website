#!/usr/bin/env node
"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { parseQueue, validate } = require("./validate-content-expansion.js");

const root = path.resolve(__dirname, "..");
let passed = 0;

function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log("ok - " + name);
  } catch (error) {
    console.error("not ok - " + name + ": " + error.message);
    process.exitCode = 1;
  }
}

function fixture() {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ralph-content-test-"));
  fs.mkdirSync(path.join(target, "docs"), { recursive: true });
  copyDirectory(path.join(root, "docs", "content-expansion"), path.join(target, "docs", "content-expansion"));
  copyDirectory(path.join(root, "src"), path.join(target, "src"));
  return target;
}

function copyDirectory(source, target) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) copyDirectory(from, to);
    else fs.copyFileSync(from, to);
  }
}

function todoPath(target) {
  return path.join(target, "docs", "content-expansion", "TODO.md");
}

function expectFailure(target, pattern) {
  assert.throws(() => validate(target), pattern);
}

test("valid baseline contains 37 allowlisted tasks", () => {
  const result = validate(root);
  assert.strictEqual(result.queue.length, 37);
  assert.ok(result.complete >= 0 && result.complete <= 37);
  assert.ok(["pending", "in_progress", "complete"].includes(result.queue[0].status));
});

test("parser rejects malformed brief links", () => {
  assert.throws(() => parseQueue("| 1 | pending | evergreen | bad.html | missing | reason |"), /Malformed brief link/);
});

test("duplicate route is rejected", () => {
  const target = fixture();
  const file = todoPath(target);
  const text = fs.readFileSync(file, "utf8");
  const rows = text.split(/\r?\n/).filter((line) => /^\|\s*\d+\s*\|/.test(line));
  const firstRoute = rows[0].split("|")[4].trim();
  const secondRoute = rows[1].split("|")[4].trim();
  fs.writeFileSync(file, text.replace(secondRoute, firstRoute));
  expectFailure(target, /Duplicate TODO route/);
});

test("top-header and non-allowlisted route is rejected", () => {
  const target = fixture();
  const file = todoPath(target);
  fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace("ewa-beach-real-estate.html", "about.html"));
  expectFailure(target, /Top-header route is forbidden/);
});

test("missing brief is rejected", () => {
  const target = fixture();
  const brief = fs.readdirSync(path.join(target, "docs", "content-expansion", "pages"))[0];
  fs.unlinkSync(path.join(target, "docs", "content-expansion", "pages", brief));
  expectFailure(target, /Missing brief|Brief directory/);
});

test("malformed priorities are rejected", () => {
  const target = fixture();
  const file = todoPath(target);
  fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace(/^\| 2 \|/m, "| 3 |"));
  expectFailure(target, /priorities must be unique and contiguous/);
});

test("completed task requires an authoritative research row", () => {
  const target = fixture();
  const queue = parseQueue(fs.readFileSync(todoPath(target), "utf8"));
  const complete = queue.find((item) => item.status === "complete");
  if (!complete) return;
  const brief = path.join(target, "docs", "content-expansion", complete.brief);
  const text = fs.readFileSync(brief, "utf8").replace(/^\| https?:\/\/.*$/gm, "");
  fs.writeFileSync(brief, text);
  expectFailure(target, /no authoritative research record/);
});

if (!process.exitCode) console.log("Passed " + passed + " harness tests.");
