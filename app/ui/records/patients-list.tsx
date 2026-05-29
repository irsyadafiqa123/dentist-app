"use client";

import { getInitials, stringToColor } from "@/app/lib/helper";
import { Patient } from "@/app/lib/type";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PatientList({
  patientsName,
  selectedId,
}: {
  patientsName: Pick<Patient, "id" | "name">[];
  selectedId?: string;
}) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const isClicked = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("patient", id);
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <h2 className="text-[15px] text-foreground">Patients</h2>
      {patientsName.map((patient) => (
        <button
          onClick={() => isClicked(patient.id.toString())}
          key={patient.id}
          className={clsx(
            "rounded-lg flex gap-2 p-3 items-center cursor-pointer hover:bg-background-hover duration-150 border",
            {
              "border-primary bg-primary/20 hover:bg-primary/20":
                selectedId === patient.id.toString(),
              "border-border bg-transparent": !(
                selectedId === patient.id.toString()
              ),
            },
          )}
        >
          <div
            className="rounded-full w-8 h-8 flex justify-center items-center"
            style={{
              backgroundColor: stringToColor(patient.name).backgroundColor,
            }}
          >
            <span
              className="text-[10px] font-semibold"
              style={{ color: stringToColor(patient.name).color }}
            >
              {getInitials(patient.name)}
            </span>
          </div>
          <div>
            <p className="text-[12px] text-foreground">{patient.name}</p>
            <p className="text-[10px] text-muted w-fit">ID: #{patient.id}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
