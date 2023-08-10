import { twMerge } from "lib/utils/twMerge";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export function Container({ children, className }: Props) {
  return (
    <section className={twMerge("col-span-12 lg:col-span-9", className)}>
      {children}
    </section>
  );
}
