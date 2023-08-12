import * as Form from "@radix-ui/react-form";
import { twMerge } from "lib/utils/twMerge";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  validations?: Partial<Record<Form.ValidityMatcher, string>>;
  name: string;
}

export function Input({
  label,
  description,
  validations,
  name,
  className,
  ...rest
}: Props) {
  return (
    <Form.Field
      className={twMerge("flex flex-col gap-2", className)}
      name={name}
      id={name}
    >
      {(label || description) && (
        <Form.Label className="flex flex-col text-sm font-bold text-[#3A4374]">
          {label}
          {description && (
            <small className="text-sm font-normal text-dark-blue-gray">
              {description}
            </small>
          )}
        </Form.Label>
      )}

      <Form.Control asChild>
        <input
          className="m-0 resize-none py-3 px-6 bg-ghost-white text-[#3A4374] rounded outline-none transition-all duration-300 focus:outline-none active:outline-none border border-solid border-[transparent] hover:border-royal-blue focus:border-royal-blue invalid:border-jasper"
          name={name}
          id={name}
          {...rest}
        />
      </Form.Control>

      {validations &&
        Object.entries(validations).map(([match, message]) => (
          <Form.Message
            className="text-sm text-jasper"
            key={match}
            match={match as Form.ValidityMatcher}
          >
            {message}
          </Form.Message>
        ))}
    </Form.Field>
  );
}
