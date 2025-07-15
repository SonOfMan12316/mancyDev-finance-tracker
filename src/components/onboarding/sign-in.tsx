import OnboardingLayout from "../layout/OnboardingLayout";
import Input from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";

const SignIn = () => {
  return (
    <OnboardingLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <form className="bg-white lg:max-w-lg lg:w-35 rounded-xl px-4 pt-6 md:pb-4 md:px-8 lg:pt-7">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mt-3">
            <Input
              typeOfInput="modal"
              variant="primary"
              label="email"
              placement="start"
            />
          </div>
          <div className="mt-3">
            <Input
              typeOfInput="modal"
              variant="primary"
              label="password"
              placement="start"
            />
          </div>
          <Button
            type="submit"
            className="mt-3 mb-4 flex items-center justify-center"
          >
            Login
          </Button>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default SignIn;
