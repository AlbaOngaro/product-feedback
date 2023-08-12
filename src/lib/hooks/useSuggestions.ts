import { Suggestion } from "lib/types";
import useSWR from "swr";
import { BareFetcher, PublicConfiguration } from "swr/_internal";

export function useSuggestions(
  options?: Partial<
    PublicConfiguration<Suggestion[], unknown, BareFetcher<Suggestion[]>>
  >,
) {
  return useSWR<Suggestion[], unknown, "/api/suggestions">(
    "/api/suggestions",
    () => fetch("/api/suggestions").then((res) => res.json()),
    options,
  );
}
