import {
  ArrowRight,
  Layers3,
  MessageSquareText,
  ShieldCheck,
} from 'lucide-react';

import Hero from '../components/Hero.jsx';
import RoleGrid from '../components/RoleGrid.jsx';
import DifficultySelector from '../components/DifficultySelector.jsx';

export default function Home({
  roles,
  onStartResumeInterview,
  searchTerm,
  activeFilter,
  onSearchChange,
  onFilterChange,
  onStartRole,
  onExploreRoles,
  difficultyModalOpen,
  selectedDifficulty,
  onSelectDifficulty,
  onContinueDifficulty,
  onCloseDifficulty,
  selectedRole,
  progressSummary,
  onClearSearch,
}) {
  const workflow = [
    'Select role',
    'Choose difficulty',
    'Configure interview',
    'Answer questions',
    'Review results',
  ];

  const highlights = [
    {
      icon: Layers3,
      title: 'Role-based prompts',
      copy: 'Tailored questions for technical and non-technical roles.',
    },
    {
      icon: MessageSquareText,
      title: 'Structured feedback',
      copy: 'A clear evaluation state after each answer.',
    },
    {
      icon: ShieldCheck,
      title: 'Production-ready flow',
      copy: 'Reusable components and local history persistence.',
    },
  ];

  return (
    <>
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-6 pb-16 lg:px-6">

        {/* Hero */}
        <Hero onExploreRoles={onExploreRoles} />

        {/* =====================================================
            AI RESUME INTERVIEW
            ===================================================== */}
        <section className="surface-card relative overflow-hidden p-6 md:p-8">

          {/* Background glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

            <div>

              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                · AI-POWERED
              </div>

              {/* Heading */}
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-heading md:text-4xl">
                Interview directly from your{' '}
                <span className="text-gradient">resume</span>
              </h2>

              {/* Description */}
              <p className="mt-3 max-w-2xl text-sm leading-7 text-text md:text-base">
                Upload your resume and let the AI interviewer ask
                personalized questions about your actual projects,
                skills and experience. It listens to your answers
                and adapts the next question based on what you say.
              </p>

              {/* Features */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  'Resume-based questions',
                  'Voice conversation',
                  'Adaptive follow-ups',
                  'AI feedback',
                ].map((item) => (
                  <span
                    key={item}
                    className="chip"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </span>
                ))}
              </div>

            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={onStartResumeInterview}
              className="primary-button group whitespace-nowrap rounded-2xl px-6 py-4 shadow-glow-sm"
            >
              Start Resume Interview

              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

          </div>
        </section>

        {/* =====================================================
            INTERVIEW FLOW
            ===================================================== */}
        

        {/* =====================================================
            ROLES
            ===================================================== */}
        <div className="grid gap-6 xl:items-start">

          <RoleGrid
            roles={roles}
            searchTerm={searchTerm}
            activeFilter={activeFilter}
            onSearchChange={onSearchChange}
            onFilterChange={onFilterChange}
            onStartRole={onStartRole}
            onClearSearch={onClearSearch}
          />

        </div>
      </main>

      {/* Difficulty Modal */}
      <DifficultySelector
        open={difficultyModalOpen}
        role={selectedRole}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={onSelectDifficulty}
        onContinue={onContinueDifficulty}
        onClose={onCloseDifficulty}
      />
    </>
  );
}