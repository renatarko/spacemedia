export default function PhoneSkeleton() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="h-full max-w-[22rem] w-full flex flex-col justify-center items-center animate-pulse bg-gray-200 py-6 px-12 rounded-lg">
        <div className="w-24 h-24 rounded-full bg-gray-100 mb-6" />

        <div className="flex flex-col gap-4 w-full my-8">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="w-full h-6 rounded-lg bg-gray-100" />
            ))}
        </div>

        <div className="flex flex-col gap-5 w-full my-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="w-full h-8 bg-gray-100 rounded-lg" />
            ))}
        </div>
      </div>
    </div>
  );
}
