import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Layers3,
  Settings2,
} from 'lucide-react';

const questionsOptions = [5, 10, 15];
const interviewTypes = ['Technical', 'Behavioral', 'Mixed'];
const durations = ['15 minutes', '30 minutes', '45 minutes'];

export default function InterviewSetup({
  role,
  difficulty,
  config,
  onChangeConfig,
  onStartInterview,
  onBack,
  error,
  hasQuestions,
  isGenerating,
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 lg:px-6">

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="section-label">
            Step 2 of 3
          </div>

          <h2 className="section-heading mt-3">
            Interview setup
          </h2>

          <p className="section-copy">
            Review your role and difficulty, then configure the interview
            format before starting.
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="secondary-button px-4 py-2.5"
        >
          Back to roles
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

        {/* =====================================================
            CONFIGURATION
            ===================================================== */}
        <div className="surface-card p-6 md:p-8">

          <div className="flex items-center gap-3 text-sm font-medium text-[#A6B0AC]">
            <Settings2 className="h-4 w-4 text-[#34D399]" />
            Interview configuration
          </div>

          {/* Selected role / difficulty */}
          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <div
              className="
                rounded-3xl
                border
                border-[#1E2622]
                bg-[#0E1310]
                p-5
                transition-all
                duration-200
                hover:border-[#34D399]/20
              "
            >
              <div className="text-sm text-[#6B756F]">
                Selected role
              </div>

              <div className="mt-2 text-lg font-semibold text-[#F5F7F6]">
                {role?.title || role?.name}
              </div>
            </div>

            <div
              className="
                rounded-3xl
                border
                border-[#1E2622]
                bg-[#0E1310]
                p-5
                transition-all
                duration-200
                hover:border-[#34D399]/20
              "
            >
              <div className="text-sm text-[#6B756F]">
                Selected difficulty
              </div>

              <div className="mt-2 text-lg font-semibold text-[#F5F7F6]">
                {difficulty}
              </div>
            </div>

          </div>

          <div className="mt-8 space-y-7">

            {/* =================================================
                NUMBER OF QUESTIONS
                ================================================= */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#F5F7F6]">
                <Layers3 className="h-4 w-4 text-[#34D399]" />
                Number of questions
              </div>

              <div className="flex flex-wrap gap-3">
                {questionsOptions.map((count) => {
                  const active = config.questionCount === count;

                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() =>
                        onChangeConfig({ questionCount: count })
                      }
                      className={`
                        rounded-full
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        transition-all
                        duration-200
                        ${
                          active
                            ? `
                              border
                              border-[#34D399]/40
                              bg-[#34D399]/[0.10]
                              text-[#34D399]
                              shadow-[0_0_20px_rgba(52,211,153,0.08)]
                            `
                            : `
                              border
                              border-[#1E2622]
                              bg-[#0E1310]
                              text-[#A6B0AC]
                              hover:border-[#34D399]/25
                              hover:bg-[#34D399]/[0.05]
                              hover:text-[#F5F7F6]
                            `
                        }
                      `}
                    >
                      {count}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                INTERVIEW TYPE
                ================================================= */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#F5F7F6]">
                <CheckCircle2 className="h-4 w-4 text-[#34D399]" />
                Interview type
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {interviewTypes.map((type) => {
                  const active = config.interviewType === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        onChangeConfig({ interviewType: type })
                      }
                      className={`
                        rounded-2xl
                        border
                        px-4
                        py-4
                        text-sm
                        font-medium
                        transition-all
                        duration-200
                        ${
                          active
                            ? `
                              border-[#34D399]/40
                              bg-[#34D399]/[0.10]
                              text-[#34D399]
                              shadow-[0_0_20px_rgba(52,211,153,0.06)]
                            `
                            : `
                              border-[#1E2622]
                              bg-[#0E1310]
                              text-[#A6B0AC]
                              hover:border-[#34D399]/25
                              hover:bg-[#34D399]/[0.05]
                              hover:text-[#F5F7F6]
                            `
                        }
                      `}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                DURATION
                ================================================= */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#F5F7F6]">
                <Clock3 className="h-4 w-4 text-[#34D399]" />
                Duration
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {durations.map((duration) => {
                  const active = config.duration === duration;

                  return (
                    <button
                      key={duration}
                      type="button"
                      onClick={() =>
                        onChangeConfig({ duration })
                      }
                      className={`
                        rounded-2xl
                        border
                        px-4
                        py-4
                        text-sm
                        font-medium
                        transition-all
                        duration-200
                        ${
                          active
                            ? `
                              border-[#34D399]/40
                              bg-[#34D399]/[0.10]
                              text-[#34D399]
                              shadow-[0_0_20px_rgba(52,211,153,0.06)]
                            `
                            : `
                              border-[#1E2622]
                              bg-[#0E1310]
                              text-[#A6B0AC]
                              hover:border-[#34D399]/25
                              hover:bg-[#34D399]/[0.05]
                              hover:text-[#F5F7F6]
                            `
                        }
                      `}
                    >
                      {duration}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* =====================================================
            SUMMARY
            ===================================================== */}
        <aside className="surface-card p-6 md:p-8">

          <div className="section-label">
            Ready to practice
          </div>

          <h3
            className="
              mt-3
              font-display
              text-2xl
              font-semibold
              tracking-tight
              text-[#F5F7F6]
            "
          >
            Your interview is set up
          </h3>

          <p className="mt-3 text-sm leading-6 text-[#A6B0AC]">
            Sensible defaults are prefilled for a smooth first session:
            10 questions, mixed format, and a 30-minute timer.
          </p>

          {/* Summary */}
          <div
            className="
              mt-6
              rounded-3xl
              border
              border-[#1E2622]
              bg-[#0E1310]
              p-5
            "
          >
            <div className="space-y-4 text-sm">

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#6B756F]">
                  Role
                </span>

                <span className="text-right font-medium text-[#F5F7F6]">
                  {role?.title || role?.name}
                </span>
              </div>

              <div className="h-px bg-[#1E2622]" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#6B756F]">
                  Difficulty
                </span>

                <span className="font-medium text-[#F5F7F6]">
                  {difficulty}
                </span>
              </div>

              <div className="h-px bg-[#1E2622]" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#6B756F]">
                  Questions
                </span>

                <span className="font-medium text-[#34D399]">
                  {config.questionCount}
                </span>
              </div>

              <div className="h-px bg-[#1E2622]" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#6B756F]">
                  Interview type
                </span>

                <span className="font-medium text-[#F5F7F6]">
                  {config.interviewType}
                </span>
              </div>

              <div className="h-px bg-[#1E2622]" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#6B756F]">
                  Duration
                </span>

                <span className="font-medium text-[#F5F7F6]">
                  {config.duration}
                </span>
              </div>

            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              className="
                mt-5
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/[0.06]
                px-4
                py-3
                text-sm
                text-red-300
              "
            >
              {error}
            </p>
          )}

          {/* No questions */}
          {!hasQuestions && !error && (
            <p
              className="
                mt-5
                rounded-2xl
                border
                border-[#D6A84F]/20
                bg-[#D6A84F]/[0.06]
                px-4
                py-3
                text-sm
                text-[#D8B45A]
              "
            >
              No questions available for this role and difficulty.
            </p>
          )}

          {/* Start */}
          <button
            type="button"
            onClick={onStartInterview}
            disabled={!hasQuestions || isGenerating}
            className="
              primary-button
              mt-6
              flex
              w-full
              items-center
              justify-center
              gap-2
              py-3.5
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isGenerating
              ? 'Preparing your interview...'
              : 'Start Interview'}

            {!isGenerating && (
              <ArrowRight className="h-4 w-4" />
            )}
          </button>

        </aside>
      </div>
    </section>
  );
}