"use client";

import React, { use } from "react";
import { Button } from "antd";
import { useAppSelector } from "@/redux/hook";
import { usePathname, useRouter } from "next/navigation";
import { useApplyTrainingMutation } from "@/redux/features/training/training.api";
import {
  errorAlert,
  requiredAlert,
  successAlert,
  TResError,
} from "@/lib/alerts";

const RegistrationButton = ({ trainingId }: { trainingId: string }) => {
  const router = useRouter();
  const pathName = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const [registration, { isLoading }] = useApplyTrainingMutation();

  const handleRegister = async () => {
    const payload = {
      trainingId: trainingId,
      employeeId: user?._id,
    };
    if (!user?._id) {
      requiredAlert({ pathName });
      return;
    }
    try {
      await registration(payload).unwrap();
      successAlert({
        message:
          "Your registration for the training has been successfully completed!",
        icon: true,
        confirmButton: true,
      });
      router.push("/training");
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
    //  else {
    // Swal.fire({
    //   title: "Attention Required!",
    //   text: "To proceed with the registration, please Sign-In or Create an account beforehand. This step is essential to complete your registration process.",
    //   showDenyButton: false,
    //   showCancelButton: true,
    //   reverseButtons: true,
    //   confirmButtonText: "Let's Go ➜",
    //   cancelButtonText: "Not Now",
    //   // denyButtonText: `Not Now`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     router.push(`/sign-in?redirect=${encodeURIComponent(pathName)}`);
    //   } else if (result.isDenied) {
    //     // Do nothing
    //   }
    // });
    // }
  };

  return (
    <Button
      loading={isLoading}
      type="primary"
      size="large"
      block
      onClick={handleRegister}
    >
      Register Now
    </Button>
  );
};

export default RegistrationButton;
