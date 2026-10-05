import {
  CheckCircle2,
  AlertTriangle,
  Brain,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function ResumeInterviewResults({
  analysis,
  onBack,
}) {
  const scores = [
    [
      'Technical',
      analysis.technicalKnowledge,
    ],
    [
      'Communication',
      analysis.communication,
    ],
    [
      'Problem Solving',
      analysis.problemSolving,
    ],
    [
      'Resume Knowledge',
      analysis.resumeKnowledge,
    ],
    [
      'Relevance',
      analysis.answerRelevance,
    ],
  ];

  return (
    <main className="min-h-screen bg-[#080B0A] px-4 py-5 md:px-6">
      
      {/* ============================================================
          BACKGROUND
      ============================================================ */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-15%] h-96 w-96 rounded-full bg-[#34D399]/[0.06] blur-3xl" />

        <div className="absolute right-[-10%] top-[5%] h-96 w-96 rounded-full bg-[#10B981]/[0.04] blur-3xl" />

        <div className="absolute bottom-[-20%] left-[40%] h-96 w-96 rounded-full bg-[#34D399]/[0.025] blur-3xl" />
      </div>


      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ============================================================
            HEADER
        ============================================================ */}

        <header className="flex flex-col items-center text-center">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#34D399]/20 bg-[#34D399]/[0.08] text-[#34D399] shadow-[0_0_25px_rgba(52,211,153,0.08)]">
            <Brain className="h-6 w-6" />
          </div>

          <div className="section-label mt-3">
            Interview complete
          </div>

          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#F5F7F6] md:text-3xl">
            Your AI Interview Analysis
          </h1>

          <p className="mt-2 text-sm text-[#6B756F]">
            Here's how the AI interviewer evaluated your performance.
          </p>

        </header>


        {/* ============================================================
            MAIN DASHBOARD
        ============================================================ */}

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">


          {/* ==========================================================
              LEFT — SCORE + METRICS
          ========================================================== */}

          <div className="flex flex-col gap-4">


            {/* Overall score */}

            <section className="surface-card flex flex-col items-center justify-center p-6 text-center">

              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B756F]">
                Overall Score
              </div>

              <div className="mt-2 font-display text-7xl font-bold tracking-tight text-[#34D399] drop-shadow-[0_0_25px_rgba(52,211,153,0.12)]">
                {analysis.overallScore}
              </div>

              <div className="text-sm text-[#6B756F]">
                out of 100
              </div>

              <div className="mt-5 h-2 w-full max-w-xs overflow-hidden rounded-full border border-[#1E2622] bg-[#0E1310]">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#5EEAB0] shadow-[0_0_14px_rgba(52,211,153,0.18)]"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        Number(
                          analysis.overallScore
                        ) || 0
                      )
                    )}%`,
                  }}
                />

              </div>

            </section>


            {/* Score breakdown */}

            <section className="surface-card p-5">

              <div className="flex items-center justify-between">

                <div>
                  <div className="section-label">
                    Performance
                  </div>

                  <h2 className="mt-1 text-lg font-semibold text-[#F5F7F6]">
                    Score breakdown
                  </h2>
                </div>

                <Sparkles className="h-5 w-5 text-[#34D399]" />

              </div>


              <div className="mt-4 space-y-4">

                {scores.map(
                  ([label, value]) => (
                    <div key={label}>

                      <div className="mb-1.5 flex items-center justify-between gap-3">

                        <span className="text-sm text-[#A6B0AC]">
                          {label}
                        </span>

                        <span className="text-sm font-semibold text-[#F5F7F6]">
                          {value}
                        </span>

                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-[#0E1310]">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399]"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(
                                0,
                                Number(value) || 0
                              )
                            )}%`,
                          }}
                        />

                      </div>

                    </div>
                  )
                )}

              </div>

            </section>

          </div>


          {/* ==========================================================
              RIGHT — AI ASSESSMENT
          ========================================================== */}

          <div className="flex flex-col gap-4">


            {/* Summary */}

            <section className="surface-card flex-1 p-6">

              <div className="section-label">
                AI assessment
              </div>

              <h2 className="mt-2 font-display text-xl font-semibold text-[#F5F7F6]">
                Overall evaluation
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#A6B0AC]">
                {analysis.summary}
              </p>

            </section>


            {/* Strengths / weaknesses */}

            <div className="grid gap-4 md:grid-cols-2">

              {/* Strengths */}

              <section className="surface-card p-5">

                <div className="flex items-center gap-2 text-sm font-semibold text-[#34D399]">
                  <CheckCircle2 className="h-4 w-4" />
                  Strengths
                </div>

                <div className="mt-3 space-y-2">

                  {analysis.strengths?.map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-[#34D399]/10 bg-[#34D399]/[0.045] p-3 text-xs leading-5 text-[#A6B0AC]"
                      >
                        {item}
                      </div>
                    )
                  )}

                </div>

              </section>


              {/* Improvements */}

              <section className="surface-card p-5">

                <div className="flex items-center gap-2 text-sm font-semibold text-[#FBBF24]">
                  <AlertTriangle className="h-4 w-4" />
                  Areas to improve
                </div>

                <div className="mt-3 space-y-2">

                  {analysis.weaknesses?.map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-[#FBBF24]/10 bg-[#FBBF24]/[0.045] p-3 text-xs leading-5 text-[#A6B0AC]"
                      >
                        {item}
                      </div>
                    )
                  )}

                </div>

              </section>

            </div>

          </div>

        </div>


        {/* ============================================================
            PREPARATION
        ============================================================ */}

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">


          {/* Recommendations */}

          <section className="surface-card p-5">

            <div className="section-label">
              Recommended preparation
            </div>

            <h2 className="mt-1 text-lg font-semibold text-[#F5F7F6]">
              What to work on next
            </h2>

            <div className="mt-3 grid gap-2 md:grid-cols-2">

              {analysis.recommendations?.map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#1E2622] bg-[#0E1310] p-3 text-sm leading-6 text-[#A6B0AC] transition hover:border-[#34D399]/20 hover:bg-[#34D399]/[0.035]"
                  >
                    {item}
                  </div>
                )
              )}

            </div>

          </section>


          {/* Topics */}

          <section className="surface-card p-5">

            <div className="section-label">
              Recommended topics
            </div>

            <h2 className="mt-1 text-lg font-semibold text-[#F5F7F6]">
              Focus areas
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">

              {analysis.recommendedTopics?.map(
                (item) => (
                  <span
                    key={item}
                    className="chip border-[#34D399]/15 bg-[#34D399]/[0.06] text-[#A6B0AC]"
                  >
                    {item}
                  </span>
                )
              )}

            </div>

          </section>

        </div>


        {/* ============================================================
            BACK HOME
        ============================================================ */}

        <button
          type="button"
          onClick={onBack}
          className="primary-button mt-4 w-full rounded-2xl px-5 py-3.5"
        >
          <RotateCcw className="h-5 w-5" />
          Back to Home
        </button>

      </div>

    </main>
  );
}