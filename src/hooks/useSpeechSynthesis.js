import { useCallback, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useSpeechSynthesis() {
  const audioRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    async (text, onEnd) => {
      if (!text?.trim()) return;

      stop();

      try {
        setIsSpeaking(true);

        const response = await fetch(`${API_URL}/api/voice/speak`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate speech");
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          audioRef.current = null;
          setIsSpeaking(false);

          onEnd?.();
        };

        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          audioRef.current = null;
          setIsSpeaking(false);
        };

        await audio.play();
      } catch (error) {
        console.error("ElevenLabs TTS error:", error);
        setIsSpeaking(false);
      }
    },
    [stop]
  );

  return {
    speak,
    stop,
    isSpeaking,
    isSupported: true,
  };
}