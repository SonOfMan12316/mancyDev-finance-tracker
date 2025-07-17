import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../layout/OnboardingLayout";
import Input from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import { EyeClose, EyeOpen } from "../icons";

const SignUp = () => {
  const [passwordType, setPasswordType] = useState<string>("password");
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <form className="bg-white lg:max-w-lg lg:w-35 rounded-xl px-4 pt-6 md:pb-4 md:px-8 lg:pt-7">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <div className="mt-3">
            <Input
              typeOfInput="normal"
              variant="primary"
              label="name"
              placement="start"
            />
          </div>
          <div className="mt-3">
            <Input
              typeOfInput="normal"
              variant="primary"
              label="email"
              placement="start"
            />
          </div>
          <div className="mt-3">
            <Input
              type={passwordType}
              typeOfInput="normal"
              variant="primary"
              label="create password"
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
            />
          </div>
          <Button
            type="submit"
            className="my-7 flex items-center justify-center"
            size="sm"
          >
            Create Account
          </Button>
          <div className="pb-2">
            <p className="text-sm text-ch-grey font-normal text-center">
              Already have an account?{" "}
              <span
                className="text-ch-black font-bold cursor-pointer"
                onClick={() => navigate("/sign-in")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default SignUp;
