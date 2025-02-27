import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "tertiary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-zinc-800 text-gray-300  hover:shadow-gray-600   ",
  secondary: "bg-zinc-200 text-gray-800  hover:shadow-gray-200",
  tertiary: "bg-zinc-200 text-gray-800",
};

const defaultStyles =
  "px-5 py-2.5 cursor-pointer  hover:shadow-sm rounded-lg flex gap-2 items-center";

const sizeVariant = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3 text-md",
  lg: "px-7 py-4 text-lg",
};

export const Button = ({
  variant,
  text,
  size,
  startIcon,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <>
      {variant === "tertiary" ? (
        <button
          className={`${variantStyles[variant]} ${defaultStyles} ${sizeVariant[size]} ${className}`}
          onClick={onClick}
        >
          {startIcon}
          {text}
        </button>
      ) : (
        <button
          className={`${variantStyles[variant]} ${defaultStyles} ${sizeVariant[size]} ${className}`}
          onClick={onClick}
        >
          {startIcon}

          <span className="hidden sm:inline">{text}</span>
        </button>
      )}
    </>
  );
};
