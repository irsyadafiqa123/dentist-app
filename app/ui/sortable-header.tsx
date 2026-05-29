"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortableHeader({ sortKey }: { sortKey: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentSortBy = searchParams.get("sortBy");
  const currentSortOrder = searchParams.get("sortOrder");
  const isActive = currentSortBy === sortKey;

  const handleSort = () => {
    const params = new URLSearchParams(searchParams);

    params.set("sortBy", sortKey);
    params.set(
      "sortOrder",
      isActive && currentSortOrder === "asc" ? "desc" : "asc",
    );

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button onClick={handleSort}>
      {isActive ? (
        currentSortOrder === "desc" ? (
          <span className="material-symbols-outlined size-16 w-fit h-fit cursor-pointer">
            arrow_drop_down
          </span>
        ) : (
          <span className="material-symbols-outlined size-16 w-fit h-fit cursor-pointer">
            arrow_drop_up
          </span>
        )
      ) : (
        <span className="material-symbols-outlined size-16 w-fit h-fit cursor-pointer">
          arrow_drop_down
        </span>
      )}
    </button>
  );
}
