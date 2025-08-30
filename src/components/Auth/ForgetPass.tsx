"use client";

import React from "react";
import { Button, Form, FormProps, Input, message } from "antd";
import { GoArrowRight } from "react-icons/go";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";
import Cookies from "js-cookie";

type FieldType = {
  email: string;
};

const ForgetPass = ({ className }: { className?: string }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useForgotPasswordMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await mutation(values).unwrap();
      Cookies.set("token", response.data.token);
      messageApi.open({
        key: "forget",
        type: "success",
        content: "Forget password request successful!",
        duration: 2,
      });
      router.push(`/verify-email?type=forgot&query=${values.email}`);
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  return (
    <div
      className={cn(
        "w-full flex flex-col justify-center items-start max-w-xl mx-auto lg:mx-0",
        className
      )}
    >
      {contextHolder}
      <div className="relative w-full max-w-48 lg:max-w-52 aspect-[4/1] mx-auto lg:mx-0">
        <Image
          src="/images/logo.png"
          alt="Logo"
          fill
          style={{ objectFit: "contain" }}
          sizes="100vw"
        />
      </div>
      <div className=" min-h-[calc(100vh-250px)] flex flex-col justify-center w-full mt-4">
        <h3 className="text-2xl xl:text-3xl font-roman-boldmb-2 mb-3">
          Forget Password
        </h3>
        <p className="text-brand/500 mb-4">
          Enter your email address to get a verification code for resetting your
          password. Please enter your email address to reset your password.
        </p>
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
          className="w-full"
        >
          <Form.Item
            label={"User Email"}
            name="email"
            rules={[
              {
                type: "email",
                message: "Input a valid email!",
              },
              {
                required: true,
                message: "Email is required!",
              },
            ]}
          >
            <Input size="large" placeholder="user@ac.com" />
          </Form.Item>
          <div className="w-full flex justify-center pt-2">
            <Button
              loading={isLoading}
              type="primary"
              size="large"
              htmlType="submit"
              className="px-2 w-full"
            >
              Reset Password <GoArrowRight size={20} className="mt-0.5" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPass;
