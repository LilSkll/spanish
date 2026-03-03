"use client";

import Link from "next/link";
import { searchInBook } from "@/lib/bookShared";
import { useEffect, useMemo, useState } from "react";

type Props = {
  searchParams?: { q?: string };
};

export default function SearchPage({ searchParams }: Props) {
  const initialQ = (searchParams?.q ?? "").toString();
  const [q, setQ] = useState(initialQ);
  const [lines, setLines] = useState<string[] | null>(null);

  useEffect(() => {
    const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
    const url = `${base}/book.txt`;
    fetch(url)
      .then((r) => r.text())
      .then((t) => setLines(t.split(/\r?\n/)))
      .catch(() => setLines([]));
  }, []);

  const results = useMemo(() => {
    if (!lines) return [];
    return q ? searchInBook(lines, q, 60) : [];
  }, [lines, q]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
          <p className="mt-2 text-zinc-600">Search across the extracted PDF text.</p>
        </div>

        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search, e.g. ser, estar, artículo..."
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 outline-none focus:border-zinc-400"
          />
          <button className="h-11 rounded-xl bg-zinc-900 px-4 text-white hover:bg-zinc-800">
            Search
          </button>
        </form>

        {lines === null ? (
          <div className="mt-6 text-sm text-zinc-600">Loading book.txt...</div>
        ) : q ? (
          <div className="mt-6 text-sm text-zinc-600">Found: {results.length}</div>
        ) : null}

        <div className="mt-4 grid gap-2">
          {results.map((r) => (
            <div key={r.line} className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-zinc-700">Line {r.line}</div>
                <Link href={`/reader?line=${r.line}`} className="text-sm text-zinc-900 underline">
                  Open
                </Link>
              </div>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-zinc-800">{r.text}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
