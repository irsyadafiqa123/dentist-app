import Link from "next/link";
import DentistLogo from "@/app/ui/dentist-logo";
import NavLinks from "./nav-links";
import Image from "next/image";
import { auth, signOut } from "@/auth";

export default async function SideNav() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex h-full flex-col p-3 gap-9">
      <div className="flex flex-col gap-6">
        {/* logo */}
        <Link href="/" className="w-fit">
          <DentistLogo />
        </Link>
        {/* profile */}
        <div className="flex gap-3">
          <Image
            src={session.user.image || "/images/profile.png"}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="w-full grow hidden lg:block">
            <p className="font-medium truncate max-w-41 text-foreground">
              {`${session.user.title} ${session.user.name}, ${session.user.titleSuffix}`}
            </p>
            <p className="text-xs text-muted">Clinic Owner</p>
          </div>
        </div>
      </div>
      {/* navigation */}
      <div className="flex flex-col gap-3">
        <NavLinks />
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="flex flex-row items-center gap-3 rounded-lg px-2.5 lg:px-4 py-3 text-foreground duration-100 hover:bg-background-hover w-full cursor-pointer"
          >
            <span className="material-symbols-outlined w-5 h-5">logout</span>
            <span className="text-sm hidden lg:block">Logout</span>
          </button>
        </form>
      </div>
    </div>
  );
}
