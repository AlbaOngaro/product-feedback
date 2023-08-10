import { StarFilledIcon } from "@radix-ui/react-icons";
import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";

export function Header() {
  return (
    <Card className="flex items-center	" variant="dark">
      <h3 className="text-white text-lg	font-bold inline-flex items-center gap-2">
        <StarFilledIcon className="w-6 h-6" />6 Suggestions
      </h3>
      <Button className="ml-auto">+ Add Feedback</Button>
    </Card>
  );
}
