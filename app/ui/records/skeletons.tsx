// shimmer animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent dark:before:via-white/10 before:via-neutral-500/10 before:to-transparent";

// patient list card
export function PatientListCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden min-h-[692.5px] max-w-67.5 w-full p-5 rounded-xl border border-border bg-background-secondary flex flex-col gap-3 items-center h-fit`}
    >
      <div className={`flex flex-col gap-3 w-full h-full grow`}>
        <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg flex gap-2 p-3 items-center cursor-pointer hover:bg-background-hover duration-150 border border-border bg-transparent"
          >
            <div className="rounded-full w-8 h-8 flex justify-center items-center">
              <div className="rounded-full w-8 h-8 bg-background-skeleton"></div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
              <div className="w-10 h-3 rounded-md bg-background-skeleton"></div>
            </div>
          </div>
        ))}
      </div>
      {/* pagination */}
      <div className="flex flex-col gap-2">
        <div className="w-40 h-4 rounded-md bg-background-skeleton"></div>
        <div className="w-40 h-8 rounded-md bg-background-skeleton"></div>
      </div>
    </div>
  );
}

// record card
export function RecordCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden w-full p-5 rounded-xl border border-border bg-background-secondary flex flex-col gap-2 h-[343.5px] `}
    >
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-1">
          {/* title */}
          <div className="w-31 h-4 rounded-md bg-background-skeleton"></div>
          {/* appointment finish datetime */}
          <div className="flex gap-1">
            <div className="w-20 h-3 rounded-md bg-background-skeleton"></div>
            <div className="w-10 h-3 rounded-md bg-background-skeleton"></div>
          </div>
        </div>
        {/* edit button */}
        <div className="w-20 h-8 rounded-md bg-background-skeleton"></div>
      </div>
      <div className="flex flex-col h-full justify-between">
        {/* profile */}
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-10 h-10 bg-background-skeleton flex justify-center items-center"></div>
          <div className="flex flex-col gap-1">
            <div className="w-30 h-4 rounded-md bg-background-skeleton"></div>
            <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
          </div>
        </div>
        {/* medical record data */}
        <hr className="border border-border/50" />
        {/* complaint */}
        <div className="flex flex-col gap-1">
          <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
          <div className="w-40 h-4 rounded-md bg-background-skeleton"></div>
        </div>
        <hr className="border border-border/50" />
        {/* diagnosis */}
        <div className="flex flex-col gap-1">
          <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
          <div className="w-40 h-4 rounded-md bg-background-skeleton"></div>
        </div>
        <hr className="border border-border/50" />
        {/* treatment */}
        <div className="flex flex-col gap-1">
          <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
          <div className="w-40 h-4 rounded-md bg-background-skeleton"></div>
        </div>
        <div className="w-40 h-3 rounded-md bg-background-skeleton self-end"></div>
      </div>
    </div>
  );
}
