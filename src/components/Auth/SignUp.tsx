"use client";

import React from "react";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  message,
  Select,
} from "antd";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";
import Cookies from "js-cookie";

type FieldType = {
  fullName: string;
  userName: string;
  email: string;
  role?: "employer" | "candidate";
  password: string;
  confirmPassword: string;
  terms?: boolean;
};

const SignUp = ({
  type,
  className,
}: {
  type?: "employer" | "candidate";
  className?: string;
}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useRegistrationMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await mutation(values).unwrap();
      Cookies.set("token", response.data.token);
      messageApi.open({
        key: "registration",
        type: "success",
        content: "Sign up successful!",
        duration: 2,
      });
      router.replace(`/verify-email?type=verify&query=${values.email}`);
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  return (
    <div
      className={cn(
        "w-full flex flex-col justify-center items-start max-w-xl mx-auto lg:mx-auto",
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
      <h3 className="text-2xl xl:text-3xl font-roman-bold mt-4 mb-2">
        Create account
      </h3>
      <p className="text-brand/500 mb-4">
        Already have account ?{" "}
        <Link
          href={"/sign-in"}
          className="font-medium hover:text-primary text-secondery "
        >
          Log In
        </Link>
      </p>
      <Form
        form={form}
        // name={"normal_login"}
        layout="vertical"
        initialValues={{
          role: type,
        }}
        onFinish={onFinish}
        // onValuesChange={onValuesChange}
        requiredMark={false}
        className="w-full"
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Name is required!",
            },
          ]}
        >
          <Input size="large" placeholder="Full name" />
        </Form.Item>
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: "Username is required!",
            },
          ]}
        >
          <Input size="large" placeholder="Ex. johndoe" />
        </Form.Item>
        <Form.Item
          label={"Email"}
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
        <Form.Item label="User Type" name="role">
          <Select
            size="large"
            placeholder="Select type"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "candidate", label: "Job Seeker" },
              { value: "employer", label: "Employer" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              validator(_, value) {
                if (!value) {
                  return Promise.reject("Password is required!");
                }
                const pattern =
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
                if (!pattern.test(value)) {
                  return Promise.reject(
                    "Include uppercase, lowercase, number, special character!"
                  );
                }
                if (value.length < 12) {
                  return Promise.reject("Must be at least 12 characters!");
                }
                return Promise.resolve();
              },
            },
          ]}
          hasFeedback
        >
          <Input.Password
            // defaultValue={"12345678Jmd**"}
            size="large"
            placeholder="**********"
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Re-Enter the password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The password that you entered do not match!")
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            // defaultValue={"12345678Jmd**"}
            size="large"
            placeholder="**********"
          />
        </Form.Item>
        <Form.Item name="terms" valuePropName="checked">
          <Checkbox>
            I&#39;ve read and agree with your{" "}
            <Link
              href={"/terms"}
              className="hover:text-primary! text-secondery! "
            >
              Terms of use
            </Link>
          </Checkbox>
        </Form.Item>
        <div className="w-full flex justify-center ">
          <Button
            loading={isLoading}
            type="primary"
            size="large"
            htmlType="submit"
            className="px-2 w-full"
          >
            Create account <GoArrowRight size={20} className="mt-0.5" />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
