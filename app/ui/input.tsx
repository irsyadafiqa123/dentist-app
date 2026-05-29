import clsx from "clsx";

export default function Input({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "placeholder:text-sm border border-input rounded-lg px-3 text-sm placeholder:text-muted dark:[&::-webkit-calendar-picker-indicator]:invert",
        {
          "w-[16.67px] h-[16.67px] cursor-pointer": rest.type === "radio",
          "h-11 w-full": !(rest.type === "radio"),
          "text-muted": rest.disabled,
        },
      )}
      {...rest}
    />
  );
}
