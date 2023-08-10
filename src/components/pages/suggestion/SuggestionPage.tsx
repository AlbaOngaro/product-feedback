import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { Suggestion } from "components/organisms/suggestion/Suggestion";
import Link from "next/link";

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
        </Card>

        <Card>
          <h6 className="text-[#3A4374] font-bold text-lg">Add Comment</h6>
        </Card>
      </section>
    </main>
  );
}
