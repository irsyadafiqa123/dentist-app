import Link from "next/link";
import Button from "@/app/ui/button";

export function UpdateRecord({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/records/${id}/edit`}>
      <Button
        nameOfButton="Edit"
        name="edit"
        icon="edit"
        uiType="secondary"
        size="small"
      />
    </Link>
  );
}
