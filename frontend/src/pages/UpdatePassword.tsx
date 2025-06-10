import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../hooks/useAuthQueries";
import { Sidebar } from "../components/Sidebar";
import { AuthInput } from "../components/AuthInput";
import { Button } from "../components/Button";
import { LoaderIcon } from "../icons/LoaderIcon";
import PasswordIcon from "../icons/PasswordIcon";
import Eye from "../icons/Eye";
import EyeClose from "../icons/EyeClose";
import { IAuth } from "../types/types";
import toast from "react-hot-toast";

export const UpdatePassword = () => {
  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, reset } = useForm<IAuth>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function handleUpdatePassword(data: IAuth) {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("New password and confirm password must match");
      return;
    }

    try {
      updatePassword(data as any);
      reset();
    } catch (error) {
      console.log("failed to update password ", error);
    }
  }

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 sm:ml-40 ml-14 ">
        <h2 className="text-2xl font-medium mt-27 mb-10 tracking-[0.2px]">
          Change your password
        </h2>
        <p className="mb-11 sm:text-sm text-xs text-center text-zinc-500  ">
          It should be 8 to 16 characters long. <br /> Must include at least 1
          uppercase, 1 lowercase, <br /> 1 number, and 1 special character.
        </p>

        <div className="flex-1 mb-8">
          <form
            className=" flex flex-col items-center gap-5 md:w-92 w-65 "
            onSubmit={handleSubmit(handleUpdatePassword)}
          >
            <div className="flex relative w-full">
              <AuthInput
                icon={<PasswordIcon />}
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                placeholder="Old Password"
                register={register}
                name="oldPassword"
                minLength={8}
                maxLength={16}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,16}$"
                title="Must be 8 to 16 letters long, including 1 number, 1 lowercase letter, 1 uppercase letter, 1 special character"
                required={true}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute top-0 bottom-0 right-3"
              >
                {showOldPassword ? <Eye /> : <EyeClose />}
              </button>
            </div>

            <div className="flex relative w-full">
              <AuthInput
                icon={<PasswordIcon />}
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="New Password"
                register={register}
                name="newPassword"
                minLength={8}
                maxLength={16}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,16}$"
                title="Must be 8 to 16 letters long, including 1 number, 1 lowercase letter, 1 uppercase letter, 1 special character"
                required={true}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute top-0 bottom-0 right-3"
              >
                {showNewPassword ? <Eye /> : <EyeClose />}
              </button>
            </div>

            <div className="flex relative w-full">
              <AuthInput
                icon={<PasswordIcon />}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmNewPassword"
                placeholder="Confirm New Password"
                name="confirmNewPassword"
                register={register}
                minLength={8}
                maxLength={16}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,16}$"
                title="Must be 8 to 16 letters long, including 1 number, 1 lowercase letter, 1 uppercase letter, 1 special character"
                required={true}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-0 bottom-0 right-3"
              >
                {showConfirmPassword ? <Eye /> : <EyeClose />}
              </button>
            </div>

            <Button
              disabled={isPending}
              variant="tertiaryDark"
              size="md"
              text={isPending ? <LoaderIcon /> : "Update"}
              className="mt-5 w-full flex justify-center items-center"
            ></Button>
          </form>
        </div>
      </div>
    </>
  );
};
