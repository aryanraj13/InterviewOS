import { motion } from 'framer-motion';
import {
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import ProgressBar from './ProgressBar.jsx';

const metrics = [
  { key: 'technicalAccuracy', label: 'Technical accuracy' },
  { key: 'relevance', label: 'Relevance' },
  { key: 'clarity', label: 'Clarity' },
  { key: 'depth', label: 'Depth' },
  { key: 'communication', label: 'Communication' },
  { key: 'completeness', label: 'Completeness' },
];

export default function EvaluationCard({
  evaluation,
  onContinue,
  finalQuestion,
}) {
  const strengths = Array.isArray(evaluation.strengths)
    ? evaluation.strengths
    : [];

  const improvements = Array.isArray(evaluation.improvements)
    ? evaluation.improvements
    : [];

  const notes = [
    ...strengths.map((item) => ({
      type: 'strength',
      text: item,
    })),
    ...improvements.map((item) => ({
      type: 'improve',
      text: item,
    })),
  ];

  const recommendation =
    evaluation.suggestion ||
    evaluation.recommendation ||
    evaluation.feedback ||
    'Focus on more specific examples and tighter answer structure.';

  const idealAnswer = evaluation.idealAnswer || '';

  const score = Math.round(
    evaluation.score ?? evaluation.overall ?? 0
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface-card relative flex h-full min-h-0 flex-col overflow-hidden p-5"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#34D399]/[0.05] blur-3xl" />

      <div className="relative flex min-h-0 flex-1 flex-col">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#34D399]/20 bg-[#34D399]/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#34D399]">
              <Sparkles className="h-3 w-3" />
              AI evaluation
            </div>

            <h3 className="mt-2 font-display text-xl font-semibold text-[#F5F7F6]">
              Answer review
            </h3>
          </div>

          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#34D399]/25 bg-[#0E1310] text-xl font-semibold text-[#34D399]">
            {score}
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-4 grid shrink-0 grid-cols-2 gap-2">
          {metrics.map((metric) => (
            <div
              key={metric.key}
              className="rounded-2xl border border-[#1E2622] bg-[#0E1310] p-3"
            >
              <ProgressBar
                value={Number(evaluation[metric.key]) || 0}
                label={metric.label}
              />
            </div>
          ))}
        </div>

        {/* Notes / Summary */}
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-hidden">

          <div className="min-h-0 overflow-hidden rounded-2xl border border-[#1E2622] bg-[#0E1310] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F5F7F6]">
              <CheckCircle2 className="h-4 w-4 text-[#34D399]" />
              Notes
            </div>

            <ul className="mt-3 space-y-2 overflow-hidden text-xs leading-5">
              {notes.length > 0 ? (
                notes.slice(0, 5).map((note, index) => (
                  <li
                    key={`${note.type}-${index}-${note.text}`}
                    className="flex items-start gap-2"
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        note.type === 'strength'
                          ? 'bg-[#34D399]'
                          : 'bg-[#F59E0B]'
                      }`}
                    />

                    <span className="text-[#A6B0AC]">
                      <span
                        className={
                          note.type === 'strength'
                            ? 'font-medium text-[#34D399]'
                            : 'font-medium text-[#F59E0B]'
                        }
                      >
                        {note.type === 'strength'
                          ? 'Strength: '
                          : 'Improve: '}
                      </span>
                      {note.text}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-[#6B756F]">
                  No additional notes were returned.
                </li>
              )}
            </ul>
          </div>

          <div className="min-h-0 overflow-hidden rounded-2xl border border-[#1E2622] bg-[#0E1310] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F5F7F6]">
              <AlertCircle className="h-4 w-4 text-[#34D399]" />
              Summary
            </div>

            <p className="mt-3 line-clamp-5 text-xs leading-6 text-[#A6B0AC]">
              {recommendation}
            </p>

            {idealAnswer && (
              <div className="mt-3 rounded-xl border border-[#34D399]/10 bg-[#34D399]/[0.04] p-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#34D399]">
                  Ideal answer
                </div>

                <p className="mt-1 line-clamp-5 text-xs leading-5 text-[#A6B0AC]">
                  {idealAnswer}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Continue */}
        <div className="mt-3 flex shrink-0 justify-end">
          <button
            type="button"
            onClick={onContinue}
            className="primary-button px-5 py-2.5 shadow-glow-sm"
          >
            {finalQuestion ? 'See Results' : 'Next Question'}

            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}