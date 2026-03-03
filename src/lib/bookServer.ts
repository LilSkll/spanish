import fs from "node:fs";
import path from "node:path";

export function readBookText(): string {
  const root = process.cwd();
  const candidates = [
    path.join(root, "public", "book.txt"),
    path.join(root, "src", "content", "book.txt"),
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) return fs.readFileSync(p, "utf8");
  }

  return fs.readFileSync(candidates[0], "utf8");
}

export function getLines(): string[] {
  return readBookText().split(/\r?\n/);
}
