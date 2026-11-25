import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The dog flips the roles: instead of being judged for eating the homework,
// it judges the homework (wrong facts about dogs), grades it F, then eats the evidence.
const ENTRY =
  "The homework was about dogs and got every fact wrong, so I graded it. F. Then I ate the evidence.";

const OUTPUT_FILE_NAME = "entry.txt";
const MAX_LENGTH = 200;

function guard(text: string): string {
  const length = [...text].length; // count characters, not UTF-16 units
  if (text.trim().length === 0) {
    throw new Error("entry is empty or only whitespace");
  }
  if (length > MAX_LENGTH) {
    throw new Error(`entry is ${length} characters; the limit is ${MAX_LENGTH}`);
  }
  if (text.endsWith("\n")) {
    throw new Error("entry must not end with a newline");
  }
  return text;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, OUTPUT_FILE_NAME), guard(ENTRY), "utf8");
