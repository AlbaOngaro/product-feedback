import { useMemo, useState } from "react";
import Image from "next/image";

import { Button } from "components/atoms/button/Button";
import { CommentForm } from "components/organisms/comment-form/CommentForm";

import { Comment as CommentI } from "lib/types";
import { twMerge } from "lib/utils/twMerge";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";

interface Props extends CommentI {
  comments: CommentI[];
  className?: string;
}

export function Comment({
  parentId,
  contents,
  author,
  comments,
  className,
  suggestion,
}: Props) {
  const [isReplying, setIsReplying] = useState(false);

  const avatar = useMemo(() => {
    if (author.avatar) {
      return author.avatar;
    }

    const avatar = createAvatar(initials, {
      seed: author.user,
      scale: 75,
    });

    return avatar.toDataUriSync();
  }, [author]);

  return (
    <div
      className={twMerge(
        "grid grid-cols-[40px_minmax(0,_1fr)] gap-x-6 gap-y-4 py-8",
        {
          "border border-solid border-r-0 border-l-0 border-t-0 last-of-type:border-b-0 border-[#8C92B3] border-opacity-25":
            !parentId,
        },
        className,
      )}
    >
      <picture className="col-start-1 relative w-[40px] h-[40px] rounded-full overflow-hidden">
        <Image src={avatar} alt={author.user} fill />
      </picture>

      <header className="col-start-2 flex flex-row justify-between items-center">
        <span className="flex flex-col text-sm text-[#3A4374] font-bold">
          {author.user}
          <small className="text-dark-blue-gray text-sm">{author.user}</small>
        </span>

        <Button
          className="p-0 text-royal-blue"
          variant="ghost"
          onClick={() => setIsReplying(true)}
        >
          Reply
        </Button>
      </header>

      {comments.length > 0 && (
        <i
          // eslint-disable-next-line prettier/prettier
          className={`w-[1px] h-[calc(100%_+_40px)] col-start-1 row-start-2 bg-dark-blue-gray opacity-10 justify-self-center`}
          style={{
            gridRowEnd: 2 + comments.length,
          }}
        />
      )}

      <p className="col-start-2 text-dark-blue-gray text-base">{contents}</p>

      {isReplying && (
        <CommentForm
          variant="compact"
          className="col-start-2"
          suggestionId={suggestion}
          parentId={parentId}
        />
      )}

      {comments.map((comment) => (
        <Comment
          className="col-start-2 -ml-3 mt-2"
          key={comment.id}
          comments={[]}
          {...comment}
        />
      ))}
    </div>
  );
}
