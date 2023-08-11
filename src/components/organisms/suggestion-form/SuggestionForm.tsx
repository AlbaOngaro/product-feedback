import * as Form from "@radix-ui/react-form";
import { Button } from "components/atoms/button/Button";
import { Input } from "components/atoms/input/Input";
import { Select } from "components/atoms/select/Select";
import { TextArea } from "components/atoms/textarea/TextArea";
import { Suggestion } from "lib/types";

interface Props {
  mode: "edit" | "create";
  suggestion: Pick<Suggestion, "title" | "category" | "state" | "description">;
}

export function SuggestionForm({ mode, suggestion }: Props) {
  return (
    <Form.Root
      className="flex flex-col gap-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        name="title"
        label="Feedback Title"
        description="Add a short, descriptive headline"
        value={suggestion.title}
      />

      <Select
        name="category"
        label="Category"
        description="Choose a category for your feedback"
        options={[
          {
            label: "UX",
            value: "ux",
          },
          {
            label: "UI",
            value: "ui",
          },
        ]}
        onChange={console.debug}
      />

      <Select
        name="state"
        label="Status"
        description="Change feedback state"
        options={[
          {
            label: "Planned",
            value: "planned",
          },
          {
            label: "In-Progress",
            value: "in-progress",
          },
          {
            label: "Live",
            value: "live",
          },
        ]}
        onChange={console.debug}
      />

      <TextArea
        name="description"
        label="Feedback Detail"
        description="Include any specific comments on what should be improved, added, etc."
        value={suggestion.description}
      />

      <footer className="flex flex-row gap-4">
        {mode === "edit" && <Button variant="danger">Delete</Button>}
        <Button className="ml-auto" variant="tertiary">
          Cancel
        </Button>
        <Button variant="primary">Add Feedback</Button>
      </footer>
    </Form.Root>
  );
}
