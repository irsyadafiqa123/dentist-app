import Greeting from "@/app/ui/dashboard/greeting";
import MonthlyStats from "@/app/ui/dashboard/monthly-stats";
import NextSchedules from "@/app/ui/dashboard/next-schedules";
import {
  MonthlyStatsCardSkeleton,
  NextSchedulesCardSkeleton,
  StatCardSkeleton,
  TableSkeleton,
} from "@/app/ui/dashboard/skeletons";
import {
  CancelledMonthlyStatCard,
  FinishedMonthlyStatCard,
  PatientStatCard,
  TodayScheduleStatCard,
} from "@/app/ui/dashboard/stat-cards";
import Table from "@/app/ui/dashboard/table";
import LocalDate from "@/app/ui/local-date";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main className="space-y-9">
      <div className="flex flex-col gap-6">
        {/* title & date */}
        <div className="flex flex-col gap-0.5">
          <SessionProvider>
            <Greeting />
          </SessionProvider>
          <LocalDate />
        </div>
        <div className="flex gap-6 w-full">
          {/* stat cards */}
          <Suspense fallback={<StatCardSkeleton />}>
            <PatientStatCard />
          </Suspense>
          <Suspense fallback={<StatCardSkeleton />}>
            <TodayScheduleStatCard />
          </Suspense>
          <Suspense fallback={<StatCardSkeleton />}>
            <FinishedMonthlyStatCard />
          </Suspense>
          <Suspense fallback={<StatCardSkeleton />}>
            <CancelledMonthlyStatCard />
          </Suspense>
        </div>
      </div>
      <div className="flex gap-6">
        {/* table */}
        <Suspense fallback={<TableSkeleton />}>
          <Table />
        </Suspense>
        <div className="max-w-67.5 w-full gap-6 flex flex-col">
          {/* next schedules */}
          <Suspense fallback={<NextSchedulesCardSkeleton />}>
            <NextSchedules />
          </Suspense>
          {/* monthly stats */}
          <Suspense fallback={<MonthlyStatsCardSkeleton />}>
            <MonthlyStats />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
