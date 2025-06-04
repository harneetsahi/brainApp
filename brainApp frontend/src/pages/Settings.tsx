import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { useCheckAuth } from "../hooks/useAuthQueries";

import { Button } from "../components/Button";

export const Settings = () => {
  const { data: authUser, isError, isSuccess } = useCheckAuth();

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 sm:ml-50 ml-14 ">
        <h2 className="text-2xl font-medium mt-27 mb-10 ">Account details</h2>

        {isError && (
          <div className="flex-1 flex text-center leading-8  tracking-[.2px] dark:text-zinc-300 text-zinc-700 ">
            Oh no! Something went wrong while fetching account information.{" "}
            <br />
            Please try again later.
          </div>
        )}

        {isSuccess && (
          <div className="sm:w-[60vw] w-[80vw] max-w-180 flex-1 flex flex-col gap-5 p-8  border-t-1 border-zinc-300 dark:border-zinc-700">
            <div>
              <h3 className="text-[16px] mb-1">Name</h3>
              <p className="text-[14px] dark:text-zinc-400 text-zinc-500">
                {authUser.firstName} {authUser.lastName}
              </p>
            </div>

            <div>
              <h3 className="text-[16px] mb-1">Email</h3>
              <p className="text-[14px] dark:text-zinc-400 text-zinc-500">
                {authUser.email}
              </p>
            </div>

            <div className="flex sm:items-center sm:justify-between sm:flex-row flex-col w-full gap-2">
              <div className="flex-1 sm:mb-0 mb-4">
                <h3 className="text-[16px] mb-1">Password</h3>
                <p className="text-[14px] dark:text-zinc-400 text-zinc-500">
                  Change your login password
                </p>
              </div>
              <Link to="/settings/updatePassword">
                <Button
                  variant="tertiary"
                  size="sm"
                  className="border-1 dark:border-zinc-700 border-zinc-200 hover:dark:bg-zinc-800 hover:bg-zinc-50"
                  type="button"
                  text={"Change password"}
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
