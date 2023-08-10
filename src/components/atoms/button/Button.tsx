import { twMerge } from "lib/utils/twMerge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "ghost";
}

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={twMerge(
        "rounded-xl py-3	px-9 text-sm	text-ghost-white font-bold opacity-100 transition-opacity duration-300	 hover:opacity-80",
        {
          "bg-purple": variant === "primary",
          "bg-royal-blue": variant === "secondary",
          "bg-american-blue": variant === "tertiary",
          "bg-jasper": variant === "danger",
          "text-dark-blue-gray hover:underline": variant === "ghost",
        },
        className,
      )}
      {...props}
    ></button>
  );
}
