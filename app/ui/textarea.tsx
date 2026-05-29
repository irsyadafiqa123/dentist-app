import clsx from "clsx";

export default function TextArea({
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(
        "placeholder:text-sm border border-input rounded-lg p-3 w-full min-h-26 text-sm placeholder:text-muted",
        {
          "text-muted": rest.disabled,
        },
      )}
      {...rest}
    ></textarea>
  );
}
