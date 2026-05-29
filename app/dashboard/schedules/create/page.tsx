import { getPatientsName } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Form from "@/app/ui/schedules/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Schedule",
};

export default async function Page() {
  const { patientsName } = await getPatientsName();

  return (
    <main className="flex flex-col gap-6">
      {/* breadcrumbs */}
      <Breadcrumbs
        breadcrumbs={[
          { label: "Schedules", href: "/dashboard/schedules" },
          {
            label: "Add Schedule",
            href: "/dashboard/schedules/create",
            active: true,
          },
        ]}
      />
      {/* form */}
      <Form patientsName={patientsName} />
    </main>
  );
}
