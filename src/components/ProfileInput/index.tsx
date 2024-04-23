"use client";

import { FieldError, UseFormRegister } from "react-hook-form";

export type TProfileInputProps = {
  label: string;
  name: string;
  placeholder: string;
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  disabled?: boolean;
};

export default function ProfileInput(props: TProfileInputProps) {
  const { onChange, ...rest } = props.register(props.name);
  return (
    <div className="w-full gap-1 flex flex-col">
      <label className="body-s text-dark_grey" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        {...rest}
        disabled={props.disabled}
        placeholder={props.placeholder}
        className="border border-borders text-dark_grey bg-white py-3 px-4 body-m rounded-[8px]"
      />
      {props.error && <p className="text-red body-s">{props.error.message}</p>}
    </div>
  );
}
