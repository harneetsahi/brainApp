import { Link } from "react-router-dom";
import MailIcon from "../icons/MailIcon";
import PasswordIcon from "../icons/PasswordIcon";
import { useState } from "react";
import { Button } from "../components/Button";
import { AuthInput } from "../components/AuthInput";
import Eye from "../icons/Eye";
import EyeClose from "../icons/EyeClose";
import { useLogin } from "../hooks/useAuthQueries";
import { LoaderIcon } from "../icons/LoaderIcon";
import { IAuth } from "../types/types";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/Navbar";

function Login() {
  const { mutate: login, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, reset } = useForm<IAuth>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleFormSubmit(data: IAuth) {
    login(data as any);
    reset();
  }

  {
    isPending && (
      <div>
        <LoaderIcon />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white dark:bg-zinc-800 p-8 rounded-lg border-1 dark:border-zinc-700 border-zinc-100 shadow-sm">
          <h1 className="md:text-2xl mt-3 text-xl transition-all">Log in</h1>
          <section className="mt-12 mb-8 w-67 ">
            <form
              className="mt-5 flex flex-col gap-5"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
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
                variant="tertiaryDark"
                text={isPending ? <LoaderIcon /> : "Log in"}
                size="sm"
                className="mt-3 flex justify-center items-center"
              />
            </form>

            <div className="flex items-center gap-5 my-8">
              <span className="border-t-1 border-zinc-400 flex-1 h-.5 "></span>
              <span className="">or</span>
              <span className="border-t-1 border-zinc-400 flex-1 h-.5 "></span>
            </div>

            <div className="text-sm text-center text-zinc-500">
              <span className="mr-2">Don't have an account?</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-400 font-medium">
                <Link to="/signup">Sign up</Link>
              </span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
