"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <input
      {...rest}
      className="h-11 placeholder:text-sm border border-input rounded-lg px-3 max-w-60 w-full text-sm placeholder:text-muted"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("search")?.toString()}
    />
  );
}
