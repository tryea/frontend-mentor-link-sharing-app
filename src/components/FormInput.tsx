"use client";

import Image from "next/image";
import { ChangeEvent } from "react";

export type TFormInput = {
  name: string;
  iconSrc?: string;
  type: "email" | "password" | "text";
  placeholder: string;
  containerClassName?: HTMLDivElement["className"];
  labelClassName?: HTMLDivElement["className"];
  inputContainerClassName?: HTMLDivElement["className"];
  inputClassName?: HTMLDivElement["className"];
  iconClassName?: HTMLDivElement["className"];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
};

export default function FormInput(props: TFormInput) {
  return (
    <div className="flex flex-col gap-1 bg-light_grey">
      <label htmlFor={props.name} className="body-s text-dark_grey">
        {props.label}
      </label>
      <div className="relative w-full h-12 flex flex-row">
        <input
          onChange={props.onChange}
          id={props.name}
          name={props.name}
          type={props.type}
          value={props.value}
          placeholder="e.g. alex@email.com"
          className="flex flex-1 pl-11 pr-4 items-center placeholder:text-grey text-dark_grey rounded-[8px] autofill:!bg-light_grey outline-none border border-borders"
        />
        {props.iconSrc && (
          <div className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4">
            <Image src={props.iconSrc} fill alt="email icon" />
          </div>
        )}
      </div>
    </div>
  );
}
