import { Button } from "components/atoms/button/Button";
import { CommentForm } from "components/organisms/comment-form/CommentForm";
import Image from "next/image";
import { useState } from "react";

interface Props {
  author: {
    fullName: string;
    handle: string;
    avatar: string;
  };
  contents: string;
}

export function Comment({ contents, author }: Props) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="grid grid-cols-[40px_minmax(0,_1fr)] gap-x-6 gap-y-4 py-6 border border-solid border-r-0 border-l-0 border-t-0 border-[#8C92B3] border-opacity-25 last-of-type:border-b-0">
      <picture className="relative w-[40px] h-[40px] rounded-full overflow-hidden">
        <Image src={author.avatar} alt={author.fullName} fill />
      </picture>

      <header className="flex flex-row justify-between items-center">
        <span className="flex flex-col text-sm text-[#3A4374] font-bold">
          {author.fullName}
          <small className="text-dark-blue-gray text-sm">{author.handle}</small>
        </span>

        <Button
          className="p-0 text-royal-blue"
          variant="ghost"
          onClick={() => setIsReplying(true)}
        >
          Reply
        </Button>
      </header>

      <p className="col-start-2 text-dark-blue-gray text-base">{contents}</p>

      {isReplying && (
        <CommentForm
          variant="compact"
          className="col-start-2"
          onSubmit={() => setIsReplying(false)}
        />
      )}
    </div>
  );
}
