import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, X } from "lucide-react";
import { SignUp } from "./Auth/SignUp";
import { SignIn } from "./Auth/SignIn";
import { Button } from "./ui/button";
import { authPayloads } from "@/constants/others.constants";
import { cn } from "@/lib/utils";
import { Forgot } from "./Auth/Forgot";
import { Verify } from "./Auth/Verify";
import { Reset } from "./Auth/Reset";
import { Change } from "./Auth/Change";
import { usePathname } from "next/navigation";

type TAuthModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  modalTitleData: {
    title: string;
    forword: string;
    redirect?: string;
    des: string;
    back?: boolean;
  } | null;
  setModalTitleData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      forword: string;
      redirect?: string;
      des: string;
      back?: boolean;
    } | null>
  >;
};

export function AuthModal({
  isOpen,
  setIsOpen,
  modalTitleData,
  setModalTitleData,
}: TAuthModalProps) {
  const closeModal = () => setIsOpen(false);
  const pathName = usePathname();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex justify-between items-start md:px-4">
            <button
              onClick={() =>
                setModalTitleData(
                  pathName.includes("profile-information")
                    ? authPayloads["Change Password"]
                    : authPayloads[
                    modalTitleData?.forword as keyof typeof authPayloads
                    ]
                )
              }
              className={cn("outline-none invisible mt-2.5", {
                visible: modalTitleData?.back,
              })}
            >
              <ArrowLeft size={20} />
            </button>
            <div className="w-fit text-center space-y-1">
              <DialogTitle className="font-semibold font-syne text-3xl">
                {modalTitleData?.title}
              </DialogTitle>
              <p className="text-sm">
                {modalTitleData?.des}
                <Button
                  onClick={() =>
                    setModalTitleData(
                      authPayloads[
                      modalTitleData?.forword as keyof typeof authPayloads
                      ]
                    )
                  }
                  size={"sm"}
                  variant="link"
                  className={cn("text-sm px-0", {
                    hidden: modalTitleData?.back,
                  })}
                >
                  {modalTitleData?.forword}
                </Button>{" "}
              </p>
            </div>
            <button
              onClick={closeModal}
              className={cn("outline-none invisible mt-2.5 text-red-500", {
                visible: !modalTitleData?.back,
              })}
            >
              <X size={20} />
            </button>
          </div>
        </DialogHeader>
        <div className=" w-full mx-auto">
          {modalTitleData?.title === "Sign Up" ? (
            <SignUp setAuthTitleData={setModalTitleData} setIsAuthOpen={setIsOpen}  />
          ) : modalTitleData?.title === "Forget Password" ? (
            <Forgot setModalTitleData={setModalTitleData} setIsAuthOpen={setIsOpen}  setAuthTitleData={setModalTitleData}/>
          ) : modalTitleData?.title === "Verification Code" ? (
            <Verify setModalTitleData={setModalTitleData} setIsAuthOpen={setIsOpen}  setAuthTitleData={setModalTitleData} />
          ) : modalTitleData?.title === "Reset Password" ? (
            <Reset setAuthTitleData={setModalTitleData} setIsAuthOpen={setIsOpen} />
          ) : modalTitleData?.title === "Change Password" ? (
            <Change setModalTitleData={setModalTitleData} />
          ) : (

            <SignIn modalTitleData={modalTitleData} setModalTitleData={setModalTitleData} closeModal={closeModal} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
