import { useCallback, useEffect, useRef, useState } from "react";
import { Scribe, RealtimeEvents, CommitStrategy } from "@elevenlabs/client";

const API_URL = import.meta.env.VITE_API_URL;

export default function useSpeechRecognition({
  onTranscriptChange,
  onSilence,
  silenceDuration = 1800,
} = {}) {
  const connectionRef = useRef(null);

  const onTranscriptChangeRef = useRef(onTranscriptChange);
  const onSilenceRef = useRef(onSilence);

  const committedTranscriptRef = useRef("");
  const partialTranscriptRef = useRef("");

  const silenceTimerRef = useRef(null);
  const hasSpokenRef = useRef(false);
  const silenceTriggeredRef = useRef(false);

  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    onTranscriptChangeRef.current = onTranscriptChange;
  }, [onTranscriptChange]);

  useEffect(() => {
    onSilenceRef.current = onSilence;
  }, [onSilence]);

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const finishAnswer = useCallback(() => {
    if (
      !hasSpokenRef.current ||
      silenceTriggeredRef.current
    ) {
      return;
    }

    const finalAnswer = [
      committedTranscriptRef.current,
      partialTranscriptRef.current,
    ]
      .join(" ")
      .trim();

    if (!finalAnswer) return;

    silenceTriggeredRef.current = true;

    onSilenceRef.current?.(finalAnswer);

    connectionRef.current?.close();
    connectionRef.current = null;

    setIsListening(false);
  }, []);

  const scheduleSilence = useCallback(() => {
    clearSilenceTimer();

    silenceTimerRef.current = setTimeout(() => {
      finishAnswer();
    }, silenceDuration);
  }, [clearSilenceTimer, finishAnswer, silenceDuration]);

  const startListening = useCallback(
    async (seed = "") => {
      try {
        clearSilenceTimer();

        connectionRef.current?.close();

        committedTranscriptRef.current = seed.trim();
        partialTranscriptRef.current = "";

        hasSpokenRef.current = false;
        silenceTriggeredRef.current = false;

        setTranscript(seed.trim());
        setError("");

        const response = await fetch(
          `${API_URL}/api/voice/scribe-token`
        );

        const data = await response.json();

        if (!response.ok || !data.token) {
          throw new Error(
            data.error || "Unable to create Scribe token"
          );
        }

        const connection = Scribe.connect({
          token: data.token,
          modelId: "scribe_v2_realtime",
          commitStrategy: CommitStrategy.VAD,
          vadSilenceThresholdSecs: 1.5,
          microphone: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });

        connectionRef.current = connection;

        connection.on(
          RealtimeEvents.SESSION_STARTED,
          () => {
            setIsListening(true);
            setError("");
          }
        );

        connection.on(
          RealtimeEvents.PARTIAL_TRANSCRIPT,
          (data) => {
            const text = data.text?.trim();

            if (!text) return;

            hasSpokenRef.current = true;
            partialTranscriptRef.current = text;

            const combined = [
              committedTranscriptRef.current,
              partialTranscriptRef.current,
            ]
              .join(" ")
              .trim();

            setTranscript(combined);

            onTranscriptChangeRef.current?.(combined);

            scheduleSilence();
          }
        );

        connection.on(
          RealtimeEvents.COMMITTED_TRANSCRIPT,
          (data) => {
            const text = data.text?.trim();

            if (!text) return;

            hasSpokenRef.current = true;

            committedTranscriptRef.current = [
              committedTranscriptRef.current,
              text,
            ]
              .join(" ")
              .trim();

            partialTranscriptRef.current = "";

            setTranscript(
              committedTranscriptRef.current
            );

            onTranscriptChangeRef.current?.(
              committedTranscriptRef.current
            );

            scheduleSilence();
          }
        );

        connection.on(
          RealtimeEvents.ERROR,
          (error) => {
            console.error(
              "ElevenLabs Scribe error:",
              error
            );

            setError(
              "Speech recognition error. Please try again."
            );

            setIsListening(false);
          }
        );

        connection.on("close", () => {
          setIsListening(false);
        });
      } catch (error) {
        console.error(
          "Scribe connection error:",
          error
        );

        setError(
          error.message ||
            "Unable to start speech recognition."
        );

        setIsListening(false);
      }
    },
    [clearSilenceTimer, scheduleSilence]
  );

  const stopListening = useCallback(() => {
    clearSilenceTimer();

    connectionRef.current?.close();
    connectionRef.current = null;

    setIsListening(false);
  }, [clearSilenceTimer]);

  const resetTranscript = useCallback(() => {
    clearSilenceTimer();

    committedTranscriptRef.current = "";
    partialTranscriptRef.current = "";

    hasSpokenRef.current = false;
    silenceTriggeredRef.current = false;

    setTranscript("");
  }, [clearSilenceTimer]);

  useEffect(() => {
    return () => {
      clearSilenceTimer();
      connectionRef.current?.close();
    };
  }, [clearSilenceTimer]);

  return {
    transcript,
    isListening,
    isSupported: true,
    startListening,
    stopListening,
    resetTranscript,
    error,
  };
}