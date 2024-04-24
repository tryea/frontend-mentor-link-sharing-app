import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
  return (
    <main className="z-0 flex max-w-vw flex-col flex-1 h-svh max-h-svh bg-light_grey overflow-hidden scrollbar-none">
      {children}
    </main>
  );
}
