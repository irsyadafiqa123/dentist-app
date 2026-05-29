import { getAppointmentsStats } from "@/app/lib/data";
import { formatDate } from "@/app/lib/helper";

export default async function StatCard({
  appointmentDate,
  status,
}: {
  appointmentDate?: string;
  status?: string;
}) {
  const appointmentStats = await getAppointmentsStats(appointmentDate, status);

  return (
    <div className="w-full p-5 flex justify-between bg-background-secondary border border-border rounded-xl">
      {/* schedule date & amount */}
      <div>
        <p className="text-[16px] text-foreground">
          {appointmentDate
            ? formatDate(appointmentDate.toString())
            : "All Dates"}
        </p>
        <p className="text-[14px] text-foreground-secondary">
          {appointmentStats.totalFiltered} appointments
        </p>
      </div>
      {/* status stats */}
      <div className="flex gap-6">
        <div>
          <p className="text-[16px] font-semibold text-center">
            {appointmentStats.totalFinished}
          </p>
          <p className="text-[14px] text-success">Finished</p>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-center">
            {appointmentStats.totalBooked}
          </p>
          <p className="text-[14px] text-info">Booked</p>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-center">
            {appointmentStats.totalCancelled}
          </p>
          <p className="text-[14px] text-danger">Cancelled</p>
        </div>
      </div>
    </div>
  );
}
