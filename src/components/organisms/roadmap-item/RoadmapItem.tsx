import { ChatBubbleIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { MouseEvent } from "react";

import { State, Suggestion } from "lib/types";
import { twMerge } from "lib/utils/twMerge";

import { Badge, Variant } from "components/atoms/badge/Badge";
import { Card } from "components/atoms/card/Card";
import { Tag } from "components/atoms/tag/Tag";

import { useAuth } from "providers/auth/AuthProvider";
import { useSuggestion } from "lib/hooks/useSuggestion";
import { useSuggestions } from "lib/hooks/useSuggestions";
import Link from "next/link";

interface Props {
  suggestion: Suggestion;
}

export function getVariantFromState(state: State): Variant {
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
  const { user } = useAuth();

  const { mutate } = useSuggestion(suggestion.id);
  const { mutate: refresh } = useSuggestions();

  const handleUpvote = (e: MouseEvent) => {
    e.preventDefault();

    mutate(async () => {
      await fetch(`/api/suggestions/${suggestion.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          votes: suggestion?.votes?.some((vote) => vote.id === user?.id)
            ? suggestion?.votes?.filter((vote) => vote.id !== user?.id)
            : [...(suggestion?.votes || []), user?.id],
        }),
      });

      await refresh();
    });
  };

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

      <Link href={`/suggestions/${suggestion.id}`}>
        <strong className="text-[#3A4374] inline-block mt-2 transition-colors duration-300 hover:text-royal-blue">
          {suggestion.title}
        </strong>
      </Link>
      <p className="text-dark-blue-gray mb-4">{suggestion.description}</p>
      <Tag name={suggestion.category} disabled />

      <footer className="flex flex-row justify-between mt-4">
        <button
          onClick={handleUpvote}
          className={twMerge(
            "h-fit flex flex-row items-center gap-2 py-1.5 px-4	bg-alice-blue text-[#3A4374] font-semibold text-xs rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#CFD7FF] active:bg-royal-blue active:text-white",
            {
              "bg-royal-blue text-white": suggestion?.votes?.some(
                (vote) => vote.id === user?.id,
              ),
            },
          )}
        >
          <ChevronUpIcon />
          <span className="text-sm font-bold">
            {suggestion?.votes?.length || 0}
          </span>
        </button>

        <span className="flex items-center gap-2 text-[#3A4374]">
          <ChatBubbleIcon /> <strong>{suggestion.comments.length}</strong>
        </span>
      </footer>
    </Card>
  );
}
