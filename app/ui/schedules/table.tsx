import {
  formatDate,
  formatHour,
  getInitials,
  stringToColor,
} from "@/app/lib/helper";
import clsx from "clsx";
import Status from "@/app/ui/status";
import { UpdateSchedule } from "@/app/ui/schedules/buttons";
import Pagination from "@/app/ui/pagination";
import { getAppointments, ITEMS_PER_PAGE } from "@/app/lib/data";
import { SortableHeader } from "@/app/ui/sortable-header";

export default async function SchedulesTable({
  search,
  appointmentDate,
  status,
  page,
  sortBy,
  sortOrder,
}: {
  search?: string;
  appointmentDate?: string;
  status?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
}) {
  const { appointments, total } = await getAppointments(
    search,
    appointmentDate,
    status,
    page,
    sortBy,
    sortOrder,
  );

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // range for pagination information
  const startRange = ((page ? +page : 1) - 1) * ITEMS_PER_PAGE + 1;
  const endRange = Math.min((page ? +page : 1) * ITEMS_PER_PAGE, total);

  return (
    <div className="pb-5 px-5 pt-3 border border-border rounded-xl bg-background-secondary flex flex-col gap-4">
      <div className="w-full">
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  Time
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  <div className="flex gap-1.5">
                    Patient Name <SortableHeader sortKey="name" />
                  </div>
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  <div className="flex gap-1.5">
                    Treatment <SortableHeader sortKey="treatmentPlan" />
                  </div>
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  <div className="flex gap-1.5">
                    Status <SortableHeader sortKey="status" />
                  </div>
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  <div className="flex gap-1.5">
                    Date <SortableHeader sortKey="datetime" />
                  </div>
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appointment, index) => (
                <tr
                  key={index}
                  className={clsx(
                    index < appointments.length - 1 && "border-b border-border",
                  )}
                >
                  <td className="py-[12.5px] text-[12px] text-foreground-secondary">
                    {formatHour(appointment.datetime)}
                  </td>
                  <td className="py-[12.5px] text-[12px] text-foreground">
                    <div className="flex gap-2">
                      <div
                        className="rounded-full w-8 h-8 flex justify-center items-center"
                        style={{
                          backgroundColor: stringToColor(
                            appointment.patient.name || "",
                          ).backgroundColor,
                        }}
                      >
                        <span
                          className="text-[10px] font-semibold"
                          style={{
                            color: stringToColor(appointment.patient.name || "")
                              .color,
                          }}
                        >
                          {getInitials(appointment.patient.name || "")}
                        </span>
                      </div>
                      <div>
                        <p className="text-foreground">
                          {appointment.patient.name}
                        </p>
                        <p className="text-muted">
                          ID: #{appointment.patient.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="py-[12.5px] text-[12px] text-foreground-secondary">
                      {appointment.status === "FINISHED"
                        ? appointment.medicalRecord
                          ? appointment.medicalRecord.treatmentResult
                          : appointment.treatmentPlan
                        : appointment.treatmentPlan}
                    </p>
                  </td>
                  <td className="py-[12.5px]">
                    <Status status={appointment.status} />
                  </td>
                  <td className="py-[12.5px] text-[12px] text-foreground-secondary">
                    {formatDate(appointment.datetime)}
                  </td>
                  <td className="py-[12.5px]">
                    <UpdateSchedule id={appointment.id.toString()} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* pagination */}
      <div className="flex w-full justify-between items-center">
        <p className="text-[12px] text-foreground-secondary">
          Showing of {startRange}-{endRange} of {total} appointments
        </p>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
