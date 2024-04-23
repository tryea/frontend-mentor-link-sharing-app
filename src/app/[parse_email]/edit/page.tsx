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
            {user?.imageUrl && (
              <div className="absolute top-[46.5px] left-[29.3px] w-[calc(100%-60px)] flex items-center justify-center">
                <div className="relative w-[68px] h-[68px] rounded-full border-[4px] border-purple">
                  <Image
                    alt="photo-profile"
                    src={user?.imageUrl}
                    fill
                    className="rounded-full"
                  />
                </div>
              </div>
            )}
            {user?.fullName && (
              <div className="absolute top-[133.7px] left-[29.3px] w-[calc(100%-60px)] h-[11.1px] text-dark_grey text-[10px] text-center bg-white leading-[10px] font-semibold">
                {user?.fullName}
              </div>
            )}

            {user?.primaryEmailAddress?.emailAddress && (
              <div className="absolute top-[151.8px] left-[29.3px] w-[calc(100%-60px)] h-[8px] text-grey text-[8px] text-center bg-white leading-[8px] font-normal">
                {user?.primaryEmailAddress?.emailAddress}
              </div>
            )}

            {links.length > 0 && (
              <div className="absolute top-[200.7px] left-[29.3px] w-[calc(100%-59.6px)] text-white text-[8px] text-center leading-[8px] font-normal flex flex-col gap-[14.4px]">
                {links
                  .filter((val) => val.url !== "")
                  .slice(0, 5)
                  .map((link) => {
                    const platform = Platforms.find(
                      (plat) => plat.name === link.platform
                    )!;
                    return (
                      <div
                        key={`${link.id}`}
                        className={`h-[31.6px] w-full rounded-[6px] flex items-center justify-between px-4`}
                        style={{
                          backgroundColor:
                            platform.backgroundColor || "#633CFF",
                        }}
                      >
                        <div className="flex flex-row gap-2 items-center">
                          <platform.iconSrc />
                          <p>{link.platform}</p>
                        </div>
                        <Image
                          src={"/images/icon-arrow-right.svg"}
                          alt="icon"
                          width={16}
                          height={16}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
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
