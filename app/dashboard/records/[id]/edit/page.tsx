import { getMedicalRecordById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Form from "@/app/ui/records/edit-form";
import ProfileCard from "@/app/ui/records/profile-card";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Record",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const medicalRecord = await getMedicalRecordById(+id);

  if (!medicalRecord) {
    return notFound();
  }

  return (
    <main className="flex flex-col gap-6 max-w-130">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Records", href: "/dashboard/records" },
          {
            label: "Edit Record",
            href: `/dashboard/records/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="flex flex-col gap-4">
        {/* profile card */}
        <ProfileCard medicalRecord={medicalRecord} />
        {/* edit form */}
        <Form medicalRecord={medicalRecord} />
      </div>
    </main>
  );
}
