import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { logoutUser } from "../../api/helper/authService";
import { Button } from "../ui/Button/Button";
import { Popover } from "./index";
import { Profile, SignOut } from "../../components/icons";
import LoadingDots from "../ui/LoadingDots";
const HeaderProfile: FC = () => {
  const [popOpen, setPopOpen] = useState<boolean>(false);

  const navigate = useNavigate();

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
        <div className="whitespace-nowrap text-black text-sm py-3 px-4">
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
