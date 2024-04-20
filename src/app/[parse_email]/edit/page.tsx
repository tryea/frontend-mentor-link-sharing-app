"use client";

import Button from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import EditorContentContainer from "@/components/EditorContentContainer";
import EditorNavbar from "@/components/EditorNavbar";
import FormInput from "@/components/FormInput";
import { IconDragAndDrop } from "@/components/Icons";
import { Platforms } from "@/constants/Platform";
import { useUserStore } from "@/context/User/useUser";
import Image from "next/image";

export default function EditUserLinkPage() {
  const { isLogin, email, links, token, addLinks, setUrl, setPlatform } =
    useUserStore((state) => state);
  const addNewLinkHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    addLinks({ id: `${new Date().getTime()}`, platform: "", url: "" });
  };

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

            <div className="z-0 bg-light_grey p-5 gap-6 flex flex-col items-center rounded-[12px]">
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
                    <div key={link.id} className="flex flex-col gap-3 w-full">
                      <div className="flex flex-row w-full items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                          <IconDragAndDrop className="w-[12px] h-[6px] text-grey" />
                          <p className="heading-s text-grey">
                            Link #{index + 1}
                          </p>
                        </div>
                        <div className="body-m text-grey">Remove</div>
                      </div>

                      <CustomSelect
                        label="Platform"
                        onChange={(platform) => {
                          setPlatform(index, platform.name);
                        }}
                        options={Platforms}
                      />

                      <FormInput
                        label="Link"
                        iconSrc="/images/icon-links-header.svg"
                        name="link"
                        placeholder="e.g. https://www.github.com/johnappleseed"
                        type="text"
                        value={link.url}
                        onChange={(e) => {
                          setUrl(index, e.target.value);
                        }}
                      />
                    </div>
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
