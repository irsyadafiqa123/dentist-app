import Filter from "@/app/ui/filter";
import LocalDate from "@/app/ui/local-date";
import PatientListWrapper from "@/app/ui/records/patients-list-wrapper";
import RecordPanel from "@/app/ui/records/record-panel";
import {
  PatientListCardSkeleton,
  RecordCardSkeleton,
} from "@/app/ui/records/skeletons";
import Search from "@/app/ui/search";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Records",
  description: "Manage medical records data",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    patient?: string;
    from?: string;
    to?: string;
    page?: string;
  }>;
}) {
  const { patient, from, to, page, search } = await searchParams;

  return (
    <main className="space-y-9">
      {/* title & date */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-lg font-semibold text-foreground">
          Medical Records
        </h1>
        <LocalDate />
      </div>
      <div className="flex flex-col gap-6">
        {/* search and filter */}
        <div className="flex gap-3">
          <Search placeholder="Search patient name..." />
          <Filter />
        </div>
        <div className="flex gap-6">
          {/* patient list card */}
          <Suspense fallback={<PatientListCardSkeleton />}>
            <PatientListWrapper patient={patient} page={page} search={search} />
          </Suspense>
          {/* record panel */}
          <Suspense key={patient} fallback={<RecordCardSkeleton />}>
            <RecordPanel selectedId={patient} from={from} to={to} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
