"use client";

import { generatePagination } from "@/app/lib/helper";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { replace } = useRouter();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathName}?${params.toString()}`);
  };

  // genereta number of array to displau
  const pages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex gap-1.5">
      {/* left arrow */}
      <PaginationArrow
        direction="left"
        isDisabled={currentPage === 1}
        onClick={() => createPageURL(currentPage - 1)}
      />

      {/* all number pages */}
      {pages.map((page, index) => (
        <PaginationNumber
          key={index}
          page={page}
          isActive={page === currentPage}
          onClick={() => createPageURL(+page)}
        />
      ))}

      {/* right arrow */}
      <PaginationArrow
        direction="right"
        isDisabled={currentPage === totalPages}
        onClick={() => createPageURL(currentPage + 1)}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  isActive,
  onClick,
}: {
  page: number | string;
  isActive: boolean;
  onClick: () => void;
}) {
  const isDots = page === "...";

  return (
    <button
      className={clsx(
        "text-foreground w-8 h-8 border-border hover:bg-primary hover:text-active flex cursor-pointer rounded-lg items-center justify-center duration-150 border disabled:text-input disabled:border-border disabled:hover:text-input disabled:hover:bg-transparent disabled:cursor-no-drop",
        {
          "bg-primary/20 border-primary": isActive,
        },
      )}
      disabled={isDots}
      onClick={onClick}
    >
      {page}
    </button>
  );
}

function PaginationArrow({
  direction,
  isDisabled,
  onClick,
}: {
  direction: "left" | "right";
  isDisabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="text-foreground w-8 h-8 border-border hover:bg-primary hover:text-active flex cursor-pointer rounded-lg items-center justify-center duration-150 border disabled:text-input disabled:border-border disabled:hover:text-input disabled:hover:bg-transparent disabled:cursor-no-drop"
    >
      {direction === "left" ? (
        <span className="material-symbols-outlined">arrow_left_alt</span>
      ) : (
        <span className="material-symbols-outlined">arrow_right_alt</span>
      )}
    </button>
  );
}
