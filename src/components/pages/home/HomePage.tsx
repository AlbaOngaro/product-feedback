import { Container } from "components/atoms/container/Container";
import { EmptyState } from "components/organisms/empty-state/EmptyState";
import { Header } from "components/organisms/header/Header";
import { Sidebar } from "components/organisms/sidebar/Sidebar";
import { Suggestion } from "components/organisms/suggestion/Suggestion";
import { AUTH_COOKIE_ID } from "lib/constants";
import { useSuggestions } from "lib/hooks/useSuggestions";
import { GET_ALL_SUGGESTIONS } from "lib/queries/GET_ALL_SUGGESTIONS";
import { surreal } from "lib/surreal";
import { Suggestion as SuggestionI } from "lib/types";
import { replaceVariablesInString } from "lib/utils/replaceVariablesInString";

import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

interface Props {
  suggestions: SuggestionI[];
}

export function HomePage({ suggestions: fallbackData }: Props) {
  const { data: suggestions } = useSuggestions({
    fallbackData,
    revalidateOnMount: false,
  });

  return (
    <main className="h-full w-full max-w-[1110px] m-auto grid grid-cols-12 md:gap-8 md:py-14 md:px-9 lg:py-24">
      <Sidebar />
      <Container className="flex flex-col gap-6">
        <Header />
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion.id}
              className="mx-6 md:mx-0"
              {...suggestion}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </Container>
    </main>
  );
}

export async function getServerSideProps({
  req,
  query,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  try {
    const token = req.cookies[AUTH_COOKIE_ID];
    await surreal.authenticate(token || "");
  } catch (error: unknown) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  try {
    const { field = "votes", order = "DESC" } = query as Record<string, string>;

    const [result] = await surreal.query(
      replaceVariablesInString(GET_ALL_SUGGESTIONS, {
        field,
        order,
      }),
    );

    if (
      result.status === "ERR" ||
      !result.result ||
      !Array.isArray(result.result)
    ) {
      return {
        props: {
          suggestions: [],
        },
      };
    }

    return {
      props: {
        suggestions: result.result as unknown as SuggestionI[],
      },
    };
  } catch (error: unknown) {
    return {
      props: {
        suggestions: [],
      },
    };
  }
}
