import { getLines } from "@/lib/bookServer";
import { sliceByLines, extractUnits } from "@/lib/bookShared";

type Props = {
  params: { unit: string };
};

export function generateStaticParams() {
  const lines = getLines();
  const units = extractUnits(lines);
  return units.map((u) => ({ unit: String(u.number) }));
}

export default function UnitPage({ params }: Props) {
  const { unit } = params;
  const unitNumber = Number(unit);

  const lines = getLines();
  const units = extractUnits(lines);
  const current = units.find((u) => u.number === unitNumber);

  if (!current) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <h1 className="text-2xl font-semibold">Unidad not found</h1>
        </div>
      </div>
    );
  }

  const text = sliceByLines(lines, current.startLine, 240);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">{current.title}</h1>
        <div className="mt-2 text-sm text-zinc-600">Starting at line {current.startLine}</div>

        <pre className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 whitespace-pre-wrap text-sm leading-6">
          {text}
        </pre>
      </div>
    </div>
  );
}
