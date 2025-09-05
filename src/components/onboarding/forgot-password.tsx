import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../api/helper/authService";

import OnboardingLayout from "../layout/OnboardingLayout";
import Input from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import toast from "react-hot-toast";

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const handleResetPassword: SubmitHandler<ForgotPasswordForm> = async (data: ForgotPasswordForm) => {
    forgotPassword.mutate(data.email, {
      onSuccess: (data) => {
        toast.success(data?.message ?? "Password reset email sent!", {
          id: "forgot-password-success",
        });
        setTimeout(() => navigate("/reset-password"), 2000);
      },
      onError: (error) => {
        toast.error(error.message, { id: "login-error" });
      },
    });
  };

  return (
    <OnboardingLayout>
      <div className="flex flex-col items-center justify-center h-full px-4">
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="form bg-white rounded-xl px-4 pt-6 md:pb-4 md:px-8 lg:pt-7"
        >
          <h2 className="text-2xl font-bold mb-5 md:mb-7">Forgot Password</h2>
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
          <Button
            type="submit"
            className="my-7 flex items-center justify-center"
            size="sm"
            disabled={forgotPassword.isPending}
          >
            {forgotPassword.isPending ? "Sending..." : "Send Reset Email"}
          </Button>
          <div className="pb-4">
            <p className="text-xs text-ch-grey font-medium text-center">
              Need to create an account?{" "}
              <span
                className="text-ch-black font-bold cursor-pointer underline"
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

export default ForgotPassword;
