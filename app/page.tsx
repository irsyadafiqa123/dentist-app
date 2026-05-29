import Button from "@/app/ui/button";
import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const roboto = Roboto({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="mx-auto max-w-400">
      <div className="w-full h-dvh flex flex-col-reverse md:flex-row md:justify-between">
        {/* CTA */}
        <div className="flex flex-col gap-5 md:gap-6 h-full md:justify-center md:px-6 lg:px-11 mx-4 md:mx-0 mt-25.25 md:mt-0">
          <div className={`flex flex-col gap-3 md:gap-4 ${roboto.className}`}>
            <h1 className="text-[32px] md:text-[48px] xl:text-[64px] font-bold text-foreground">
              Dentist App
            </h1>
            <h2 className="text-[16px] md:text-[24px] xl:text-[32px] font-medium text-foreground">
              Modern Dental Management System
            </h2>
            <p className="text-[14px] md:text-[16px] xl:text-[24px] text-foreground-secondary">
              Next.js • Manage Patients, Appointments & Records
            </p>
          </div>
          <Link href={"/login"} className="w-fit">
            <Button
              nameOfButton="View Project"
              size="large"
              uiType="primary"
              className="hidden md:block"
            />
            <Button
              nameOfButton="View Project"
              size="default"
              uiType="primary"
              className="md:hidden"
            />
          </Link>
        </div>
        {/* Image */}
        <div className="h-64.5 md:h-full w-full md:w-125 lg:w-167.5 flex flex-col gap-6 justify-center bg-radial from-primary to-primary/70 md:pl-6">
          <Image
            src="/images/main-page.png"
            alt="Main Page Iamge"
            width={721}
            height={518}
            className="hidden md:block"
            priority
          />
          <Image
            src="/images/main-page-mobile.png"
            alt="Main Page Iamge"
            width={328}
            height={236}
            className="md:hidden translate-y-17.25 mx-auto"
            priority
          />
        </div>
      </div>
    </main>
  );
}
