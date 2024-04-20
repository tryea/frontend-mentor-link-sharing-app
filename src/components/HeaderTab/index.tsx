import React, { ElementType } from "react";

export type THeaderTabProps = {
  active?: boolean;
  Icon: ElementType;
};

export default function HeaderTab({ active, Icon }: THeaderTabProps) {
  return (
    <div
      className={`py-[11px] px-[27px] rounded-[8px] ${
        active ? "bg-light_purple" : "bg-transparent"
      } `}
    >
      <Icon
        className={`relative w-5 h-5 ${active ? "text-purple" : "text-grey"}`}
      />
    </div>
  );
}
