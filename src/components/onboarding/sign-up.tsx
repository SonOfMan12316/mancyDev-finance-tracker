import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../api/helper/authService";

import OnboardingLayout from "../layout/OnboardingLayout";
import Input from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import { EyeClose, EyeOpen } from "../icons";
import toast from "react-hot-toast";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface PasswordInputs {
  label: string;
  placeholder: string;
  type: "text" | "password";
  typeOfInput: "normal" | "modal";
  setType: Dispatch<SetStateAction<"text" | "password">>;
  value: "password" | "confirmPassword";
  onHook: Record<string, any>;
  error: FieldError | undefined;
}

const SignUp = () => {
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const navigate = useNavigate();

  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>();

  const handleSignUp: SubmitHandler<SignUpForm> = async (data: SignUpForm) => {
    signUp.mutate(data, {
      onSuccess: (data) => {
        toast.success(data?.message ?? "Account created successfully!", {
          id: "signup-success",
        });
        navigate("/sign-in");
      },
      onError: (error) => {
        toast.error(error.message, { id: "signup-error" });
      },
    });
  };

  const passwordInputs: PasswordInputs[] = [
    {
      label: "Password:",
      placeholder: "",
      type: passwordType,
      value: "password",
      typeOfInput: "normal",
      setType: setPasswordType,
      onHook: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      },
      error: errors.password,
    },
    {
      label: "Confirm Password:",
      placeholder: "",
      type: passwordType,
      typeOfInput: "normal",
      value: "confirmPassword",
      setType: setPasswordType,
      onHook: {
        required: "Please confirm your password",
        validate: (value: string) => {
          if (value !== watch("password")) {
            return "Passwords do not match";
          }
        },
      },
      error: errors.confirmPassword,
    },
  ];

  return (
    <OnboardingLayout>
      <div className="flex flex-col items-center justify-center h-full px-4">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="form bg-white rounded-xl px-4 pt-6 md:pb-4 md:px-8 lg:pt-7"
        >
          <h2 className="text-2xl font-bold mb-5 md:mb-7">Sign Up</h2>
          <div className="mt-3">
            <Input
              typeOfInput="normal"
              variant="primary"
              placement="start"
              label="name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
                maxLength: {
                  value: 50,
                  message: "Name must not exceed 50 characters",
                },
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message:
                    "Name can only contain letters, hyphen, apostrophe and spaces",
                },
              })}
            />
            {errors.name && (
              <span role="alert" className="text-xs text-ch-danger">
                {errors.name?.message}
              </span>
            )}
          </div>
          <div className="mt-3">
            <Input
              typeOfInput="normal"
              variant="primary"
              placement="start"
              label="email"
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
            {passwordInputs.map((i: PasswordInputs) => {
              return (
                <div className="my-4" key={i.value}>
                  <Input
                    label={i.label}
                    placeholder={i.placeholder}
                    type={i.type}
                    typeOfInput={i.typeOfInput}
                    {...register(i.value, i.onHook)}
                    icon={
                      i.type === "text" ? (
                        <EyeOpen
                          className="cursor-pointer"
                          onClick={() => {
                            i.setType("password");
                          }}
                        />
                      ) : (
                        <EyeClose
                          className="cursor-pointer"
                          onClick={() => {
                            i.setType("text");
                          }}
                        />
                      )
                    }
                    placement="end"
                    onPaste={(e: SyntheticEvent<EventTarget>) => {
                      if (i.label === "Confirm Password:") {
                        toast.error("sorry, you cannot paste here", {
                          id: "paste-warning",
                        });
                        e.preventDefault();
                        return false;
                      }
                    }}
                  />
                  {i.error && (
                    <p role="alert" className="text-xs text-ch-danger py-0.5">
                      {i.error?.message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <Button
            type="submit"
            className="my-7 flex items-center justify-center"
            size="sm"
          >
            {signUp.isPending ? "Creating Account..." : "Create Account"}
          </Button>
          <div className="pb-4">
            <p className="text-xs text-ch-grey font-medium text-center">
              Already have an account?{" "}
              <span
                className="text-ch-black font-bold cursor-pointer underline"
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
