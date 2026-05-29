import clsx from "clsx";

// shimmer animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent dark:before:via-white/10 before:via-neutral-500/10 before:to-transparent";

// card stats
export function StatCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden flex flex-col justify-between h-[127.83px] p-5 w-full rounded-xl bg-background-secondary`}
    >
      <div className="w-40 h-4 rounded-md bg-background-skeleton-secondary"></div>
      <div className="w-10 h-8 rounded-md bg-background-skeleton"></div>
      <div className="w-30 h-4 rounded-md bg-background-skeleton"></div>
    </div>
  );
}

// today schedule table
export function TableSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden flex flex-col p-5 gap-2 border border-border rounded-xl bg-background-secondary w-full h-[524.167px]`}
    >
      <div className="w-40 h-4 rounded-md bg-background-skeleton-secondary"></div>
      <div className="relative overflow-x-auto h-full flex flex-col justify-between">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={clsx(index < 8 && "border-b border-border")}
          >
            <div className="flex">
              <div className="py-[12.5px] w-full">
                <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
              </div>
              <div className="py-[12.5px] w-full">
                <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
              </div>
              <div className="py-[12.5px] w-full">
                <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
              </div>
              <div className="py-[12.5px] w-full">
                <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// next schedules card
export function NextSchedulesCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden flex flex-col gap-2 w-full p-5 border border-border rounded-xl bg-background-secondary`}
    >
      <div className="w-40 h-4 rounded-md bg-background-skeleton-secondary"></div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-0.5 p-3 border border-border rounded-lg"
          >
            <div className="w-full flex flex-col gap-2">
              <div className="w-20 h-3 rounded-md bg-background-skeleton"></div>
              <div className="w-20 h-3 rounded-md bg-background-skeleton"></div>
            </div>
            <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// monthly schedule stats card
export function MonthlyStatsCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden flex flex-col w-full p-5 border border-border rounded-xl bg-background-secondary h-[180.5px]`}
    >
      <div className="flex flex-col gap-2 h-full justify-between">
        <div className="w-40 h-4 rounded-md bg-background-skeleton-secondary"></div>
        <div className="flex justify-between">
          <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
          <div className="w-10 h-4 rounded-md bg-background-skeleton"></div>
        </div>
        <div className="flex justify-between">
          <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
          <div className="w-10 h-4 rounded-md bg-background-skeleton"></div>
        </div>
        <div className="flex justify-between">
          <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
          <div className="w-10 h-4 rounded-md bg-background-skeleton"></div>
        </div>
        <hr className="boder border-border" />
        <div className="flex justify-between">
          <div className="w-20 h-4 rounded-md bg-background-skeleton"></div>
          <div className="w-10 h-4 rounded-md bg-background-skeleton"></div>
        </div>
      </div>
    </div>
  );
}
