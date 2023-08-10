import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { Suggestion } from "components/organisms/suggestion/Suggestion";
import { CommentForm } from "components/organisms/comment-form/CommentForm";
import { Comment } from "components/organisms/comment/Comment";

const suggestion = {
  id: "asdf",
  title: "Allow image/video upload ",
  description: "Images and screencasts can enhance comments on solutions.",
  votes: 0,
  comments: 0,
  category: "Feature",
};

export function SuggestionPage() {
  return (
    <main className="h-full w-full max-w-[730px] m-auto py-14 px-9 lg:py-24">
      <header className="flex flex-row justify-between mb-6">
        <Link
          href="/"
          className="flex flex-row items-center gap-2 text-dark-blue-gray text-sm	font-bold opacity-100 transition-opacity duration-300 hover:underline hover:opacity-80"
        >
          <CaretLeftIcon /> Go Back
        </Link>

        <Button variant="secondary">Edit Feedback</Button>
      </header>

      <section className="flex flex-col gap-6">
        <Suggestion {...suggestion} />

        <Card>
          <h6 className="text-[#3A4374] font-bold text-lg">
            {suggestion.comments} Comments
          </h6>

          <Comment
            author={{
              avatar: "/images/user-images/image-anne.jpg",
              fullName: "Elijah Moss",
              handle: "@hexagon.bestagon",
            }}
            contents="Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has."
          />
          <Comment
            author={{
              avatar: "/images/user-images/image-anne.jpg",
              fullName: "Elijah Moss",
              handle: "@hexagon.bestagon",
            }}
            contents="Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has."
          />
        </Card>

        <Card className="flex flex-col gap-4 col-gap">
          <h6 className="text-[#3A4374] font-bold text-lg">Add Comment</h6>
          <CommentForm />
        </Card>
      </section>
    </main>
  );
}
