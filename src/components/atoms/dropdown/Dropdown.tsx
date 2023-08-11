import { forwardRef } from "react";
import * as RUISelect from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { twMerge } from "lib/utils/twMerge";

const DropdownItem = forwardRef<HTMLDivElement, RUISelect.SelectItemProps>(
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
  label: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

export function Dropdown({ label, options, className, onChange }: Props) {
  return (
    <RUISelect.Root defaultValue={options[0].value} onValueChange={onChange}>
      <RUISelect.Trigger
        className={twMerge(
          "flex gap-1 text-[#F2F4FE] text-sm font-bold opacity-75 transition-opacity duration-300 hover:opacity-100 focus:outline-none",
          className,
        )}
        aria-label="Food"
      >
        <label className="font-normal">{label}</label>
        <RUISelect.Value />
        <RUISelect.Icon>
          <ChevronDownIcon />
        </RUISelect.Icon>
      </RUISelect.Trigger>
      <RUISelect.Portal>
        <RUISelect.Content
          position="popper"
          sideOffset={16}
          className="overflow-hidden bg-white rounded-md shadow-xl min-w-[255px]"
        >
          <RUISelect.Viewport>
            {options.map((option) => (
              <DropdownItem key={option.value} value={option.value}>
                {option.label}
              </DropdownItem>
            ))}
          </RUISelect.Viewport>
        </RUISelect.Content>
      </RUISelect.Portal>
    </RUISelect.Root>
  );
}
