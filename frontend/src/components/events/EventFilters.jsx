import { Search, ChevronDown } from 'lucide-react';
import { EVENT_CATEGORIES } from '../../utils/constants';
import { formatCategoryLabel } from '../../utils/helpers';

const EventFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-[0_2px_12px_rgba(31,31,31,0.06)] sm:flex-row sm:items-center sm:gap-6 sm:p-5">
      <div className="relative flex-1">
        <Search
          size={18}
          strokeWidth={1.75}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search events by name..."
          aria-label="Search events by name"
          className="w-full rounded-2xl border border-transparent bg-[#F8F7F5] py-3.5 pl-11 pr-4 text-sm text-[#1F1F1F] placeholder:text-[#6B7280] transition-colors duration-300 focus:border-[#1F1F1F]/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/10"
        />
      </div>

      <div className="hidden h-10 w-px bg-[#E8E3DD] sm:block" aria-hidden="true" />

      <div className="relative sm:w-56">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter by category"
          className="w-full appearance-none rounded-2xl border border-transparent bg-[#F8F7F5] py-3.5 pl-4 pr-10 text-sm text-[#1F1F1F] transition-colors duration-300 focus:border-[#1F1F1F]/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/10"
        >
          <option value="All">All Categories</option>
          {EVENT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {formatCategoryLabel(category)}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          strokeWidth={1.75}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
        />
      </div>
    </div>
  );
};

export default EventFilters;
