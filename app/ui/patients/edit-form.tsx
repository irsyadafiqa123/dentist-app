"use client";

import Input from "@/app/ui/input";
import TextArea from "@/app/ui/textarea";
import Button from "@/app/ui/button";
import Label from "@/app/ui/label";
import { Patient } from "@/app/lib/type";
import { useActionState } from "react";
import { DeletePatient } from "@/app/ui/patients/buttons";
import { deletePatient, PatientState, updatePatient } from "@/app/lib/actions";

export default function EditPatientForm({ patient }: { patient: Patient }) {
  const initialState: PatientState = { message: null, errors: {} };
  const [editState, editFormAction, isEditPending] = useActionState(
    updatePatient,
    initialState,
  );
  const [deleteState, deleteFormAction, isDeletePending] = useActionState(
    deletePatient,
    undefined,
  );

  return (
    <>
      <form
        id={`delete-patient-form-${patient.id}`}
        action={deleteFormAction}
        className="hidden"
      >
        <input type="hidden" name="id" value={patient.id.toString()} />
      </form>
      <form
        action={editFormAction}
        className="max-w-130 p-5 border border-border bg-background-secondary rounded-xl flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[15px] text-foreground">Patient Details</h2>
          {/* messages */}
          {editState?.message && (
            <p className="text-[13px] text-red-700">{editState.message}</p>
          )}
          {deleteState?.message && (
            <p className="text-[13px] text-red-700">{deleteState.message}</p>
          )}
        </div>

        {/* id hidden input */}
        <input type="hidden" name="id" value={patient.id.toString()} />
        {/* full name input */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" nameOfLabel="Full Name" important />
          <div className="flex flex-col gap-1.5">
            <Input
              id="name"
              name="name"
              required
              placeholder="Enter the patient's full name"
              defaultValue={patient.name}
            />
            {editState?.errors?.name?.[0] && (
              <p className="text-[12px] text-red-700">
                {editState.errors.name[0]}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-6 w-full">
          {/* phone number input */}
          <div className="flex flex-col gap-1.5 w-full">
            <Label htmlFor="phone" nameOfLabel="Phone Number" important />
            <div className="flex flex-col gap-1.5">
              <Input
                id="phone"
                name="phone"
                placeholder="08xx-xxxx-xxxx"
                required
                type="number"
                defaultValue={patient.phone}
              />
              {editState?.errors?.phone?.[0] && (
                <p className="text-[12px] text-red-700">
                  {editState.errors.phone[0]}
                </p>
              )}
            </div>
          </div>
          {/* date of birth input */}
          <div className="flex flex-col gap-1.5 w-full">
            <Label htmlFor="date-of-birth" nameOfLabel="Date of Birth" />
            <div className="flex flex-col gap-1.5">
              <Input
                id="date-of-birth"
                name="dateOfBirth"
                type="date"
                required
                defaultValue={
                  patient.birthDate?.toISOString().split("T")[0] || ""
                }
              />
              {editState?.errors?.dateOfBirth?.[0] && (
                <p className="text-[12px] text-red-700">
                  {editState.errors.dateOfBirth[0]}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* address */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="address" nameOfLabel="Address" />
          <div className="flex flex-col gap-1.5">
            <TextArea
              id="address"
              name="address"
              placeholder="e.g. 123 Main Street, City"
              required
              defaultValue={patient.address || ""}
            />
            {editState?.errors?.address?.[0] && (
              <p className="text-[12px] text-red-700">
                {editState.errors.address[0]}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <DeletePatient
            id={patient.id.toString()}
            isDisabled={isEditPending || isDeletePending}
          />
          <div className="flex gap-3 self-end">
            <Button
              nameOfButton="Cancel"
              uiType="secondary"
              name="cancel"
              id="cancel"
              size="default"
              type="reset"
              disabled={isEditPending || isDeletePending}
            />
            <Button
              nameOfButton="Save Changes"
              name="saveChanges"
              id="save-changes"
              icon="check"
              uiType="primary"
              size="default"
              type="submit"
              disabled={isEditPending || isDeletePending}
            />
          </div>
        </div>
      </form>
    </>
  );
}
