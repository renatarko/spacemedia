export default function ProfileSkeleton() {
  return (
    <div className="h-full flex flex-col justify-between items-center animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-200" />

      <div className="flex flex-col gap-4 w-full my-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="w-full h-6 rounded-lg bg-gray-200" />
          ))}
      </div>

      <div className="flex flex-col gap-5 w-full my-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-full h-12 bg-gray-200 rounded-full border border-gray-300"
            />
          ))}
      </div>
    </div>
  );
}
