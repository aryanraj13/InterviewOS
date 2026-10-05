import { AnimatePresence, motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';

export default function SubmitAnswerConfirmModal({
  open,
  loading,
  onCancel,
  onConfirm,
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
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="
              surface-card
              w-full
              max-w-lg
              p-6
              md:p-8
              shadow-[0_25px_80px_rgba(0,0,0,0.5)]
            "
          >
            {/* Label */}
            <div
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.24em]
                text-[#34D399]
              "
            >
              Confirmation required
            </div>

            {/* Heading */}
            <h3
              className="
                mt-3
                font-display
                text-2xl
                font-semibold
                tracking-tight
                text-[#F5F7F6]
              "
            >
              Submit your answer?
            </h3>

            {/* Description */}
            <p
              className="
                mt-3
                text-sm
                leading-7
                text-[#A6B0AC]
              "
            >
              Are you sure you want to submit this answer? You won't be able
              to edit it after submission.
            </p>

            {/* Actions */}
            <div
              className="
                mt-6
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                onClick={onCancel}
                className="secondary-button px-5 py-3"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="
                  primary-button
                  px-5
                  py-3
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  'Submit Answer'
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}