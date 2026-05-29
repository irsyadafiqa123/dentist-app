"use client";

import Input from "@/app/ui/input";
import Button from "@/app/ui/button";
import Label from "@/app/ui/label";
import { Appointment } from "@/app/lib/type";
import { DeleteSchedule } from "@/app/ui/schedules/buttons";
import TextArea from "@/app/ui/textarea";
import { useActionState } from "react";
import {
  AppointmentState,
  deleteAppointment,
  updateAppointment,
} from "@/app/lib/actions";
import RecordForm from "@/app/ui/records/create-form";

export default function EditScheduleForm({
  appointment,
}: {
  appointment: Appointment;
}) {
  const initialState: AppointmentState = { message: null, errors: {} };
  const [editState, formEditState, isEditPending] = useActionState(
    updateAppointment,
    initialState,
  );
  const [deleteState, deleteFormAction, isDeletePending] = useActionState(
    deleteAppointment,
    undefined,
  );
  const isDisabled =
    appointment.status === "FINISHED" || appointment.status === "CANCELLED";

  return (
    <>
      {/* delete form */}
      {!isDisabled && (
        <form
          id={`delete-schedule-form-${appointment.id}`}
          action={deleteFormAction}
          className="hidden"
        >
          <input type="hidden" name="id" value={appointment.id.toString()} />
        </form>
      )}
      <div className="max-w-130 p-5 border border-border bg-background-secondary rounded-xl flex flex-col gap-4">
        {/* edit form */}
        <form action={formEditState} className="flex flex-col gap-4 w-full">
          <input type="hidden" name="id" value={appointment.id} />
          <input
            type="hidden"
            name="patientId"
            value={appointment.patient.id}
          />

          <div className="flex flex-col gap-1.5">
            <h2 className="text-[15px] text-foreground">Appointment Details</h2>
            {/* messages */}
            {editState?.message && (
              <p className="text-[13px] text-red-700">{editState.message}</p>
            )}
            {deleteState?.message && (
              <p className="text-[13px] text-red-700">{deleteState.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {/* complaint input */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="complaint" nameOfLabel="Complaint" important />
              <div className="flex flex-col gap-1.5">
                <TextArea
                  id="complaint"
                  name="complaint"
                  placeholder="The main complaint conveyed by the patient"
                  required
                  defaultValue={appointment.complaint}
                  disabled={isDisabled}
                />
                {editState?.errors?.complaint?.[0] && (
                  <p className="text-[12px] text-red-700">
                    {editState.errors.complaint[0]}
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
                    defaultValue={
                      appointment.datetime.toISOString().split("T")[0]
                    }
                    disabled={isDisabled}
                  />
                </div>
                {/* time select input */}
                <div className="flex flex-col gap-1.5 w-full">
                  <Label htmlFor="time" nameOfLabel="Time" important />
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    required
                    defaultValue={appointment.datetime
                      .toTimeString()
                      .slice(0, 5)}
                    disabled={isDisabled}
                  />
                </div>
              </div>
              {editState?.errors?.datetime?.[0] && (
                <p className="text-[12px] text-red-700">
                  {editState.errors.datetime[0]}
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
                  defaultValue={appointment.treatmentPlan}
                  required
                  placeholder="Enter what treatment will be carried out"
                  disabled={isDisabled}
                />
                {editState?.errors?.treatmentPlan?.[0] && (
                  <p className="text-[12px] text-red-700">
                    {editState.errors.treatmentPlan[0]}
                  </p>
                )}
              </div>
            </div>
            {/* status radio input */}
            <div className="flex flex-col gap-1.5">
              <Label nameOfLabel="Status" important />
              <div className="flex flex-col gap-1.5">
                <div className="h-11 px-3 flex gap-6 items-center border border-input rounded-lg">
                  <div className="flex gap-1.5 items-center">
                    <Input
                      type="radio"
                      id="booked"
                      name="status"
                      required
                      value="BOOKED"
                      defaultChecked={appointment.status === "BOOKED"}
                      disabled={isDisabled}
                    />
                    <Label htmlFor="booked" nameOfLabel="Booked" />
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <Input
                      type="radio"
                      id="finished"
                      name="status"
                      required
                      value="FINISHED"
                      defaultChecked={appointment.status === "FINISHED"}
                      disabled={isDisabled}
                    />
                    <Label htmlFor="finished" nameOfLabel="Finished" />
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <Input
                      type="radio"
                      id="cancelled"
                      name="status"
                      required
                      value="CANCELLED"
                      defaultChecked={appointment.status === "CANCELLED"}
                      disabled={isDisabled}
                    />
                    <Label htmlFor="cancelled" nameOfLabel="Cancelled" />
                  </div>
                </div>
                {editState?.errors?.status?.[0] && (
                  <p className="text-[12px] text-red-700">
                    {editState.errors.status[0]}
                  </p>
                )}
              </div>
              <p className="text-[12px] text-muted">
                Current status:{" "}
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1).toLowerCase()}{" "}
                ·{" "}
                {appointment.status === "BOOKED"
                  ? "change after patient is finished or schedule is cancelled"
                  : appointment.status === "FINISHED"
                    ? "this appointment has been completed and cannot be changed"
                    : appointment.status === "CANCELLED"
                      ? "this appointment has been cancelled and cannot be modified"
                      : null}
              </p>
            </div>
          </div>
          {!isDisabled && (
            <div className="flex justify-between">
              <DeleteSchedule
                id={appointment.id.toString()}
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
          )}
        </form>
        {appointment.status === "FINISHED" && !appointment.medicalRecord ? (
          <>
            <hr className="border border-border" />
            <RecordForm id={appointment.id.toString()} />
          </>
        ) : null}
      </div>
    </>
  );
}
