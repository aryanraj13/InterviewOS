import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Sparkles,
} from 'lucide-react';

export default function RoleCard({ role, onStart }) {
  const Icon = role.icon;

  return (
    <motion.article
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-[#1E2622]
        bg-[#121713]
        p-6
        shadow-[0_8px_30px_rgba(0,0,0,0.4)]
        transition-all
        duration-300
        hover:border-[#34D399]/30
        hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)]
      "
    >

      {/* Card glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-[#34D399]/[0.045]
          blur-[70px]
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between gap-4">

        {/* Role icon */}
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-[#34D399]/20
            bg-[#34D399]/[0.07]
            text-[#34D399]
            transition-all
            duration-300
            group-hover:border-[#34D399]/35
            group-hover:bg-[#34D399]/[0.10]
          "
        >
          <Icon className="h-6 w-6" />
        </div>

        {/* Category */}
        <span
          className="
            inline-flex
            shrink-0
            items-center
            gap-1.5
            rounded-full
            border
            border-[#1E2622]
            bg-[#0E1310]
            px-3
            py-1.5
            text-xs
            font-medium
            text-[#A6B0AC]
          "
        >
          <Sparkles className="h-3.5 w-3.5 text-[#34D399]" />

          {role.category === 'technical'
            ? 'Technical'
            : 'Non-Technical'}
        </span>
      </div>

      {/* Role information */}
      <div className="relative mt-5">

        <h3
          className="
            text-lg
            font-semibold
            tracking-tight
            text-[#F5F7F6]
          "
        >
          {role.title}
        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-[#A6B0AC]
          "
        >
          {role.description}
        </p>
      </div>

      {/* Skills */}
      <div className="relative mt-5 flex flex-wrap gap-2">

        {role.skills.map((skill) => (
          <span
            key={skill}
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-[#1E2622]
              bg-[#0E1310]
              px-3
              py-1.5
              text-xs
              font-medium
              text-[#A6B0AC]
              transition-all
              duration-200
              group-hover:border-[#34D399]/15
            "
          >
            <BadgeCheck
              className="
                h-3.5
                w-3.5
                text-[#34D399]
              "
            />

            {skill}
          </span>
        ))}
      </div>

      {/* Button */}
      <div className="relative mt-7 flex flex-1 items-end">

        <button
          type="button"
          onClick={() => onStart(role)}
          className="
            group/button
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#34D399]
            px-5
            py-3
            text-sm
            font-semibold
            text-[#080B0A]
            shadow-[0_8px_25px_rgba(52,211,153,0.15)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#5EEAB0]
            hover:shadow-[0_10px_35px_rgba(52,211,153,0.28)]
            active:translate-y-0
            focus:outline-none
            focus:ring-2
            focus:ring-[#34D399]/50
            focus:ring-offset-2
            focus:ring-offset-[#080B0A]
          "
        >
          Start Interview

          <ArrowRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover/button:translate-x-1
            "
          />
        </button>

      </div>
    </motion.article>
  );
}