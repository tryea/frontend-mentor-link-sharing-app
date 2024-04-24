import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
  return (
    <main className="flex  flex-col flex-1 h-svh max-h-svh bg-light_grey overflow-hidden">
      {children}
    </main>
  );
}
