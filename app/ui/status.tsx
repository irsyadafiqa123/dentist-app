import clsx from "clsx";

export default function Status({ status }: { status: string }) {
  return (
    <div
      className={clsx("px-2 py-[4.5px] rounded-full text-[11px] w-max", {
        "bg-success-bg text-success": status === "FINISHED",
        "bg-info-bg text-info": status === "BOOKED",
        "bg-danger-bg text-danger": status === "CANCELLED",
      })}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </div>
  );
}
