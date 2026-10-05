import {
  Upload,
  FileText,
  Clock,
  Brain,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

import { useState } from 'react';

export default function ResumeInterviewSetup({
  onStart,
  onBack,
  loading,
  error: externalError,
}) {
  const [resume, setResume] = useState(null);

  const [role, setRole] =
    useState('AI Engineer');

  const [difficulty, setDifficulty] =
    useState('Intermediate');

  const [duration, setDuration] =
    useState(30);

  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!resume) {
      setError('Please upload your resume.');
      return;
    }

    setError('');

    onStart({
      resume,
      role,
      difficulty,
      duration,
    });
  };

  return (
    <main className="min-h-screen bg-[#080B0A] px-4 py-5 md:px-6">
      {/* Ambient background */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[-15%] h-96 w-96 rounded-full bg-[#34D399]/[0.06] blur-3xl" />

        <div className="absolute right-[-10%] top-[10%] h-96 w-96 rounded-full bg-[#10B981]/[0.04] blur-3xl" />

        <div className="absolute bottom-[-20%] left-[40%] h-80 w-80 rounded-full bg-[#34D399]/[0.025] blur-3xl" />
      </div>


      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-40px)] max-w-6xl flex-col">

        {/* Back */}

        <button
          type="button"
          onClick={onBack}
          className="mb-4 w-fit text-sm font-medium text-[#6B756F] transition hover:text-[#F5F7F6]"
        >
          ← Back
        </button>


        {/* Main card */}

        <section className="surface-card flex flex-1 flex-col overflow-hidden p-5 md:p-7">

          {/* Header */}

          <div className="flex shrink-0 items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#34D399]/20 bg-[#34D399]/[0.08] text-[#34D399]">
              <Brain className="h-6 w-6" />
            </div>

            <div>
              <div className="section-label">
                AI Resume Interview
              </div>

              <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#F5F7F6] md:text-3xl">
                Your resume. Your interview.
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A6B0AC]">
                Upload your resume and the AI will create
                a personalized interview based on your
                actual projects, skills and experience.
              </p>
            </div>

          </div>


          {/* Setup grid */}

          <div className="mt-6 grid min-h-0 flex-1 gap-5 lg:grid-cols-[1.05fr_0.95fr]">


            {/* =========================================================
                LEFT — RESUME
            ========================================================= */}

            <div className="flex min-h-0 flex-col">

              <label className="text-sm font-semibold text-[#F5F7F6]">
                Resume
              </label>

              <label
                className={`mt-3 flex min-h-[280px] flex-1 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-6 text-center transition ${
                  resume
                    ? 'border-[#34D399]/30 bg-[#34D399]/[0.04]'
                    : 'border-[#1E2622] bg-[#0E1310] hover:border-[#34D399]/35 hover:bg-[#34D399]/[0.035]'
                }`}
              >

                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={(event) => {
                    setResume(
                      event.target.files?.[0] ||
                        null
                    );

                    setError('');
                  }}
                />

                {resume ? (
                  <>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#34D399]/20 bg-[#34D399]/[0.08]">
                      <FileText className="h-8 w-8 text-[#34D399]" />
                    </div>

                    <div className="mt-4 max-w-full truncate px-4 font-semibold text-[#F5F7F6]">
                      {resume.name}
                    </div>

                    <div className="mt-1 text-sm text-[#6B756F]">
                      {(resume.size / 1024).toFixed(1)} KB
                    </div>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#34D399]/15 bg-[#34D399]/[0.06] px-3 py-1.5 text-xs font-medium text-[#34D399]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Resume uploaded
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#1E2622] bg-[#121713]">
                      <Upload className="h-8 w-8 text-[#34D399]" />
                    </div>

                    <div className="mt-4 font-semibold text-[#F5F7F6]">
                      Upload your resume
                    </div>

                    <div className="mt-1 text-sm text-[#6B756F]">
                      PDF, DOCX or TXT
                    </div>

                    <div className="mt-1 text-xs text-[#6B756F]">
                      Maximum file size: 5 MB
                    </div>
                  </>
                )}

              </label>

            </div>


            {/* =========================================================
                RIGHT — INTERVIEW SETTINGS
            ========================================================= */}

            <div className="flex min-h-0 flex-col">

              {/* Role */}

              <div>
                <label className="text-sm font-semibold text-[#F5F7F6]">
                  Target role
                </label>

                <select
                  value={role}
                  onChange={(event) =>
                    setRole(event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-[#1E2622] bg-[#0E1310] px-4 py-3 text-sm text-[#F5F7F6] outline-none transition focus:border-[#34D399]/50 focus:ring-4 focus:ring-[#34D399]/10"
                >
                  <option>AI Engineer</option>
                  <option>Software Engineer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Machine Learning Engineer</option>
                  <option>Data Scientist</option>
                  <option>Data Analyst</option>
                </select>
              </div>


              {/* Difficulty */}

              <div className="mt-5">

                <label className="text-sm font-semibold text-[#F5F7F6]">
                  Difficulty
                </label>

                <div className="mt-2 grid grid-cols-3 gap-2">

                  {[
                    'Beginner',
                    'Intermediate',
                    'Advanced',
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setDifficulty(item)
                      }
                      className={`rounded-2xl border px-3 py-3 text-xs font-semibold transition-all sm:text-sm ${
                        difficulty === item
                          ? 'border-[#34D399]/45 bg-[#34D399]/[0.09] text-[#34D399] shadow-[0_0_20px_rgba(52,211,153,0.06)]'
                          : 'border-[#1E2622] bg-[#0E1310] text-[#A6B0AC] hover:border-[#34D399]/25 hover:bg-[#34D399]/[0.04] hover:text-[#F5F7F6]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}

                </div>

              </div>


              {/* Duration */}

              <div className="mt-5">

                <label className="text-sm font-semibold text-[#F5F7F6]">
                  Interview duration
                </label>

                <div className="mt-2 grid grid-cols-4 gap-2">

                  {[15, 30, 45, 60].map(
                    (minutes) => (
                      <button
                        key={minutes}
                        type="button"
                        onClick={() =>
                          setDuration(minutes)
                        }
                        className={`rounded-2xl border px-2 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                          duration === minutes
                            ? 'border-[#34D399]/45 bg-[#34D399]/[0.09] text-[#34D399] shadow-[0_0_20px_rgba(52,211,153,0.06)]'
                            : 'border-[#1E2622] bg-[#0E1310] text-[#A6B0AC] hover:border-[#34D399]/25 hover:bg-[#34D399]/[0.04] hover:text-[#F5F7F6]'
                        }`}
                      >
                        <Clock className="mx-auto mb-1 h-4 w-4" />

                        {minutes} min
                      </button>
                    )
                  )}

                </div>

              </div>


              {/* Error */}

              {(error || externalError) && (
                <div className="mt-4 rounded-2xl border border-[#EF4444]/15 bg-[#EF4444]/[0.06] px-4 py-3 text-sm font-medium text-[#FCA5A5]">
                  {error || externalError}
                </div>
              )}


              {/* Start */}

              <div className="mt-auto pt-5">

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="primary-button w-full rounded-2xl px-5 py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? 'Analyzing resume...'
                    : 'Start AI Interview'}

                  {!loading && (
                    <ArrowRight className="h-5 w-5" />
                  )}
                </button>

                <p className="mt-2 text-center text-xs text-[#6B756F]">
                  The AI will tailor questions to your resume.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}