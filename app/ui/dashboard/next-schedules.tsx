import { getNextAppointments } from "@/app/lib/data";
import { formatDate, formatHour } from "@/app/lib/helper";

export default async function NextSchedules() {
  const nextAppointments = await getNextAppointments();

  return (
    <div className="flex flex-col gap-2 w-full p-5 border border-border rounded-xl bg-background-secondary">
      <h2 className="text-[15px] text-foreground">Next Schedules</h2>
      {nextAppointments.length !== 0 ? (
        <div className="flex flex-col gap-3">
          {nextAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center gap-0.5 p-3 border border-border rounded-lg"
            >
              <div className="w-full">
                <p className="text-foreground text-[12px]">
                  {appointment.patient.name}
                </p>
                <p className="text-foreground-secondary text-[12px]">
                  {appointment.treatmentPlan} ·{" "}
                  {formatDate(appointment.datetime)}
                </p>
              </div>
              <p className="text-primary text-[12px]">
                {formatHour(appointment.datetime)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-[14px] text-foreground-secondary">
            Next schedule is empty
          </p>
        </div>
      )}
    </div>
  );
}
