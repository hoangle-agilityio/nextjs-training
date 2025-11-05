"use client";

import { SelectHTMLAttributes } from "react";
import { OptionType } from "@/types";
import { ArrowIcon } from "@/components/icons";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  value: string;
  options: OptionType[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  label,
  name,
  value,
  options,
  onChange,
  ...rest
}: SelectProps) => {
  return (
    <div className="mb-4">
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="appearance-none block w-full px-3 py-2 border border-subtle-gray rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent-indigo focus:border-accent-indigo sm:text-sm transition pr-10 text-gray-500"
          {...rest}
        >
          <option value="" disabled>
            -- Select a {label} --
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ArrowIcon className="size-4 rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default Select;
