"use client";

import React from "react";
import { Button, Checkbox, Form, FormProps, Input, message } from "antd";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { setLogin } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";

type FieldType = {
  email: string;
  password: string;
  remember?: boolean;
};

const SignIn = ({
  className,
  redirect,
}: {
  className?: string;
  redirect?: string;
}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useLoginMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await mutation(values).unwrap();
      if (response.data.isVerify === false) {
        sessionStorage.setItem("v-token", response.data.token);
        router.push(`/verify-email?query=${values.email}`);
        throw new Error(`The email ${values.email} is not verified.`);
      }
      messageApi.open({
        key: "signin",
        type: "success",
        content: "Login successful!",
        duration: 2,
      });
      // console.log(response);
      dispatch(
        setLogin({
          token: response.data.token,
          user: response.data.user,
        })
      );
      if (!!redirect) {
        router.replace(redirect);
      } else if (response?.data?.user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace(`/`);
      }
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
        <h3 className="text-2xl xl:text-3xl font-roman-boldmb-2 mb-2">
          Sign In
        </h3>
        <p className="text-brand/500 mb-4">
          Don’t have account!{" "}
          <Link
            href={"/sign-up"}
            className="font-medium hover:text-primary text-secondery "
          >
            Create Account
          </Link>
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

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required!",
              },
              {
                min: 12,
                message: "Password must be at least 12 characters long!",
              },
            ]}
            hasFeedback
          >
            <Input.Password size="large" placeholder="**********" />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item name="rember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link
              href={"/forget-pass"}
              className="hover:text-primary! text-secondery! mt-1"
            >
              Forget password
            </Link>
          </div>
          <div className="w-full flex justify-center ">
            <Button
              loading={isLoading}
              type="primary"
              size="large"
              htmlType="submit"
              className="px-2 w-full"
            >
              Login account <GoArrowRight size={20} className="mt-0.5" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
