import HeaderTab from "../HeaderTab";
import {
  IconLink,
  IconPreviewHeader,
  IconProfileDetailsHeader,
} from "../Icons";

export default function EditorNavbar() {
  return (
    <div className="flex flex-row w-full p-4 pl-6 justify-between bg-white">
      <div className="w-[52px] flex items-center">
        <div
          className={`bg-[url("/images/logo-devlinks-small.svg")] sm:bg-[url("/images/logo-devlinks-large.svg")] w-[32px] h-[32px] sm:w-[146px] sm:h-[32px] bg-cover bg-center`}
        />
      </div>

      <HeaderTab active Icon={IconLink} />

      <HeaderTab Icon={IconProfileDetailsHeader} />

      <div className="py-[11px] px-[16px] border border-purple rounded-[8px]">
        <IconPreviewHeader className="w-5 h-5" />
      </div>
    </div>
  );
}