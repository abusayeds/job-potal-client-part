"use client";

import { errorAlert, TResError } from "@/lib/alerts";
import { sweetAlertConfirmation } from "@/lib/alerts/sweetAlertConfirmation";
import { useCloseAccountMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { TRole } from "@/types";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const CloseAccount = ({ role }: { role: TRole }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useCloseAccountMutation();
  const handleClose = async () => {
    try {
      await mutation(undefined).unwrap();
      dispatch(logout());
      messageApi.open({
        key: "close",
        type: "success",
        content: "Account closed successfully!",
        duration: 3,
      });
      router.replace("/sign-in");
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  return (
    <div className={"space-y-3 py-3 max-w-xl"}>
      {contextHolder}
      <p className="text-xl sm:text-2xl">Delete Your Account</p>
      {role === "employer" ? (
        <p className="text-brand/70">
          <span className="font-semibold">Warning: </span>
          Deleting your RemotisJobs account is a permanent and irreversible
          action. Once your account is deleted, all associated data, including
          your profile, job posts, financial information, alerts, and
          shortlisted applicants, will be permanently removed from our system.
          You will no longer have access to any part of your account or receive
          further communications from RemotisJobs.
        </p>
      ) : (
        <p className="text-brand/70">
          <span className="font-semibold">Warning: </span>
          Deleting your RemotisJobs account is a permanent and irreversible
          action. Once your account is deleted, all associated data, including
          your profile, job matches, alerts, shortlisted applications, and
          followed employers, will be permanently removed from our system. You
          will no longer have access to any part of your account or receive
          further communications from RemotisJobs.
        </p>
      )}
      <Button
        onClick={() =>
          sweetAlertConfirmation({
            func: handleClose,
            object: "close your account",
            okay: "Close Account",
            title: "Confirmation!",
          })
        }
        loading={isLoading}
        type="text"
        size="large"
        style={{ color: "red", background: "rgba(227, 30, 16, 0.1)" }}
      >
        <IoMdCloseCircleOutline size={20} />
        Close Account
      </Button>
    </div>
  );
};

export default CloseAccount;
