import Image from "next/image";

export default function LinkEmptyState() {
  return (
    <>
      <div className="relative w-[124.77px] h-[80px]">
        <Image fill src={"/images/illustration-empty.svg"} alt="empty link" />
      </div>
      <h2 className="heading-base text-center text-dark_grey">{`Let's get you started`}</h2>
      <p className="body-m text-grey">
        {`Use the "Add new link" button to get started. Once you have more
            than one link, you can reorder and edit them. We're here to help you
            share your profiles with everyone!`}
      </p>
    </>
  );
}
