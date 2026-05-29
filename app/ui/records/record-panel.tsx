import { getMedicalRecords } from "@/app/lib/data";
import RecordCard from "@/app/ui/records/record-cards";

export default async function RecordPanel({
  from,
  to,
  selectedId,
}: {
  from?: string;
  to?: string;
  selectedId?: string;
}) {
  if (!selectedId) {
    return (
      <div className="w-full flex flex-col justify-center">
        <div className="flex gap-2 items-center">
          <span className="material-symbols-outlined text-muted">
            chevron_backward
          </span>
          <p className="text-muted text-[15px]">
            Select a patient to view medical records
          </p>
        </div>
      </div>
    );
  }

  const medicalRecords = await getMedicalRecords(+selectedId, from, to);

  return (
    <div className="w-full flex flex-col gap-6 overflow-y-auto h-[692.5px]">
      {medicalRecords?.length !== 0 ? (
        <>
          {medicalRecords?.map((medicalRecord, index) => (
            <RecordCard
              key={medicalRecord.id}
              medicalRecord={medicalRecord}
              index={index}
            />
          ))}
        </>
      ) : (
        <div className="flex justify-center h-full items-center">
          <p className="text-[15px] text-foreground-secondary">
            Medical records is empty
          </p>
        </div>
      )}
    </div>
  );
}
