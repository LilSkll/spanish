import Link from "next/link";
import { getLines } from "@/lib/bookServer";
import { extractGrammarTopics } from "@/lib/bookShared";

export default function GrammarPage() {
  const lines = getLines();
  const topics = extractGrammarTopics(lines);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Грамматика</h1>
          <p className="mt-2 text-zinc-600">
            Grammar topics auto-detected from the PDF text.
          </p>
        </div>

        <div className="grid gap-3">
          {topics.map((t) => (
            <Link
              key={t.slug}
              href={`/grammar/${t.slug}`}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 hover:bg-zinc-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{t.title}</div>
                  {t.preview ? (
                    <div className="mt-1 text-sm text-zinc-600 line-clamp-2">
                      {t.preview}
                    </div>
                  ) : null}
                </div>
                <div className="shrink-0 text-right text-sm text-zinc-500">
                  <div>line {t.startLine}</div>
                  {t.unitNumber ? <div>Unidad {t.unitNumber}</div> : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
