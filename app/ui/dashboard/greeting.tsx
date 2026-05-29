"use client";

import { useSession } from "next-auth/react";

export default function Greeting() {
  const { data: session } = useSession();
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <h1 className="text-lg font-semibold text-foreground">
      {greeting}, {session?.user.name} 👋🏻
    </h1>
  );
}
