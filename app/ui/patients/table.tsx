import clsx from "clsx";
import { formatDate, getInitials, stringToColor } from "@/app/lib/helper";
import { UpdatePatient } from "@/app/ui/patients/buttons";
import { getPatients, ITEMS_PER_PAGE } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import { SortableHeader } from "@/app/ui/sortable-header";

export default async function PatientsTable({
  search,
  from,
  to,
  page,
  sortBy,
  sortOrder,
}: {
  search?: string;
  from?: string;
  to?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
}) {
  const { patients, total } = await getPatients(
    search,
    from,
    to,
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
      {/* table */}
      <div className="w-full">
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px] flex gap-1.5">
                  <div className="flex gap-1.5">
                    Patient Name <SortableHeader sortKey="name" />
                  </div>
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  Telephone
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  Address
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  <div className="flex gap-1.5">
                    Date of Birth <SortableHeader sortKey="birthDate" />
                  </div>
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  <div className="flex gap-1.5">
                    Registered Date <SortableHeader sortKey="createdAt" />
                  </div>
                </th>
                <th className="text-left text-foreground font-normal text-[12px] py-[12.5px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {patients?.map((patient, index) => (
                <tr
                  key={index}
                  className={clsx(
                    index < patients.length - 1 && "border-b border-border",
                  )}
                >
                  <td className="py-[12.5px] text-[12px] text-foreground">
                    <div className="flex gap-2">
                      <div
                        className="rounded-full w-8 h-8 flex justify-center items-center"
                        style={{
                          backgroundColor: stringToColor(patient.name)
                            .backgroundColor,
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
                        <p className="text-foreground">{patient.name}</p>
                        <p className="text-muted">
                          ID: #{patient.id.toString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-[12.5px] text-[12px] text-foreground-secondary">
                    {patient.phone}
                  </td>
                  <td className="py-[12.5px] text-[12px] text-foreground-secondary">
                    {patient.address}
                  </td>
                  <td className="py-[12.5px] text-[12px] text-foreground-secondary">
                    {patient.birthDate ? formatDate(patient.birthDate) : "N/A"}
                  </td>
                  <td className="py-[12.5px] text-[12px] text-foreground-secondary">
                    {patient.createdAt ? formatDate(patient.createdAt) : "N/A"}
                  </td>
                  <td className="py-[12.5px] flex gap-3">
                    <UpdatePatient id={patient.id.toString()} />
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
          Showing of {startRange}-{endRange} of {total} patients
        </p>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
