import { CaretLeftIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Card } from "components/atoms/card/Card";
import { SuggestionForm } from "components/organisms/suggestion-form/SuggestionForm";

import { useSuggestion } from "lib/hooks/useSuggestion";
import { Suggestion } from "lib/types";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { surreal } from "lib/surreal";
import { GET_SUGGESTION } from "lib/queries/GET_SUGGESTION";

interface Props {
  suggestion: Suggestion;
}

export function EditSuggestionPage({ suggestion: fallbackData }: Props) {
  const { data: suggestion } = useSuggestion(fallbackData.id, {
    fallbackData,
    revalidateOnMount: false,
  });

  if (!suggestion) {
    return null;
  }

  return (
    <main className="h-full w-full max-w-[540px] m-auto py-14 px-9 md:box-content lg:py-24">
      <header className="flex flex-row justify-between mb-16">
        <Link
          href={`/suggestions/${suggestion.id}`}
          className="flex flex-row items-center gap-2 text-dark-blue-gray text-sm	font-bold opacity-100 transition-opacity duration-300 hover:underline hover:opacity-80"
        >
          <CaretLeftIcon /> Go Back
        </Link>
      </header>

      <Card className="relative p-10 pt-12">
        <span className="absolute -top-7 bg-gradient-mesh bg-purple w-14 h-14 rounded-full flex justify-center items-center text-white">
          <Pencil1Icon className="h-6 w-6" />
        </span>
        <h3 className="text-2xl font-bold text-[#3A4374] mb-14">
          Editing &ldquo;{suggestion.title}&rdquo;
        </h3>

        <SuggestionForm mode="edit" suggestion={suggestion} />
      </Card>
    </main>
  );
}

export async function getServerSideProps({
  req,
  query,
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

  const [result] = await surreal.query(GET_SUGGESTION, {
    suggestion: query.id,
  });

  if (
    result.status === "ERR" ||
    !result.result ||
    !Array.isArray(result.result)
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      suggestion: result.result[0] as unknown as Suggestion,
    },
  };
}
