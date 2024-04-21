"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const signInFormSchema = z
    .object({
      email: z.string().min(1, `can't be empty`).email(),
      password: z.string().min(8, "min 8 characters"),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  // Handle the submission of the sign-in form
  const onSubmit = async (data: SignInFormData) => {
    console.log(data);
  };

  // Display a form to capture the user's email and password
  return (
    <div className="flex flex-col flex-1 h-svh p-8 bg-light_grey sm:items-center sm:justify-center ">
      <div className="relative w-[182.5px] h-10">
        <Image src={"/images/logo-devlinks-large.svg"} fill alt="brand logo" />
      </div>

      <div className="mt-16 flex flex-col sm:bg-white sm:p-10 sm:rounded-[12px] sm:mt-[51px]">
        <div className="flex flex-col gap-2">
          <h1 className="heading-base sm:heading-m text-dark_grey">Login</h1>
          <p className="body-m text-grey">
            Add your details below to get back into the app
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-10"
        >
          <FormInput
            name="email"
            register={register}
            required
            error={errors.email}
            type="email"
            placeholder="e.g. alex@email.com"
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            label="Email address"
            iconSrc="/images/icon-email.svg"
          />

          <FormInput
            name="password"
            type="password"
            register={register}
            required
            error={errors.password}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            label="Password"
            iconSrc="/images/icon-password.svg"
          />

          <button
            type="submit"
            className="w-full h-[46px] flex items-center justify-center rounded-[8px] bg-purple text-white heading-s"
          >
            Login
          </button>
        </form>

        <Link
          href={"/sign-up"}
          className="flex flex-col items-center mt-6 sm:flex-row sm:gap-1 sm:justify-center"
        >
          <p className="text-grey body-m text-center">
            {`Don't have an account?`}
          </p>
          <p className="text-purple body-m">Create account</p>
        </Link>
      </div>
    </div>
  );
}
