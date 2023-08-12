import { StarFilledIcon } from "@radix-ui/react-icons";
import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { Dropdown } from "components/atoms/dropdown/Dropdown";
import { useSuggestions } from "lib/hooks/useSuggestions";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();
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
            value: "upvotes+",
          },
          {
            label: "Least Upvotes",
            value: "upvotes-",
          },
          {
            label: "Most Comments",
            value: "comments+",
          },
          {
            label: "Least Comments",
            value: "comments-",
          },
        ]}
        onChange={console.debug}
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
