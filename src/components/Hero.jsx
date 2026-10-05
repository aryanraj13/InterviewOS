import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onExploreRoles }) {
  return (
    <section
      className="
        relative overflow-hidden rounded-[2rem]
        border border-[#1E2622]
        bg-[#0E1310]
        shadow-[0_20px_70px_rgba(0,0,0,0.45)]
      "
    >
      {/* Background grid */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-40
          bg-[linear-gradient(rgba(52,211,153,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.035)_1px,transparent_1px)]
          bg-[size:42px_42px]
        "
      />

      {/* Main green glow */}
      <div
        className="
          pointer-events-none absolute
          -right-32 -top-40
          h-[520px] w-[520px]
          rounded-full
          bg-[#34D399]/[0.10]
          blur-[120px]
        "
      />

      {/* Bottom glow */}
      <div
        className="
          pointer-events-none absolute
          -bottom-48 -left-32
          h-[450px] w-[450px]
          rounded-full
          bg-[#10B981]/[0.07]
          blur-[120px]
        "
      />

      {/* Small center glow */}
      <div
        className="
          pointer-events-none absolute
          left-[42%] top-[15%]
          h-72 w-72
          rounded-full
          bg-[#34D399]/[0.035]
          blur-[100px]
        "
      />

      {/* Content */}
      <div
        className="
          relative grid min-h-[360px]
          gap-10
          p-7 md:p-10
          lg:grid-cols-[1.1fr_0.9fr]
          lg:p-12
        "
      >
        {/* Left */}
        <div className="flex flex-col justify-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
              inline-flex w-fit items-center gap-2
              rounded-full
              border border-[#34D399]/20
              bg-[#34D399]/[0.06]
              px-4 py-2
              text-xs font-semibold uppercase
              tracking-[0.22em]
              text-[#A6B0AC]
              backdrop-blur
            "
          >
            <Sparkles className="h-4 w-4 text-[#34D399]" />

            AI Interview Practice
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="
              mt-7
              max-w-3xl
              text-5xl
              font-semibold
              leading-[1.02]
              tracking-[-0.045em]
              text-[#F5F7F6]
              md:text-6xl
              lg:text-7xl
            "
          >
            Interview
            <span className="text-[#34D399]">OS</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-[#A6B0AC]
              md:text-lg
            "
          >
            Practice realistic interviews tailored to your role,
            experience, and goals.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {/* Primary CTA */}
            <button
              type="button"
              onClick={onExploreRoles}
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#34D399]
                px-6
                py-3.5
                text-sm
                font-semibold
                text-[#080B0A]
                shadow-[0_8px_30px_rgba(52,211,153,0.18)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#5EEAB0]
                hover:shadow-[0_10px_35px_rgba(52,211,153,0.28)]
                active:translate-y-0
              "
            >
              Explore roles

              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </button>

            {/* Secondary CTA */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border border-[#1E2622]
                bg-[#121713]/80
                px-5
                py-3.5
                text-sm
                font-medium
                text-[#A6B0AC]
                backdrop-blur
                transition-colors
                duration-200
                hover:border-[#34D399]/25
                hover:text-[#F5F7F6]
              "
            >
              <ShieldCheck className="h-4 w-4 text-[#34D399]" />

              Structured feedback for every session
            </div>
          </motion.div>
        </div>

        {/* Right side */}
        <div className="relative hidden lg:flex items-center justify-center">

          {/* Decorative interview card */}
          <div
            className="
              relative
              w-full
              max-w-[380px]
              rounded-2xl
              border border-[#1E2622]
              bg-[#121713]/80
              p-5
              shadow-[0_15px_50px_rgba(0,0,0,0.35)]
              backdrop-blur-xl
            "
          >
            {/* Card header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6B756F]">
                  Interview session
                </p>

                <p className="mt-1 text-sm font-semibold text-[#F5F7F6]">
                  AI Technical Interview
                </p>
              </div>

              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-lg
                  border border-[#34D399]/20
                  bg-[#34D399]/10
                "
              >
                <Sparkles className="h-4 w-4 text-[#34D399]" />
              </div>
            </div>

            {/* Question */}
            <div
              className="
                mt-5
                rounded-xl
                border border-[#1E2622]
                bg-[#0E1310]
                p-4
              "
            >
              <p className="text-xs text-[#6B756F]">
                AI Interviewer
              </p>

              <p className="mt-2 text-sm leading-6 text-[#D5DDD9]">
                Tell me about a challenging project you worked on
                and how you solved it.
              </p>
            </div>

            {/* Status */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#34D399] shadow-[0_0_10px_rgba(52,211,153,0.7)]" />

                <span className="text-xs text-[#6B756F]">
                  Listening
                </span>
              </div>

              <span className="text-xs font-medium text-[#34D399]">
                Question 03
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}