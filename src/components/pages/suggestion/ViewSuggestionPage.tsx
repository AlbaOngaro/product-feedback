import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { Suggestion } from "components/organisms/suggestion/Suggestion";
import { CommentForm } from "components/organisms/comment-form/CommentForm";
import { Comment } from "components/organisms/comment/Comment";
import { useRouter } from "next/router";

import { suggestion } from "lib/utils/constants";

export function ViewSuggestionPage() {
  const router = useRouter();

  return (
    <main className="h-full w-full max-w-[730px] m-auto py-14 px-9 lg:py-24">
      <header className="flex flex-row justify-between mb-6">
        <Link
          href="/"
          className="flex flex-row items-center gap-2 text-dark-blue-gray text-sm	font-bold opacity-100 transition-opacity duration-300 hover:underline hover:opacity-80"
        >
          <CaretLeftIcon /> Go Back
        </Link>

        <Button
          variant="secondary"
          onClick={() => router.push(`/suggestions/${suggestion.id}/edit`)}
        >
          Edit Feedback
        </Button>
      </header>

      <section className="flex flex-col gap-6">
        <Suggestion {...suggestion} />

        <Card>
          <h6 className="text-[#3A4374] font-bold text-lg mb-6">
            {suggestion.comments.length} Comments
          </h6>

          {suggestion.comments
            .filter((comment) => !comment.parentId)
            .map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                comments={suggestion.comments.filter(
                  (c) => c.parentId === comment.id,
                )}
              />
            ))}
        </Card>

        <Card className="flex flex-col">
          <h6 className="text-[#3A4374] font-bold text-lg mb-6">Add Comment</h6>
          <CommentForm />
        </Card>
      </section>
    </main>
  );
}
