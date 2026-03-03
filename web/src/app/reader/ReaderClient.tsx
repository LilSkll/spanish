"use client";

import { sliceByLines } from "@/lib/bookShared";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ReaderClient() {
  const searchParams = useSearchParams();
  const line = Number(searchParams.get("line") ?? "1");

  const [lines, setLines] = useState<string[] | null>(null);

  useEffect(() => {
    const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
    const url = `${base}/book.txt`;
    fetch(url)
      .then((r) => r.text())
      .then((t) => setLines(t.split(/\r?\n/)))
      .catch(() => setLines([]));
  }, []);

  const safeLine = Number.isFinite(line) && line > 0 ? line : 1;

  const text = useMemo(() => {
    if (!lines) return "";
    return sliceByLines(lines, safeLine, 180);
  }, [lines, safeLine]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">Reader</h1>
        <div className="mt-2 text-sm text-zinc-600">Showing from line {safeLine}</div>

        {lines === null ? (
          <div className="mt-6 text-sm text-zinc-600">Loading book.txt...</div>
        ) : (
          <pre className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 whitespace-pre-wrap text-sm leading-6">
            {text}
          </pre>
        )}
      </div>
    </div>
  );
}
