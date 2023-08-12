import { CaretLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

import { Card } from "components/atoms/card/Card";
import { SuggestionForm } from "components/organisms/suggestion-form/SuggestionForm";

export function CreateSuggestionPage() {
  const router = useRouter();

  return (
    <main className="h-full w-full max-w-[540px] m-auto py-14 px-9 lg:py-24">
      <header className="flex flex-row justify-between mb-16">
        <button
          onClick={() => router.back()}
          className="flex flex-row items-center gap-2 text-dark-blue-gray text-sm	font-bold opacity-100 transition-opacity duration-300 hover:underline hover:opacity-80"
        >
          <CaretLeftIcon /> Go Back
        </button>
      </header>

      <Card className="relative p-10 pt-12">
        <span className="absolute -top-7 bg-gradient-mesh bg-purple w-14 h-14 rounded-full flex justify-center items-center text-white">
          <PlusIcon className="h-6 w-6" />
        </span>
        <h3 className="text-2xl font-bold text-[#3A4374] mb-14">
          Create New Feedback
        </h3>

        <SuggestionForm
          mode="create"
          suggestion={{
            title: "",
            category: "category:bug",
            state: "Planned",
            description: "",
          }}
        />
      </Card>
    </main>
  );
}
