import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Clock3,
  MoveRight,
  Check,
} from 'lucide-react';

const levels = [
  {
    id: 'Beginner',
    title: 'BEGINNER',
    description: 'Fundamentals and basic concepts',
    icon: Brain,
  },
  {
    id: 'Intermediate',
    title: 'INTERMEDIATE',
    description: 'Practical and scenario-based questions',
    icon: MoveRight,
  },
  {
    id: 'Advanced',
    title: 'ADVANCED',
    description: 'Deep technical and challenging problems',
    icon: Clock3,
  },
];

export default function DifficultySelector({
  open,
  role,
  selectedDifficulty,
  onSelectDifficulty,
  onContinue,
  onClose,
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
            py-6
            backdrop-blur-md
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
            className="
              surface-card
              relative
              w-full
              max-w-4xl
              overflow-hidden
              p-6
              md:p-8
            "
          >
            {/* Background glow */}
            <div
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-72
                w-72
                rounded-full
                bg-[#34D399]/[0.06]
                blur-3xl
              "
            />

            <div className="relative">

              {/* Header */}
              <div className="flex items-start justify-between gap-4">

                <div>
                  <div className="section-label">
                    Step 1 of 3
                  </div>

                  <h3 className="section-heading mt-3">
                    Choose your interview difficulty
                  </h3>

                  <p className="section-copy">
                    Selected role:{' '}
                    <span className="font-semibold text-[#F5F7F6]">
                      {role?.title || role?.name}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="secondary-button px-4 py-2"
                >
                  Close
                </button>
              </div>

              {/* Difficulty Cards */}
              <div className="mt-7 grid gap-4 md:grid-cols-3">

                {levels.map((level) => {
                  const active =
                    selectedDifficulty === level.id;

                  const Icon = level.icon;

                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() =>
                        onSelectDifficulty(level.id)
                      }
                      className={`
                        group
                        relative
                        overflow-hidden
                        rounded-3xl
                        border
                        p-5
                        text-left
                        transition-all
                        duration-200

                        ${
                          active
                            ? `
                              border-[#34D399]/40
                              bg-[#34D399]/[0.07]
                              shadow-[0_0_35px_rgba(52,211,153,0.08)]
                            `
                            : `
                              border-[#1B241F]
                              bg-[#0E1310]
                              hover:-translate-y-0.5
                              hover:border-[#34D399]/25
                              hover:bg-[#121913]
                              hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]
                            `
                        }
                      `}
                    >

                      {/* Active glow */}
                      {active && (
                        <div
                          className="
                            pointer-events-none
                            absolute
                            -right-12
                            -top-12
                            h-32
                            w-32
                            rounded-full
                            bg-[#34D399]/[0.10]
                            blur-3xl
                          "
                        />
                      )}

                      {/* Icon */}
                      <div
                        className={`
                          relative
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          transition-all
                          duration-200

                          ${
                            active
                              ? `
                                border-[#34D399]/30
                                bg-[#34D399]/10
                                text-[#34D399]
                              `
                              : `
                                border-[#1B241F]
                                bg-[#121713]
                                text-[#6B756F]
                                group-hover:border-[#34D399]/20
                                group-hover:text-[#34D399]
                              `
                          }
                        `}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Selection check */}
                      {active && (
                        <div
                          className="
                            absolute
                            right-4
                            top-4
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-full
                            bg-[#34D399]
                            text-[#080B0A]
                          "
                        >
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      )}

                      {/* Content */}
                      <div
                        className={`
                          relative
                          mt-5
                          text-xs
                          font-semibold
                          tracking-[0.24em]
                          ${
                            active
                              ? 'text-[#34D399]'
                              : 'text-[#6B756F]'
                          }
                        `}
                      >
                        {level.title}
                      </div>

                      <h4
                        className="
                          relative
                          mt-2
                          text-xl
                          font-semibold
                          text-[#F5F7F6]
                        "
                      >
                        {level.id}
                      </h4>

                      <p
                        className="
                          relative
                          mt-2
                          text-sm
                          leading-6
                          text-[#8F9B95]
                        "
                      >
                        {level.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-7 flex justify-end">

                <button
                  type="button"
                  onClick={onContinue}
                  disabled={!selectedDifficulty}
                  className="
                    primary-button
                    px-6
                    py-3
                  "
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}