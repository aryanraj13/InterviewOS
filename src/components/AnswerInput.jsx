import {
  Mic,
  MicOff,
  Send,
  LoaderCircle,
  X,
} from 'lucide-react';

export default function AnswerInput({
  value,
  onChange,
  onSubmit,
  validationMessage,
  voiceState,
  onToggleListening,
  onClearAnswer,
  voiceError,
  voiceHint,
  isSubmitting = false,
  isConfirmationOpen = false,
}) {
  const isListening = voiceState === 'listening';
  const isTranscribing = voiceState === 'transcribing';
  const isIdle = voiceState === 'idle';
  const isUnsupported = voiceState === 'unsupported';
  const isDenied = voiceState === 'denied';

  const handleSubmit = () => {
    if (
      !value.trim() ||
      isSubmitting ||
      isConfirmationOpen
    ) {
      return;
    }

    onSubmit();
  };

  return (
    <section className="surface-card relative flex h-full min-h-0 flex-col overflow-hidden p-5">
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#34D399]/[0.04] blur-3xl" />

      <div className="relative flex min-h-0 flex-1 flex-col">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4">
          <div>
            <div className="section-label">
              Your answer
            </div>

            <p className="mt-1 text-xs text-[#6B756F]">
              Speak naturally or type your response.
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleListening}
            disabled={
              isUnsupported ||
              isSubmitting ||
              isConfirmationOpen
            }
            aria-label={
              isListening
                ? 'Stop voice recording'
                : 'Start voice answer'
            }
            className={`
              secondary-button
              shrink-0
              px-3.5
              py-2.5
              ${
                isListening
                  ? 'border-[#34D399]/40 bg-[#34D399]/[0.10] text-[#34D399]'
                  : ''
              }
            `}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}

            {isListening ? 'Stop' : 'Speak'}
          </button>
        </div>

        {/* Voice status */}
        <div className="mt-3 min-h-[28px] shrink-0">

          {isListening && (
            <span className="inline-flex items-center gap-2 rounded-full border border-[#34D399]/20 bg-[#34D399]/[0.07] px-3 py-1.5 text-xs font-medium text-[#34D399]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#34D399]" />
              Listening...
            </span>
          )}

          {isTranscribing && (
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1E2622] bg-[#121713] px-3 py-1.5 text-xs font-medium text-[#A6B0AC]">
              <LoaderCircle className="h-3.5 w-3.5 animate-spin text-[#34D399]" />
              Live transcript
            </span>
          )}

          {isIdle && voiceHint && (
            <span className="text-xs text-[#6B756F]">
              {voiceHint}
            </span>
          )}

          {isUnsupported && (
            <span className="rounded-xl border border-[#F59E0B]/15 bg-[#F59E0B]/[0.05] px-3 py-2 text-xs text-[#F59E0B]">
              Voice input is not supported in this browser.
            </span>
          )}

          {isDenied && (
            <span className="rounded-xl border border-red-400/15 bg-red-400/[0.05] px-3 py-2 text-xs text-red-400">
              Microphone access was denied. You can still type.
            </span>
          )}

          {voiceError &&
            !isDenied &&
            !isUnsupported && (
              <span className="rounded-xl border border-red-400/15 bg-red-400/[0.05] px-3 py-2 text-xs text-red-400">
                {voiceError}
              </span>
            )}
        </div>

        {/* Answer */}
        <textarea
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          disabled={
            isSubmitting ||
            isConfirmationOpen
          }
          placeholder="Type your response here..."
          className="
            mt-3
            min-h-0
            flex-1
            resize-none
            rounded-3xl
            border
            border-[#1E2622]
            bg-[#0E1310]
            px-5
            py-4
            text-sm
            leading-7
            text-[#F5F7F6]
            outline-none
            transition-all
            duration-200
            placeholder:text-[#59645E]
            hover:border-[#26332C]
            focus:border-[#34D399]/40
            focus:bg-[#101612]
            focus:ring-4
            focus:ring-[#34D399]/[0.06]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        />

        {/* Validation */}
        {validationMessage && (
          <p className="mt-2 shrink-0 rounded-xl border border-red-400/15 bg-red-400/[0.04] px-3 py-2 text-xs font-medium text-red-400">
            {validationMessage}
          </p>
        )}

        {/* Footer */}
        <div className="mt-3 flex shrink-0 items-center justify-between gap-3">

          <div className="hidden text-xs text-[#6B756F] sm:block">
            Clear structure + specific example + short wrap-up.
          </div>

          <div className="ml-auto flex gap-2">

            {value.trim() && !isSubmitting && (
              <button
                type="button"
                onClick={onClearAnswer}
                disabled={
                  isSubmitting ||
                  isConfirmationOpen
                }
                className="secondary-button px-3.5 py-2.5"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                !value.trim() ||
                isSubmitting ||
                isConfirmationOpen
              }
              className={`
                primary-button
                px-4
                py-2.5
                ${
                  !value.trim() ||
                  isSubmitting ||
                  isConfirmationOpen
                    ? 'cursor-not-allowed opacity-50'
                    : 'shadow-glow-sm'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Evaluating...
                </>
              ) : (
                <>
                  Submit
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}