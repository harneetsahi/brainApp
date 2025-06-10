import { UseFormRegister } from "react-hook-form";
import { IContent } from "../types/types";

const inputStyle =
  " w-full border-1 dark:border-zinc-700/50 border-zinc-100  dark:text-zinc-200 text-zinc-800  rounded-lg mb-3 font-light px-3 py-2 ";

interface InputProps {
  className?: string;
  placeholder: string;
  required?: boolean;
  name: keyof IContent;
  register: UseFormRegister<IContent>;
}

export const InputDiv = ({
  className,
  placeholder,
  required,
  name,
  register,
}: InputProps) => {
  return (
    <>
      <input
        className={`${inputStyle} ${className}`}
        type="text"
        id={name}
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${name} is required` : false,
        })}
      />
    </>
  );
};
