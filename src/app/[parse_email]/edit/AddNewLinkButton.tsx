"use client";

import { Platforms } from "@/constants/Platform";
import { useUserStore } from "@/context/User/useUser";
import { MutableRefObject } from "react";

export type TAddNewLinkButtonProps = {
  allLinksRef: MutableRefObject<HTMLDivElement | null>;
};
export default function AddNewLinkButton({
  allLinksRef,
}: TAddNewLinkButtonProps) {
  const { addLinks } = useUserStore((state) => state);

  const addNewLinkHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    addLinks({
      id: `${new Date().getTime()}`,
      platform: Platforms[0].name,
      url: "",
      fromLocal: true,
    });

    setTimeout(() => {
      allLinksRef.current?.scrollTo({
        top: allLinksRef.current?.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <button
      onClick={addNewLinkHandler}
      type="button"
      className="border border-purple heading-s rounded-[8px] text-purple w-full px-[27px] py-[11px] hover:bg-purple_hover"
    >
      + Add new link
    </button>
  );
}
