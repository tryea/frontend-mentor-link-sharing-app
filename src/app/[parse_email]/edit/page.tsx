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
        <div className="hidden relative lg:flex flex-col w-[560px] 2xl:w-[700px] [@media_(min-width:_2560px)]:w-[1024px] short-height-desktop:w-[450px] p-6 max-h-full rounded-[12px] bg-white items-center justify-center ">
          <div className="relative short-height-desktop:w-[153.5px] short-height-desktop:h-[315.5px] medium-height-desktop:w-[230.25px] medium-height-desktop:h-[473.25px] tall-height-desktop:w-[307px] tall-height-desktop:h-[631px]">
            <Image
              src={`/images/illustration-phone-mockup.svg`}
              alt="mockup"
              fill
              sizes="(max-height: 750px) 153.5px, 315.5px, (max-height: 900px) 230.25px, 473.25px, (min-height: 900px) 307px, 631px"
            />
            {user?.imageUrl && (
              <div className="absolute short-height-desktop:top-[33.5px] short-height-desktop:left-[19.3px] short-height-desktop:w-[calc(100%-38.5px)] medium-height-desktop:top-[50.5px] medium-height-desktop:left-[26.3px] medium-height-desktop:w-[calc(100%-54.5px)] tall-height-desktop:top-[65.5px] tall-height-desktop:left-[34.3px] tall-height-desktop:w-[calc(100%-71.5px)] flex items-center justify-center">
                <div className="relative short-height-desktop:w-[45px] short-height-desktop:h-[45px] medium-height-desktop:w-[68px] medium-height-desktop:h-[68px] tall-height-desktop:w-[90px] tall-height-desktop:h-[90px] rounded-full border-[4px] border-purple">
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
              <div className="absolute short-height-desktop:top-[89.7px] short-height-desktop:left-[19.3px] short-height-desktop:w-[calc(100%-38.5px)] h-[11.1px] text-dark_grey text-[10px] text-center bg-white leading-[10px] font-semibold medium-height-desktop:h-[12.1px] medium-height-desktop:top-[139.1px] medium-height-desktop:left-[26.3px] medium-height-desktop:w-[calc(100%-54.5px)] tall-height-desktop:top-[184.5px] tall-height-desktop:h-[16px] tall-height-desktop:left-[34.3px] tall-height-desktop:w-[calc(100%-71.5px)] tall-height-desktop:text-[16px] tall-height-desktop:leading-[16px]">
                {user?.fullName}
              </div>
            )}

            {user?.primaryEmailAddress?.emailAddress && (
              <div className="absolute short-height-desktop:top-[106.8px] short-height-desktop:left-[19.3px] short-height-desktop:w-[calc(100%-38.5px)] h-[8px] text-grey text-[8px] text-center bg-white leading-[8px] font-normal medium-height-desktop:top-[157.8px] medium-height-desktop:left-[26.3px] medium-height-desktop:w-[calc(100%-54.5px)] tall-height-desktop:top-[213.5px] tall-height-desktop:h-[14px] tall-height-desktop:left-[34.3px] tall-height-desktop:w-[calc(100%-71.5px)] tall-height-desktop:text-[14px] tall-height-desktop:leading-[14px]">
                {user?.primaryEmailAddress?.emailAddress}
              </div>
            )}

            {links.length > 0 && (
              <div className="absolute short-height-desktop:top-[139.7px] short-height-desktop:left-[19.3px] short-height-desktop:w-[calc(100%-38.5px)] text-white short-height-desktop:text-[4px] text-center short-height-desktop:leading-[4px] text-[10px] leading-[10px] font-normal flex flex-col short-height-desktop:gap-[7.4px] medium-height-desktop:top-[208.5px] medium-height-desktop:left-[26.3px] medium-height-desktop:w-[calc(100%-54.5px)] medium-height-desktop:gap-[16.4px] tall-height-desktop:top-[279.5px] tall-height-desktop:left-[34.3px] tall-height-desktop:w-[calc(100%-71.5px)] tall-height-desktop:gap-[24.4px]">
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
                        className={`short-height-desktop:h-[24px] medium-height-desktop:h-[31.6px] tall-height-desktop:h-[39.6px] w-full rounded-[6px] flex items-center justify-between px-4`}
                        style={{
                          backgroundColor:
                            platform.backgroundColor || "#633CFF",
                        }}
                      >
                        <div className="flex flex-row gap-2 items-center">
                          <platform.iconSrc className="w-4 h-4 short-height-desktop:w-[8px] short-height-desktop:h-[8px]" />
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
      </div>
    </MainContainer>
  );
}
