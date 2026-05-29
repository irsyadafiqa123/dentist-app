import { formatDate, getInitials, stringToColor } from "@/app/lib/helper";
import { Patient } from "@/app/lib/type";

export default function ProfileCard({ patient }: { patient: Patient }) {
  return (
    <div className="flex justify-between items-center bg-background-secondary p-5 rounded-xl border border-border w-full">
      <div className="flex gap-3 items-center">
        <div
          className="rounded-full w-12 h-12 flex justify-center items-center"
          style={{
            backgroundColor: stringToColor(patient.name).backgroundColor,
          }}
        >
          <span
            className="text-[16px] font-semibold"
            style={{ color: stringToColor(patient.name).color }}
          >
            {getInitials(patient.name)}
          </span>
        </div>
        <div>
          <p className="text-[16px] text-foreground font-semibold">
            {patient.name}
          </p>
          <p className="text-[12px] text-foreground-secondary">
            ID: #{patient.id} · Registered since {formatDate(patient.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex gap-2.5 items-center rounded-full px-2 h-5.5 bg-success-bg">
        <div className="rounded-full w-1.5 h-1.5 bg-success"></div>
        <p className="text-[11px] text-success">Active Patient</p>
      </div>
    </div>
  );
}
