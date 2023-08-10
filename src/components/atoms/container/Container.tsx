import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return <section className="col-span-12 lg:col-span-9">{children}</section>;
}
