"use client";

import Label from "@/app/ui/label";
import TextArea from "@/app/ui/textarea";
import Input from "@/app/ui/input";
import Button from "@/app/ui/button";
import { useActionState, useState } from "react";
import { createMedicalRecord, MedicalRecordState } from "@/app/lib/actions";

export default function Form({ id }: { id: string }) {
  const initialState: MedicalRecordState = { message: null, errors: {} };
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentResult, setTreatmentResult] = useState("");
  const [treatmentDetail, setTreatmentDetail] = useState("");
  const [state, formAction, isPending] = useActionState(
    createMedicalRecord,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      <input type="hidden" name="appointmentId" value={id} />
      <h2 className="text-[15px] text-foreground">New Record Details</h2>
      <div className="flex flex-col gap-3">
        {/* diagnosis input */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="diagnosis" nameOfLabel="Diagnosis" important />
          <div className="flex flex-col gap-1.5">
            <TextArea
              id="diagnosis"
              name="diagnosis"
              placeholder="The results of the doctor's examination and diagnosis"
              required
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
            {state?.errors?.diagnosis?.[0] && (
              <p className="text-[12px] text-red-700">
                {state.errors.diagnosis[0]}
              </p>
            )}
          </div>
        </div>
        {/* treatment name input */}
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
              value={treatmentResult}
              onChange={(e) => setTreatmentResult(e.target.value)}
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
              value={treatmentDetail}
              onChange={(e) => setTreatmentDetail(e.target.value)}
            />
            {state?.errors?.treatmentDetail?.[0] && (
              <p className="text-[12px] text-red-700">
                {state.errors.treatmentDetail[0]}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3 self-end">
          <Button
            nameOfButton="Reset"
            uiType="danger"
            name="reset"
            id="reset"
            size="default"
            disabled={isPending}
            type="button"
            onClick={() => {
              setDiagnosis("");
              setTreatmentResult("");
              setTreatmentDetail("");
            }}
          />
          <Button
            nameOfButton="Save Record"
            name="saveRecord"
            id="save-record"
            icon="check"
            uiType="primary"
            size="default"
            type="submit"
            disabled={isPending}
          />
        </div>
      </div>
    </form>
  );
}
