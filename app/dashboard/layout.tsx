import React from "react";
import SideNav from "@/app/ui/dashboard/sidenav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-row">
      {/* sidebar */}
      <div className="w-16 lg:w-60 flex-none bg-background-secondary border-r border-border">
        <SideNav />
      </div>
      {/* main content */}
      <div className="grow px-6 py-3 max-h-screen overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
