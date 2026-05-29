import clsx from "clsx";

// shimmer animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent dark:before:via-white/10 before:via-neutral-500/10 before:to-transparent";

// card stats
export function StatCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden flex flex-col justify-between h-[104.5px] p-5 w-full rounded-xl bg-background-secondary`}
    >
      <div className="w-40 h-4 rounded-md bg-background-skeleton-secondary"></div>
      <div className="w-10 h-8 rounded-md bg-background-skeleton"></div>
    </div>
  );
}

// patients table
export function TableSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden pb-5 px-5 pt-3 border border-border rounded-xl bg-background-secondary flex flex-col justify-between gap-4 h-155.25`}
    >
      {/* table */}
      <div className="overflow-x-auto flex flex-col justify-between grow">
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
      {/* pagination */}
      <div className="flex justify-between">
        <div className="w-40 h-4 rounded-md bg-background-skeleton"></div>
        <div className="w-40 h-8 rounded-md bg-background-skeleton"></div>
      </div>
    </div>
  );
}
