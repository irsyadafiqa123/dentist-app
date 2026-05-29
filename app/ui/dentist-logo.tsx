import Image from "next/image";

export default function DentistLogo() {
  return (
    <>
      {/* light mode logo medium screen */}
      <Image
        src="/images/dentist-logo-no-text.svg"
        alt="Dentist Logo"
        width={40}
        height={40}
        priority
        className="block lg:hidden dark:hidden"
      />
      {/* dark mode logo medium screen */}
      <Image
        src="/images/dentist-logo-no-text-dark.svg"
        alt="Dentist Logo"
        width={40}
        height={40}
        priority
        className="hidden lg:hidden dark:block lg:dark:hidden"
      />
      {/* light mode logo */}
      <Image
        src="/images/dentist-logo.svg"
        alt="Dentist Logo"
        width={120}
        height={40}
        priority
        className="hidden lg:block lg:dark:hidden"
      />
      {/* dark mode logo */}
      <Image
        src="/images/dentist-logo-dark.svg"
        alt="Dentist Logo"
        width={120}
        height={40}
        priority
        className="hidden lg:dark:block"
      />
    </>
  );
}
