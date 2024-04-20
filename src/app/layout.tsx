import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { DeepPartial, LocalizationResource } from "@clerk/types";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localization: DeepPartial<LocalizationResource> = {
    formFieldInputPlaceholder__emailAddress: "e.g. alex@email.com",
    formFieldInputPlaceholder__password: "Enter your password",
    socialButtonsBlockButton: "Sign In with {{provider|titleize}}",
    signIn: {
      start: {
        title: "Login",
        subtitle: "Add your details below to get back into the app",
      },
    },
  };

  return (
    <ClerkProvider localization={localization}>
      <html lang="en">
        <body className={instrumentSans.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
