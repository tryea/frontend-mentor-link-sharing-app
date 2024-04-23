import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { IconChevronDown } from "../Icons";

type Platform = {
  name: string;
  iconSrc: string;
};

type CustomSelectProps = {
  label: string;
  value: string;
  options: Platform[];
  onChange: (value: Platform) => void;
};

export default function CustomSelect({
  label,
  options,
  onChange,
  value,
}: CustomSelectProps) {
  gsap.registerPlugin(useGSAP);

  const [selectedOption, setSelectedOption] = useState<Platform>(
    options.find((val) => val.name === value) || options[0]
  );
  const [showOption, setShowOption] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleOptionSelect = (option: Platform) => {
    setSelectedOption(option);
    onChange(option);
    toggleShowOption();
  };

  const toggleShowOption = contextSafe(() => {
    if (showOption) {
      // close option
      setShowOption(false);
      gsap
        .timeline({ paused: false })
        .to("#option-container", {
          duration: 0.3,
          opacity: 0,
          y: -48,
          height: 0,
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: 0,
        })
        .to("#chevron-option", { rotate: 0 }, "<");
    } else {
      // open option
      setShowOption(true);
      gsap
        .timeline({ paused: false })
        .to("#option-container", {
          duration: 0.3,
          opacity: 0,
          y: -48,
          height: 168,
          marginTop: 8,
          paddingTop: 12,
          paddingBottom: 12,
        })
        .to("#chevron-option", { rotate: 180 })
        .to("#option-container", { duration: 0.3, opacity: 1, y: 0 }, "<");
    }
  });

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <label htmlFor="platform" className="body-s text-dark_grey">
        {label}
      </label>

      <div className="relative flex flex-col w-full ">
        <div
          onClick={toggleShowOption}
          className="z-30 rounded-[8px] body-m text-dark_grey flex flex-row gap-2 items-center bg-white py-3 px-4 border border-borders"
        >
          <selectedOption.iconSrc />
          <div className="flex flex-1">{selectedOption.name}</div>
          <IconChevronDown id="chevron-option" />
        </div>
        <div
          id="option-container"
          className="absolute left-0 top-14 w-full flex flex-col select-none z-20 opacity-0 mt-0 bg-white rounded-[8px] px-4 py-0 max-h-[168px] h-0 overflow-x-hidden overflow-y-scroll max-w-full"
        >
          {options.map((plat, idx) => {
            return (
              <div key={`option-${plat.name}`} className="flex flex-col">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleOptionSelect(plat);
                  }}
                  key={`option-${plat.name}`}
                  className="body-m text-dark_grey flex flex-row gap-2 items-center w-full"
                >
                  <plat.iconSrc />
                  {plat.name}
                </div>
                {idx < options.length - 1 && (
                  <hr className="h-px bg-borders my-3" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
