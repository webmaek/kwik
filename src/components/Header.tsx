import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

import { MenuDropdown } from "~/components/MenuDropdown";

export function Header({ showBackUrl }: { showBackUrl: boolean }) {
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
        <img src="/logo-no-background.png" alt="Logo" className="w-42 h-14" />
      </div>

      <div className="flex items-center">
        <div className="ml-4">
          <MenuDropdown />
        </div>
      </div>
    </header>
  );
}
