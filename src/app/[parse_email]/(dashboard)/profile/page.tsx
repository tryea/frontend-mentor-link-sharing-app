"use client";

import Button from "@/components/Button";
import EditorContentContainer from "@/components/EditorContentContainer";
import EditorNavbar from "@/components/EditorNavbar";
import ProfileInput from "@/components/ProfileInput";
import UploadPhotoProfile from "@/components/UploadPhotoProfile";
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
  photo_profile: FileList | string | null;
};
export default function EditUserProfilePage() {
  const { isLoaded, user } = useUser();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | string | null>(null);

  const EditUserProfileFormSchema = z.object({
    first_name: z.string().min(1, "can't be empty"),
    last_name: z.string().min(1, "can't be empty"),
    email: z.string().min(1).email(),
    photo_profile: z.any(),
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
      const { firstName, lastName, primaryEmailAddress, imageUrl } = user!;

      setValue("first_name", firstName || "");
      setValue("last_name", lastName || "");
      setValue("email", primaryEmailAddress!.emailAddress);
      setValue("photo_profile", imageUrl);
      setFile(imageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const onSubmit = async (data: EditUserProfileFormData) => {
    try {
      setLoading(true);

      if (data.photo_profile instanceof FileList) {
        await user!.setProfileImage({
          file: data.photo_profile[0],
        });
      }

      await user!.update({
        firstName: data.first_name,
        lastName: data.last_name,
      });
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    if (overlayRef.current) {
      gsap.to("#overlay", {
        duration: 1,
        backgroundImage: "linear-gradient(#EFEBFF, #33333355)",
        ease: "none",
        yoyo: true,
        repeat: -1,
        repeatDelay: 0,
      });
    }
  }, {});

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
    <EditorContentContainer>
      <form
        id="editUserProfileForm"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 bg-white flex-col gap-10 p-6 max-h-full overscroll-contain overflow-y-scroll scrollbar-none"
      >
        <div className="flex flex-col gap-2">
          <h2 className="heading-base text-dark_grey sm:heading-m">
            Customize your links
          </h2>
          <p className="body-m text-grey">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>

        <div className="flex flex-col flex-1 gap-6">
          <div className="p-5 flex flex-col gap-3 bg-light_grey rounded-[12px] sm:flex-row sm:gap-4 sm:items-center">
            <label className="body-m text-grey sm:w-[240px]">
              Profile picture
            </label>
            <UploadPhotoProfile
              name="photo_profile"
              error={errors.photo_profile}
              register={register}
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
            />
          </div>

          <div className="p-5 flex flex-col gap-3 bg-light_grey rounded-[12px]">
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
          </div>
        </div>
      </form>
      <div className="flex flex-col w-full">
        <hr className="h-px bg-borders w-full" />
        <div className="p-4">
          <Button formId="editUserProfileForm">
            {loading ? "Loading..." : "Save"}
          </Button>
        </div>
      </div>
    </EditorContentContainer>
  );
}
