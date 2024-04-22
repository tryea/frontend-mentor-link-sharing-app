"use client";

import Button from "@/components/Button";
import EditorContentContainer from "@/components/EditorContentContainer";
import EditorNavbar from "@/components/EditorNavbar";
import InputSharingLinkContainer from "@/components/InputSharingLinkContainer";
import { useUserStore } from "@/context/User/useUser";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import Image from "next/image";
import { useRef } from "react";

export default function EditUserLinkPage() {
  const { links, addLinks } = useUserStore((state) => state);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const allLinksRef = useRef<HTMLDivElement | null>(null);
  const addNewLinkHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    addLinks({ id: `${new Date().getTime()}`, platform: "", url: "" });

    setTimeout(() => {
      allLinksRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  };
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      gsap.to("#overlay", {
        duration: 1,
        backgroundImage: "linear-gradient(#EFEBFF, #33333355)",
        ease: "none",
        yoyo: true,
        repeat: -1,
        repeatDelay: 0,
      });
    },
    {
      scope: overlayRef,
    }
  );

  if (!links) {
    return (
      <main className="flex  flex-col flex-1 h-svh max-h-svh bg-light_grey items-center justify-center">
        <div
          ref={overlayRef}
          className="relative h-[128px] w-[128px] rounded-[12px]"
        >
          <Image
            src={"/images/logo-devlinks-small.svg"}
            width={128}
            height={128}
            alt={"brand logo"}
          />
          <div
            id="overlay"
            className="absolute z-20 left-0 top-0 h-[128px] w-[128px] rounded-[12px]"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col flex-1 h-svh max-h-svh bg-light_grey">
      <EditorNavbar />
      <EditorContentContainer>
        <div className="flex flex-1 flex-col gap-10 p-6 max-h-full overscroll-contain overflow-y-scroll scrollbar-none">
          <div className="flex flex-col gap-2">
            <h2 className="heading-base text-dark_grey">
              Customize your links
            </h2>
            <p className="body-m text-grey">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <button
              onClick={addNewLinkHandler}
              type="button"
              className="border border-purple heading-s rounded-[8px] text-purple w-full px-[27px] py-[11px]"
            >
              + Add new link
            </button>

            <div
              ref={allLinksRef}
              className={`z-0 ${
                links.length === 0
                  ? "bg-light_grey p-5  rounded-[12px]"
                  : "bg-white"
              } gap-6 flex flex-col items-center`}
            >
              {links.length === 0 && (
                <>
                  <div className="relative w-[124.77px] h-[80px]">
                    <Image
                      fill
                      src={"/images/illustration-empty.svg"}
                      alt="empty link"
                    />
                  </div>
                  <h2 className="heading-base text-center text-dark_grey">{`Let's get you started`}</h2>
                  <p className="body-m text-grey">
                    {`Use the "Add new link" button to get started. Once you have more
            than one link, you can reorder and edit them. We're here to help you
            share your profiles with everyone!`}
                  </p>
                </>
              )}

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

        <div className="flex flex-col w-full">
          <hr className="h-px bg-borders w-full" />
          <div className="p-4">
            <Button disabled>Save</Button>
          </div>
        </div>
      </EditorContentContainer>
    </main>
  );
}
