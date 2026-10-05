import { motion } from 'framer-motion';

export default function ProgressBar({ value = 0, label, tone = 'emerald' }) {
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0));

  const barClass =
    tone === 'rose'
      ? 'bg-gradient-to-r from-[#EF4444] to-[#FB7185]'
      : 'bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#5EEAB0]';

  return (
    <div className="space-y-2.5">
      {(label || label === '') && (
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-medium text-[#A6B0AC]">
            {label}
          </span>

          <span className="font-semibold text-[#34D399]">
            {Math.round(safeValue)}%
          </span>
        </div>
      )}

      <div
        className="
          h-2
          overflow-hidden
          rounded-full
          border
          border-[#1E2622]
          bg-[#0E1310]
        "
      >
        <motion.div
          className={`
            h-full
            rounded-full
            shadow-[0_0_14px_rgba(52,211,153,0.18)]
            ${barClass}
          `}
          initial={{ width: 0 }}
          animate={{ width: `${safeValue}%` }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        />
      </div>
    </div>
  );
}