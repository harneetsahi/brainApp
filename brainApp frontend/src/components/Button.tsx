import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "tertiary" | "tertiaryDark";
  size: "sm" | "md" | "lg";
  text?: string | ReactElement;
  startIcon?: ReactElement;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const variantStyles = {
  primary:
    "bg-zinc-800 border-1 border-zinc-600 text-zinc-100  hover:scale-103    ",
  secondary:
    "dark:bg-zinc-800 bg-white text-zinc-800 dark:text-zinc-50 border-1 border-zinc-200 dark:border-zinc-700 hover:scale-103 shadow-sm ",
  tertiary: " text-zinc-800 dark:text-zinc-100  ",
  tertiaryDark:
    "text-zinc-100 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-100 h-10   ",
};

const defaultStyles = "cursor-pointer hover:shadow-sm rounded-lg ";

const sizeVariant = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-2 text-md",
  lg: "px-7 py-4 text-lg",
};

export const Button = ({
  variant,
  text,
  size,
  startIcon,
  className,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <>
      {variant === "tertiary" || variant === "tertiaryDark" ? (
        <button
          className={`${variantStyles[variant]} ${defaultStyles} ${sizeVariant[size]} ${className}`}
          onClick={onClick}
          disabled={disabled}
        >
          {startIcon}
          {text}
        </button>
      ) : (
        <button
          className={`${variantStyles[variant]} ${defaultStyles} ${sizeVariant[size]} ${className}`}
          onClick={onClick}
          disabled={disabled}
        >
          {startIcon}

          <span className="hidden sm:inline w-full">{text}</span>
        </button>
      )}
    </>
  );
};
