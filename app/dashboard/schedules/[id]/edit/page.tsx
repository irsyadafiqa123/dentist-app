import { getAppointmentById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Form from "@/app/ui/schedules/edit-form";
import ProfileCard from "@/app/ui/schedules/profile-card";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Schedule",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const appointment = await getAppointmentById(+id);

  if (!appointment) {
    return notFound();
  }

  return (
    <main className="flex flex-col gap-6 max-w-130">
      {/* breadcrumbs */}
      <Breadcrumbs
        breadcrumbs={[
          { label: "Schedules", href: "/dashboard/schedules" },
          {
            label: "Edit Schedule",
            href: `/dashboard/schedules/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="flex flex-col gap-4">
        {/* profile card */}
        <ProfileCard appointment={appointment} />
        {/* form */}
        <Form appointment={appointment} />
      </div>
    </main>
  );
}
