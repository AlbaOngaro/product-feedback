import { CaretLeftIcon } from "@radix-ui/react-icons";
import * as Tabs from "@radix-ui/react-tabs";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Link from "next/link";

import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { RoadmapColumn } from "components/organisms/roadmap-column/RoadmapColumn";

import { State, Suggestion } from "lib/types";
import { surreal } from "lib/surreal";
import { useSuggestions } from "lib/hooks/useSuggestions";
import { replaceVariablesInString } from "lib/utils/replaceVariablesInString";
import { GET_ALL_SUGGESTIONS } from "lib/queries/GET_ALL_SUGGESTIONS";
import { useRouter } from "next/router";
import { twMerge } from "lib/utils/twMerge";
import { AUTH_COOKIE_ID } from "lib/constants";

interface Props {
  suggestions: Suggestion[];
}

const DESCRIPTIONS: Record<State, string> = {
  Planned: "Ideas prioritized for research",
  "In-Progress": "Currently being developed",
  Live: "Released features",
};

export function RoadmapPage({ suggestions: fallbackData }: Props) {
  const router = useRouter();

  const { data: suggestions } = useSuggestions({
    fallbackData,
    revalidateOnMount: false,
  });

  const roadmap = suggestions.reduce<Record<State, Suggestion[]>>(
    (acc, curr) => ({
      ...acc,
      [curr.state]: [...(acc[curr.state] || []), curr],
    }),
    {
      Planned: [],
      "In-Progress": [],
      Live: [],
    },
  );

  return (
    <main className="h-full w-full max-w-[1110px] m-auto grid grid-cols-12 md:gap-8 md:py-14 md:px-9 lg:py-24">
      <Card
        as="header"
        variant="dark"
        className="sticky top-0 z-10 col-span-12 flex flex-row justify-between rounded-none py-8 px-6 md:relative md:px-10 md:rounded-xl"
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

      <section className="hidden md:col-span-12 md:grid md:grid-cols-12 md:gap-x-8">
        {Object.entries(roadmap).map(([key, value]) => (
          <RoadmapColumn
            key={`${key}-col`}
            state={key as State}
            description={DESCRIPTIONS[key as State]}
            suggestions={value}
          />
        ))}
      </section>

      <Tabs.Root
        className="col-span-12 flex flex-col md:hidden"
        defaultValue="tab1"
      >
        <Tabs.List className="shrink-0 flex sticky top-[116px] z-10 bg-white">
          {Object.entries(roadmap).map(([key, value]) => (
            <Tabs.Trigger
              key={`${key}-tab-button`}
              className={twMerge(
                "py-5 w-full box-content text-[#3A4374] font-bold opacity-40 border-[#8C92B3] border-opacity-20 border-b-2 data-[state=active]:opacity-100 data-[state=active]:border-b-4",
                {
                  "data-[state=active]:border-vivid-tangerine":
                    key === "Planned",
                  "data-[state=active]:border-purple": key === "In-Progress",
                  "data-[state=active]:border-maya-blue": key === "Live",
                },
              )}
              value={key}
            >
              {key} ({value.length})
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {Object.entries(roadmap).map(([key, value]) => (
          <Tabs.Content
            key={`${key}-tab-contents`}
            className="grow flex flex-col gap-6"
            value={key}
          >
            <RoadmapColumn
              state={key as State}
              description={DESCRIPTIONS[key as State]}
              suggestions={value}
              className="p-6 pb-24"
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>
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
