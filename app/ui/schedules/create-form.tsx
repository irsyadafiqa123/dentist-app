"use client";

import Input from "@/app/ui/input";
import Button from "@/app/ui/button";
import Label from "@/app/ui/label";
import { Patient } from "@/app/lib/type";
import TextArea from "@/app/ui/textarea";
import { useActionState, useState } from "react";
import { AppointmentState, createAppointment } from "@/app/lib/actions";

export default function Form({
  patientsName,
}: {
  patientsName: Pick<Patient, "id" | "name">[];
}) {
  const initialState: AppointmentState = { message: null, errors: {} };
  const [patientId, setPatientId] = useState("");
  const [complaint, setComplaint] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [state, formAction, isPending] = useActionState(
    createAppointment,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="max-w-130 p-5 border border-border bg-background-secondary rounded-xl flex flex-col gap-4"
    >
      <h2 className="text-[15px] text-foreground">New Appointment Details</h2>
      <div className="flex flex-col gap-3">
        {/* select patients input */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="patient" nameOfLabel="Patient" important />
          <div className="flex flex-col gap-1.5">
            <div className="relative">
              <select
                id="patient"
                name="patientId"
                className="h-11 placeholder:text-sm border border-input rounded-lg px-3 w-full text-sm placeholder:text-muted appearance-none cursor-pointer"
                required
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              >
                <option value="" disabled className="bg-background-secondary">
                  Select a patient
                </option>
                {patientsName.map((patient, index) => (
                  <option
                    value={patient.id}
                    key={index}
                    className="bg-background text-foreground border border-border"
                  >
                    {patient.name}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined w-fit h-fit pointer-events-none absolute top-1/2 -translate-y-1/2 text-foreground-secondary right-3 size-24">
                keyboard_arrow_down
              </span>
            </div>
            {state?.errors?.patientId?.[0] && (
              <p className="text-[12px] text-red-700">
                {state.errors.patientId[0]}
              </p>
            )}
          </div>
        </div>
        {/* complaint input */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="complaint" nameOfLabel="Complaint" important />
          <div className="flex flex-col gap-1.5">
            <TextArea
              id="complaint"
              name="complaint"
              placeholder="The main complaint conveyed by the patient"
              required
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
            />
            {state?.errors?.complaint?.[0] && (
              <p className="text-[12px] text-red-700">
                {state.errors.complaint[0]}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-6 w-full">
            {/* date input */}
            <div className="flex flex-col gap-1.5 w-full">
              <Label htmlFor="date" nameOfLabel="Date" important />
              <Input
                id="date"
                name="date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            {/* time input */}
            <div className="flex flex-col gap-1.5 w-full">
              <Label htmlFor="time" nameOfLabel="Time" important />
              <Input
                id="time"
                name="time"
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          {state?.errors?.datetime?.[0] && (
            <p className="text-[12px] text-red-700">
              {state.errors.datetime[0]}
            </p>
          )}
        </div>
        {/* treatment input */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="treatment-plan"
            nameOfLabel="Treatment Plan"
            important
          />
          <div className="flex flex-col gap-1.5">
            <Input
              id="treatment-plan"
              name="treatmentPlan"
              required
              placeholder="Enter what treatment will be carried out"
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
            />
            {state?.errors?.treatmentPlan?.[0] && (
              <p className="text-[12px] text-red-700">
                {state.errors.treatmentPlan[0]}
              </p>
            )}
          </div>
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
            setPatientId("");
            setComplaint("");
            setDate("");
            setTime("");
            setTreatmentPlan("");
          }}
        />
        <Button
          nameOfButton="Save Schedule"
          name="saveSchedule"
          id="save-schedule"
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
