import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Mic,
  MicOff,
  Send,
  Clock,
  Brain,
  LoaderCircle,
  X,
} from 'lucide-react';

import useSpeechRecognition from '../hooks/useSpeechRecognition.js';
import useSpeechSynthesis from '../hooks/useSpeechSynthesis.js';

import {
  submitResumeInterviewAnswer,
  getFinalResumeAnalysis,
} from '../services/aiInterviewService.js';

export default function ResumeInterview({
  session,
  onFinish,
  onBack,
}) {
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState([]);

  const [question, setQuestion] = useState(
    session.firstQuestion.question
  );

  const [questionMeta, setQuestionMeta] = useState(
    session.firstQuestion
  );

  const [secondsLeft, setSecondsLeft] = useState(
    session.duration * 60
  );

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [error, setError] = useState('');

  const [showExitModal, setShowExitModal] =
    useState(false);

  const [answerReady, setAnswerReady] =
    useState(false);

  /*
   * Refs are used so the silence callback always
   * has access to the latest answer.
   */
  const answerRef = useRef('');
  const isProcessingRef = useRef(false);
  const mountedRef = useRef(true);

  /*
   * Keep mounted state safe for async operations.
   */
  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  /* --------------------------------------------------------------------------
     Speech Synthesis
  -------------------------------------------------------------------------- */

  const speechSynthesis = useSpeechSynthesis();

  /* --------------------------------------------------------------------------
     Speech Recognition
  -------------------------------------------------------------------------- */

  /*
   * Called automatically when the user pauses speaking.
   *
   * The speech recognition hook detects the silence and
   * passes the completed answer here.
   */
  const handleAnswerSilence = useCallback(
    (finalAnswer) => {
      if (
        !finalAnswer?.trim() ||
        isProcessingRef.current ||
        secondsLeft <= 0
      ) {
        return;
      }

      const cleanedAnswer = finalAnswer.trim();

      answerRef.current = cleanedAnswer;
      setAnswer(cleanedAnswer);

      /*
       * Trigger automatic submission.
       */
      setAnswerReady(true);
    },
    [secondsLeft]
  );

  const speechRecognition =
    useSpeechRecognition({
      onTranscriptChange: (transcript) => {
        answerRef.current = transcript;
        setAnswer(transcript);
      },

      onSilence: handleAnswerSilence,

      /*
       * User is considered finished after
       * approximately 1.8 seconds of silence.
       */
      silenceDuration: 1800,
    });

  /* --------------------------------------------------------------------------
     Timer
  -------------------------------------------------------------------------- */

  useEffect(() => {
    if (secondsLeft <= 0) {
      finishInterview();
      return undefined;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) =>
        Math.max(0, current - 1)
      );
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [secondsLeft]);

  /* --------------------------------------------------------------------------
     Speak Question → Automatically Listen
  -------------------------------------------------------------------------- */

  useEffect(() => {
    /*
     * Stop anything from the previous question.
     */
    speechRecognition.stopListening();
    speechRecognition.resetTranscript();
    speechSynthesis.stop();

    answerRef.current = '';
    setAnswer('');
    setAnswerReady(false);

    const timer = window.setTimeout(() => {
      speechSynthesis.speak(
        question,
        () => {
          /*
           * AI has finished speaking.
           *
           * Automatically start listening.
           */
          if (
            mountedRef.current &&
            !isProcessingRef.current
          ) {
            speechRecognition.startListening('');
          }
        }
      );
    }, 400);

    return () => {
      window.clearTimeout(timer);

      speechSynthesis.stop();
      speechRecognition.stopListening();
    };
  }, [question]);

  /* --------------------------------------------------------------------------
     Submit Answer
  -------------------------------------------------------------------------- */

  const submitAnswer = async () => {
    /*
     * Always use the ref because it contains the
     * latest speech transcript.
     */
    const currentAnswer =
      answerRef.current.trim();

    if (
      !currentAnswer ||
      isProcessingRef.current ||
      secondsLeft <= 0
    ) {
      return;
    }

    /*
     * Stop listening immediately.
     */
    speechRecognition.stopListening();
    speechSynthesis.stop();

    isProcessingRef.current = true;
    setIsProcessing(true);
    setAnswerReady(false);
    setError('');

    try {
      const result =
        await submitResumeInterviewAnswer({
          profile: session.profile,
          role: session.role,
          difficulty: session.difficulty,
          history,
          currentQuestion: question,
          answer: currentAnswer,
          timeRemaining: secondsLeft,
        });

      if (!mountedRef.current) {
        return;
      }

      const newHistory = [
        ...history,
        {
          question,
          answer: currentAnswer,
          evaluation: result.evaluation,
        },
      ];

      setHistory(newHistory);

      /*
       * Move to the next question.
       *
       * The question useEffect will automatically:
       *
       * 1. Stop previous audio
       * 2. Speak the new question
       * 3. Start microphone after speaking
       */
      setQuestion(
        result.nextQuestion.question
      );

      setQuestionMeta(
        result.nextQuestion
      );

      answerRef.current = '';
      setAnswer('');
    } catch (err) {
      console.error(err);

      if (mountedRef.current) {
        setError(
          err.message ||
            'Unable to process your answer.'
        );
      }
    } finally {
      if (mountedRef.current) {
        isProcessingRef.current = false;
        setIsProcessing(false);
      }
    }
  };

  /*
   * Whenever silence detection says the answer is ready,
   * automatically submit it.
   */
  useEffect(() => {
    if (!answerReady) {
      return;
    }

    setAnswerReady(false);

    submitAnswer();
  }, [answerReady]);

  /* --------------------------------------------------------------------------
     Finish Interview
  -------------------------------------------------------------------------- */

  async function finishInterview() {
    speechRecognition.stopListening();
    speechSynthesis.stop();

    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;
    setIsProcessing(true);

    try {
      const analysis =
        await getFinalResumeAnalysis({
          profile: session.profile,
          role: session.role,
          difficulty: session.difficulty,
          history,
        });

      if (!mountedRef.current) {
        return;
      }

      onFinish(analysis);
    } catch (err) {
      console.error(err);

      if (mountedRef.current) {
        setError(
          err.message ||
            'Unable to generate final analysis.'
        );

        isProcessingRef.current = false;
        setIsProcessing(false);
      }
    }
  }

  /* --------------------------------------------------------------------------
     Exit Interview
  -------------------------------------------------------------------------- */

  const handleExitInterview = () => {
    speechRecognition.stopListening();
    speechSynthesis.stop();

    isProcessingRef.current = false;

    setShowExitModal(false);

    if (onBack) {
      onBack();
    }
  };

  /* --------------------------------------------------------------------------
     Timer
  -------------------------------------------------------------------------- */

  const minutes = Math.floor(
    secondsLeft / 60
  );

  const seconds = secondsLeft % 60;

  const timerText = `${String(minutes).padStart(
    2,
    '0'
  )}:${String(seconds).padStart(2, '0')}`;

  /* --------------------------------------------------------------------------
     Voice State
  -------------------------------------------------------------------------- */

  const voiceState =
    speechRecognition.isListening
      ? 'Listening'
      : speechSynthesis.isSpeaking
        ? 'AI speaking'
        : isProcessing
          ? 'Thinking'
          : 'Ready';

  /* --------------------------------------------------------------------------
     Render
  -------------------------------------------------------------------------- */

  return (
    <main className="h-screen overflow-hidden bg-[#080B0A] px-4 py-4 text-[#A6B0AC] md:px-6">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-15%] h-80 w-80 rounded-full bg-[#34D399]/[0.05] blur-3xl" />

        <div className="absolute right-[-10%] top-[15%] h-80 w-80 rounded-full bg-[#10B981]/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col">
        {/* ============================================================
            HEADER
        ============================================================ */}

        <header className="flex shrink-0 items-center justify-between px-1 pb-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#34D399]">
              <Brain className="h-4 w-4" />

              AI Resume Interview
            </div>

            <div className="mt-1 flex items-center gap-3">
              <h1 className="font-display text-xl font-semibold text-[#F5F7F6] md:text-2xl">
                {session.role}
              </h1>

              <span className="hidden h-1 w-1 rounded-full bg-[#1E2622] sm:block" />

              <span className="hidden text-sm text-[#6B756F] sm:block">
                {session.difficulty} difficulty
              </span>
            </div>
          </div>

          {/* Interview controls */}
          <div className="flex items-center gap-2">
            {/* Exit Interview */}
            <button
              type="button"
              onClick={() =>
                setShowExitModal(true)
              }
              disabled={isProcessing}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#1E2622] bg-[#121713] px-3.5 py-2.5 text-sm font-medium text-[#A6B0AC] transition hover:border-[#EF4444]/30 hover:bg-[#EF4444]/[0.06] hover:text-[#FCA5A5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="h-4 w-4" />

              <span className="hidden sm:inline">
                Exit Interview
              </span>
            </button>

            {/* Timer */}
            <div className="flex items-center gap-2 rounded-2xl border border-[#1E2622] bg-[#121713] px-4 py-2.5 font-mono text-sm font-semibold text-[#F5F7F6] shadow-[0_8px_25px_rgba(0,0,0,0.25)]">
              <Clock className="h-4 w-4 text-[#34D399]" />

              {timerText}
            </div>
          </div>
        </header>

        {/* ============================================================
            MAIN INTERVIEW WORKSPACE
        ============================================================ */}

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
          {/* ==========================================================
              LEFT — YOUR ANSWER
          ========================================================== */}

          <section className="surface-card flex min-h-0 flex-col overflow-hidden p-5 md:p-6">
            <div className="flex shrink-0 items-start justify-between gap-4">
              <div>
                <div className="section-label">
                  Your answer
                </div>

                <p className="mt-2 text-sm text-[#6B756F]">
                  Speak naturally. Pause when you
                  are finished.
                </p>
              </div>

              {/* Manual microphone control */}
              <button
                type="button"
                onClick={() => {
                  if (
                    speechRecognition.isListening
                  ) {
                    speechRecognition.stopListening();
                  } else {
                    speechRecognition.startListening(
                      answer
                    );
                  }
                }}
                disabled={isProcessing}
                className={`secondary-button shrink-0 px-4 py-2.5 ${
                  speechRecognition.isListening
                    ? 'border-[#34D399]/40 bg-[#34D399]/[0.08] text-[#34D399]'
                    : ''
                }`}
              >
                {speechRecognition.isListening ? (
                  <>
                    <MicOff className="h-4 w-4" />
                    Stop
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" />
                    Speak
                  </>
                )}
              </button>
            </div>

            {/* Voice status */}
            <div className="mt-4 flex shrink-0 items-center gap-2 rounded-2xl border border-[#1E2622] bg-[#0E1310] px-3 py-2 text-xs text-[#6B756F]">
              <span
                className={`h-2 w-2 rounded-full ${
                  speechRecognition.isListening
                    ? 'animate-pulse bg-[#34D399]'
                    : speechSynthesis.isSpeaking
                      ? 'animate-pulse bg-[#34D399]'
                      : isProcessing
                        ? 'animate-pulse bg-[#FBBF24]'
                        : 'bg-[#1E2622]'
                }`}
              />

              {speechRecognition.isListening
                ? 'Listening — pause when you are finished...'
                : speechSynthesis.isSpeaking
                  ? 'AI is speaking...'
                  : isProcessing
                    ? 'AI is evaluating your answer...'
                    : 'Ready for your answer'}
            </div>

            {/* Answer textarea */}
            <textarea
              value={answer}
              onChange={(event) => {
                const value =
                  event.target.value;

                answerRef.current = value;
                setAnswer(value);
              }}
              disabled={isProcessing}
              placeholder="Your spoken answer will appear here..."
              className="mt-4 min-h-0 flex-1 resize-none rounded-3xl border border-[#1E2622] bg-[#0E1310] px-5 py-4 text-sm leading-7 text-[#F5F7F6] outline-none placeholder:text-[#6B756F] focus:border-[#34D399]/50 focus:bg-[#0E1310] focus:ring-4 focus:ring-[#34D399]/10"
            />

            {/* Speech recognition error */}
            {speechRecognition.error && (
              <p className="mt-2 shrink-0 text-xs text-[#FCA5A5]">
                {speechRecognition.error}
              </p>
            )}

            {/* General error */}
            {error && (
              <p className="mt-2 shrink-0 text-xs font-medium text-[#FCA5A5]">
                {error}
              </p>
            )}

            {/* Manual fallback */}
            <button
              type="button"
              onClick={submitAnswer}
              disabled={
                !answer.trim() ||
                isProcessing
              }
              className="primary-button mt-4 w-full shrink-0 rounded-2xl px-5 py-3.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />

                  AI is analyzing...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />

                  Finish Answer
                </>
              )}
            </button>

            {/* Progress */}
            <div className="mt-4 shrink-0">
              <div className="flex items-center justify-between text-xs text-[#6B756F]">
                <span>
                  {history.length} answer
                  {history.length === 1
                    ? ''
                    : 's'}{' '}
                  completed
                </span>

                <span className="text-[#34D399]">
                  Question {history.length + 1}
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#0E1310]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399]"
                  style={{
                    width: `${Math.min(
                      100,
                      ((history.length + 1) /
                        10) *
                        100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </section>

          {/* ==========================================================
              RIGHT — AI QUESTION
          ========================================================== */}

          <section className="surface-card flex min-h-0 flex-col overflow-hidden p-5 md:p-6">
            {/* Top */}
            <div className="flex shrink-0 items-center justify-between gap-4">
              <div className="section-label">
                AI Interviewer
              </div>

              {questionMeta.topic && (
                <span className="max-w-[60%] truncate rounded-full border border-[#34D399]/15 bg-[#34D399]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#34D399]">
                  {questionMeta.topic}
                </span>
              )}
            </div>

            {/* Question area */}
            <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-3xl border border-[#1E2622] bg-[#0E1310] p-5 md:p-7">
              <div className="flex shrink-0 items-center justify-between">
                <div className="text-sm font-medium text-[#6B756F]">
                  Question {history.length + 1}
                </div>

                <div className="flex items-center gap-2 text-xs text-[#6B756F]">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      speechSynthesis.isSpeaking
                        ? 'animate-pulse bg-[#34D399]'
                        : speechRecognition.isListening
                          ? 'animate-pulse bg-[#34D399]'
                          : isProcessing
                            ? 'animate-pulse bg-[#FBBF24]'
                            : 'bg-[#1E2622]'
                    }`}
                  />

                  {voiceState}
                </div>
              </div>

              {/* Question text */}
              <div className="flex min-h-0 flex-1 items-center">
                <h2 className="font-display text-xl font-semibold leading-[1.55] tracking-tight text-[#F5F7F6] md:text-2xl">
                  {question}
                </h2>
              </div>

              {/* AI speaking indicator */}
              <div className="flex shrink-0 items-center justify-center border-t border-[#1E2622] pt-5">
                <div
                  className={`flex items-center gap-3 rounded-full border px-4 py-2.5 ${
                    speechSynthesis.isSpeaking
                      ? 'border-[#34D399]/30 bg-[#34D399]/[0.07] text-[#34D399]'
                      : speechRecognition.isListening
                        ? 'border-[#34D399]/30 bg-[#34D399]/[0.07] text-[#34D399]'
                        : 'border-[#1E2622] bg-[#121713] text-[#6B756F]'
                  }`}
                >
                  <div className="flex items-end gap-1">
                    <span
                      className={`h-3 w-1 rounded-full ${
                        speechSynthesis.isSpeaking
                          ? 'animate-pulse bg-[#34D399]'
                          : 'bg-[#1E2622]'
                      }`}
                    />

                    <span
                      className={`h-5 w-1 rounded-full ${
                        speechSynthesis.isSpeaking
                          ? 'animate-pulse bg-[#34D399]'
                          : 'bg-[#1E2622]'
                      }`}
                      style={{
                        animationDelay: '120ms',
                      }}
                    />

                    <span
                      className={`h-3 w-1 rounded-full ${
                        speechSynthesis.isSpeaking
                          ? 'animate-pulse bg-[#34D399]'
                          : 'bg-[#1E2622]'
                      }`}
                      style={{
                        animationDelay: '240ms',
                      }}
                    />
                  </div>

                  {speechSynthesis.isSpeaking
                    ? 'AI is speaking'
                    : speechRecognition.isListening
                      ? 'Listening to you'
                      : 'AI Interviewer'}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ==============================================================
          EXIT INTERVIEW MODAL
      ============================================================== */}

      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080B0A]/80 px-4 backdrop-blur-md">
          <div className="surface-card w-full max-w-md p-6 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
            {/* Warning icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/[0.07] text-[#FCA5A5]">
              <X className="h-6 w-6" />
            </div>

            {/* Heading */}
            <h2 className="mt-5 font-display text-2xl font-semibold text-[#F5F7F6]">
              Exit interview?
            </h2>

            {/* Description */}
            <p className="mt-2 text-sm leading-6 text-[#A6B0AC]">
              Are you sure you want to stop this
              interview? Your current interview
              progress will be lost.
            </p>

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setShowExitModal(false)
                }
                className="secondary-button px-5 py-3"
              >
                Continue Interview
              </button>

              <button
                type="button"
                onClick={handleExitInterview}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#EF4444]/20 bg-[#EF4444]/[0.08] px-5 py-3 text-sm font-semibold text-[#FCA5A5] transition hover:border-[#EF4444]/35 hover:bg-[#EF4444]/[0.12]"
              >
                <X className="h-4 w-4" />

                Exit Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}