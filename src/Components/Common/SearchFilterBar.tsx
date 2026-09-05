interface SearchFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  statusOptions?: { value: string; label: string }[];
  status?: string;
  onStatusChange?: (value: string) => void;
}

const SearchFilterBar = ({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  statusOptions,
  status,
  onStatusChange,
}: SearchFilterBarProps) => {
  return (
    <div className="glass-subtle rounded-2xl p-3 flex flex-col sm:flex-row gap-3">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={searchPlaceholder}
        className="glass-input rounded-xl p-2.5 flex-1"
      />
      {statusOptions && onStatusChange && (
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="glass-input rounded-xl p-2.5 sm:w-48"
        >
          <option value="">All statuses</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SearchFilterBar;
