import clsx from "clsx";
import Status from "@/app/ui/status";
import { formatHour } from "@/app/lib/helper";
import { getTodayAppointments } from "@/app/lib/data";

export default async function DashboardTable() {
  const todayAppointments = await getTodayAppointments();

  return (
    <div className="flex flex-col p-5 gap-2 border border-border rounded-xl bg-background-secondary w-full h-fit">
      <h2 className="text-[15px] text-foreground">Today Schedule</h2>
      {todayAppointments.length !== 0 ? (
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  Time
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  Patient Name
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  Complaint
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map((appointment, index) => (
                <tr
                  key={index}
                  className={clsx(
                    index < todayAppointments.length - 1 &&
                      "border-b border-border",
                  )}
                >
                  <td className="text-foreground-secondary text-[12px] py-[12.5px]">
                    {formatHour(appointment.datetime)}
                  </td>
                  <td className="text-foreground-secondary text-[12px] py-[12.5px]">
                    {appointment.patient.name}
                  </td>
                  <td className="text-foreground-secondary text-[12px] py-[12.5px]">
                    {appointment.complaint}
                  </td>
                  <td className="py-[12.5px]">
                    <Status status={appointment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-[14px] text-foreground-secondary">
            Today&apos;s schedule is empty
          </p>
        </div>
      )}
    </div>
  );
}
