export default function Label({
  nameOfLabel,
  important = false,
  ...rest
}: {
  nameOfLabel: string;
  important?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className="text-[14px] text-foreground-secondary w-fit cursor-pointer"
      {...rest}
    >
      {nameOfLabel} {important && <span className="text-red-600">*</span>}
    </label>
  );
}
