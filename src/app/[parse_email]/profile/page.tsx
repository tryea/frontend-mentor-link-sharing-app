"use client";

import Button from "@/components/Button";
import EditorContentContainer from "@/components/EditorContentContainer";
import EditorNavbar from "@/components/EditorNavbar";
import { IconUploadImage } from "@/components/Icons";
import ProfileInput from "@/components/ProfileInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type EditUserProfileFormData = {
  first_name: string;
  last_name: string;
  email: string;
};
export default function EditUserProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const EditUserProfileFormSchema = z.object({
    first_name: z.string().min(1, "can't be empty"),
    last_name: z.string().min(1, "can't be empty"),
    email: z.string().email(),
  });

  const {
    register,
    formState: { errors },
  } = useForm<EditUserProfileFormData>({
    resolver: zodResolver(EditUserProfileFormSchema),
  });

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

          <div className="p-5 flex flex-col gap-3 bg-light_grey rounded-[12px]">
            <ProfileInput
              register={register}
              error={errors.first_name}
              label="First name*"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              name="first_name"
            />

            <ProfileInput
              register={register}
              error={errors.last_name}
              label="Last name*"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              name="last_name"
            />

            <ProfileInput
              register={register}
              error={errors.email}
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <hr className="h-px bg-borders w-full" />
          <div className="p-4">
            <Button>Save</Button>
          </div>
        </div>
      </EditorContentContainer>
    </main>
  );
}
