"use client";

import { ChevronDownIcon, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { parseAsString, useQueryState } from "nuqs";

export function DateField() {
  const [from, setFrom] = useQueryState("from", parseAsString.withDefault(""));
  const [to, setTo] = useQueryState("to", parseAsString.withDefault(""));

  const [open, setOpen] = useState(false);

  const selectedRange = useMemo<DateRange | undefined>(() => {
    if (from && to) return { from: parseISO(from), to: parseISO(to) };
    if (from) return { from: parseISO(from), to: undefined };
    return undefined;
  }, [from, to]);

  const label = useMemo(() => {
    if (!from && !to) return "Date";
    if (from && !to) return format(parseISO(from), "MMM d, yyyy");
    return `${format(parseISO(from), "MMM d, yyyy")} - ${format(
      parseISO(to!),
      "MMM d, yyyy"
    )}`;
  }, [from, to]);

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) {
      setFrom(null);
      setTo(null);
      return;
    }

    if (range.from) {
      setFrom(format(range.from, "yyyy-MM-dd"));
    } else {
      setFrom(null);
    }

    if (range.to) {
      setTo(format(range.to, "yyyy-MM-dd"));
    } else {
      setTo(null);
    }
  };

  const handleClear = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setFrom(null);
    setTo(null);
  };

  return (
    <div className="relative flex flex-col gap-3">
      <Popover open={open}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-56 justify-between font-normal border-dashed flex items-center"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span>{label}</span>
            {from || to ? (
              <div onClick={handleClear}>
                <X className="size-4 " />
              </div>
            ) : (
              <ChevronDownIcon className="size-4 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="start"
          onInteractOutside={() => setOpen(false)}
        >
          <Calendar
            mode="range"
            defaultMonth={selectedRange?.from}
            selected={selectedRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
