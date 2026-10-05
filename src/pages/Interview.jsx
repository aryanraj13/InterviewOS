import { useEffect, useMemo } from 'react';
import InterviewQuestion from '../components/InterviewQuestion.jsx';
import AnswerInput from '../components/AnswerInput.jsx';
import EvaluationCard from '../components/EvaluationCard.jsx';
import useSpeechRecognition from '../hooks/useSpeechRecognition.js';
import useSpeechSynthesis from '../hooks/useSpeechSynthesis.js';

export default function InterviewPage({
  role,
  difficulty,
  currentQuestion,
  currentIndex,
  totalQuestions,
  timerLabel,
  progressValue,
  answer,
  onAnswerChange,
  onSubmitAnswer,
  evaluation,
  onContinue,
  onPrevious,
  onNext,
  onExit,
  onNavigate,
  onOpenHistory,
  canGoPrevious,
  canGoNext,
  validationMessage,
  isEvaluating,
  isSubmitConfirmOpen,
  questionId,
}) {
  const speechRecognition = useSpeechRecognition({
    onTranscriptChange: onAnswerChange,
  });

  const speechSynthesis = useSpeechSynthesis();

  const voiceState = useMemo(() => {
    if (!speechRecognition.isSupported) return 'unsupported';

    if (
      speechRecognition.error &&
      /denied|not-allowed|service-not-allowed/i.test(
        speechRecognition.error
      )
    ) {
      return 'denied';
    }

    if (
      speechRecognition.isListening &&
      speechRecognition.transcript
    ) {
      return 'transcribing';
    }

    if (speechRecognition.isListening) return 'listening';

    return 'idle';
  }, [
    speechRecognition.error,
    speechRecognition.isListening,
    speechRecognition.isSupported,
    speechRecognition.transcript,
  ]);

  useEffect(() => {
    speechRecognition.stopListening();
    speechRecognition.resetTranscript();
    speechSynthesis.stop();

    if (!currentQuestion) return;

    const timer = window.setTimeout(() => {
      speechSynthesis.speak(currentQuestion, () => {
        speechRecognition.startListening('');
      });
    }, 300);

    return () => {
      window.clearTimeout(timer);
      speechSynthesis.stop();
      speechRecognition.stopListening();
    };
  }, [questionId]);

  useEffect(
    () => () => {
      speechRecognition.stopListening();
      speechSynthesis.stop();
    },
    []
  );

  const handleToggleListening = () => {
    if (speechRecognition.isListening) {
      speechRecognition.stopListening();
      return;
    }

    speechSynthesis.stop();
    speechRecognition.startListening(answer);
  };

  const handleClearAnswer = () => {
    speechRecognition.stopListening();
    speechRecognition.resetTranscript();
    onAnswerChange('');
  };

  const handleListenQuestion = () => {
    if (!currentQuestion) return;

    speechRecognition.stopListening();
    speechSynthesis.speak(currentQuestion);
  };

  const handleStopQuestion = () => {
    speechSynthesis.stop();
  };

  return (
    <div className="h-screen overflow-hidden bg-[#080B0A]">
      <main className="mx-auto h-full max-w-[1600px] px-4 py-4 lg:px-6">
        <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[0.95fr_1.05fr]">

          {/* LEFT — QUESTION */}
          <div className="min-h-0 overflow-hidden">
            <InterviewQuestion
              role={role?.title || role?.name}
              difficulty={difficulty}
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              question={currentQuestion}
              timerLabel={timerLabel}
              progressValue={progressValue}
              onPrevious={onPrevious}
              onNext={onNext}
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
              onListenQuestion={handleListenQuestion}
              onStopQuestion={handleStopQuestion}
              isQuestionSpeaking={speechSynthesis.isSpeaking}
              isVoiceSupported={speechSynthesis.isSupported}
              onExit={onExit}
            />
          </div>

          {/* RIGHT — ANSWER / EVALUATION */}
          <div className="flex min-h-0 flex-col gap-4 overflow-hidden">

            <div className="min-h-0 flex-1 overflow-hidden">
              {evaluation ? (
                <EvaluationCard
                  evaluation={evaluation}
                  onContinue={onContinue}
                  finalQuestion={
                    currentIndex === totalQuestions - 1
                  }
                />
              ) : (
                <AnswerInput
                  value={answer}
                  onChange={onAnswerChange}
                  onSubmit={onSubmitAnswer}
                  validationMessage={validationMessage}
                  voiceState={voiceState}
                  onToggleListening={handleToggleListening}
                  onClearAnswer={handleClearAnswer}
                  voiceError={speechRecognition.error}
                  voiceHint="Speak naturally. Your microphone starts automatically after the question."
                  isSubmitting={isEvaluating}
                  isConfirmationOpen={isSubmitConfirmOpen}
                />
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}