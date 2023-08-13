import Link from "next/link";

import { Badge } from "components/atoms/badge/Badge";
import { Card } from "components/atoms/card/Card";
import { Tag } from "components/atoms/tag/Tag";
import { useCategories } from "lib/hooks/useCategories";
import { useSuggestions } from "lib/hooks/useSuggestions";
import { State } from "lib/types";
import { getVariantFromState } from "components/organisms/roadmap-item/RoadmapItem";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { twMerge } from "lib/utils/twMerge";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories } = useCategories();
  const { data: suggestions } = useSuggestions();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const roadmap: Record<State, number> = suggestions.reduce<
    Record<State, number>
  >(
    (acc, suggestion) => ({
      ...acc,
      [suggestion.state]: (acc[suggestion.state] || 0) + 1,
    }),
    {
      "In-Progress": 0,
      Live: 0,
      Planned: 0,
    } as Record<State, number>,
  );

  return (
    <>
      <aside className="hidden md:col-span-12 md:grid md:grid-cols-3 md:gap-6 lg:col-span-3 lg:flex lg:flex-col">
        <Card
          as="header"
          style={{ backgroundColor: "#ac99ff" }}
          className="bg-gradient-mesh pt-16 flex flex-col"
        >
          <h2 className="text-white text-xl	font-bold mt-auto">
            Frontend Mentor
          </h2>
          <p className="text-white ">Feedback Board</p>
        </Card>

        <Card className="flex flex-row flex-wrap content-start gap-x-2 gap-y-4">
          {categories && (
            <>
              <Tag
                checked={!searchParams.has("category")}
                onChange={() => {
                  if (searchParams.has("category")) {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("category");
                    return router.push(
                      `${router.pathname}?${params.toString()}`,
                    );
                  }
                }}
                name="All"
                value="all"
              />
              {categories.map((category) => (
                <Tag
                  key={category.id}
                  name={category.label}
                  value={category.id}
                  checked={searchParams.get("category") === category.id}
                  onChange={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("category", category.id);
                    return router.push(
                      `${router.pathname}?${params.toString()}`,
                      undefined,
                      {
                        scroll: false,
                      },
                    );
                  }}
                />
              ))}
            </>
          )}
        </Card>

        <Card>
          <header className="flex flex-row items-center justify-between mb-4">
            <strong className="text-lg	text-[#3A4374]">Roadmap</strong>
            <Link
              className="text-[#8397F8] text-sm	font-semibold opacity-25 underline capitalize transition-all duration-300 hover:opacity-100"
              href="/roadmap"
            >
              view
            </Link>
          </header>
          <ul className="flex flex-col gap-2">
            {Object.entries(roadmap).map(([key, value]) => (
              <li key={key}>
                <Badge variant={getVariantFromState(key as State)}>
                  {key} <strong className="ml-auto">{value}</strong>
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </aside>

      <Card
        as="header"
        style={{ backgroundColor: "#ac99ff" }}
        className={twMerge(
          "bg-gradient-mesh rounded-none col-span-12 flex flex-row justify-between items-center relative md:hidden",
          {
            "sticky z-10 top-0 left-0 right-0 after:content-[''] after:fixed after:bg-[#000] after:opacity-50 after:z-[-1] after:w-full after:h-full after:top-[100px] after:left-0 after:right-0":
              isSidebarOpen,
          },
        )}
      >
        <div>
          <h2 className="text-white text-xl	font-bold mt-auto">
            Frontend Mentor
          </h2>
          <p className="text-white ">Feedback Board</p>
        </div>

        <button
          className="text-white"
          onClick={() => setIsSidebarOpen((curr) => !curr)}
        >
          {isSidebarOpen ? (
            <Cross1Icon className="w-6 h-6" />
          ) : (
            <HamburgerMenuIcon className="w-6 h-6" />
          )}
        </button>

        <aside
          className={twMerge("hidden", {
            "fixed right-0 top-[100px] max-w-[360px] w-full h-full flex flex-col gap-6 bg-ghost-white p-6":
              isSidebarOpen,
          })}
        >
          <Card className="flex flex-row flex-wrap content-start gap-x-2 gap-y-4">
            {categories && (
              <>
                <Tag
                  checked={!searchParams.has("category")}
                  onChange={() => {
                    if (searchParams.has("category")) {
                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );
                      params.delete("category");
                      return router.push(
                        `${router.pathname}?${params.toString()}`,
                      );
                    }
                  }}
                  name="All"
                  value="all"
                />
                {categories.map((category) => (
                  <Tag
                    key={category.id}
                    name={category.label}
                    value={category.id}
                    checked={searchParams.get("category") === category.id}
                    onChange={() => {
                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );
                      params.set("category", category.id);
                      return router.push(
                        `${router.pathname}?${params.toString()}`,
                        undefined,
                        {
                          scroll: false,
                        },
                      );
                    }}
                  />
                ))}
              </>
            )}
          </Card>

          <Card>
            <header className="flex flex-row items-center justify-between mb-4">
              <strong className="text-lg	text-[#3A4374]">Roadmap</strong>
              <Link
                className="text-[#8397F8] text-sm	font-semibold opacity-25 underline capitalize transition-all duration-300 hover:opacity-100"
                href="/roadmap"
              >
                view
              </Link>
            </header>
            <ul className="flex flex-col gap-2">
              {Object.entries(roadmap).map(([key, value]) => (
                <li key={key}>
                  <Badge variant={getVariantFromState(key as State)}>
                    {key} <strong className="ml-auto">{value}</strong>
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </Card>
    </>
  );
}
