import { twMerge } from "lib/utils/twMerge";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string;
  variant?: "light" | "dark";
}

export function Card({
  children,
  className,
  variant = "light",
  ...rest
}: Props) {
  return (
    <article
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
    </article>
  );
}
