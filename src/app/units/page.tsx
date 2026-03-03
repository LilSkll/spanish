import Link from "next/link";
import { getLines } from "@/lib/bookServer";
import { extractUnits } from "@/lib/bookShared";

export default function UnitsPage() {
  const lines = getLines();
  const units = extractUnits(lines);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Unidades</h1>
          <p className="mt-2 text-zinc-600">
            Уроки (Unidad) extracted from the PDF text.
          </p>
        </div>

        <div className="grid gap-3">
          {units.map((u) => (
            <Link
              key={u.number}
              href={`/units/${u.number}`}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 hover:bg-zinc-50"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{u.title}</div>
                <div className="text-sm text-zinc-500">line {u.startLine}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
