"use client";

import Label from "@/app/ui/label";
import TextArea from "@/app/ui/textarea";
import Input from "@/app/ui/input";
import Button from "@/app/ui/button";
import { MedicalRecord } from "@/app/lib/type";
import { useActionState } from "react";
import { MedicalRecordState, updateMedicalRecord } from "@/app/lib/actions";

export default function EditRecordForm({
  medicalRecord,
}: {
  medicalRecord: MedicalRecord;
}) {
  const initialState: MedicalRecordState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    updateMedicalRecord,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="p-5 border border-border bg-background-secondary rounded-xl flex flex-col gap-4 w-full"
    >
      <input type="hidden" name="id" value={medicalRecord.id} />
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[15px] text-foreground">Medical Record Details</h2>
        {/* message */}
        {state?.message && (
          <p className="text-[13px] text-red-700">{state.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {/* complaint */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="complaint" nameOfLabel="Complaint" />
          <div className="border border-input p-3 w-full rounded-lg">
            <p className="text-foreground text-[14px]">
              {medicalRecord.appointment?.complaint}
            </p>
          </div>
        </div>
        {/* diagnosis input */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="diagnosis" nameOfLabel="Diagnosis" important />
          <div className="flex flex-col gap-1.5">
            <TextArea
              id="diagnosis"
              name="diagnosis"
              placeholder="The results of the doctor's examination and diagnosis"
              required
              defaultValue={medicalRecord.diagnosis}
            />
            {state?.errors?.diagnosis?.[0] && (
              <p className="text-[12px] text-red-700">
                {state.errors.diagnosis[0]}
              </p>
            )}
          </div>
        </div>
        {/* treatment input */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="treatment-result"
            nameOfLabel="Treatment Result"
            important
          />
          <div className="flex flex-col gap-1.5">
            <Input
              id="treatment-result"
              name="treatmentResult"
              required
              placeholder="Enter the treatment that was performed"
              defaultValue={medicalRecord.treatmentResult}
            />
            {state?.errors?.treatmentResult?.[0] && (
              <p className="text-[12px] text-red-700">
                {state.errors.treatmentResult[0]}
              </p>
            )}
          </div>
        </div>
        {/* treatment detail input */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="treatment-detail"
            nameOfLabel="Treatment Detail"
            important
          />
          <div className="flex flex-col gap-1.5">
            <TextArea
              id="treatment-detail"
              name="treatmentDetail"
              placeholder="Actions taken and doctor's recommendations"
              required
              defaultValue={medicalRecord.treatmentDetail}
            />
            {state?.errors?.treatmentDetail?.[0] && (
              <p className="text-[12px] text-red-700">
                {state.errors.treatmentDetail[0]}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-3 self-end">
        <Button
          nameOfButton="Cancel"
          uiType="secondary"
          name="cancel"
          id="cancel"
          size="default"
          type="reset"
          disabled={isPending}
        />
        <Button
          nameOfButton="Save Changes"
          name="saveChanges"
          id="save-changes"
          icon="check"
          uiType="primary"
          size="default"
          type="submit"
          disabled={isPending}
        />
      </div>
    </form>
  );
}
