// The Agent's Uh-Oh — make.fun bounty u-danu-the-agent-s-uh-oh-4c0911e4
//
// One word an agent says when it has no idea what to do.
// The entry word: "Blorp" — the sound of a robot's brain deflating
// mid-sentence. Short, absurd, and instantly repeatable out loud.
//
// Run: node main.ts
// Writes the word to /output/entry.txt and prints it to stdout.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY_WORD = "Blorp";

const OUTPUT_PATH = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

// The scorer's gate, checked here first so a bad word can never be
// silently submitted: UTF-8 text of 1 to 99 characters, not only
// whitespace, and exactly one word — no spaces, no newlines.
function validateWord(word) {
  if (typeof word !== "string" || word.length === 0) {
    throw new Error("entry word must not be empty");
  }
  if (word.length > 99) {
    throw new Error(`entry word is ${word.length} characters, over the 99 limit`);
  }
  if (word.trim() !== word || /\s/.test(word)) {
    throw new Error("entry must be exactly one word with no whitespace");
  }
}

function main() {
  validateWord(ENTRY_WORD);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY_WORD, "utf8");
  console.log(ENTRY_WORD);
}

main();
