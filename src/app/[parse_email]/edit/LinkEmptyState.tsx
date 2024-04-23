import Image from "next/image";

export default function LinkEmptyState() {
  return (
    <div
      className={`z-0 bg-light_grey p-5 rounded-[12px] items-center justify-center gap-6 sm:gap-10 flex flex-col flex-1`}
    >
      <div className="relative w-[124.77px] h-[80px] sm:w-[249.53px] sm:h-[160px]">
        <Image fill src={"/images/illustration-empty.svg"} alt="empty link" />
      </div>
      <div className="flex flex-col gap-6 sm:gap-6">
        <h2 className="heading-base text-center text-dark_grey sm:heading-m">{`Let's get you started`}</h2>
        <p className="body-m text-grey">
          {`Use the "Add new link" button to get started. Once you have more
            than one link, you can reorder and edit them. We're here to help you
            share your profiles with everyone!`}
        </p>
      </div>
    </div>
  );
}
