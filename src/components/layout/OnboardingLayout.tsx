import { Logo } from "../global";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <div className="h-full lg:h-screen w-screen bg-ch-beige">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="flex flex-col justify-between lg:m-4 p-5 lg:py-8 rounded-b-xl lg:rounded-lg lg:w-1/3 w-full min-h-[50vh] lg:min-h-full lg:bg-onboarding-bg bg-cover bg-no-repeat bg-black ">
          <div className="flex justify-center lg:justify-start">
            <Logo />
          </div>
          <div className="hidden lg:block">
            <p className="font-bold text-xl font-publicSans text-white lg:w-9/12">
              Keep track of your money and save for your future
            </p>
            <p className="text-xs font-publicSans font-normal text-white mt-4">
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
            </p>
          </div>
        </div>
        <div className="my-auto lg:my-0 lg:flex-1">{children}</div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
