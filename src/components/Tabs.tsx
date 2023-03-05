import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import { TABS_LIST } from "~/utils/constants/tabs";

export function Tabs() {
  const router = useRouter();

  return (
    <div className="my-4">
      <div>
        <div className="border-b border-gray-900">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {TABS_LIST.map((tab) => (
              <Link
                href={tab.to}
                key={tab.name}
                className={clsx(
                  tab.to === router.pathname
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-200 hover:border-gray-300 hover:text-gray-300",
                  "whitespace-nowrap border-b-2 py-4 px-1 text-lg font-medium"
                )}
                aria-current={tab.to === router.pathname ? "page" : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
