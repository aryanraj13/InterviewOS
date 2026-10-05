import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  LoaderCircle,
  RefreshCcw,
  Sparkles,
} from 'lucide-react';

export default function InterviewGenerationModal({
  open,
  loading,
  error,
  roleName,
  onRetry,
  onBack,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-[#080B0A]/80
            px-4
            backdrop-blur-md
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="
              surface-card
              relative
              w-full
              max-w-lg
              overflow-hidden
              p-6
              md:p-8
            "
          >
            {/* Glow */}
            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-56
                w-56
                rounded-full
                bg-[#34D399]/[0.07]
                blur-3xl
              "
            />

            {loading ? (
              <div className="relative text-center">

                {/* Loader */}
                <div
                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[#34D399]/20
                    bg-[#34D399]/[0.07]
                    text-[#34D399]
                    shadow-[0_0_30px_rgba(52,211,153,0.08)]
                  "
                >
                  <LoaderCircle className="h-7 w-7 animate-spin" />
                </div>

                <h3
                  className="
                    mt-6
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-[#F5F7F6]
                  "
                >
                  Preparing your interview...
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-[#8F9B95]
                  "
                >
                  Generating personalized questions for{' '}
                  <span className="font-medium text-[#A6B0AC]">
                    {roleName}
                  </span>
                  ...
                </p>

                {/* Progress indicator */}
                <div className="mx-auto mt-6 h-1.5 max-w-xs overflow-hidden rounded-full bg-[#1B241F]">
                  <motion.div
                    className="h-full rounded-full bg-[#34D399]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="relative">

                {/* Error icon */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-red-400/15
                    bg-red-400/[0.06]
                    text-red-400
                  "
                >
                  <Sparkles className="h-5 w-5" />
                </div>

                <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-red-400">
                  Interview generation failed
                </div>

                <h3
                  className="
                    mt-3
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-[#F5F7F6]
                  "
                >
                  Couldn't generate your interview.
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-[#8F9B95]
                  "
                >
                  {error ||
                    'Unable to generate a new interview right now.'}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onBack}
                    className="secondary-button px-5 py-3"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={onRetry}
                    className="primary-button px-5 py-3"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Retry
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}