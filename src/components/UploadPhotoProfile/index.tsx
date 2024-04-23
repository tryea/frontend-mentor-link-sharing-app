import { FieldError, UseFormRegister } from "react-hook-form";
import { IconUploadImage } from "../Icons";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

export type TUploadPhotoProfileProps = {
  name: string;
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  value: File | string | null;
  onChange: (file: File | null) => void;
};
export default function UploadPhotoProfile(props: TUploadPhotoProfileProps) {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const { ref, onChange, ...rest } = props.register(props.name);

  const onFileContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    inputFileRef.current?.click();
  };

  useEffect(() => {
    if (typeof props.value === "string") {
      setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div
        onClick={onFileContainerClick}
        className="relative w-[192px] h-[192px] bg-light_purple flex items-center justify-center gap-2 flex-col rounded-[12px]"
      >
        {props.value ? (
          <>
            {loading && <p className="body-s text-purple">Loading...</p>}
            <Image
              src={
                props.value instanceof File
                  ? URL.createObjectURL(props.value)
                  : props.value
              }
              onLoad={() => setLoading(false)}
              onLoadStart={() => setLoading(true)}
              alt="user photo profile"
              fill
              className="rounded-[12px]"
            />
          </>
        ) : (
          <>
            <IconUploadImage />
            <p className="heading-s text-purple">+ Upload Image</p>
          </>
        )}
      </div>
      <p className="body-s text-grey">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
      <input
        {...rest}
        ref={(e) => {
          ref(e);
          inputFileRef.current = e;
        }}
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null;

          props.onChange(file);
          onChange(e);
        }}
        multiple={false}
        accept=".jpg,.png"
        type="file"
        className="hidden"
      />
    </div>
  );
}
