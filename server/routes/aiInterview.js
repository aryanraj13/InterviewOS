import { Router } from 'express';
import multer from 'multer';

import { extractResumeText } from '../services/resumeParser.js';

import {
  createCandidateProfile,
  generateFirstQuestion,
  evaluateAndGenerateNext,
  generateFinalAnalysis,
} from '../services/aiInterviewService.js';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (_request, file, callback) => {
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    if (!allowed.includes(file.mimetype)) {
      return callback(
        new Error('Only PDF, DOCX, and TXT resumes are supported.')
      );
    }

    callback(null, true);
  },
});


/*
|--------------------------------------------------------------------------
| Start Resume Interview
|--------------------------------------------------------------------------
*/

router.post(
  '/start',
  upload.single('resume'),
  async (request, response, next) => {
    try {
      const {
        role,
        difficulty,
        duration,
      } = request.body || {};

      if (!role) {
        return response.status(400).json({
          error: 'Target role is required.',
        });
      }

      if (!difficulty) {
        return response.status(400).json({
          error: 'Difficulty is required.',
        });
      }

      if (!request.file) {
        return response.status(400).json({
          error: 'Resume is required.',
        });
      }

      const resumeText =
        await extractResumeText(request.file);

      if (!resumeText || resumeText.length < 50) {
        return response.status(400).json({
          error:
            'Could not extract enough text from the resume.',
        });
      }

      const profile =
        await createCandidateProfile({
          resumeText,
          role,
        });

      const firstQuestion =
        await generateFirstQuestion({
          profile,
          role,
          difficulty,
        });

      return response.json({
        profile,

        firstQuestion,

        duration: Number(duration) || 30,

        startedAt: Date.now(),
      });
    } catch (error) {
      console.error(
        'Resume interview start error:',
        error
      );

      next(error);
    }
  }
);


/*
|--------------------------------------------------------------------------
| Submit Answer + Generate Follow-up
|--------------------------------------------------------------------------
*/

router.post(
  '/next',
  async (request, response, next) => {
    try {
      const {
        profile,
        role,
        difficulty,
        history,
        currentQuestion,
        answer,
        timeRemaining,
      } = request.body || {};

      if (!profile) {
        return response.status(400).json({
          error: 'Candidate profile is required.',
        });
      }

      if (!currentQuestion) {
        return response.status(400).json({
          error: 'Current question is required.',
        });
      }

      if (!answer?.trim()) {
        return response.status(400).json({
          error: 'Answer is required.',
        });
      }

      const result =
        await evaluateAndGenerateNext({
          profile,
          role,
          difficulty,
          history: Array.isArray(history)
            ? history
            : [],
          currentQuestion,
          answer,
          timeRemaining:
            Number(timeRemaining) || 0,
        });

      return response.json(result);
    } catch (error) {
      console.error(
        'Resume interview next error:',
        error
      );

      next(error);
    }
  }
);


/*
|--------------------------------------------------------------------------
| Final Analysis
|--------------------------------------------------------------------------
*/

router.post(
  '/final',
  async (request, response, next) => {
    try {
      const {
        profile,
        role,
        difficulty,
        history,
      } = request.body || {};

      if (!profile) {
        return response.status(400).json({
          error: 'Candidate profile is required.',
        });
      }

      const analysis =
        await generateFinalAnalysis({
          profile,
          role,
          difficulty,
          history: Array.isArray(history)
            ? history
            : [],
        });

      return response.json({
        analysis,
      });
    } catch (error) {
      console.error(
        'Final analysis error:',
        error
      );

      next(error);
    }
  }
);

export default router;