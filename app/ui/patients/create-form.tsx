"use client";

import Input from "@/app/ui/input";
import TextArea from "@/app/ui/textarea";
import Button from "@/app/ui/button";
import Label from "@/app/ui/label";
import { useActionState, useState } from "react";
import { createPatient, PatientState } from "@/app/lib/actions";

export default function Form() {
  const initialState: PatientState = { message: null, errors: {} };
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [state, formAction, isPending] = useActionState(
    createPatient,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="max-w-130 p-5 border border-border bg-background-secondary rounded-xl flex flex-col gap-4"
    >
      <h2 className="text-[15px] text-foreground">New Patient Details</h2>
      <div className="flex flex-col gap-3">
        {/* full name input */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" nameOfLabel="Full Name" important />
          <div className="flex flex-col gap-1.5">
            <Input
              id="name"
              name="name"
              required
              placeholder="Enter the patient's full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {state?.errors?.name?.[0] && (
              <p className="text-[12px] text-red-700">{state.errors.name[0]}</p>
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {state?.errors?.phone?.[0] && (
                <p className="text-[12px] text-red-700">
                  {state.errors.phone[0]}
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
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              {state?.errors?.dateOfBirth?.[0] && (
                <p className="text-[12px] text-red-700">
                  {state.errors.dateOfBirth[0]}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {state?.errors?.address?.[0] && (
              <p className="text-[12px] text-red-700">
                {state.errors.address[0]}
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
          type="button"
          disabled={isPending}
          onClick={() => {
            setName("");
            setPhone("");
            setAddress("");
            setDateOfBirth("");
          }}
        />
        <Button
          nameOfButton="Save the Patient"
          name="saveThePatient"
          id="save-the-patient"
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
