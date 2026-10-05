import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { roleFilters } from '../data/roles.js';
import RoleCard from './RoleCard.jsx';

export default function RoleGrid({
  roles,
  searchTerm,
  activeFilter,
  onSearchChange,
  onFilterChange,
  onStartRole,
  onClearSearch,
}) {
  return (
    <section id="role-selection-grid" className="space-y-7">

      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <div
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#34D399]
            "
          >
            Choose your interview role
          </div>

          <h2
            className="
              mt-3
              font-display
              text-3xl
              font-semibold
              tracking-tight
              text-[#F5F7F6]
              md:text-4xl
            "
          >
            Find the role you want to practice
          </h2>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-7
              text-[#A6B0AC]
              md:text-base
            "
          >
            Search by job title, narrow by category, and start a
            focused interview in a few clicks.
          </p>
        </div>

        {/* Search */}
        <div
          className="
            flex
            w-full
            max-w-md
            items-center
            gap-3
            rounded-xl
            border
            border-[#1E2622]
            bg-[#0E1310]
            px-4
            py-3.5
            shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            transition-all
            duration-200
            focus-within:border-[#34D399]/40
            focus-within:shadow-[0_0_25px_rgba(52,211,153,0.08)]
          "
        >
          <Search className="h-4 w-4 shrink-0 text-[#6B756F]" />

          <input
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search roles"
            className="
              w-full
              bg-transparent
              text-sm
              text-[#F5F7F6]
              outline-none
              placeholder:text-[#6B756F]
            "
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2.5">
        {roleFilters.map((filter) => {
          const active = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onFilterChange(filter.id)}
              className={`
                rounded-full
                border
                px-4
                py-2
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  active
                    ? `
                      border-[#34D399]/35
                      bg-[#34D399]/10
                      text-[#34D399]
                      shadow-[0_0_20px_rgba(52,211,153,0.08)]
                    `
                    : `
                      border-[#1E2622]
                      bg-[#121713]
                      text-[#A6B0AC]
                      hover:border-[#34D399]/25
                      hover:bg-[#34D399]/[0.04]
                      hover:text-[#F5F7F6]
                    `
                }
              `}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {roles.length === 0 ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            border
            border-[#1E2622]
            bg-[#121713]
            px-6
            py-14
            text-center
            shadow-[0_8px_30px_rgba(0,0,0,0.3)]
          "
        >
          <div className="text-xl font-semibold tracking-tight text-[#F5F7F6]">
            No roles found
          </div>

          <p className="mt-2 max-w-md text-sm leading-6 text-[#A6B0AC]">
            Try a different search term or clear the current search
            to see all roles again.
          </p>

          <button
            type="button"
            onClick={onClearSearch}
            className="
              mt-5
              rounded-xl
              bg-[#34D399]
              px-5
              py-3
              text-sm
              font-semibold
              text-[#080B0A]
              shadow-[0_8px_25px_rgba(52,211,153,0.15)]
              transition-all
              hover:-translate-y-0.5
              hover:bg-[#5EEAB0]
              hover:shadow-[0_10px_30px_rgba(52,211,153,0.25)]
            "
          >
            Clear search
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {roles.map((role) => (
            <motion.div
              key={role.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.24 }}
            >
              <RoleCard
                role={role}
                onStart={onStartRole}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}