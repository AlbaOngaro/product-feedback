import { twMerge } from "lib/utils/twMerge";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  variant?: "danger" | "primary" | "info";
  className?: string;
}

export function Badge({ children, variant = "info", className }: Props) {
  return (
    <span
      className={twMerge(
        "flex items-center gap-2 before:block before:content-[''] before:w-2 before:h-2 before:rounded-full text-dark-blue-gray",
        {
          "before:bg-purple": variant === "primary",
          "before:bg-maya-blue": variant === "info",
          "before:bg-vivid-tangerine": variant === "danger",
        },
        className,
      )}
    >
      {children}
    </span>
  );
}
