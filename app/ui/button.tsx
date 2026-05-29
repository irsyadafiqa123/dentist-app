import clsx from "clsx";

export default function Button({
  nameOfButton,
  icon,
  uiType,
  size,
  disabled,
  className,
  ...rest
}: {
  nameOfButton: string;
  icon?: string;
  size: "small" | "default" | "large";
  uiType: "primary" | "secondary" | "danger";
  addedClassName?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={clsx(
        `flex cursor-pointer rounded-lg items-center duration-150 border justify-center ${className}`,
        {
          "bg-primary text-active border-primary hover:brightness-110":
            uiType === "primary",
          "text-primary border-primary hover:bg-primary hover:text-active":
            uiType === "secondary",
          "text-danger border-danger hover:bg-danger hover:text-active":
            uiType === "danger",
          "h-8 px-3 gap-1.5": size === "small",
          "px-4 h-11 gap-2.5": size === "default",
          "px-5 h-13": size === "large",
          "cursor-not-allowed opacity-50": disabled,
        },
      )}
    >
      {icon && (
        <span
          className={clsx("material-symbols-outlined w-fit h-fit", {
            "size-16": size === "small",
            "size-24": size === "default",
          })}
        >
          {icon}
        </span>
      )}
      <span
        className={clsx("text-sm", {
          "text-[12px]": size === "small",
          "text-[16px]": size === "large",
        })}
      >
        {nameOfButton}
      </span>
    </button>
  );
}
