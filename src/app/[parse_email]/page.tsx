import Image from "next/image";
import MainContainer from "./components/MainContainer";
import { clerkClient } from "@clerk/nextjs/server";
import { findUserLinks, getUserIdFromUsername } from "@/services/firebase";
import { UserLink } from "@/context/User/Context";
import { Platforms } from "@/constants/Platform";
import Link from "next/link";

export default async function PreviewUserLinkSharingPage({
  params: { parse_email },
}: {
  params: { parse_email: string };
}) {
  const userId = (await getUserIdFromUsername(parse_email)) as string;
  console.log({ userId });

  const user = await clerkClient.users.getUser(userId);
  const linksDocs = await findUserLinks(userId);

  const links: UserLink[] = linksDocs.map((doc) => {
    const docId = doc.id;
    const docData = doc.data();

    return {
      id: docId,
      platform: docData.platform,
      url: docData.url,
      fromLocal: false,
    };
  });

  return (
    <MainContainer>
      <div className="w-full h-fit sm:min-h-[357px] sm:bg-purple rounded-b-[32px] bg-transparent p-0 sm:p-6 short-height-desktop:min-h-[290px]" />
      <div className="flex justify-center short-height-desktop:max-h-[calc(100%-145px)] z-10 flex-1 mt-[60px] sm:mt-[-129px] sm:max-h-[calc(100%-270px)] short-height-desktop:mt-[-170px] ">
        <div className="w-[237px] sm:w-[349px] sm:px-14 sm:py-12 short-height-desktop:px-10 short-height-desktop:py:py-8 sm:bg-white flex flex-col gap-[56px] short-height-desktop:gap-[32px] items-center sm:rounded-[24px] max-h-full">
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
            <div className="flex flex-col gap-5 w-full max-h-full overflow-scroll scrollbar-none overscroll-contain">
              {links.map((link) => {
                const platform = Platforms.find(
                  (plat) => plat.name === link.platform
                )!;
                return (
                  <Link
                    key={`${link.id}`}
                    href={link.url}
                    className={`w-full rounded-[8px] flex items-center justify-between p-4 text-white cursor-pointer hover:opacity-75`}
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
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainContainer>
  );
}
