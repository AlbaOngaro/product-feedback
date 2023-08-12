import { Category } from "lib/types";
import useSWR from "swr";
import { BareFetcher, PublicConfiguration } from "swr/_internal";

export function useCategories(
  options?: Partial<
    PublicConfiguration<Category[], unknown, BareFetcher<Category[]>>
  >,
) {
  return useSWR<Category[], unknown, "/api/categories">(
    "/api/categories",
    () => fetch("/api/categories").then((res) => res.json()),
    options,
  );
}
