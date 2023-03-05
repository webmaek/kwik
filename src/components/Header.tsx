import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

import { MenuDropdown } from "~/components/MenuDropdown";

export function Header({
  title,
  showBackUrl,
}: {
  title: string;
  showBackUrl: boolean;
}) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center">
        {showBackUrl && (
          <div className="mr-4 flex items-center justify-center">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center rounded-full bg-teal-600/50 p-2 shadow-md hover:bg-teal-600/70"
            >
              <IconChevronLeft size={24} strokeWidth={3.5} />
            </button>
          </div>
        )}
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
      </div>

      <div className="flex items-center">
        <div className="ml-4">
          <MenuDropdown />
        </div>
      </div>
    </header>
  );
}
