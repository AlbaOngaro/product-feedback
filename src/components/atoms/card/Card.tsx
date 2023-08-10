import { twMerge } from "lib/utils/twMerge";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  variant?: "light" | "dark";
}

export function Card({
  as = "article",
  children,
  className,
  variant = "light",
  ...rest
}: Props) {
  const Component = as;

  return (
    <Component
      className={twMerge(
        "p-6 rounded-xl",
        {
          "bg-white": variant === "light",
          "bg-american-blue": variant === "dark",
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
