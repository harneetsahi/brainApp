import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../hooks/useAuthQueries";
import { AuthInput } from "../components/AuthInput";
import { Button } from "../components/Button";

import MailIcon from "../icons/MailIcon";
import PersonIcon from "../icons/PersonIcon";
import PasswordIcon from "../icons/PasswordIcon";
import Eye from "../icons/Eye";
import EyeClose from "../icons/EyeClose";
import { LoaderIcon } from "../icons/LoaderIcon";
import { IAuth } from "../types/types";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/Navbar";

function Signup() {
  const { mutate: signup, isPending, isError, error } = useSignup();

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, reset } = useForm<IAuth>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  function handleFormSubmit(data: IAuth) {
    signup(data as any);
    reset();
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white dark:bg-zinc-800 p-8 rounded-lg border-1 dark:border-zinc-700 border-zinc-100 shadow-sm">
          <h1 className="md:text-2xl mt-3 text-xl transition-all">
            Create an account
          </h1>
          <section className="mt-10 mb-6 w-67 ">
            <form
              action=""
              onSubmit={handleSubmit(handleFormSubmit)}
              className="mt-5 flex flex-col gap-5"
            >
              <AuthInput
                icon={<PersonIcon />}
                type="firstname"
                id="firstname"
                placeholder="first name"
                register={register}
                name="firstName"
                minLength={3}
                maxLength={50}
                title={"Must have at least 3 letters and max 50 letters"}
                required={true}
              />

              <AuthInput
                icon={<PersonIcon />}
                type="lastname"
                id="lastname"
                placeholder="last name"
                register={register}
                name="lastName"
                minLength={2}
                maxLength={50}
                title={"Must have at least 2 letters and max 50 letters"}
                required={true}
              />
              <AuthInput
                icon={<MailIcon />}
                type="email"
                id="email"
                placeholder="mail@site.com"
                register={register}
                name="email"
                maxLength={50}
                required={true}
              />
              <div className="flex relative">
                <AuthInput
                  icon={<PasswordIcon />}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  register={register}
                  name="password"
                  minLength={8}
                  maxLength={16}
                  pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,16}$"
                  title="Must be 8 to 16 letters long, including 1 number, 1 lowercase letter, 1 uppercase letter, 1 special character"
                  required={true}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-0 bottom-0 right-3"
                >
                  {showPassword ? <Eye /> : <EyeClose />}
                </button>
              </div>

              <Button
                size="sm"
                variant="tertiaryDark"
                className="mt-3 flex justify-center items-center"
                text={isPending ? <LoaderIcon /> : "Sign up"}
              />

              {isError && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {error?.response?.data?.message ||
                    error?.message ||
                    "An unexpected error occurred during signup."}
                </p>
              )}
            </form>

            <div className="flex items-center gap-5 my-8">
              <span className="border-t-1 border-zinc-400 flex-1 h-.5 "></span>
              <span className="">or</span>
              <span className="border-t-1 border-zinc-400 flex-1 h-.5 "></span>
            </div>

            <div className="text-sm text-center text-zinc-500">
              <span className="mr-1">If you already have an account </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-400 font-medium">
                <Link to="/login">Login</Link>
              </span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Signup;
