"use client";

import Button from "@/app/ui/button";
import Input from "@/app/ui/input";
import Label from "@/app/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  return (
    <>
      {/* button filter */}
      <Button
        name="filter"
        id="filter"
        nameOfButton="Filter"
        icon="filter_alt"
        uiType="primary"
        size="default"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* patients filter modal overlay */}
      {pathName.includes("patients") && isOpen && (
        <FilterPatientsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pathName={pathName}
        />
      )}

      {/* schedules filter modal overlay */}
      {pathName.includes("schedules") && isOpen && (
        <FilterSchedulesModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pathName={pathName}
        />
      )}

      {/* records filter modal overlay */}
      {pathName.includes("records") && isOpen && (
        <FilterRecordsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pathName={pathName}
        />
      )}
    </>
  );
}

function FilterPatientsModal({
  isOpen,
  setIsOpen,
  pathName,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pathName: string;
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleApply() {
    const params = new URLSearchParams(searchParams);

    if (from || to) {
      params.set("from", from);
      params.set("to", to);
    } else {
      params.delete("from");
      params.delete("to");
    }

    replace(`${pathName}?${params.toString()}`);
    setIsOpen(false);
  }

  function handleReset() {
    const params = new URLSearchParams(searchParams);

    params.delete("from");
    params.delete("to");

    replace(`${pathName}?${params.toString()}`);
    setIsOpen(false);
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-10 bg-background/60 backdrop-blur-xs backdrop-grayscale">
      {/* modal content */}{" "}
      <div className="flex flex-col gap-4 bg-background-secondary p-5 rounded-xl max-w-107 w-full border border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-[15px] text-foreground">Filter Properties</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer w-fit h-fit"
          >
            <span className="material-symbols-outlined size-24 w-fit h-fit">
              close
            </span>
          </button>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label
            nameOfLabel="Registered Date (From - To)"
            htmlFor="from-date"
          />
          <div className="flex gap-4 items-center">
            <Input
              type="date"
              id="from-date"
              name="fromDate"
              onChange={(e) => setFrom(e.target.value)}
              value={from}
            />
            <hr className="w-3 border border-border" />
            <Input
              type="date"
              id="to-date"
              name="toDate"
              onChange={(e) => setTo(e.target.value)}
              value={to}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            name="reset"
            id="reset"
            nameOfButton="Reset"
            uiType="danger"
            size="default"
            onClick={handleReset}
          />
          <Button
            name="apply"
            id="apply"
            nameOfButton="Apply"
            uiType="primary"
            size="default"
            onClick={handleApply}
          />
        </div>
      </div>
    </div>
  );
}

function FilterSchedulesModal({
  isOpen,
  setIsOpen,
  pathName,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pathName: string;
}) {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleApply() {
    const params = new URLSearchParams(searchParams);

    if (date) {
      params.set("appointmentDate", date);
    } else if (status) {
      params.set("status", status);
    } else {
      params.delete("appointmentDate");
      params.delete("status");
    }

    replace(`${pathName}?${params.toString()}`);
    setIsOpen(false);
  }

  function handleReset() {
    const params = new URLSearchParams(searchParams);

    params.delete("appointmentDate");
    params.delete("status");

    replace(`${pathName}?${params.toString()}`);
    setIsOpen(false);
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-10 bg-background/60 backdrop-blur-xs backdrop-grayscale">
      {/* modal content */}
      <div className="flex flex-col gap-4 bg-background-secondary p-5 rounded-xl max-w-107 w-full border border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-[15px] text-foreground">Filter Properties</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer w-fit h-fit"
          >
            <span className="material-symbols-outlined size-24 w-fit h-fit">
              close
            </span>
          </button>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-1.5 w-full">
            <Label nameOfLabel="Appointment Date" htmlFor="appointment-date" />
            <Input
              type="date"
              id="appointment-date"
              name="appointmentDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <Label nameOfLabel="Status" htmlFor="status" />
            <div className="relative">
              <select
                id="status"
                name="status"
                className="h-11 placeholder:text-sm border border-input rounded-lg px-3 w-full text-sm placeholder:text-muted appearance-none cursor-pointer"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option
                  value=""
                  className="bg-background text-foreground border border-border"
                >
                  All Status
                </option>
                <option
                  value={"BOOKED"}
                  className="bg-background text-foreground border border-border"
                >
                  Booked
                </option>
                <option
                  value={"FINISHED"}
                  className="bg-background text-foreground border border-border"
                >
                  Finished
                </option>
                <option
                  value={"CANCELLED"}
                  className="bg-background text-foreground border border-border"
                >
                  Cancelled
                </option>
              </select>
              <span className="material-symbols-outlined w-fit h-fit pointer-events-none absolute top-1/2 -translate-y-1/2 text-foreground-secondary right-3 size-24">
                keyboard_arrow_down
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            name="reset"
            id="reset"
            nameOfButton="Reset"
            uiType="danger"
            size="default"
            onClick={handleReset}
          />
          <Button
            name="apply"
            id="apply"
            nameOfButton="Apply"
            uiType="primary"
            size="default"
            onClick={handleApply}
          />
        </div>
      </div>
    </div>
  );
}

function FilterRecordsModal({
  isOpen,
  setIsOpen,
  pathName,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pathName: string;
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleApply() {
    const params = new URLSearchParams(searchParams);

    if (from || to) {
      params.set("from", from);
      params.set("to", to);
    } else {
      params.delete("from");
      params.delete("to");
    }

    replace(`${pathName}?${params.toString()}`);
    setIsOpen(false);
  }

  function handleReset() {
    const params = new URLSearchParams(searchParams);

    params.delete("from");
    params.delete("to");

    replace(`${pathName}?${params.toString()}`);
    setIsOpen(false);
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-10 bg-background/60 backdrop-blur-xs backdrop-grayscale">
      {/* modal content */}
      <div className="flex flex-col gap-4 bg-background-secondary p-5 rounded-xl max-w-107 w-full border border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-[15px] text-foreground">Filter Properties</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer w-fit h-fit"
          >
            <span className="material-symbols-outlined size-24 w-fit h-fit">
              close
            </span>
          </button>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label nameOfLabel="Created Date (From - To)" htmlFor="from-date" />
          <div className="flex gap-4 items-center">
            <Input
              type="date"
              id="from-date"
              name="fromDate"
              onChange={(e) => setFrom(e.target.value)}
              value={from}
            />
            <hr className="w-3 border border-border" />
            <Input
              type="date"
              id="to-date"
              name="toDate"
              onChange={(e) => setTo(e.target.value)}
              value={to}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            name="reset"
            id="reset"
            nameOfButton="Reset"
            uiType="danger"
            size="default"
            onClick={handleReset}
          />
          <Button
            name="apply"
            id="apply"
            nameOfButton="Apply"
            uiType="primary"
            size="default"
            onClick={handleApply}
          />
        </div>
      </div>
    </div>
  );
}
