import { getDashboardStats } from "@/app/lib/data";

function StatCard({
  title,
  value,
  caption,
  captionColor = "text-muted",
}: {
  title: string;
  value: string;
  caption?: string;
  captionColor?: string;
}) {
  return (
    <div className="flex flex-col gap-1 p-5 w-full border border-border rounded-xl bg-background-secondary">
      <h2 className="text-[15px] text-foreground-secondary">{title}</h2>
      <p className="text-[24px] text-foreground">{value}</p>
      {caption && <p className={`text-sm ${captionColor}`}>{caption}</p>}
    </div>
  );
}

export async function PatientStatCard() {
  const { totalPatient, totalPatientsThisMonth } = await getDashboardStats();

  return (
    <StatCard
      title="Patient Amount"
      value={totalPatient.toString()}
      caption={`+${totalPatientsThisMonth.toString()} this month`}
      captionColor="text-info"
    />
  );
}

export async function TodayScheduleStatCard() {
  const { totalTodayAppointment, totalTodayCompleted } =
    await getDashboardStats();

  return (
    <StatCard
      title="Today Schedule"
      value={totalTodayAppointment.toString()}
      caption={`${totalTodayCompleted.toString()} is complete`}
      captionColor="text-success"
    />
  );
}

export async function FinishedMonthlyStatCard() {
  const { totalMonthlyCompleted, totalMonthlyAppointment } =
    await getDashboardStats();

  return (
    <StatCard
      title="This Month Complete"
      value={totalMonthlyCompleted.toString()}
      caption={`of ${totalMonthlyAppointment.toString()} total`}
    />
  );
}

export async function CancelledMonthlyStatCard() {
  const { totalMonthlyCancelled, totalMonthlyAppointment } =
    await getDashboardStats();

  return (
    <StatCard
      title="Cancelled This Month"
      value={totalMonthlyCancelled.toString()}
      caption={`of ${totalMonthlyAppointment.toString()} total`}
      captionColor="text-danger"
    />
  );
}
