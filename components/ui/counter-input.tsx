"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface NumberFieldProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  onChange?: (value: number) => void;
}

export default function CounterInput({
  value,
  defaultValue = 0,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  onChange,
  className,
}: NumberFieldProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  const updateValue = (newValue: number) => {
    const clamped = Math.min(Math.max(newValue, min), max);
    if (value === undefined) {
      setInternalValue(clamped);
    }
    onChange?.(clamped);
  };

  return (
    <div
      className={`h-9 flex items-center justify-between w-24 rounded border border-gray-300 bg-white shadow-sm ${
        className ?? ""
      }`}
    >
      {/* Minus Button */}
      <button
        type="button"
        onClick={() => updateValue(currentValue - step)}
        disabled={currentValue <= min}
        className="p-2 disabled:opacity-40 hover:bg-gray-100 transition cursor-pointer"
      >
        <Minus size={16} />
      </button>

      {/* Current Value */}
      <span className="flex-1 text-center select-none font-medium">
        {currentValue}
      </span>

      {/* Plus Button */}
      <button
        type="button"
        onClick={() => updateValue(currentValue + step)}
        disabled={currentValue >= max}
        className="p-2 disabled:opacity-40 hover:bg-gray-100 transition cursor-pointer"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
