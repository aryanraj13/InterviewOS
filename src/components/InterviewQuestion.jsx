import {
  ArrowLeft,
  ArrowRight,
  TimerReset,
  Volume2,
  Square,
  LoaderCircle,
  X,
} from 'lucide-react';
import ProgressBar from './ProgressBar.jsx';

export default function InterviewQuestion({
  role,
  difficulty,
  currentIndex,
  totalQuestions,
  question,
  timerLabel,
  progressValue,
  onPrevious,
  onNext,
  canGoNext,
  canGoPrevious,
  onListenQuestion,
  onStopQuestion,
  isQuestionSpeaking,
  isVoiceSupported,
  onExit,
}) {
  return (
    <section className="surface-card relative flex h-full min-h-0 flex-col overflow-hidden p-5">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#34D399]/[0.045] blur-3xl" />

      <div className="relative flex min-h-0 flex-1 flex-col">

        {/* Header */}
        {/* Header */}
<div className="flex shrink-0 items-center justify-between gap-4">
  <div>
    <div className="text-sm font-semibold text-[#F5F7F6]">
      Question {currentIndex + 1}{' '}
      <span className="text-[#6B756F]">
        of {totalQuestions}
      </span>
    </div>

    <div className="mt-2 flex flex-wrap items-center gap-2">
      <span className="chip">
        {role}
      </span>

      <span className="inline-flex items-center rounded-full border border-[#1E2622] bg-[#121713] px-3 py-1 text-xs font-medium text-[#A6B0AC]">
        {difficulty}
      </span>
    </div>
  </div>

  {/* Header controls */}
  <div className="flex shrink-0 items-center gap-2">

    {/* Exit */}
    <button
      type="button"
      onClick={onExit}
      className="
        inline-flex
        items-center
        gap-2
        rounded-2xl
        border
        border-[#1E2622]
        bg-[#121713]
        px-3.5
        py-2.5
        text-sm
        font-medium
        text-[#A6B0AC]
        transition
        hover:border-[#EF4444]/30
        hover:bg-[#EF4444]/[0.06]
        hover:text-[#FCA5A5]
      "
    >
      <X className="h-4 w-4" />

      <span className="hidden sm:inline">
        Exit Interview
      </span>
    </button>

    {/* Timer */}
    <div className="inline-flex items-center gap-2 rounded-full border border-[#1E2622] bg-[#0E1310] px-3 py-2 font-mono text-sm font-medium text-[#A6B0AC]">
      <TimerReset className="h-4 w-4 text-[#34D399]" />
      {timerLabel}
    </div>

  </div>
</div>

        {/* Question area */}
        <div className="mt-4 min-h-0 flex-1 overflow-hidden rounded-3xl border border-[#1E2622] bg-[#0E1310] p-5">

          {/* AI interviewer */}
          <div className="flex h-[42%] min-h-[180px] flex-col items-center justify-center border-b border-[#1E2622]">

            <div className="relative flex h-24 w-24 items-center justify-center">

              {isQuestionSpeaking && (
                <>
                  <div className="absolute h-24 w-24 animate-ping rounded-full border border-[#34D399]/20" />

                  <div className="absolute h-20 w-20 animate-pulse rounded-full border-2 border-[#34D399]/30" />

                  <div className="absolute h-16 w-16 rounded-full bg-[#34D399]/10 blur-xl" />
                </>
              )}

              <div
                className={`
                  relative flex h-16 w-16 items-center justify-center
                  rounded-full border-2 transition-all duration-300
                  ${
                    isQuestionSpeaking
                      ? `
                        scale-110
                        border-[#34D399]/60
                        bg-[#34D399]/[0.10]
                        shadow-[0_0_35px_rgba(52,211,153,0.16)]
                      `
                      : `
                        border-[#1E2622]
                        bg-[#121713]
                        text-[#6B756F]
                      `
                  }
                `}
              >
                {isQuestionSpeaking ? (
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-1.5 animate-pulse rounded-full bg-[#34D399]" />

                    <span
                      className="h-5 w-1.5 animate-pulse rounded-full bg-[#34D399]"
                      style={{ animationDelay: '120ms' }}
                    />

                    <span
                      className="h-3 w-1.5 animate-pulse rounded-full bg-[#34D399]"
                      style={{ animationDelay: '240ms' }}
                    />
                  </div>
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </div>
            </div>

            <div className="mt-3 text-center">
              <div className="text-sm font-semibold text-[#F5F7F6]">
                AI Interviewer
              </div>

              <p className="mt-1 text-xs text-[#6B756F]">
                {isQuestionSpeaking
                  ? 'Interviewer is speaking...'
                  : 'Listen carefully, then answer when ready.'}
              </p>
            </div>

            {/* Replay */}
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={
                  isQuestionSpeaking
                    ? onStopQuestion
                    : onListenQuestion
                }
                disabled={!isVoiceSupported}
                className={`
                  secondary-button
                  px-3.5
                  py-2
                  ${
                    isQuestionSpeaking
                      ? 'border-[#34D399]/35 bg-[#34D399]/[0.08] text-[#34D399]'
                      : ''
                  }
                `}
              >
                {isQuestionSpeaking ? (
                  <Square className="h-3.5 w-3.5" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}

                {isQuestionSpeaking ? 'Stop' : 'Replay'}
              </button>

              {isQuestionSpeaking && (
                <LoaderCircle className="h-4 w-4 animate-spin text-[#34D399]" />
              )}

              {!isVoiceSupported && (
                <span className="text-xs text-[#6B756F]">
                  Audio unavailable
                </span>
              )}
            </div>
          </div>

          {/* Question text */}
          <div className="flex h-[58%] min-h-0 flex-col justify-center">

            <div className="section-label">
              Interview question
            </div>

            <p className="mt-3 max-h-full overflow-hidden text-base font-medium leading-7 text-[#F5F7F6] lg:text-lg">
              {question}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 shrink-0">
          <ProgressBar
            value={progressValue}
            label="Interview progress"
          />
        </div>

        {/* Navigation */}
        <div className="mt-3 flex shrink-0 items-center justify-between rounded-2xl border border-[#1E2622] bg-[#0E1310] px-4 py-2.5">

          <button
            type="button"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#A6B0AC] transition hover:text-[#F5F7F6] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>

          <span className="text-xs text-[#6B756F]">
            {currentIndex + 1} / {totalQuestions}
          </span>

          <button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#A6B0AC] transition hover:text-[#F5F7F6] disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}