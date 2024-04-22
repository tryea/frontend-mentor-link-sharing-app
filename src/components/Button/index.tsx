import { ReactNode } from "react";

export default function Button({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-purple disabled:opacity-25 w-full px-[27px] py-[11px] heading-s rounded-[8px] text-white`}
    >
      {children}
    </button>
  );
}
