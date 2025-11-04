"use client";

import { SearchIcon } from "@/components/icons";
import { DEBOUNCE_DELAY } from "@/constants";
import { useState, useEffect } from "react";

interface InputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const Input = ({ id, value, onChange }: InputProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [localValue]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target?.value || "");
  };

  return (
    <div className="flex gap-2 items-center border border-gray-400 p-3 rounded-md">
      <SearchIcon />
      <input
        key={id}
        id={id}
        type="text"
        className="px-2 outline-none"
        placeholder="Search"
        value={localValue}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default Input;
