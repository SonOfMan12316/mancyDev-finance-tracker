import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { logoutUser, useUser } from "../../api/helper/authService";
import { Button } from "../ui/Button/Button";
import { Popover } from "./index";
import { Profile, SignOut } from "../../components/icons";
import LoadingDots from "../ui/LoadingDots";
import { getInitials } from "../../utils/global";

const HeaderProfile: FC = () => {
  const [popOpen, setPopOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { data: user } = useUser();

  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      toast.error(`Logout failed: ${error.message}`);
    },
  });

  return (
    <div className="flex space-x-4 xl:space-x-6">
      <Popover
        trigger={<Profile />}
        isOpen={popOpen}
        setIsOpen={setPopOpen}
        triggerVariant="naked"
      >
        <div className="whitespace-nowrap text-black text-sm py-3">
          <div className="mb-4">
            <span className="text-[0.65rem] font-semibold uppercase">
              Account
            </span>
            <div className="flex items-center pt-2 pb-4 border-b-2 border-[rgba(0,0,0,0.2)]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2.5 bg-ch-brown text-white text-[100%] font-medium uppercase tracking-wide pl-[0.025em]">
                {getInitials(user?.displayName ?? "")}
              </div>
              <div className="leading-tight">
                <h2 className="capitalize max-w-[12rem] text-ellipsis overflow-hidden">
                  {user?.displayName}
                </h2>
                <h3 className="text-[rgba(0,0,0,0.6)] text-xs tracking-[-0.06em] max-w-[10rem] text-ellipsis overflow-hidden">
                  {user?.email}
                </h3>
              </div>
            </div>
          </div>
          <Button
            variant="naked"
            size="sm"
            className="flex items-center font-normal"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
          >
            <SignOut />
            <div className="ml-1">
              {logout.isPending ? (
                <span>
                  Logging out
                  <LoadingDots size="sm" />
                </span>
              ) : (
                <span>Logout</span>
              )}
            </div>
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default HeaderProfile;
