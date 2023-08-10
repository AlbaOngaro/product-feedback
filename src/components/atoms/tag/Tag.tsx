import { twMerge } from "lib/utils/twMerge";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export function Tag({
  className,
  name,
  ...rest
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <label
      htmlFor={name}
      className={twMerge(
        "py-1.5 px-4	bg-alice-blue text-royal-blue font-semibold	text-xs	rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#CFD7FF] after:content-[attr(for)] [&:has(input:checked)]:bg-royal-blue [&:has(input:checked)]:text-white",
        className,
      )}
    >
      <input
        type="checkbox"
        className="hidden"
        name={name}
        id={name}
        {...rest}
      />
    </label>
  );
}
