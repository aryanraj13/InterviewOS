import { callGroq } from './geminiService.js';

const difficultyGuidance = {
  Beginner:
    'Ask fundamental questions and focus on clear understanding.',

  Intermediate:
    'Ask practical questions involving implementation, decisions and tradeoffs.',

  Advanced:
    'Ask deep technical questions involving architecture, scalability, tradeoffs and edge cases.',
};

const cleanText = (value, max = 12000) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);


const conversationToText = (history = []) =>
  history
    .slice(-8)
    .map(
      (item, index) =>
        `Q${index + 1}: ${item.question}\nA${index + 1}: ${item.answer}`
    )
    .join('\n\n');


/*
|--------------------------------------------------------------------------
| CREATE CANDIDATE PROFILE
|--------------------------------------------------------------------------
*/

export async function createCandidateProfile({
  resumeText,
  role,
}) {
  const prompt = `
Analyze the following candidate resume.

Target role:
${role}

Resume:
${cleanText(resumeText)}

Extract a concise structured candidate profile.

Return ONLY JSON:

{
  "name": "",
  "summary": "",
  "skills": [],
  "projects": [
    {
      "name": "",
      "technologies": [],
      "description": ""
    }
  ],
  "experience": [
    {
      "company": "",
      "role": "",
      "description": ""
    }
  ],
  "education": [],
  "strongAreas": [],
  "areasToProbe": []
}

Rules:
- Do not invent information.
- Only use information present in the resume.
- Keep the profile concise.
`;

  return callGroq(
    prompt,
    'You are an expert technical recruiter analyzing candidate resumes. Return only valid JSON.'
  );
}


/*
|--------------------------------------------------------------------------
| GENERATE FIRST QUESTION
|--------------------------------------------------------------------------
*/

export async function generateFirstQuestion({
  profile,
  role,
  difficulty,
}) {
  const prompt = `
You are beginning an adaptive job interview.

Target role:
${role}

Difficulty:
${difficulty}

Difficulty guidance:
${difficultyGuidance[difficulty]}

Candidate profile:
${JSON.stringify(profile)}

Generate the first interview question.

The question should:
- Be directly related to the candidate's resume.
- Prefer a real project, skill or experience from the resume.
- Feel like a human interviewer.
- Avoid generic filler.
- Give the candidate an opportunity to explain something they actually did.

Return ONLY JSON:

{
  "question": "",
  "topic": "",
  "type": "technical|behavioral|project",
  "reason": ""
}
`;

  return callGroq(
    prompt,
    'You are an expert interviewer starting a personalized interview. Return only valid JSON.'
  );
}


/*
|--------------------------------------------------------------------------
| EVALUATE + GENERATE NEXT QUESTION
|--------------------------------------------------------------------------
*/

export async function evaluateAndGenerateNext({
  profile,
  role,
  difficulty,
  history,
  currentQuestion,
  answer,
  timeRemaining,
}) {
  const prompt = `
You are conducting a live adaptive interview.

Target role:
${role}

Difficulty:
${difficulty}

Time remaining:
${timeRemaining} seconds

Candidate profile:
${JSON.stringify(profile)}

Previous interview:

${conversationToText(history)}

Current question:
${currentQuestion}

Candidate answer:
${answer}

Evaluate the candidate's current answer and decide the best next question.

The next question should:
- Be related to the candidate's resume OR their previous answer.
- Follow up naturally.
- Become deeper when the candidate demonstrates knowledge.
- Probe weaknesses when appropriate.
- Avoid repeating previous questions.
- Match the requested difficulty.
- Feel conversational rather than like a questionnaire.

Return ONLY JSON:

{
  "evaluation": {
    "score": 0,
    "technicalAccuracy": 0,
    "relevance": 0,
    "clarity": 0,
    "depth": 0,
    "communication": 0,
    "strengths": [],
    "improvements": [],
    "feedback": ""
  },

  "nextQuestion": {
    "question": "",
    "topic": "",
    "type": "technical|behavioral|project",
    "reason": ""
  }
}

If the answer is extremely weak, the next question may test fundamentals.

If the answer is strong, increase the depth.

All scores must be integers from 0 to 100.
`;

  return callGroq(
    prompt,
    'You are an expert adaptive interviewer. Evaluate answers fairly and generate a personalized follow-up question. Return only valid JSON.'
  );
}


/*
|--------------------------------------------------------------------------
| FINAL ANALYSIS
|--------------------------------------------------------------------------
*/

export async function generateFinalAnalysis({
  profile,
  role,
  difficulty,
  history,
}) {
  const prompt = `
Create a final interview performance analysis.

Target role:
${role}

Difficulty:
${difficulty}

Candidate profile:
${JSON.stringify(profile)}

Interview transcript:

${conversationToText(history)}

Analyze the complete interview.

Return ONLY JSON:

{
  "overallScore": 0,

  "technicalKnowledge": 0,
  "communication": 0,
  "problemSolving": 0,
  "resumeKnowledge": 0,
  "answerRelevance": 0,

  "strengths": [],
  "weaknesses": [],

  "summary": "",

  "recommendations": [],

  "recommendedTopics": [],

  "questionBreakdown": [
    {
      "question": "",
      "score": 0,
      "feedback": ""
    }
  ]
}

Rules:
- Scores must be 0-100.
- Do not invent candidate experience.
- Base feedback on the transcript.
- Give practical recommendations for improving interview performance.
`;

  return callGroq(
    prompt,
    'You are a senior interviewer producing a final candidate assessment. Return only valid JSON.'
  );
}