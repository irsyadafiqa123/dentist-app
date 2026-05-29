"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { name: "Patients", href: "/dashboard/patients", icon: "patient_list" },
  {
    name: "Schedules",
    href: "/dashboard/schedules",
    icon: "schedule",
  },
  { name: "Records", href: "/dashboard/records", icon: "folder" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "flex flex-row gap-3 items-center rounded-lg px-2.5 lg:px-4 py-3 duration-100 hover:bg-background-hover",
            {
              "bg-primary text-active hover:brightness-110 hover:bg-primary":
                pathname === link.href,
              "text-foreground": pathname !== link.href,
            },
          )}
        >
          <span className="material-symbols-outlined w-fit h-fit size-20">
            {link.icon}
          </span>
          <span className="text-sm hidden lg:block">{link.name}</span>
        </Link>
      ))}
    </>
  );
}
