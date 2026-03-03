export type Unit = {
  number: number;
  title: string;
  startLine: number;
};

export type GrammarTopic = {
  slug: string;
  title: string;
  unitNumber?: number;
  startLine: number;
  preview: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[“”"'’]/g, "")
    .replace(/[^a-z0-9а-яёñáéíóúüç\s-]/gi, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractUnits(lines: string[]): Unit[] {
  const units: Unit[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s*Unidad\s+(\d+)\s*$/i);
    if (m) {
      const number = Number(m[1]);
      units.push({ number, title: `Unidad ${number}`, startLine: i + 1 });
    }
  }
  return units;
}

function isLikelyTitle(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed.length > 80) return false;
  if (/^\d+\s*$/.test(trimmed)) return false;
  if (/^(УПРАЖНЕНИЯ|Упражнение\s+\d+)/i.test(trimmed)) return false;
  if (/^(GRAM[ÁA]TICA|GRAMATICA)\s*$/i.test(trimmed)) return false;
  if (/^[\p{P}\p{S}]+$/u.test(trimmed)) return false;
  return true;
}

export function extractGrammarTopics(lines: string[]): GrammarTopic[] {
  const units = extractUnits(lines);

  const unitStarts = units
    .slice()
    .sort((a, b) => a.startLine - b.startLine)
    .map((u) => ({ startLine: u.startLine, number: u.number }));

  function unitForLine(lineNumber: number): number | undefined {
    let current: number | undefined;
    for (const u of unitStarts) {
      if (u.startLine <= lineNumber) current = u.number;
      else break;
    }
    return current;
  }

  const topics: GrammarTopic[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isGrammarHeader = line.trim().match(/^(GRAM[ÁA]TICA|GRAMATICA)\s*$/i);
    if (!isGrammarHeader) continue;

    for (let j = i + 1; j < Math.min(i + 30, lines.length); j++) {
      const candidate = lines[j]?.trim() ?? "";
      if (!isLikelyTitle(candidate)) continue;

      const slug = slugify(`${unitForLine(j + 1) ?? "x"}-${candidate}`);
      if (seen.has(slug)) continue;

      const previewParts: string[] = [];
      for (let k = j + 1; k < Math.min(j + 12, lines.length); k++) {
        const t = (lines[k] ?? "").trim();
        if (!t) continue;
        if (/^(УПРАЖНЕНИЯ|Упражнение\s+\d+)/i.test(t)) break;
        if (/^Unidad\s+\d+\s*$/i.test(t)) break;
        previewParts.push(t);
        if (previewParts.join(" ").length > 180) break;
      }

      topics.push({
        slug,
        title: candidate,
        unitNumber: unitForLine(j + 1),
        startLine: j + 1,
        preview: previewParts.join(" ").slice(0, 200),
      });

      seen.add(slug);
      break;
    }
  }

  return topics;
}

export function sliceByLines(lines: string[], startLine: number, maxLines = 160): string {
  const startIdx = Math.max(0, startLine - 1);
  const endIdx = Math.min(lines.length, startIdx + maxLines);
  return lines.slice(startIdx, endIdx).join("\n");
}

export function searchInBook(
  lines: string[],
  query: string,
  maxResults = 50,
): Array<{ line: number; text: string }> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: Array<{ line: number; text: string }> = [];
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i] ?? "";
    if (t.toLowerCase().includes(q)) {
      results.push({ line: i + 1, text: t });
      if (results.length >= maxResults) break;
    }
  }
  return results;
}
