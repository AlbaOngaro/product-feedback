import * as Form from "@radix-ui/react-form";
import { FormEventHandler, useState } from "react";

import { Button } from "components/atoms/button/Button";
import { TextArea } from "components/atoms/textarea/TextArea";
import { twMerge } from "lib/utils/twMerge";
import { Comment, Suggestion } from "lib/types";
import { useSuggestion } from "lib/hooks/useSuggestion";
import { useAuth } from "providers/auth/AuthProvider";

interface Props {
  variant?: "full" | "compact";
  className?: string;
  suggestionId: Suggestion["id"];
  parentId: Comment["parentId"];
  onSubmitted?: () => void;
}

export function CommentForm({
  variant = "full",
  className,
  suggestionId,
  parentId,
  onSubmitted,
}: Props) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");

  const { mutate } = useSuggestion(suggestionId);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await mutate(async ({ id }) => {
      await fetch("/api/comments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          contents: comment,
          suggestion: suggestionId,
          author: user?.id,
          parentId,
        }),
      });

      return fetch(`/api/suggestions/${id}`).then((res) => res.json());
    });

    setComment("");

    if (typeof onSubmitted === "function") {
      onSubmitted();
    }
  };

  return (
    <Form.Root
      className={twMerge("grid grid-cols-4 gap-4", className)}
      onSubmit={handleSubmit}
    >
      <TextArea
        className={twMerge({
          "col-span-4": variant === "full",
          "col-span-3": variant === "compact",
        })}
        name="details"
        validations={{
          valueMissing: "Can’t be empty",
        }}
        required
        maxLength={255}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <span
        className={twMerge("self-center text-base	text-dark-blue-gray", {
          hidden: variant === "compact",
        })}
      >
        {255 - comment.length} characters left
      </span>

      <Button
        className={twMerge("col-start-4 whitespace-nowrap px-0", {
          "self-start": variant === "compact",
        })}
        variant="primary"
      >
        Post Comment
      </Button>
    </Form.Root>
  );
}
