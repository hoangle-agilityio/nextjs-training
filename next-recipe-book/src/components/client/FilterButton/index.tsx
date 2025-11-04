import { OptionType, WithID } from "@/types";

interface FilterButtonProps {
  title: string;
  filterList: WithID<OptionType>[];
  filtered?: string;
  onClick: (value: string) => void;
}

const FilterButton = ({
  title,
  filterList,
  filtered,
  onClick,
}: FilterButtonProps) => {
  const handleFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value ?? "";
    onClick(value);
  };

  return (
    <div>
      <p className="text-md font-bold uppercase">{title}</p>
      <div className="flex flex-col">
        {filterList?.map(({ id, label, value }) => (
          <button
            key={id}
            className={`m-1 px-3 py-1 border rounded-full font-semibold text-sm w-fit cursor-pointer hover:opacity-90 transition ${
              filtered === value
                ? "bg-button-secondary text-filter-selected"
                : "bg-button-deactivate text-primary"
            }`}
            value={value}
            onClick={handleFilterButton}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButton;
