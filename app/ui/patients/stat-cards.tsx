import { getPatientsStats } from "@/app/lib/data";

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 p-5 w-full border border-border rounded-xl bg-background-secondary">
      <h2 className="text-[15px] text-foreground-secondary">{title}</h2>
      <p className="text-[24px] text-foreground">{value}</p>
    </div>
  );
}

export async function PatientAmountStatCard() {
  const { totalStatic } = await getPatientsStats();

  return <StatCard title="Patient Amount" value={totalStatic.toString()} />;
}

export async function ActivePatientsStatCard() {
  const { totalStatic } = await getPatientsStats();

  return <StatCard title="Active Patients" value={totalStatic.toString()} />;
}

export async function NewMonthlyPatientsStatCard() {
  const { totalNewThisMonthStatic } = await getPatientsStats();

  return (
    <StatCard
      title="New Patients This Month"
      value={totalNewThisMonthStatic.toString()}
    />
  );
}
