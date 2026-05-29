import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditPatientForm from "@/app/ui/patients/edit-form";
import ProfileCard from "@/app/ui/patients/profile-card";
import { Metadata } from "next";
import { getPatientById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Patient",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const patient = await getPatientById(+id);

  if (!patient) {
    return notFound();
  }

  return (
    <main className="flex flex-col gap-6 max-w-130">
      {/* breadcrumbs */}
      <Breadcrumbs
        breadcrumbs={[
          { label: "Patients", href: "/dashboard/patients" },
          {
            label: "Edit Patient",
            href: `/dashboard/patients/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="flex flex-col gap-4">
        {/* profile card */}
        <ProfileCard patient={patient} />
        {/* edit form */}
        <EditPatientForm patient={patient} />
      </div>
    </main>
  );
}
