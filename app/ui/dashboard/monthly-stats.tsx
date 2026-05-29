import { getDashboardStats } from "@/app/lib/data";

export default async function MonthlyStats() {
  const {
    totalMonthlyCompleted,
    totalMonthlyCancelled,
    totalMonthlyAppointment,
    totalPatientsThisMonth,
  } = await getDashboardStats();

  return (
    <div className="flex flex-col gap-3 w-full p-5 border border-border rounded-xl bg-background-secondary">
      <h2 className="text-[15px] text-foreground">
        This Month&apos;s Schedule
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex">
          <p className="block w-full text-[12px] text-foreground-secondary">
            Total appointments
          </p>
          <p className="text-[12px] font-medium text-foreground">
            {totalMonthlyAppointment}
          </p>
        </div>
        <div className="flex">
          <p className="block w-full text-[12px] text-foreground-secondary">
            Finished
          </p>
          <p className="text-[12px] font-medium text-success">
            {totalMonthlyCompleted}
          </p>
        </div>
        <div className="flex">
          <p className="block w-full text-[12px] text-foreground-secondary">
            Cancelled
          </p>
          <p className="text-[12px] font-medium text-danger">
            {totalMonthlyCancelled}
          </p>
        </div>
        <hr className="boder border-border" />
        <div className="flex">
          <p className="block w-full text-[12px] text-foreground-secondary">
            New Patient
          </p>
          <p className="text-[12px] font-medium text-info">
            {totalPatientsThisMonth}
          </p>
        </div>
      </div>
    </div>
  );
}
