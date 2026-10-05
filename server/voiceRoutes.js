import express from "express";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const router = express.Router();

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

router.post("/speak", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        error: "Text is required",
      });
    }

    const audio = await elevenlabs.textToSpeech.convert(
      "JBFqnCBsd6RMkjVDRZzb",
      {
        text: text.trim(),
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128",
      }
    );

    const chunks = [];

    for await (const chunk of audio) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.length,
      "Cache-Control": "no-cache",
    });

    res.send(audioBuffer);
  } catch (error) {
    console.error("ElevenLabs TTS error:", error);

    res.status(500).json({
      error: "Failed to generate speech",
    });
  }
});

router.get("/scribe-token", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.elevenlabs.io/v1/single-use-token/realtime_scribe",
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Scribe token error:", data);

      return res.status(response.status).json({
        error: data.detail?.message || "Failed to create Scribe token",
      });
    }

    res.json({
      token: data.token,
    });
  } catch (error) {
    console.error("Scribe token error:", error);

    res.status(500).json({
      error: "Failed to create Scribe token",
    });
  }
});

export default router;