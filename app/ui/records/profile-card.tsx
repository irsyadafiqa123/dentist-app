import { getInitials, stringToColor } from "@/app/lib/helper";
import { MedicalRecord } from "@/app/lib/type";

export default function ProfileCard({
  medicalRecord,
}: {
  medicalRecord: MedicalRecord;
}) {
  return (
    <div className="bg-background-secondary p-5 rounded-xl border border-border w-full">
      <div className="flex gap-3 items-center">
        <div
          className="rounded-full w-12 h-12 flex justify-center items-center"
          style={{
            backgroundColor: stringToColor(
              medicalRecord.appointment?.patient?.name || "",
            ).backgroundColor,
          }}
        >
          <span
            className="text-[16px] font-semibold"
            style={{
              color: stringToColor(
                medicalRecord.appointment?.patient?.name || "",
              ).color,
            }}
          >
            {getInitials(medicalRecord.appointment?.patient?.name || "")}
          </span>
        </div>
        <div>
          <p className="text-[16px] text-foreground font-semibold">
            {medicalRecord.appointment?.patient?.name || ""}
          </p>
          <p className="text-[12px] text-foreground-secondary">
            ID: #{medicalRecord.appointment?.patient?.id} · Record #
            {medicalRecord.id}
          </p>
        </div>
      </div>
    </div>
  );
}
