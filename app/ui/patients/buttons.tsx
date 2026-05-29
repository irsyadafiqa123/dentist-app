import Link from "next/link";
import Button from "@/app/ui/button";

export function UpdatePatient({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/patients/${id}/edit`}>
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

export function DeletePatient({
  id,
  isDisabled,
}: {
  id: string;
  isDisabled?: boolean;
}) {
  return (
    <Button
      nameOfButton="Delete"
      name="delete"
      icon="delete"
      uiType="danger"
      size="default"
      type="submit"
      form={`delete-patient-form-${id}`}
      disabled={isDisabled}
    />
  );
}
