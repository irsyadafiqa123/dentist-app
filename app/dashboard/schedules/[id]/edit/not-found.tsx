import Button from "@/app/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h2 className="text-[32px] text-foreground">Schedule Not Found</h2>
          <p className="text-[14px] text-foreground-secondary">
            The schedule data you&apos;re looking for may have been deleted,
            moved, or does not exist.
          </p>
        </div>
        <Link href="/dashboard">
          <Button
            nameOfButton="Go to Dashboard"
            size="default"
            uiType="primary"
          />
        </Link>
      </div>
    </div>
  );
}
