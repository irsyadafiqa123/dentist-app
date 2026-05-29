import Button from "@/app/ui/button";
import {
  ActivePatientsStatCard,
  NewMonthlyPatientsStatCard,
  PatientAmountStatCard,
} from "@/app/ui/patients/stat-cards";
import Search from "@/app/ui/search";
import Table from "@/app/ui/patients/table";
import Link from "next/link";
import Filter from "@/app/ui/filter";
import { Metadata } from "next";
import LocalDate from "@/app/ui/local-date";
import { Suspense } from "react";
import { StatCardSkeleton, TableSkeleton } from "@/app/ui/patients/skeletons";

export const metadata: Metadata = {
  title: "Patients",
  description: "Manage patients data",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    from?: string;
    to?: string;
    page?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}) {
  // get patients data from database
  const { from, page, search, to, sortBy, sortOrder } = await searchParams;

  return (
    <main className="space-y-9">
      <div className="flex flex-col gap-6">
        {/* title & date */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-lg font-semibold text-foreground">
            Patient Management
          </h1>
          <LocalDate />
        </div>
        {/* stat cards */}
        <div className="flex gap-6 w-full">
          <Suspense fallback={<StatCardSkeleton />}>
            <PatientAmountStatCard />
          </Suspense>
          <Suspense fallback={<StatCardSkeleton />}>
            <ActivePatientsStatCard />
          </Suspense>
          <Suspense fallback={<StatCardSkeleton />}>
            <NewMonthlyPatientsStatCard />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {/* filter and search */}
        <div className="flex gap-3">
          <Search placeholder="Search patient name..." />
          <Filter />
          <Link href="/dashboard/patients/create">
            <Button
              nameOfButton="Add Patient"
              name="addPatient"
              id="add-patient"
              icon="add"
              uiType="primary"
              size="default"
            />
          </Link>
        </div>
        {/* table */}
        <Suspense fallback={<TableSkeleton />}>
          <Table
            search={search}
            from={from}
            to={to}
            page={page}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </Suspense>
      </div>
    </main>
  );
}
