import {
  ArrowLeft,
  Clock4,
  RefreshCcw,
  History,
} from 'lucide-react';

import ProgressBar from './ProgressBar.jsx';

export default function InterviewResult({
  summary,
  onTryAgain,
  onBackToRoles,
  onViewHistory,
  onBackToHome,
}) {
  const breakdownItems = [
    {
      label: 'Technical Knowledge',
      value: summary.breakdown.technicalKnowledge,
    },
    {
      label: 'Communication',
      value: summary.breakdown.communication,
    },
    {
      label: 'Problem Solving',
      value: summary.breakdown.problemSolving,
    },
    {
      label: 'Answer Relevance',
      value: summary.breakdown.answerRelevance,
    },
    {
      label: 'Completeness',
      value: summary.breakdown.completeness,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
      <div className="surface-card overflow-hidden p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

          {/* =====================================================
              LEFT SIDE
              ===================================================== */}
          <div>
            <div className="section-label">
              Step 3 of 3
            </div>

            <h1
              className="
                mt-3
                font-display
                text-3xl
                font-semibold
                tracking-tight
                text-[#F5F7F6]
                md:text-5xl
              "
            >
              Interview Complete
            </h1>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-[#A6B0AC]
              "
            >
              Here is your interview performance summary for{' '}
              <span className="font-semibold text-[#F5F7F6]">
                {summary.role}
              </span>{' '}
              at{' '}
              <span className="font-semibold text-[#F5F7F6]">
                {summary.difficulty}
              </span>{' '}
              difficulty.
            </p>

            {/* =================================================
                SCORE CARD
                ================================================= */}
            <div
              className="
                relative
                mt-6
                overflow-hidden
                rounded-[2rem]
                border
                border-[#34D399]/20
                bg-gradient-to-br
                from-[#121713]
                via-[#0E1310]
                to-[#101914]
                p-6
                shadow-[0_24px_60px_rgba(0,0,0,0.35)]
              "
            >
              {/* Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-48
                  w-48
                  rounded-full
                  bg-[#34D399]/10
                  blur-3xl
                "
              />

              <div className="relative">
                <div className="text-sm text-[#6B756F]">
                  Overall score
                </div>

                <div
                  className="
                    mt-2
                    font-display
                    text-5xl
                    font-semibold
                    tracking-tight
                    text-[#F5F7F6]
                  "
                >
                  {summary.overallScore}
                  <span className="text-2xl text-[#6B756F]">
                    {' '} / 100
                  </span>
                </div>

                {/* Score accent */}
                <div
                  className="
                    mt-5
                    h-1.5
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-[#1E2622]
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-[#10B981]
                      via-[#34D399]
                      to-[#5EEAB0]
                    "
                    style={{
                      width: `${Math.min(
                        Math.max(Number(summary.overallScore) || 0, 0),
                        100
                      )}%`,
                    }}
                  />
                </div>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-[#6B756F]
                  "
                >
                  Based on your answers across{' '}
                  <span className="font-medium text-[#A6B0AC]">
                    {summary.totalQuestions}
                  </span>{' '}
                  questions.
                </p>
              </div>
            </div>

            {/* =================================================
                ACTION BUTTONS
                ================================================= */}
            <div className="mt-6 flex flex-wrap gap-3">

              {/* Try Again */}
              <button
                type="button"
                onClick={onTryAgain}
                className="primary-button px-5 py-3 shadow-glow-sm"
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </button>

              {/* Back to Roles */}
              <button
                type="button"
                onClick={onBackToRoles}
                className="secondary-button px-5 py-3"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Roles
              </button>

              {/* Back to Home */}
              <button
                type="button"
                onClick={onBackToHome}
                className="secondary-button px-5 py-3"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </button>

              {/* Interview History */}
              <button
                type="button"
                onClick={onViewHistory}
                className="secondary-button px-5 py-3"
              >
                <History className="h-4 w-4" />
                View Interview History
              </button>

            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE
              ===================================================== */}
          <div className="space-y-6">

            {/* =================================================
                PERFORMANCE BREAKDOWN
                ================================================= */}
            <div className="grid gap-4 md:grid-cols-2">

              {breakdownItems.map((item) => (
                <div
                  key={item.label}
                  className="
                    rounded-3xl
                    border
                    border-[#1E2622]
                    bg-[#0E1310]
                    p-5
                    shadow-[0_10px_30px_rgba(0,0,0,0.18)]
                    transition-all
                    duration-200
                    hover:border-[#34D399]/20
                    hover:bg-[#101611]
                  "
                >
                  <ProgressBar
                    value={item.value}
                    label={item.label}
                  />
                </div>
              ))}

            </div>

            {/* =================================================
                STRENGTHS / IMPROVEMENTS
                ================================================= */}
            <div className="grid gap-6 md:grid-cols-2">

              {/* Strengths */}
              <div
                className="
                  rounded-3xl
                  border
                  border-[#34D399]/15
                  bg-[#34D399]/[0.045]
                  p-5
                "
              >
                <div
                  className="
                    text-sm
                    font-semibold
                    text-[#34D399]
                  "
                >
                  Your Strengths
                </div>

                <ul className="mt-3 space-y-2 text-sm text-[#A6B0AC]">
                  {summary.strengths.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2"
                    >
                      <span
                        className="
                          mt-2
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-[#34D399]
                          shadow-[0_0_8px_rgba(52,211,153,0.5)]
                        "
                      />

                      <span>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas to improve */}
              <div
                className="
                  rounded-3xl
                  border
                  border-[#D6A84F]/15
                  bg-[#D6A84F]/[0.045]
                  p-5
                "
              >
                <div
                  className="
                    text-sm
                    font-semibold
                    text-[#D8B45A]
                  "
                >
                  Areas to Improve
                </div>

                <ul className="mt-3 space-y-2 text-sm text-[#A6B0AC]">
                  {summary.areasToImprove.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2"
                    >
                      <span
                        className="
                          mt-2
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-[#D8B45A]
                        "
                      />

                      <span>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* =================================================
                AI RECOMMENDATION
                ================================================= */}
            <div
              className="
                rounded-3xl
                border
                border-[#1E2622]
                bg-[#121713]
                p-5
                shadow-[0_12px_35px_rgba(0,0,0,0.22)]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#F5F7F6]
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-[#34D399]
                    shadow-[0_0_10px_rgba(52,211,153,0.5)]
                  "
                />

                AI Recommendation
              </div>

              <p
                className="
                  mt-3
                  text-sm
                  leading-7
                  text-[#A6B0AC]
                "
              >
                {summary.recommendation}
              </p>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  border-t
                  border-[#1E2622]
                  pt-4
                  text-sm
                  text-[#6B756F]
                "
              >
                <Clock4 className="h-4 w-4 text-[#34D399]" />

                Keep this result in history and compare future
                sessions over time.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}