import { CaretLeftIcon } from "@radix-ui/react-icons";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Link from "next/link";

import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { RoadmapColumn } from "components/organisms/roadmap-column/RoadmapColumn";

import { Suggestion } from "lib/types";
import { surreal } from "lib/surreal";
import { useSuggestions } from "lib/hooks/useSuggestions";
import { replaceVariablesInString } from "lib/utils/replaceVariablesInString";
import { GET_ALL_SUGGESTIONS } from "lib/queries/GET_ALL_SUGGESTIONS";
import { useRouter } from "next/router";

interface Props {
  suggestions: Suggestion[];
}

export function RoadmapPage({ suggestions: fallbackData }: Props) {
  const router = useRouter();

  const { data: suggestions } = useSuggestions({
    fallbackData,
    revalidateOnMount: false,
  });

  return (
    <main className="h-full w-full max-w-[1110px] m-auto grid grid-cols-12 gap-8 py-14 px-9 lg:py-24">
      <Card
        as="header"
        variant="dark"
        className="col-span-12 flex flex-row justify-between py-8 px-10"
      >
        <div>
          <Link
            href="/"
            className="flex flex-row items-center gap-2 text-white text-sm	font-bold opacity-100 transition-opacity duration-300 hover:underline hover:opacity-80"
          >
            <CaretLeftIcon /> Go Back
          </Link>
          <h6 className="text-white text-2xl font-bold">Roadmap</h6>
        </div>

        <Button
          variant="primary"
          onClick={() => router.push("/suggestions/create")}
        >
          + Add feedback
        </Button>
      </Card>

      <section className="col-span-12 grid grid-cols-12 gap-x-8">
        <RoadmapColumn
          state="Planned"
          description="Ideas prioritized for research"
          suggestions={suggestions.filter(
            (suggestion) => suggestion.state === "Planned",
          )}
        />

        <RoadmapColumn
          state="In-Progress"
          description="Currently being developed"
          suggestions={suggestions.filter(
            (suggestion) => suggestion.state === "In-Progress",
          )}
        />

        <RoadmapColumn
          state="Live"
          description="Released features"
          suggestions={suggestions.filter(
            (suggestion) => suggestion.state === "Live",
          )}
        />
      </section>
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

  try {
    const { field = "votes", order = "DESC" } = query as Record<string, string>;

    const [result] = await surreal.query(
      replaceVariablesInString(GET_ALL_SUGGESTIONS, {
        field,
        order,
      }),
      {
        category: "",
      },
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
        suggestions: result.result as unknown as Suggestion[],
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
