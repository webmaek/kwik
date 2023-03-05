import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { ClientRoutes } from "~/utils/constants/routes";

export function LoginView() {
  const googleLogin = () => {
    void signIn("google", { redirect: true, callbackUrl: ClientRoutes.HOME });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-8 py-3 text-5xl font-semibold text-white">
        Welcome back
      </h1>

      <div className="w-[300px] rounded-md bg-gray-800 p-5 shadow-md lg:w-[400px]">
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-x-2 rounded-md bg-white py-2.5 px-3.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100"
            onClick={googleLogin}
          >
            <IconBrandGoogle className="-mr-0.5 h-5 w-5" aria-hidden="true" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
