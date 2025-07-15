import { Logo } from "../global";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <div className="h-screen w-screen bg-ch-beige py-3">
      <div className="flex flex-col lg:flex-row h-full w-screen">
        <div className="flex flex-col justify-between p-6 lg:p-8 rounded-b-xl lg:rounded-xl lg:w-1/3 w-screen lg:h-full lg:bg-onboarding-bg lg:bg-contain bg-center bg-no-repeat bg-black lg:bg-transparent">
          <div className="flex justify-center lg:justify-start">
            <Logo />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-bold text-xl font-publicSans text-white lg:w-9/12">
              Keep track of your money and save for your future
            </h1>
            <h2 className="text-xs font-publicSans font-normal text-white mt-2">
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
            </h2>
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
