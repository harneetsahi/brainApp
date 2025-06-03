import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "iconBtn" | "tertiary" | "tertiaryDark";
  size: "sm" | "md" | "lg";
  text?: string | ReactElement;
  startIcon?: ReactElement;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}

const variantStyles = {
  primary:
    "dark:bg-zinc-800 bg-white text-zinc-800 dark:text-zinc-50 border-1 border-zinc-200 dark:border-zinc-800 text-zinc-100  hover:scale-103  shadow-xs   ",
  iconBtn:
    "dark:bg-zinc-800 bg-white text-zinc-800 dark:text-zinc-50 border-1 border-zinc-200 dark:border-zinc-700 hover:scale-103 shadow-xs ",
  tertiary: "bg-white dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-100  ",
  tertiaryDark:
    "text-zinc-100 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-100 h-10  ",
};

const defaultStyles = "cursor-pointer hover:shadow-xs rounded-lg ";

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
  type,
}: ButtonProps) => {
  return (
    <>
      {variant === "iconBtn" ? (
        <button
          className={`${variantStyles[variant]} ${defaultStyles} ${sizeVariant[size]} ${className}`}
          onClick={onClick}
          disabled={disabled}
          type={type}
        >
          {startIcon}

          <span className="hidden md:inline w-full ">{text}</span>
        </button>
      ) : (
        <button
          className={`${variantStyles[variant]} ${defaultStyles} ${sizeVariant[size]} ${className}`}
          onClick={onClick}
          disabled={disabled}
          type={type}
        >
          {startIcon}
          {text}
        </button>
      )}
    </>
  );
};
