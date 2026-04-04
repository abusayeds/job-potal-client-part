"use client";

import { cn } from "@/utils/cn";
import { Button, Form, FormProps, Input, message } from "antd";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";
import Cookies from "js-cookie";

type FieldType = {
  password: string;
  //   confirmPassword: string;
  //   terms?: boolean;
};

const ResetPass = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useResetPasswordMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await mutation(values).unwrap();
      Cookies.remove("token");
      messageApi.open({
        key: "reset",
        type: "success",
        content: "Password reset successful!",
        duration: 2,
      });
      router.replace("/sign-in");
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
        <h3 className="text-2xl xl:text-3xl font-roman-bold">Reset Password</h3>
        <p className="text-brand/60 px-2 lg:px-6">
          Enter your email address below and we&#39;ll send you a secure link to
          create a new password.
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
        className="w-full"
      >
        <Form.Item
          label="New Password"
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
          <Input.Password size="large" placeholder="**********" />
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
          <Input.Password size="large" placeholder="**********" />
        </Form.Item>
        <div className="w-full flex justify-center  pt-2">
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
  );
};

export default ResetPass;
