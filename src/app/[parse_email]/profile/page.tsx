"use client";

import Button from "@/components/Button";
import EditorContentContainer from "@/components/EditorContentContainer";
import EditorNavbar from "@/components/EditorNavbar";
import { IconUploadImage } from "@/components/Icons";
import ProfileInput from "@/components/ProfileInput";
import { useUser } from "@clerk/nextjs";
import { useGSAP } from "@gsap/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type EditUserProfileFormData = {
  first_name: string;
  last_name: string;
  email: string;
};
export default function EditUserProfilePage() {
  const { isLoaded, user } = useUser();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);

  const EditUserProfileFormSchema = z.object({
    first_name: z.string().min(1, "can't be empty"),
    last_name: z.string().min(1, "can't be empty"),
    email: z.string().min(1).email(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<EditUserProfileFormData>({
    resolver: zodResolver(EditUserProfileFormSchema),
  });

  useEffect(() => {
    if (isLoaded) {
      const { firstName, lastName, primaryEmailAddress } = user!;

      setValue("first_name", firstName || "");
      setValue("last_name", lastName || "");
      setValue("email", primaryEmailAddress!.emailAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const onSubmit = async (data: EditUserProfileFormData) => {
    console.log(data);
    try {
      setLoading(true);
      await user!.update({
        firstName: data.first_name,
        lastName: data.last_name,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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

  if (!isLoaded) {
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
        <div className="flex flex-1 bg-white flex-col gap-10 p-6 max-h-full overscroll-contain overflow-y-scroll scrollbar-none">
          <div className="flex flex-col gap-2">
            <h2 className="heading-base text-dark_grey">
              Customize your links
            </h2>
            <p className="body-m text-grey">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>

          <div className="p-5 flex flex-col gap-3 bg-light_grey rounded-[12px]">
            <label className="body-m text-grey">Profile picture</label>
            <div className="w-full flex flex-col gap-6">
              <div className="w-[192px] h-[192px] bg-light_purple flex items-center justify-center gap-2 flex-col rounded-[12px]">
                <IconUploadImage />
                <p className="heading-s text-purple">+ Upload Image</p>
                <input type="file" className="hidden" />
              </div>
              <p className="body-s text-grey">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
          </div>

          <form
            id="editUserProfileForm"
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 flex flex-col gap-3 bg-light_grey rounded-[12px]"
          >
            <ProfileInput
              register={register}
              error={errors.first_name}
              label="First name*"
              placeholder="First name"
              name="first_name"
            />

            <ProfileInput
              register={register}
              error={errors.last_name}
              label="Last name*"
              placeholder="Last name"
              name="last_name"
            />

            <ProfileInput
              disabled
              register={register}
              error={errors.email}
              label="Email"
              placeholder="Email"
              name="email"
            />
          </form>
        </div>
        <div className="flex flex-col w-full">
          <hr className="h-px bg-borders w-full" />
          <div className="p-4">
            <Button formId="editUserProfileForm">
              {loading ? "Loading..." : "Save"}
            </Button>
          </div>
        </div>
      </EditorContentContainer>
    </main>
  );
}
