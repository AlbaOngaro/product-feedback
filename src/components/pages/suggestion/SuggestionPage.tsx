import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Suggestion as SuggestionI } from "lib/types";

import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { Suggestion } from "components/organisms/suggestion/Suggestion";
import { CommentForm } from "components/organisms/comment-form/CommentForm";
import { Comment } from "components/organisms/comment/Comment";

const suggestion: SuggestionI = {
  id: "2de30717-276b-45bf-9849-c7f998e7de5f",
  title: "Allow image/video upload ",
  description: "Images and screencasts can enhance comments on solutions.",
  votes: 0,
  comments: [
    {
      parentId: null,
      id: "d82652dc-1772-4284-8965-f1b360118b35",
      author: {
        avatar: "/images/user-images/image-elijah.jpg",
        fullName: "Elijah Moss",
        handle: "@hexagon.bestagon",
      },
      contents:
        "Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.",
    },
    {
      parentId: "d82652dc-1772-4284-8965-f1b360118b35",
      id: "f1e679c3-27e6-41a0-8f21-7d829c11a93c",
      author: {
        avatar: "/images/user-images/image-james.jpg",
        fullName: "James Skinner",
        handle: "@hummingbird1",
      },
      contents:
        "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
    },
    {
      parentId: "d82652dc-1772-4284-8965-f1b360118b35",
      id: "f1e679c3-27e6-41a0-8f21-7d829c11a93c",
      author: {
        avatar: "/images/user-images/image-ryan.jpg",
        fullName: "Ryan Welles",
        handle: "@voyager.344",
      },
      contents:
        "@annev1990  Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.",
    },
  ],
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
