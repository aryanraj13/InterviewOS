import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export default function useSpeechRecognition({
  onTranscriptChange,
  onSilence,
  silenceDuration = 3000,
} = {}) {
  const recognitionRef = useRef(null);

  const committedTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');

  const silenceTimerRef = useRef(null);
  const hasSpokenRef = useRef(false);
  const silenceTriggeredRef = useRef(false);

  const onTranscriptChangeRef = useRef(onTranscriptChange);
  const onSilenceRef = useRef(onSilence);

  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    onTranscriptChangeRef.current = onTranscriptChange;
  }, [onTranscriptChange]);

  useEffect(() => {
    onSilenceRef.current = onSilence;
  }, [onSilence]);

  const appendTranscript = (base, chunk) => {
    const normalizedBase = base.trimEnd();
    const normalizedChunk = chunk.trim();

    if (!normalizedChunk) return normalizedBase;
    if (!normalizedBase) return normalizedChunk;

    return `${normalizedBase} ${normalizedChunk}`;
  };

  const isSupported = useMemo(() => {
    if (typeof window === 'undefined') return false;

    return Boolean(
      window.SpeechRecognition ||
        window.webkitSpeechRecognition
    );
  }, []);

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      window.clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const scheduleSilenceDetection = useCallback(() => {
    clearSilenceTimer();

    if (!hasSpokenRef.current) {
      return;
    }

    silenceTimerRef.current = window.setTimeout(() => {
      if (
        !recognitionRef.current ||
        !hasSpokenRef.current ||
        silenceTriggeredRef.current
      ) {
        return;
      }

      silenceTriggeredRef.current = true;

      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors.
      }

      setIsListening(false);

      const finalAnswer = appendTranscript(
        committedTranscriptRef.current,
        interimTranscriptRef.current
      ).trim();

      if (finalAnswer) {
        onSilenceRef.current?.(finalAnswer);
      }
    }, silenceDuration);
  }, [clearSilenceTimer, silenceDuration]);

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') {
      return undefined;
    }

    const Recognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition = new Recognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event) => {
      let interimText = '';
      let finalText = '';

      for (
        let index = event.resultIndex;
        index < event.results.length;
        index += 1
      ) {
        const result = event.results[index];
        const chunk = result[0]?.transcript || '';

        if (result.isFinal) {
          finalText += chunk;
        } else {
          interimText += chunk;
        }
      }

      if (finalText) {
        committedTranscriptRef.current =
          appendTranscript(
            committedTranscriptRef.current,
            finalText
          );

        hasSpokenRef.current = true;
      }

      if (interimText.trim()) {
        hasSpokenRef.current = true;
      }

      interimTranscriptRef.current =
        interimText.trim();

      const nextTranscript = appendTranscript(
        committedTranscriptRef.current,
        interimTranscriptRef.current
      );

      setTranscript(nextTranscript);

      onTranscriptChangeRef.current?.(
        nextTranscript
      );

      /*
       * Every time speech activity is detected,
       * restart the silence countdown.
       */
      if (hasSpokenRef.current) {
        scheduleSilenceDetection();
      }
    };

    recognition.onerror = (event) => {
      clearSilenceTimer();

      if (
        event.error === 'not-allowed' ||
        event.error === 'service-not-allowed'
      ) {
        setError(
          'Microphone access was denied. You can still type your answer.'
        );
      } else if (event.error === 'network') {
        setError(
          'Speech recognition network error. You can still type your answer.'
        );
      } else if (event.error !== 'aborted') {
        setError(
          'Voice recognition encountered an error. You can still type your answer.'
        );
      }

      setIsListening(false);
    };

    recognition.onend = () => {
      clearSilenceTimer();
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      clearSilenceTimer();

      try {
        recognition.stop();
      } catch {
        // Ignore cleanup errors.
      }

      recognitionRef.current = null;
    };
  }, [
    isSupported,
    clearSilenceTimer,
    scheduleSilenceDetection,
  ]);

  const startListening = useCallback(
    (seed = '') => {
      if (
        !isSupported ||
        !recognitionRef.current
      ) {
        setError(
          'Voice input is not supported in this browser. Please type your answer.'
        );
        return;
      }

      clearSilenceTimer();

      committedTranscriptRef.current =
        seed.trim();

      interimTranscriptRef.current = '';

      hasSpokenRef.current = Boolean(
        seed.trim()
      );

      silenceTriggeredRef.current = false;

      setTranscript(
        committedTranscriptRef.current
      );

      onTranscriptChangeRef.current?.(
        committedTranscriptRef.current
      );

      setError('');

      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setError(
          'Voice recording could not start. Please try again.'
        );
      }
    },
    [isSupported, clearSilenceTimer]
  );

  const stopListening = useCallback(() => {
    clearSilenceTimer();

    try {
      recognitionRef.current?.stop();
    } catch {
      // Ignore stop errors.
    }

    setIsListening(false);
  }, [clearSilenceTimer]);

  const resetTranscript = useCallback(() => {
    clearSilenceTimer();

    committedTranscriptRef.current = '';
    interimTranscriptRef.current = '';

    hasSpokenRef.current = false;
    silenceTriggeredRef.current = false;

    setTranscript('');
    setError('');
  }, [clearSilenceTimer]);

  useEffect(() => {
    return () => {
      clearSilenceTimer();

      try {
        recognitionRef.current?.stop();
      } catch {
        // Ignore cleanup errors.
      }
    };
  }, [clearSilenceTimer]);

  return {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error,
  };
}