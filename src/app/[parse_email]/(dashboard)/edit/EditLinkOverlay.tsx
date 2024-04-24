import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import MainContainer from "../../components/MainContainer";
import Image from "next/image";

export default function EditLinkOverlay() {
  const overlayRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <MainContainer>
      <div
        ref={overlayRef}
        className="relative h-[128px] w-[128px] rounded-[12px] m-auto"
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
    </MainContainer>
  );
}
