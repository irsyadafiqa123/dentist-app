"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h2 className="text-[32px] text-foreground">Something went wrong!</h2>
          <p className="text-[14px] text-foreground-secondary">
            {error.message}
          </p>
        </div>
        <button
          className="flex cursor-pointer rounded-lg items-center duration-150 border justify-center w-fit bg-primary text-active border-primary hover:brightness-110 px-4 h-11 gap-2.5"
          onClick={
            // attempt to recover by re-fetching and re-rendering the segment
            () => unstable_retry()
          }
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
