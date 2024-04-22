import { UserLink } from "@/context/User/Context";
import SharingLinkInput from "../SharingLinkInput";
import { IconDragAndDrop } from "../Icons";
import CustomSelect from "../CustomSelect";
import { useUserStore } from "@/context/User/useUser";
import { Platforms } from "@/constants/Platform";
import { useState } from "react";

export type TInputSharingLinkContainerProps = {
  id: UserLink["id"];
  url: UserLink["url"];
  platform: UserLink["platform"];
  index: number;
};

export type InputSharingLinkFormData = {
  platform: string;
  url: string;
};

export default function InputSharingLinkContainer(
  props: TInputSharingLinkContainerProps
) {
  const { setUrl, setPlatform } = useUserStore((state) => state);
  const [errors, setErrors] = useState({
    platform: null,
    url: null,
  });

  return (
    <div
      key={props.id}
      className="flex flex-col gap-3 w-full bg-light_grey p-5 rounded-[12px]"
    >
      <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <IconDragAndDrop className="w-[12px] h-[6px] text-grey" />
          <p className="heading-s text-grey">Link #{props.index + 1}</p>
        </div>
        <div className="body-m text-grey">Remove</div>
      </div>

      <CustomSelect
        label="Platform"
        value={props.platform}
        onChange={(platform) => {
          setPlatform(props.index, platform.name);
        }}
        options={Platforms}
      />

      <SharingLinkInput
        label="Link"
        iconSrc="/images/icon-links-header.svg"
        name="link"
        placeholder="e.g. https://www.github.com/johnappleseed"
        value={props.url}
        onChange={(e) => {
          setUrl(props.index, e.target.value);
        }}
      />
    </div>
  );
}
