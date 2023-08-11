import { RoadmapItem } from "components/organisms/roadmap-item/RoadmapItem";
import { State, Suggestion } from "lib/types";

interface Props {
  state: State;
  description: string;
  suggestions: Suggestion[];
}

export function RoadmapColumn({ state, description, suggestions }: Props) {
  return (
    <div className="col-span-4">
      <header className="mb-8">
        <strong className="text-[#3A4374] text-lg">
          {state} ({suggestions.length})
        </strong>
        <p className="text-dark-blue-gray text-base font-normal">
          {description}
        </p>
      </header>

      <section className="flex flex-col gap-6">
        {suggestions.map((suggestion) => (
          <RoadmapItem key={suggestion.id} suggestion={suggestion} />
        ))}
      </section>
    </div>
  );
}
