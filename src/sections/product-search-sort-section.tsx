import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export type SortOption =
  | "best-selling"
  | "title-asc"
  | "title-desc"
  | "price-asc"
  | "price-desc"
  | "created-asc"
  | "created-desc";

interface ProductSearchSortSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const sortOptions = [
  { value: "best-selling" as const, label: "Best Selling" },
  { value: "title-asc" as const, label: "Alphabetically, A-Z" },
  { value: "title-desc" as const, label: "Alphabetically, Z-A" },
  { value: "price-asc" as const, label: "Price, Low to High" },
  { value: "price-desc" as const, label: "Price, High to Low" },
  { value: "created-desc" as const, label: "Date Added, Newest to Oldest" },
  { value: "created-asc" as const, label: "Date Added, Oldest to Newest" },
];

export function ProductSearchSortSection({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
}: ProductSearchSortSectionProps) {
  return (
    <section className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* Search Bar */}
        <div className="relative max-w-md flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pr-3 pl-10 leading-5 text-white placeholder-gray-400 focus:border-lime-400 focus:placeholder-gray-500 focus:ring-1 focus:ring-lime-400 focus:outline-none"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex-shrink-0">
          <label htmlFor="sort-select" className="sr-only">
            Sort by
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pr-10 pl-3 text-base leading-5 text-white focus:border-lime-400 focus:ring-1 focus:ring-lime-400 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
