import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../api/helper/authService";

import OnboardingLayout from "../layout/OnboardingLayout";
import Input from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import { EyeClose, EyeOpen } from "../icons";

interface SignInForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const [passwordType, setPasswordType] = useState<string>("password");
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();
  return (
    <OnboardingLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <form className="bg-white lg:max-w-lg lg:w-35 rounded-xl px-4 pt-6 md:pb-4 md:px-8 lg:pt-7">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mt-3">
            <Input
              typeOfInput="normal"
              variant="primary"
              label="email"
              placement="start"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address format",
                },
              })}
            />
            {errors.email && (
              <span role="alert" className="text-xs text-ch-danger">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="mt-3">
            <Input
              typeOfInput="normal"
              variant="primary"
              label="password"
              placement="end"
              icon={
                passwordType === "text" ? (
                  <EyeOpen
                    className="cursor-pointer"
                    onClick={() => {
                      setPasswordType("password");
                    }}
                  />
                ) : (
                  <EyeClose
                    className="cursor-pointer"
                    onClick={() => {
                      setPasswordType("text");
                    }}
                  />
                )
              }
              type={passwordType}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password cannot be less than 8 characters",
                },
              })}
            />
            {errors.password && (
              <span role="alert" className="text-xs text-right text-ch-red">
                {errors.password?.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="my-7 flex items-center justify-center"
            size="sm"
            disabled={login.isPending}
          >
            Login
          </Button>
          <div className="pb-2">
            <p className="text-sm text-ch-grey font-normal text-center">
              Need to create an account?{" "}
              <span
                className="text-ch-black font-bold cursor-pointer"
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default SignIn;
