import fs from "node:fs";
import path from "node:path";

export function readBookText(): string {
  const p = path.join(process.cwd(), "src", "content", "book.txt");
  return fs.readFileSync(p, "utf8");
}

export function getLines(): string[] {
  return readBookText().split(/\r?\n/);
}
