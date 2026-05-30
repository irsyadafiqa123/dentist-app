import { getPatientsName, ITEMS_PER_PAGE } from "@/app/lib/data";
import PatientList from "@/app/ui/records/patients-list";
import Pagination from "@/app/ui/pagination";

export default async function PatientListWrapper({
  search,
  page,
  patient,
}: {
  search?: string;
  page?: string;
  patient?: string;
}) {
  const currentPage = page ? +page : 1;

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const { patientsName, total } = await getPatientsName(search, skip, take);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // range for pagination information
  const startRange = ((page ? +page : 1) - 1) * ITEMS_PER_PAGE + 1;
  const endRange = Math.min((page ? +page : 1) * ITEMS_PER_PAGE, total);

  return (
    <div className="max-w-67.5 w-full p-5 rounded-xl border border-border bg-background-secondary flex flex-col gap-2 items-center h-fit">
      <PatientList patientsName={patientsName} selectedId={patient} />
      <div className="flex flex-col gap-2">
        <p className="text-[12px] text-foreground-secondary">
          Showing of {startRange}-{endRange} of {total} patients
        </p>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
