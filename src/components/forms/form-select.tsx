"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  options: SelectOption[];
  /** Register spread from react-hook-form, e.g. {...register("field")}. */
  registration: Partial<React.ComponentProps<"select">>;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

/**
 * Styled native <select> — rock-solid with react-hook-form and the
 * best possible experience on mobile keyboards.
 */
export function FormSelect({
  id,
  label,
  options,
  registration,
  placeholder = "Select…",
  error,
  required,
  className,
}: FormSelectProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? <span className="ml-0.5 text-destructive">*</span> : null}
      </Label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "h-11 w-full appearance-none rounded-lg border border-input bg-background px-3.5 pr-10 text-sm transition-colors outline-none focus-visible:border-gold focus-visible:ring-3 focus-visible:ring-gold/30",
            error && "border-destructive",
          )}
          {...registration}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
