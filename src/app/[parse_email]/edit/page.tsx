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

export default function EditUserLinkPage() {
  const { links } = useUserStore((state) => state);

  const allLinksRef = useRef<HTMLDivElement | null>(null);

  if (!links) {
    return <EditLinkOverlay />;
  }

  return (
    <MainContainer>
      <EditorNavbar />
      <div className="flex flex-row flex-1 lg:p-6 lg:pt-0 bg-light_grey gap-6 flex-nowrap max-h-full h-0">
        <div className="hidden relative lg:flex flex-col w-[560px] 2xl:w-[700px] [@media_(min-width:_2560px)]:w-[1024px] [@media_(max-height:_750px)]:w-[450px] p-6 max-h-full rounded-[12px] bg-white items-center justify-center ">
          <div className="relative [@media_(max-height:_750px)]:w-[153.5px] [@media_(max-height:_750px)]:h-[315.5px] [@media_(max-height:_900px)]:w-[230.25px] [@media_(max-height:_900px)]:h-[473.25px] [@media_(min-height:_900px)]:w-[307px] [@media_(min-height:_900px)]:h-[631px]">
            <Image
              src={`/images/illustration-phone-mockup.svg`}
              alt="mockup"
              fill
              sizes="(max-height: 750px) 153.5px, 315.5px, (max-height: 900px) 230.25px, 473.25px, (min-height: 900px) 307px, 631px"
            />
          </div>
        </div>
        <EditorContentContainer>
          <div className="flex flex-1 flex-col gap-10 [@media_(max-height:_750px)]:gap-4 [@media_(max-height:_750px)]:py-4 p-6 sm:p-10 h-0 max-h-full overflow-hidden">
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
      </div>
    </MainContainer>
  );
}
