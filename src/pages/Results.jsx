import InterviewResult from '../components/InterviewResult.jsx';

export default function ResultsPage({ summary, onTryAgain, onBackToRoles, onViewHistory, onNavigate, onOpenHistory, onOpenProgress }) {
  return (
    <div>
      <InterviewResult
        summary={summary}
        onTryAgain={onTryAgain}
        onBackToRoles={onBackToRoles}
        onViewHistory={onViewHistory}
        onBackToHome={() => {
  setScreen('home');
}}
      />
    </div>
  );
}
