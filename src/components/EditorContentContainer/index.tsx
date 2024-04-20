import { ReactNode } from "react";

export default function EditorContentContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 p-4 pb-6 bg-transparent max-h-full overflow-hidden">
      <div className="flex flex-1 flex-col rounded-[12px] bg-white max-h-full overflow-hidden ">
        {children}
      </div>
    </div>
  );
}
