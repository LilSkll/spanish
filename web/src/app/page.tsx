import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Curso de español (from your PDF)
          </h1>
          <p className="mt-3 text-zinc-600">
            This app uses the extracted text of “Курс испанского языка для начинающих”
            (И. А. Дышлевая) to browse lessons and grammar topics.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/units"
              className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 hover:bg-zinc-100"
            >
              <div className="text-lg font-medium">Unidades</div>
              <div className="mt-1 text-sm text-zinc-600">Browse lessons (Unidad 1..)</div>
            </Link>
            <Link
              href="/grammar"
              className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 hover:bg-zinc-100"
            >
              <div className="text-lg font-medium">Грамматика</div>
              <div className="mt-1 text-sm text-zinc-600">
                Rules and explanations detected from the book
              </div>
            </Link>
            <Link
              href="/search"
              className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 hover:bg-zinc-100"
            >
              <div className="text-lg font-medium">Search</div>
              <div className="mt-1 text-sm text-zinc-600">Search any word/phrase in the PDF text</div>
            </Link>
            <Link
              href="/reader"
              className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 hover:bg-zinc-100"
            >
              <div className="text-lg font-medium">Reader</div>
              <div className="mt-1 text-sm text-zinc-600">Open the raw text by line number</div>
            </Link>
          </div>

          <div className="mt-8 text-sm text-zinc-600">Deploy-ready for Vercel.</div>
        </div>
      </div>
    </div>
  );
}
