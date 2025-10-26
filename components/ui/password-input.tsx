"use client";

import { Button } from "./button";
import { cn } from "@/utils/tailwind";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./input";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [isHidden, setIsHidden] = useState(true);

    return (
      <div className="relative">
        <Input
          className={cn(className)}
          ref={ref}
          {...props}
          type={isHidden ? "password" : "text"}
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute top-1/2 -translate-y-1/2 right-1 z-1 size-8 text-slate-400 hover:text-slate-400 cursor-pointer"
          onClick={() => setIsHidden((prev) => !prev)}
        >
          {isHidden ? <EyeIcon /> : <EyeOffIcon />}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
