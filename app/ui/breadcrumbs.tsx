import clsx from "clsx";
import Link from "next/link";

type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav>
      <ol className="flex">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={index}
            className={clsx("flex items-center justify-center", {
              "text-foreground": breadcrumb.active,
              "text-muted": !breadcrumb.active,
            })}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="material-symbols-outlined">chevron_right</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
