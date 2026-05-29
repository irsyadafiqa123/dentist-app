import Breadcrumbs from "@/app/ui/breadcrumbs";
import Form from "@/app/ui/patients/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Patient",
};

export default async function Page() {
  return (
    <main className="flex flex-col gap-6">
      {/* breadcrumbs */}
      <Breadcrumbs
        breadcrumbs={[
          { label: "Patiens", href: "/dashboard/patients" },
          {
            label: "Add Patient",
            href: "/dashboard/patients/create",
            active: true,
          },
        ]}
      />
      {/* form */}
      <Form />
    </main>
  );
}
