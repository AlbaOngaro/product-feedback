import { CaretLeftIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

import { suggestion } from "lib/utils/constants";
import { Card } from "components/atoms/card/Card";
import { FeedbackForm } from "components/organisms/feedback-form/FeedbackForm";

export function EditSuggestionPage() {
  return (
    <main className="h-full w-full max-w-[540px] m-auto py-14 px-9 lg:py-24">
      <header className="flex flex-row justify-between mb-16">
        <Link
          href={`/suggestions/${suggestion.id}`}
          className="flex flex-row items-center gap-2 text-dark-blue-gray text-sm	font-bold opacity-100 transition-opacity duration-300 hover:underline hover:opacity-80"
        >
          <CaretLeftIcon /> Go Back
        </Link>
      </header>

      <Card className="relative p-10 pt-12">
        <span className="absolute -top-7 bg-gradient-mesh bg-purple w-14 h-14 rounded-full flex justify-center items-center text-white">
          <Pencil1Icon className="h-6 w-6" />
        </span>
        <h3 className="text-2xl font-bold text-[#3A4374] mb-14">
          Editing &ldquo;{suggestion.title}&rdquo;
        </h3>

        <FeedbackForm mode="edit" suggestion={suggestion} />
      </Card>
    </main>
  );
}
