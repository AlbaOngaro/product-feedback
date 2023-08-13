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

  const { data: suggestions } = useSuggestions();

  return (
    <Card
      as="header"
      className="sticky top-[100px] flex items-center rounded-none md:relative md:top-0 md:rounded-xl"
      variant="dark"
    >
      <h3 className="hidden md:text-white md:text-lg	md:font-bold md:inline-flex md:items-center md:gap-2">
        <StarFilledIcon className="w-6 h-6" />
        {suggestions?.length || 0} Suggestions
      </h3>

      <Dropdown
        className="md:ml-8"
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
          const params = new URLSearchParams(searchParams.toString());
          const newParams = new URLSearchParams(value);

          for (const [key, value] of newParams.entries()) {
            params.set(key, value);
          }

          router.push(`${router.pathname}?${params.toString()}`);
        }}
        defaultValue={
          searchParams.has("field") && searchParams.has("order")
            ? new URLSearchParams({
                field: searchParams.get("field") as string,
                order: searchParams.get("order") as string,
              }).toString()
            : undefined
        }
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
