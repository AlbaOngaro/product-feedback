import * as Form from "@radix-ui/react-form";
import { FormEventHandler, MouseEvent, useState } from "react";

import { Button } from "components/atoms/button/Button";
import { Input } from "components/atoms/input/Input";
import { Select } from "components/atoms/select/Select";
import { TextArea } from "components/atoms/textarea/TextArea";

import { State, Suggestion } from "lib/types";
import { useCategories } from "lib/hooks/useCategories";
import { useSuggestions } from "lib/hooks/useSuggestions";
import { useRouter } from "next/router";

const STATES = [
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
];

interface Props {
  mode: "edit" | "create";
  suggestion: Partial<Suggestion>;
}

export function SuggestionForm({ mode, suggestion }: Props) {
  const router = useRouter();
  const { data: categories } = useCategories();
  const { mutate } = useSuggestions();

  const [data, setData] = useState(suggestion);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await mutate(async () => {
      if (mode === "create") {
        return fetch("/api/suggestions", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      return fetch(`/api/suggestions/${suggestion.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    });

    if (mode === "create") {
      return router.push("/");
    }

    return router.push(`/suggestions/${suggestion.id}`);
  };

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await mutate(() => {
      return fetch(`/api/suggestions/${suggestion.id}`, {
        method: "DELETE",
      });
    });

    return router.push("/");
  };

  return (
    <Form.Root className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <Input
        name="title"
        label="Feedback Title"
        description="Add a short, descriptive headline"
        value={data.title}
        required
        validations={{
          valueMissing: "Field is required",
        }}
        onChange={(e) =>
          setData((curr) => ({
            ...curr,
            title: e.target.value,
          }))
        }
      />

      {categories && (
        <Select
          name="category"
          label="Category"
          description="Choose a category for your feedback"
          options={categories.map((category) => ({
            label: category.label,
            value: category.id,
          }))}
          defaultValue={
            categories.find((category) => category.label === data.category)?.id
          }
          onChange={(category) =>
            setData((curr) => ({
              ...curr,
              category,
            }))
          }
        />
      )}

      <Select
        name="state"
        label="Status"
        description="Change feedback state"
        options={STATES}
        defaultValue={STATES.find((state) => state.label === data.state)?.value}
        onChange={(state) =>
          setData((curr) => ({
            ...curr,
            state: STATES.find((s) => s.value === state)?.label as State,
          }))
        }
      />

      <TextArea
        name="description"
        label="Feedback Detail"
        description="Include any specific comments on what should be improved, added, etc."
        value={data.description}
        onChange={(e) =>
          setData((curr) => ({
            ...curr,
            description: e.target.value,
          }))
        }
        required
        validations={{
          valueMissing: "Field is required",
        }}
      />

      <footer className="flex flex-row gap-4">
        {mode === "edit" && (
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button
          className="ml-auto"
          variant="tertiary"
          onClick={() => setData(suggestion)}
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Add Feedback
        </Button>
      </footer>
    </Form.Root>
  );
}
