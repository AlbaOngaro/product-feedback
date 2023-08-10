import * as Form from "@radix-ui/react-form";
import { FormEventHandler, useState } from "react";

import { Button } from "components/atoms/button/Button";
import { TextArea } from "components/atoms/textarea/TextArea";
import { twMerge } from "lib/utils/twMerge";

interface Props {
  variant?: "full" | "compact";
  className?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export function CommentForm({ variant = "full", className, onSubmit }: Props) {
  const [comment, setComment] = useState("");

  return (
    <Form.Root
      className={twMerge("grid grid-cols-4 gap-4", className)}
      onSubmit={onSubmit}
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
