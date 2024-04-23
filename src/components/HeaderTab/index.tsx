import React, { ElementType } from "react";

export type THeaderTabProps = {
  active?: boolean;
  Icon: ElementType;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  label: string;
};

export default function HeaderTab({
  active,
  Icon,
  onClick,
  label,
}: THeaderTabProps) {
  return (
    <div
      onClick={onClick}
      className={`py-[11px] px-[27px] rounded-[8px] gap-2 flex flex-row shrink-0 items-center hover:text-purple cursor-pointer ${
        active ? "bg-light_purple text-purple" : "bg-transparent text-grey"
      } `}
    >
      <Icon className={`relative w-5 h-5`} />
      <p className={`heading-s hidden sm:flex`}>{label}</p>
    </div>
  );
}
