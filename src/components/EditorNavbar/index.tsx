"use client";

import { usePathname, useRouter } from "next/navigation";
import HeaderTab from "../HeaderTab";
import {
  IconLink,
  IconPreviewHeader,
  IconProfileDetailsHeader,
} from "../Icons";

export default function EditorNavbar() {
  const path = usePathname();
  const router = useRouter();

  console.log({ path });

  const isEditLink = path.includes("/edit");

  return (
    <div className="flex flex-row w-full p-4 pl-6 justify-between bg-white">
      <div className="w-[52px] flex items-center">
        <div
          className={`bg-[url("/images/logo-devlinks-small.svg")] sm:bg-[url("/images/logo-devlinks-large.svg")] w-[32px] h-[32px] sm:w-[146px] sm:h-[32px] bg-cover bg-center`}
        />
      </div>

      <HeaderTab
        active={isEditLink}
        Icon={IconLink}
        onClick={(e) => {
          e.preventDefault();
          router.push("edit");
        }}
      />

      <HeaderTab
        active={!isEditLink}
        Icon={IconProfileDetailsHeader}
        onClick={(e) => {
          e.preventDefault();
          router.push("profile");
        }}
      />

      <div className="py-[11px] px-[16px] border border-purple rounded-[8px]">
        <IconPreviewHeader className="w-5 h-5" />
      </div>
    </div>
  );
}
