import Link from "next/link";

import { Badge } from "components/atoms/badge/Badge";
import { Card } from "components/atoms/card/Card";
import { Tag } from "components/atoms/tag/Tag";
import { useCategories } from "lib/hooks/useCategories";
import { useSuggestions } from "lib/hooks/useSuggestions";
import { State } from "lib/types";
import { getVariantFromState } from "components/organisms/roadmap-item/RoadmapItem";

export function Sidebar() {
  const { data: categories } = useCategories();
  const { data: suggestions } = useSuggestions();

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
    <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
      <Card
        as="header"
        style={{ backgroundColor: "#ac99ff" }}
        className="bg-gradient-mesh pt-16"
      >
        <h2 className="text-white text-xl	font-bold">Frontend Mentor</h2>
        <p className="text-white ">Feedback Board</p>
      </Card>
      <Card className="flex flex-row flex-wrap gap-x-2 gap-y-4">
        {categories && (
          <>
            <Tag defaultChecked name="All" value="all" />
            {categories.map((category) => (
              <Tag
                key={category.id}
                name={category.label}
                value={category.id}
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
  );
}
