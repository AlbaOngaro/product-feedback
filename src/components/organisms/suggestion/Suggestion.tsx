import { ChatBubbleIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { MouseEvent } from "react";

import { useAuth } from "providers/auth/AuthProvider";

import { Card } from "components/atoms/card/Card";
import { Tag } from "components/atoms/tag/Tag";

import { Suggestion as SuggestionI } from "lib/types";
import { twMerge } from "lib/utils/twMerge";
import { useSuggestion } from "lib/hooks/useSuggestion";
import { useSuggestions } from "lib/hooks/useSuggestions";

interface Props extends SuggestionI {
  className?: string;
}

export function Suggestion({
  id,
  title,
  description,
  category,
  votes = [],
  comments = [],
  className,
}: Props) {
  const { user } = useAuth();

  const { mutate } = useSuggestion(id);
  const { mutate: refresh } = useSuggestions();

  const handleUpvote = (e: MouseEvent) => {
    e.preventDefault();

    mutate(async () => {
      await fetch(`/api/suggestions/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          votes: votes.some((vote) => vote.id === user?.id)
            ? votes.filter((vote) => vote.id !== user?.id)
            : [...votes, user?.id],
        }),
      });

      await refresh();
    });
  };

  return (
    <Link href={`/suggestions/${id}`}>
      <Card
        className={twMerge(
          "group grid grid-cols-[40px_minmax(0,_1fr)_44px] gap-10",
          className,
        )}
      >
        <button
          onClick={handleUpvote}
          className={twMerge(
            "h-fit flex flex-col items-center justify-center py-1.5 px-4	bg-alice-blue text-[#3A4374] font-semibold text-xs rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#CFD7FF] active:bg-royal-blue active:text-white",
            {
              "bg-royal-blue text-white": votes.some(
                (vote) => vote.id === user?.id,
              ),
            },
          )}
        >
          <ChevronUpIcon />
          <span className="text-sm	font-bold">{votes.length}</span>
        </button>
        <div>
          <h6 className="text-lg text-[#3A4374] font-bold mb-1 transition-colors duration-300 group-hover:text-royal-blue">
            {title}
          </h6>
          <p className="text-dark-blue-gray mb-3">{description}</p>
          <Tag name={category} disabled />
        </div>

        <span className="flex items-center gap-2 text-[#3A4374]">
          <ChatBubbleIcon /> <strong>{comments.length}</strong>
        </span>
      </Card>
    </Link>
  );
}
