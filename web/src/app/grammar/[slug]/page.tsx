import { getLines } from "@/lib/bookServer";
import { extractGrammarTopics, sliceByLines } from "@/lib/bookShared";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  const lines = getLines();
  const topics = extractGrammarTopics(lines);
  return topics.map((t) => ({ slug: t.slug }));
}

export default function GrammarTopicPage({ params }: Props) {
  const { slug } = params;

  const lines = getLines();
  const topics = extractGrammarTopics(lines);
  const topic = topics.find((t) => t.slug === slug);

  if (!topic) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <h1 className="text-2xl font-semibold">Topic not found</h1>
        </div>
      </div>
    );
  }

  const text = sliceByLines(lines, topic.startLine, 220);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">{topic.title}</h1>
        <div className="mt-2 text-sm text-zinc-600">
          Line {topic.startLine}
          {topic.unitNumber ? ` · Unidad ${topic.unitNumber}` : ""}
        </div>

        <pre className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 whitespace-pre-wrap text-sm leading-6">
          {text}
        </pre>
      </div>
    </div>
  );
}
