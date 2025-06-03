import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IAuth } from "../store_and_types/types";

interface InputProps {
  icon?: React.JSX.Element;
  placeholder: string;
  type: string;
  id: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  title?: string;
  required?: boolean;
  name: keyof IAuth;
  className?: string;
  register: UseFormRegister<IAuth>;
}

export function AuthInput({
  icon,
  placeholder,
  type,
  name,
  id,
  register,
  minLength,
  maxLength,
  pattern,
  title,
  required,
  className,
}: InputProps) {
  return (
    <>
      <div
        className={`border-1 border-zinc-200/40 dark:border-zinc-700 dark:bg-zinc-800/40 bg-zinc-50/50 rounded-md text-sm w-full flex items-center gap-2 ${className}`}
      >
        <label className="pl-2 absolute ">{icon}</label>
        <input
          className="pl-8 py-2 flex-1"
          type={type}
          placeholder={placeholder}
          id={id}
          {...register(name)}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          title={title}
          required={required}
        />
      </div>
    </>
  );
}
