"use client";

import { SearchIcon } from "@/components/icons";
import { DEBOUNCE_DELAY } from "@/constants";
import { useState, useEffect } from "react";

interface InputProps {
  id?: string;
  value: string;
  isTextArea?: boolean;
  isSearch?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Input = ({
  id,
  value,
  isTextArea = false,
  isSearch = false,
  placeholder = "Search",
  onChange,
}: InputProps) => {
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

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocalValue(e.target?.value || "");
  };

  return isTextArea ? (
    <div className="p-3 border border-gray-400 rounded-md">
      <textarea
        key={id}
        id={id}
        className="w-full px-2 outline-none resize-y"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChangeInput}
        rows={5}
      />
    </div>
  ) : (
    <div className="flex gap-2 items-center border border-gray-400 p-3 rounded-md">
      {isSearch && <SearchIcon />}

      <input
        key={id}
        id={id}
        type="text"
        className="px-2 outline-none"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default Input;
