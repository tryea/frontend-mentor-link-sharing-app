"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import MainContainer from "./components/MainContainer";
import EditorNavbar from "@/components/EditorNavbar";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/context/User/useUser";
import { Platforms } from "@/constants/Platform";
import EditLinkOverlay from "./edit/EditLinkOverlay";

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const segment = useSelectedLayoutSegment();
  const { isLoaded, user } = useUser();
  const { links } = useUserStore((state) => state);

  console.log({ segment });

  if (!isLoaded || !links) {
    return <EditLinkOverlay />;
  }

  if (segment === "edit" || segment === "profile") {
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

              {links && links.length > 0 && (
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
          {children}
        </div>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <div className="w-full h-fit sm:min-h-[357px] sm:bg-purple rounded-b-[32px] bg-transparent p-0 sm:p-6 short-height-desktop:min-h-[290px]">
        <div className="bg-white p-4 pl-6 flex flex-row justify-between *:rounded-[8px] sm:rounded-[12px]">
          <button className="flex px-[27px] py-[11px] border border-purple text-purple heading-s">
            Back to Editor
          </button>
          <button className="flex px-[27px] py-[11px] bg-purple text-white heading-s">
            Share Link
          </button>
        </div>
      </div>
      <div className="flex justify-center max-h-full z-10 flex-1 mt-[60px] sm:mt-[-129px] short-height-desktop:mt-[-88px] overflow-scroll pb-6">
        <div className="w-[237px] sm:w-[349px] sm:px-14 sm:py-12 sm:bg-white flex flex-col gap-[56px] items-center sm:rounded-[24px] max-h-full overflow-scroll scrollbar-none overscroll-contain">
          <div className="flex flex-col gap-[25px] items-center">
            <div className="relative w-[104px] h-[104px] rounded-full border-[4px] border-purple">
              <Image
                src={user!.imageUrl}
                alt="user photo profile"
                fill
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="heading-m text-dark_grey">{user!.fullName}</p>
              <p className="body-m text-grey">
                {user!.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
          {links.length > 0 && (
            <div className="flex flex-col gap-5 w-full">
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
                      className={`w-full rounded-[8px] flex items-center justify-between p-4 text-white cursor-pointer`}
                      style={{
                        backgroundColor: platform.backgroundColor || "#633CFF",
                      }}
                    >
                      <div className="flex flex-row gap-2 items-center">
                        <platform.iconSrc className="w-5 h-5" />
                        <p className="body-m">{link.platform}</p>
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
    </MainContainer>
  );
}
