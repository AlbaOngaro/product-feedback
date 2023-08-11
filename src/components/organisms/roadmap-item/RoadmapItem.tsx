import { ChatBubbleIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Badge, Variant } from "components/atoms/badge/Badge";
import { Card } from "components/atoms/card/Card";
import { Tag } from "components/atoms/tag/Tag";
import { State, Suggestion } from "lib/types";
import { twMerge } from "lib/utils/twMerge";

interface Props {
  suggestion: Suggestion;
}

function getVariantFromState(state: State): Variant {
  switch (state) {
    case "Planned":
      return "danger";
    case "In-Progress":
      return "primary";
    case "Live":
      return "info";
  }
}

export function RoadmapItem({ suggestion }: Props) {
  return (
    <Card
      className={twMerge(
        "relative before:content-[''] before:absolute before:block before:h-[6px] before:top-0 before:left-0 before:right-0 before:rounded-[5px_5px_0_0]",
        {
          "before:bg-vivid-tangerine": suggestion.state === "Planned",
          "before:bg-purple": suggestion.state === "In-Progress",
          "before:bg-maya-blue": suggestion.state === "Live",
        },
      )}
    >
      <Badge variant={getVariantFromState(suggestion.state)}>
        {suggestion.state}
      </Badge>

      <strong className="text-[#3A4374] inline-block mt-2">
        {suggestion.title}
      </strong>
      <p className="text-dark-blue-gray mb-4">{suggestion.description}</p>
      <Tag name={suggestion.category} disabled />

      <footer className="flex flex-row justify-between mt-4">
        <button className="h-fit flex flex-row items-center gap-2 py-1.5 px-4	bg-alice-blue text-[#3A4374] font-semibold text-xs rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#CFD7FF] active:bg-royal-blue active:text-white">
          <ChevronUpIcon className="text-royal-blue" />
          <span className="text-sm	font-bold">{suggestion.votes}</span>
        </button>

        <span className="flex items-center gap-2 text-[#3A4374]">
          <ChatBubbleIcon /> <strong>{suggestion.comments.length}</strong>
        </span>
      </footer>
    </Card>
  );
}
