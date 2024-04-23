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

export default function EditUserLinkPage() {
  const { links } = useUserStore((state) => state);

  const allLinksRef = useRef<HTMLDivElement | null>(null);

  if (!links) {
    return <EditLinkOverlay />;
  }

  return (
    <MainContainer>
      <EditorNavbar />
      <EditorContentContainer>
        <div className="flex flex-1 flex-col gap-10 p-6 max-h-full overflow-hidden">
          <LinkHeaderCard />

          <div className="flex flex-col gap-6 max-h-full overflow-hidden">
            <AddNewLinkButton allLinksRef={allLinksRef} />

            <div
              ref={allLinksRef}
              className={`z-0 ${
                links.length === 0
                  ? "bg-light_grey p-5 rounded-[12px] items-center justify-center"
                  : "bg-white items-center justify-start overscroll-contain overflow-y-scroll scrollbar-none"
              } gap-6 flex flex-col flex-1`}
            >
              {links.length === 0 && <LinkEmptyState />}

              {links.length > 0 &&
                links.map((link, index) => {
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
          </div>
        </div>

        <LinkFooterCard />
      </EditorContentContainer>
    </MainContainer>
  );
}
