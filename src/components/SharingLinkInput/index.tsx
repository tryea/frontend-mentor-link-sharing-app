import Image from "next/image";
import { ChangeEvent, useRef } from "react";

export type TSharingLinkInputProps = {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  iconSrc?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SharingLinkInput(props: TSharingLinkInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name} className={`body-s text-dark_grey `}>
        {props.label}
      </label>
      <div className="relative w-full max-w-full h-12 flex flex-row">
        <input
          ref={(e) => {
            inputRef.current = e;
          }}
          id={props.name}
          type={"text"}
          value={props.value}
          onChange={(e) => {
            props.onChange(e);
          }}
          placeholder={props.placeholder}
          className={`flex max-w-full pl-11 pr-4 border-borders body-m w-full items-center placeholder:text-grey text-dark_grey rounded-[8px] autofill:!bg-light_grey outline-none border `}
        />
        {props.iconSrc && (
          <div
            onClick={() => {
              inputRef.current?.focus();
            }}
            className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4"
          >
            <Image src={props.iconSrc} fill alt="email icon" />
          </div>
        )}
      </div>
    </div>
  );
}
