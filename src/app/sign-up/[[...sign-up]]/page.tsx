"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FormInput from "@/components/FormInput";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type SignUpFormData = {
  email: string;
  create_password: string;
  confirm_password: string;
};

export default function SignUpForm() {
  const { isLoaded, signUp } = useSignUp();
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const SignUpFormSchema: ZodType<SignUpFormData> = z
    .object({
      email: z.string().email(),
      create_password: z.string().min(8, { message: "min 8 characters" }),
      confirm_password: z.string(),
    })
    .refine((data) => data.confirm_password === data.create_password, {
      message: "Please check again",
      path: ["confirm_password"],
    });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
  });

  // Handle the submission of the sign-in form
  const onSubmit = async (data: SignUpFormData) => {
    try {
      setLoading(true);
      const completeSignUp = await signUp!.create({
        emailAddress: data.email,
        password: data.create_password,
      });

      if (completeSignUp.status !== "complete") {
        setLoading(false);
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        setLoading(false);
        router.replace("/sign-in");
      }
    } catch (error: any) {
      setLoading(false);
      console.error(JSON.stringify(error, null, 2));
    }
  };

  // Display a form to capture the user's email and password
  return (
    <div className="flex flex-col flex-1 h-svh max-h-svh p-8 bg-light_grey">
      <div className="flex flex-col flex-1 max-h-full sm:items-center sm:justify-center">
        <Image
          src={"/images/logo-devlinks-large.svg"}
          width={182.5}
          height={40}
          alt="brand logo"
        />

        <div className="mt-14 sm:mb-8 flex max-h-full flex-col sm:bg-white sm:p-10 sm:rounded-[12px] sm:mt-[51px] overflow-y-scroll scrollbar-none overscroll-y-contain">
          <div className="flex flex-col gap-2">
            <h1 className="heading-base sm:heading-m text-dark_grey">
              Create account
            </h1>
            <p className="body-m text-grey">
              {`Let's get you started sharing your links!`}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-10"
          >
            <FormInput
              name="email"
              type="email"
              placeholder="e.g. alex@email.com"
              label="Email address"
              iconSrc="/images/icon-email.svg"
              register={register}
              error={errors.email}
            />

            <FormInput
              name="create_password"
              type="password"
              placeholder="At least .8 characters"
              label="Create Password"
              iconSrc="/images/icon-password.svg"
              register={register}
              error={errors.create_password}
            />

            <FormInput
              name="confirm_password"
              type="password"
              placeholder="At least .8 characters"
              label="Confirm Password"
              iconSrc="/images/icon-password.svg"
              register={register}
              error={errors.confirm_password}
            />

            <button
              type="submit"
              className="w-full h-[46px] flex items-center justify-center rounded-[8px] bg-purple text-white heading-s"
            >
              {!loading ? "Create new account" : "Loading..."}
            </button>
          </form>

          <div className="flex flex-col items-center mt-6 sm:flex-row sm:gap-1 sm:justify-center">
            <p className="text-grey body-m text-center">
              {`Don't have an account?`}
            </p>
            <p className="text-purple body-m">Create account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
