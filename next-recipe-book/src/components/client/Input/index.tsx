"use client";

import { SearchIcon } from "@/components/icons";

interface InputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ id, value, onChange }: InputProps) => {
  return (
    <div className="flex gap-2 items-center border border-gray-400 p-3 rounded-md">
      <SearchIcon />
      <input
        key={id}
        id={id}
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
