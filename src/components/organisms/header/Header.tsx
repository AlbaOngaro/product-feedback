import { StarFilledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { Dropdown } from "components/atoms/dropdown/Dropdown";

import { useSuggestions } from "lib/hooks/useSuggestions";
import { useSearchParams } from "next/navigation";

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.toString();

  const { data: suggestions } = useSuggestions();

  return (
    <Card as="header" className="flex items-center	" variant="dark">
      <h3 className="text-white text-lg	font-bold inline-flex items-center gap-2">
        <StarFilledIcon className="w-6 h-6" />
        {suggestions?.length || 0} Suggestions
      </h3>

      <Dropdown
        className="ml-8"
        label="Sort By:"
        options={[
          {
            label: "Most Upvotes",
            value: new URLSearchParams({
              field: "votes",
              order: "DESC",
            }).toString(),
          },
          {
            label: "Least Upvotes",
            value: new URLSearchParams({
              field: "votes",
              order: "ASC",
            }).toString(),
          },
          {
            label: "Most Comments",
            value: new URLSearchParams({
              field: "comments",
              order: "DESC",
            }).toString(),
          },
          {
            label: "Least Comments",
            value: new URLSearchParams({
              field: "comments",
              order: "ASC",
            }).toString(),
          },
        ]}
        onChange={(value) => {
          router.push(`${router.pathname}?${value}`);
        }}
        defaultValue={params}
      />
      <Button
        className="ml-auto"
        onClick={() => router.push("/suggestions/create")}
      >
        + Add Feedback
      </Button>
    </Card>
  );
}
