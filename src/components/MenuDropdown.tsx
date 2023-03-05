import { Menu } from "@headlessui/react";
import { IconSettings } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import clsx from "clsx";
import Link from "next/link";

import { ClientRoutes } from "~/utils/constants/routes";

export function MenuDropdown() {
  return (
    <Menu>
      <Menu.Button className="flex items-center justify-center">
        <IconSettings size={32} className="text-gray-400" />
      </Menu.Button>
      <Menu.Items className="absolute right-8 z-10 mt-4 w-60 origin-top-right rounded-md border-2 border-teal-600/30 bg-gray-800 shadow-lg shadow-teal-500/50 ring-1 ring-gray-400 ring-opacity-5 focus:outline-none">
        <div className="flex flex-col py-1">
          <Menu.Item>
            {({ active }) => (
              <Link
                href={ClientRoutes.HOME}
                className={clsx(
                  "px-4 py-2 text-left",
                  active && "bg-teal-500/20"
                )}
              >
                Home
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href={ClientRoutes.SETTINGS}
                className={clsx(
                  "px-4 py-2 text-left",
                  active && "bg-teal-500/20"
                )}
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() =>
                  void signOut({
                    redirect: true,
                    callbackUrl: ClientRoutes.LOGIN,
                  })
                }
                className={clsx(
                  "px-4 py-2 text-left",
                  active && "bg-teal-500/20"
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}
