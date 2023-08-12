import { Suggestion } from "lib/types";
import useSWR from "swr";
import { BareFetcher, PublicConfiguration } from "swr/_internal";

export function useSuggestion(
  id: string,
  options?: Partial<
    PublicConfiguration<Suggestion, unknown, BareFetcher<Suggestion>>
  >,
) {
  return useSWR<Suggestion, unknown, ["/api/suggestions", string]>(
    ["/api/suggestions", id],
    () => fetch(`/api/suggestions/${id}`).then((res) => res.json()),
    options,
  );
}
