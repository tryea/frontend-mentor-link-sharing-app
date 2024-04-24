"use client";

import EditorContentContainer from "@/components/EditorContentContainer";
import EditorNavbar from "@/components/EditorNavbar";
import InputSharingLinkContainer from "@/components/InputSharingLinkContainer";
import { useUserStore } from "@/context/User/useUser";

import { useRef } from "react";
import MainContainer from "../components/MainContainer";
import LinkEmptyState from "./LinkEmptyState";
import LinkHeaderCard from "./LinkHeaderCard";
import AddNewLinkButton from "./AddNewLinkButton";
import LinkFooterCard from "./LinkFooterCard";
import EditLinkOverlay from "./EditLinkOverlay";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Platforms } from "@/constants/Platform";

export default function EditUserLinkPage() {
  const { links } = useUserStore((state) => state);
  const { isLoaded, user } = useUser();

  const allLinksRef = useRef<HTMLDivElement | null>(null);

  if (!links) {
    return <EditLinkOverlay />;
  }

  return (
    <EditorContentContainer>
      <div className="flex flex-1 flex-col gap-10 short-height-desktop:gap-4 short-height-desktop:py-4 p-6 sm:p-10 h-0 max-h-full overflow-hidden">
        <LinkHeaderCard />

        <div className="flex flex-col gap-6 max-h-full overflow-hidden">
          <AddNewLinkButton allLinksRef={allLinksRef} />

          {links.length === 0 && <LinkEmptyState />}
          {links.length > 0 && (
            <div
              ref={allLinksRef}
              className={`z-0 bg-white items-center justify-start overscroll-contain overflow-y-scroll scrollbar-none gap-6 flex flex-col flex-1`}
            >
              {links.map((link, index) => {
                return (
                  <InputSharingLinkContainer
                    key={link.id}
                    id={link.id}
                    index={index}
                    platform={link.platform}
                    url={link.url}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      <LinkFooterCard />
    </EditorContentContainer>
  );
}
