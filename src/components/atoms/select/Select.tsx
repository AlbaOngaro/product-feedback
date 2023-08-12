import { forwardRef } from "react";
import * as RUISelect from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { twMerge } from "lib/utils/twMerge";

const SelectItem = forwardRef<HTMLDivElement, RUISelect.SelectItemProps>(
  function SelectItem({ children, className, ...props }, forwardedRef) {
    return (
      <RUISelect.Item
        className={twMerge(
          "outline-none flex flex-row justify-between items-center text-base px-6 py-3 text-dark-blue-gray cursor-pointer transition-all duration-300 border-[0] border-b border-solid border-[#3a437426] last-of-type:border-b-0 hover:text-purple hover:outline-none focus:outline-none",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <RUISelect.ItemText>{children}</RUISelect.ItemText>
        <RUISelect.ItemIndicator className="text-purple">
          <CheckIcon />
        </RUISelect.ItemIndicator>
      </RUISelect.Item>
    );
  },
);

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label: string;
  description?: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

export function Select({
  name,
  label,
  description,
  options,
  className,
  onChange,
}: Props) {
  return (
    <RUISelect.Root
      defaultValue={options[0]?.value}
      onValueChange={onChange}
      name={name}
    >
      <fieldset className="flex flex-col gap-2">
        {(label || description) && (
          <label className="flex flex-col text-sm font-bold text-[#3A4374]">
            {label}
            {description && (
              <small className="text-sm font-normal text-dark-blue-gray">
                {description}
              </small>
            )}
          </label>
        )}
        <RUISelect.Trigger
          className={twMerge(
            "group box-border	w-full flex flex-row justify-between items-center m-0 resize-none py-3 px-6 bg-ghost-white text-[#3A4374] rounded outline-none transition-all duration-300 focus:outline-none active:outline-none border border-solid border-[transparent] [&[data-state=open]]:border-royal-blue hover:border-royal-blue",
            className,
          )}
        >
          <RUISelect.Value />
          <RUISelect.Icon>
            <ChevronDownIcon className="transition-all duration-300 rotate-0 group-[&[data-state=open]]:rotate-180" />
          </RUISelect.Icon>
        </RUISelect.Trigger>
        <RUISelect.Portal>
          <RUISelect.Content
            position="popper"
            sideOffset={16}
            className="overflow-hidden bg-white rounded-md shadow-[0px_10px_40px_-7px_rgba(55,_63,_104,_0.35)] min-w-[255px] w-[var(--radix-select-trigger-width)]"
          >
            <RUISelect.Viewport>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </RUISelect.Viewport>
          </RUISelect.Content>
        </RUISelect.Portal>
      </fieldset>
    </RUISelect.Root>
  );
}
