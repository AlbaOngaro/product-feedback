import { Container } from "components/atoms/container/Container";
import { Header } from "components/organisms/header/Header";
import { Sidebar } from "components/organisms/sidebar/Sidebar";
import { Suggestion } from "components/organisms/suggestion/Suggestion";
import { useSuggestions } from "lib/hooks/useSuggestions";
import { GET_ALL_SUGGESTIONS } from "lib/queries/GET_ALL_SUGGESTIONS";
import { surreal } from "lib/surreal";
import { Suggestion as SuggestionI } from "lib/types";

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
    <main className="h-full w-full max-w-[1110px] m-auto grid grid-cols-12 gap-8 py-14 px-9 lg:py-24">
      <Sidebar />
      <Container className="flex flex-col gap-6">
        <Header />
        {suggestions &&
          suggestions.map((suggestion) => (
            <Suggestion key={suggestion.id} {...suggestion} />
          ))}
      </Container>
    </main>
  );
}

export async function getServerSideProps({
  req,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  try {
    const token = req.cookies["token"];
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
    const [result] = await surreal.query(GET_ALL_SUGGESTIONS);

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
