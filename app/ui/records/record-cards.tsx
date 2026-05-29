import {
  formatDate,
  formatHour,
  getInitials,
  stringToColor,
} from "@/app/lib/helper";
import { MedicalRecord } from "@/app/lib/type";
import { UpdateRecord } from "@/app/ui/records/buttons";

export default function RecordCard({
  medicalRecord,
  index,
}: {
  medicalRecord: MedicalRecord;
  index: number;
}) {
  return (
    <div className="w-full p-5 rounded-xl border border-border bg-background-secondary flex flex-col gap-2">
      <div className="w-full flex justify-between">
        <div>
          {/* title */}
          <h2 className="text-[15px] text-foreground">
            Record ID #{medicalRecord.id}
          </h2>
          {/* appointment finish datetime */}
          <div className="flex gap-1">
            <span className="material-symbols-outlined text-foreground-secondary size-14 w-fit h-fit">
              calendar_check
            </span>
            <p className="text-[11px] text-foreground-secondary">
              {medicalRecord.appointment &&
                formatDate(medicalRecord.appointment.datetime || "")}{" "}
              ·{" "}
              {medicalRecord.appointment &&
                formatHour(medicalRecord.appointment.datetime || "")}
            </p>
          </div>
        </div>
        {/* edit button */}
        <UpdateRecord id={medicalRecord.id.toString()} />
      </div>
      <div className="flex flex-col gap-3">
        {/* profile */}
        {index === 0 && (
          <>
            <div className="flex gap-2 items-center">
              <div
                className="rounded-full w-10 h-10 flex justify-center items-center"
                style={{
                  backgroundColor: stringToColor(
                    medicalRecord.appointment?.patient?.name || "",
                  ).backgroundColor,
                }}
              >
                <span
                  className="text-[14px] font-semibold"
                  style={{
                    color: stringToColor(
                      medicalRecord.appointment?.patient?.name || "",
                    ).color,
                  }}
                >
                  {getInitials(medicalRecord.appointment?.patient?.name || "")}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[14px] text-foreground font-semibold">
                  {medicalRecord.appointment?.patient?.name || ""}
                </p>
                <p className="text-[10px] text-foreground-secondary">
                  ID: #{medicalRecord.appointment?.patient?.id || ""} ·{" "}
                  {formatDate(
                    medicalRecord.appointment?.patient?.birthDate || "",
                  )}
                </p>
              </div>
            </div>
            {/* medical record data */}
            <hr className="border border-border/50" />
          </>
        )}
        {/* complaint */}
        <div>
          <p className="text-[12px] text-foreground">Complaint</p>
          <p className="text-[12px] text-foreground-secondary">
            {medicalRecord.appointment?.complaint}
          </p>
        </div>
        <hr className="border border-border/50" />
        {/* diagnosis */}
        <div>
          <p className="text-[12px] text-foreground">Diagnosis</p>
          <p className="text-[12px] text-foreground-secondary">
            {medicalRecord.diagnosis}
          </p>
        </div>
        <hr className="border border-border/50" />
        {/* treatment */}
        <div>
          <p className="text-[12px] text-foreground">Treatment</p>
          <p className="text-[12px] text-foreground-secondary">
            {medicalRecord.treatmentDetail}
          </p>
        </div>
        <p className="text-[11px] text-foreground-secondary/70 text-right">
          Created at {formatDate(medicalRecord.createdAt)} ·{" "}
          {formatHour(medicalRecord.createdAt)}
        </p>
      </div>
    </div>
  );
}
