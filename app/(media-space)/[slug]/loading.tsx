import PhoneSkeleton from "@/components/Skeletons/phone";

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <PhoneSkeleton />
    </div>
  );
}
