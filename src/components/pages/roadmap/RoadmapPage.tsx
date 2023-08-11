import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { RoadmapColumn } from "components/organisms/roadmap-column/RoadmapColumn";

import { suggestions } from "lib/utils/constants";

export function RoadmapPage() {
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

        <Button variant="primary">+ Add feedback</Button>
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
