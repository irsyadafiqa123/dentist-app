"use client";

import { getDateNow } from "@/app/lib/helper";

export default function LocalDate() {
  return <p className="text-sm text-foreground-secondary">{getDateNow()}</p>;
}
