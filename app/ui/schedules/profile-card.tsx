import { getInitials, stringToColor } from "@/app/lib/helper";
import { Appointment } from "@/app/lib/type";

export default function ProfileCard({
  appointment,
}: {
  appointment: Appointment;
}) {
  return (
    <div className="flex justify-between items-center bg-background-secondary p-5 rounded-xl border border-border w-full">
      <div className="flex gap-3 items-center">
        <div
          className="rounded-full w-12 h-12 flex justify-center items-center"
          style={{
            backgroundColor: stringToColor(appointment.patient.name || "")
              .backgroundColor,
          }}
        >
          <span
            className="text-[16px] font-semibold"
            style={{
              color: stringToColor(appointment.patient.name || "").color,
            }}
          >
            {getInitials(appointment.patient.name || "")}
          </span>
        </div>
        <div>
          <p className="text-[16px] text-foreground font-semibold">
            {appointment.patient.name}
          </p>
          <p className="text-[12px] text-foreground-secondary">
            ID: #{appointment.patient.id} · Appointment #{appointment.id}
          </p>
        </div>
      </div>
    </div>
  );
}
