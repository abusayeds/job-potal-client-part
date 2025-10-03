"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { Button, Form, FormProps, message } from "antd";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import {
  useResendOtpMutation,
  useVerifyEmailMutation,
} from "@/redux/features/auth/authApi";
import { errorAlert, successAlert, TResError } from "@/lib/alerts";
import { useAppDispatch } from "@/redux/hook";
import { setLogin } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";

type FieldType = {
  otp: string;
};

const VerifyEmail = ({ email, opType }: { email: string; opType: string }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useVerifyEmailMutation();
  const [resendMutation, { isLoading: resendLoading }] = useResendOtpMutation();
  const [otp, setOtp] = useState("");
  const onFinish: FormProps<FieldType>["onFinish"] = async () => {
    try {
      if (!otp || otp.length < 6) throw new Error("Correct OTP is required!");
      const response = await mutation({
        data: { otp },
        endpoint: opType === "verify" ? "verify-otp" : "verify-forget-otp",
      }).unwrap();
      // console.log(response);
      if (opType === "verify") {
        successAlert({
          message: `Verification successful. Please ${
            response.data.user.role === "employer"
              ? "complete your company profile to proceed with verification"
              : "complete your profile to continue with your application"
          }.`,
          confirmButton: true,
        });
        // messageApi.open({
        //   key: "verification",
        //   type: "success",
        //   content: "Verification successful!",
        //   duration: 2,
        // });
        dispatch(
          setLogin({
            token: response.data.token,
            user: response.data.user,
          })
        );
        router.replace(`/settings#basic-info`);
      } else {
        messageApi.open({
          key: "verification",
          type: "success",
          content: "Verification successful!",
          duration: 2,
        });
        Cookies.set("token", response.data.token);
        router.replace(`/reset-pass`);
      }
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  const handleResend = async () => {
    try {
      const response = await resendMutation({ email }).unwrap();
      Cookies.set("token", response.data.token);
      successAlert({
        message: "A new otp has been sent to your email address.",
        confirmButton: true,
      });
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full min-h-[calc(100vh-300px)] flex flex-col justify-center items-center gap-4 max-w-xl mx-auto mt-10"
      )}
    >
      {contextHolder}
      <div className="text-center space-y-2.5 sm:space-y-5 pb-2 sm:pb-4">
        <h3 className="text-2xl xl:text-3xl font-roman-bold">
          Email Verification
        </h3>
        <p className="text-brand/60 px-2 lg:px-6">
          A verification email has been sent to{" "}
          <span className="text-brand font-medium">{email}</span>. Please verify
          your email address to verify your account.
        </p>
      </div>

      <Form
        form={form}
        // name={"normal_login"}
        layout="vertical"
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onFinish}
        // onValuesChange={onValuesChange}
        requiredMark={false}
        className="w-full text-center"
      >
        <Form.Item
        // name={"otp"}
        // rules={[{ required: true, message: "Verify otp is required!" }]}
        >
          <div className="py-2 font-medium flex justify-center">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span> </span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="border border-primary outline-none rounded-xl w-full h-[50px] min-w-[40px] mx-[5px] text-[16px] md:h-[60px] md:min-w-[50px] md:mx-[8px] lg:h-[70px] md:text-lg xl:min-w-[70px] xl:mx-[10px] xl:text-2xl focus:ring-2 ring-primary/20"
                />
              )}
            />
          </div>
        </Form.Item>
        <div className="w-full flex justify-center  pt-2">
          <Button
            loading={isLoading}
            type="primary"
            size="large"
            htmlType="submit"
            className="px-2 w-full"
          >
            Verify Account <GoArrowRight size={20} className="mt-0.5" />
          </Button>
        </div>
      </Form>
      <p className="text-brand/500 mt-4 lg:mt-6">
        Didn’t recieve any code!
        <Button
          onClick={handleResend}
          loading={resendLoading}
          type="text"
          size="small"
        >
          Resend
        </Button>
      </p>
    </div>
  );
};

export default VerifyEmail;
