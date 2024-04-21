"use client";

import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

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
  error?: FieldError;
  register: UseFormRegister<any>;
  required?: boolean;
};

export default function FormInput(props: TFormInput) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={props.name}
        className={`body-s ${props.error ? "text-red" : "text-dark_grey"} `}
      >
        {props.label}
      </label>
      <div className="relative w-full max-w-full h-12 flex flex-row">
        <input
          {...props.register(props.name, { required: props.required })}
          aria-invalid={props.error ? "true" : "false"}
          ref={inputRef}
          onChange={props.onChange}
          id={props.name}
          name={props.name}
          type={props.type}
          value={props.value}
          placeholder="e.g. alex@email.com"
          className={`flex max-w-full pl-11 ${
            props.error
              ? "pr-[110px] lg:pr-[190px] border-red"
              : "pr-4 border-borders"
          } body-m items-center placeholder:text-grey text-dark_grey rounded-[8px] autofill:!bg-light_grey outline-none border `}
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
        {props.error && (
          <p
            onClick={() => {
              inputRef.current?.focus();
            }}
            className="body-s text-red text-right absolute top-1/2 -translate-y-1/2 right-4 h-[18px] w-[120px] lg:w-[162px]"
          >
            {props.error.message}
          </p>
        )}
      </div>
    </div>
  );
}
