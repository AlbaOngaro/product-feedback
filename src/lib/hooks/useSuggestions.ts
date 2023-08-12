import { Suggestion } from "lib/types";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { BareFetcher, PublicConfiguration } from "swr/_internal";

export function useSuggestions(
  options?: Partial<
    PublicConfiguration<Suggestion[], unknown, BareFetcher<Suggestion[]>>
  >,
) {
  const searchParams = useSearchParams();
  const params = searchParams.toString();

  const { data = [], ...rest } = useSWR<
    Suggestion[],
    unknown,
    ["/api/suggestions", string?]
  >(
    ["/api/suggestions", params],
    () =>
      fetch(params ? `/api/suggestions?${params}` : "/api/suggestions").then(
        (res) => res.json(),
      ),
    options,
  );

  return {
    data,
    ...rest,
  };
}
