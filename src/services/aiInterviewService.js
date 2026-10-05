const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    'VITE_API_URL is not configured.'
  );
}


export async function startResumeInterview({
  resume,
  role,
  difficulty,
  duration,
}) {
  const formData = new FormData();

  formData.append('resume', resume);
  formData.append('role', role);
  formData.append('difficulty', difficulty);
  formData.append('duration', duration);

  const response = await fetch(
    `${API_URL}/api/ai-interview/start`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        'Unable to start AI interview.'
    );
  }

  return data;
}


export async function submitResumeInterviewAnswer({
  profile,
  role,
  difficulty,
  history,
  currentQuestion,
  answer,
  timeRemaining,
}) {
  const response = await fetch(
    `${API_URL}/api/ai-interview/next`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        profile,
        role,
        difficulty,
        history,
        currentQuestion,
        answer,
        timeRemaining,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        'Unable to process answer.'
    );
  }

  return data;
}


export async function getFinalResumeAnalysis({
  profile,
  role,
  difficulty,
  history,
}) {
  const response = await fetch(
    `${API_URL}/api/ai-interview/final`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        profile,
        role,
        difficulty,
        history,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        'Unable to generate final analysis.'
    );
  }

  return data.analysis;
}