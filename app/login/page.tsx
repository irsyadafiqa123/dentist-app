import LoginForm from "@/app/ui/login-form";
import DentistLogo from "../ui/dentist-logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Page() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-6 max-w-100 w-full p-5 border border-border rounded-xl bg-background-secondary">
        {/* logo */}
        <div className="self-center">
          <DentistLogo />
        </div>
        {/* login form */}
        <LoginForm />
      </div>
    </main>
  );
}
