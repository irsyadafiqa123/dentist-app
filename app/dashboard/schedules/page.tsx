import Button from "@/app/ui/button";
import StatCard from "@/app/ui/schedules/stat-card";
import Search from "@/app/ui/search";
import Link from "next/link";
import Table from "@/app/ui/schedules/table";
import { Metadata } from "next";
import Filter from "@/app/ui/filter";
import LocalDate from "@/app/ui/local-date";
import { StatCardSkeleton, TableSkeleton } from "@/app/ui/schedules/skeletons";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Schedules",
  description: "Manage appointments data",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    appointmentDate?: string;
    status?: string;
    page?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}) {
  const { search, appointmentDate, status, page, sortBy, sortOrder } =
    await searchParams;

  return (
    <main className="space-y-9">
      <div className="flex flex-col gap-0.5">
        {/* title & date */}
        <h1 className="text-lg font-semibold text-foreground">
          Appointment Schedule
        </h1>
        <LocalDate />
      </div>
      <div className="flex flex-col gap-6">
        {/* search and filter */}
        <div className="flex gap-3">
          <Search placeholder="Search patient name..." />
          <Filter />
          <Link href="/dashboard/schedules/create">
            <Button
              nameOfButton="Add Schedule"
              name="addSchedule"
              id="add-schedule"
              icon="add"
              uiType="primary"
              size="default"
            />
          </Link>
        </div>
        {/* stat card */}
        <Suspense fallback={<StatCardSkeleton />}>
          <StatCard appointmentDate={appointmentDate} status={status} />
        </Suspense>

        {/* table */}
        <Suspense fallback={<TableSkeleton />}>
          <Table
            search={search}
            appointmentDate={appointmentDate}
            page={page}
            status={status}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </Suspense>
      </div>
    </main>
  );
}
