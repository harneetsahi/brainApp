import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-indigo-600 text-indigo-200",
  secondary: "bg-indigo-200 text-indigo-600",
};

const defaultStyles =
  "px-5 py-2.5 mr-2 cursor-pointer hover:shadow-lg rounded-lg flex gap-2 items-center";

const sizeVariant = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3 text-md",
  lg: "px-7 py-4 text-lg",
};

export const Button = ({ variant, text, size, startIcon }: ButtonProps) => {
  return (
    <>
      <button
        className={`${variantStyles[variant]} ${defaultStyles} ${sizeVariant[size]}`}
        onClick={() => console.log("clicked")}
      >
        {startIcon} {text}
      </button>
    </>
  );
};
