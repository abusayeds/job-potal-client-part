// "use client";

// import { Button, Checkbox, Form, FormProps, Input, message } from "antd";
// import { GoArrowRight } from "react-icons/go";
// import Link from "next/link";
// import { cn } from "@/utils/cn";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useAppDispatch } from "@/redux/hook";
// import { setLogin } from "@/redux/features/auth/authSlice";
// import { useLoginMutation } from "@/redux/features/auth/authApi";
// import { errorAlert, TResError } from "@/lib/alerts";

// type FieldType = {
//   email: string;
//   password: string;
//   remember?: boolean;
// };

// const SignIn = ({
//   className,
//   redirect,
// }: {
//   className?: string;
//   redirect?: string;
// }) => {
//   const [form] = Form.useForm();
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const [messageApi, contextHolder] = message.useMessage();
//   const [mutation, { isLoading }] = useLoginMutation();
//   const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
//     try {
//       const response = await mutation(values).unwrap();
//       if (response.data.isVerify === false) {
//         sessionStorage.setItem("v-token", response.data.token);
//         router.push(`/verify-email?query=${values.email}`);
//         throw new Error(`The email ${values.email} is not verified.`);
//       }
//       messageApi.open({
//         key: "signin",
//         type: "success",
//         content: "Login successful!",
//         duration: 2,
//       });
//       // console.log(response);
//       dispatch(
//         setLogin({
//           token: response.data.token,
//           user: response.data.user,
//           remember: !!values.remember,
//         }),
//       );
//       if (!!redirect) {
//         router.replace(redirect);
//       } else if (response?.data?.user.role === "admin") {
//         router.replace("/admin");
//       } else {
//         router.replace(`/`);
//       }
//     } catch (error) {
//       errorAlert({ error: error as TResError });
//     }
//   };
//   return (
//     <div
//       className={cn(
//         "w-full flex flex-col justify-center items-start max-w-xl mx-auto lg:mx-0",
//         className,
//       )}
//     >
//       {contextHolder}
//       <div className="relative w-full max-w-48 lg:max-w-52 aspect-[4/1] mx-auto lg:mx-0">
//         <Image
//           src="/statics/logo.png"
//           alt="Logo"
//           fill
//           style={{ objectFit: "contain" }}
//           sizes="100vw"
//         />
//       </div>
//       <div className=" min-h-[calc(100vh-250px)] flex flex-col justify-center w-full mt-4">
//         <h3 className="text-2xl xl:text-3xl font-roman-boldmb-2 mb-2">
//           Sign In
//         </h3>
//         <p className="text-brand/500 mb-4">
//           Don’t have account!{" "}
//           <Link
//             href={"/sign-up"}
//             className="font-medium hover:text-primary text-secondery "
//           >
//             Create Account
//           </Link>
//         </p>
//         <Form
//           form={form}
//           // name={"normal_login"}
//           layout="vertical"
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//           // onValuesChange={onValuesChange}
//           requiredMark={false}
//           className="w-full"
//         >
//           <Form.Item
//             label={"User Email"}
//             name="email"
//             rules={[
//               {
//                 type: "email",
//                 message: "Input a valid email!",
//               },
//               {
//                 required: true,
//                 message: "Email is required!",
//               },
//             ]}
//           >
//             <Input size="large" placeholder="user@ac.com" />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Password is required!",
//               },
//             ]}
//             hasFeedback
//           >
//             <Input.Password size="large" placeholder="**********" />
//           </Form.Item>
//           <div className="flex justify-between">
//             <Form.Item name="remember" valuePropName="checked">
//               <Checkbox>Remember me</Checkbox>
//             </Form.Item>
//             <Link
//               href={"/forget-pass"}
//               className="hover:text-primary! text-secondery! mt-1"
//             >
//               Forget password
//             </Link>
//           </div>
//           <div className="w-full flex justify-center ">
//             <Button
//               loading={isLoading}
//               type="primary"
//               size="large"
//               htmlType="submit"
//               className="px-2 w-full"
//             >
//               Login account <GoArrowRight size={20} className="mt-0.5" />
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

// SignIn.tsx
"use client";

import { useState } from "react";
import { Button, Checkbox, Form, FormProps, Input, message, Modal } from "antd";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { setLogin } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";
import DemoAccountSelector from "./Demoaccountselector";

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

  const [selectedDemoEmail, setSelectedDemoEmail] = useState<string | null>(
    null,
  );
  const [pendingValues, setPendingValues] = useState<FieldType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDemoSelect = (email: string, password: string) => {
    setSelectedDemoEmail(email);
    form.setFieldsValue({ email, password });
  };

  const handleDemoClear = () => {
    setSelectedDemoEmail(null);
    form.resetFields();
  };

  // Core login logic — called after modal confirm OR directly if no demo
  const doLogin = async (values: FieldType) => {
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
      dispatch(
        setLogin({
          token: response.data.token,
          user: response.data.user,
          remember: !!values.remember,
        }),
      );
      if (redirect) {
        router.replace(redirect);
      } else if (response?.data?.user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (selectedDemoEmail) {
      // Demo account — show warning modal first
      setPendingValues(values);
      setModalOpen(true);
    } else {
      // Normal account — login directly
      await doLogin(values);
    }
  };

  const handleModalConfirm = async () => {
    setModalOpen(false);
    if (pendingValues) {
      await doLogin(pendingValues);
      setPendingValues(null);
    }
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setPendingValues(null);
  };

  return (
    <div
      className={cn(
        "w-full flex flex-col justify-center items-start max-w-xl mx-auto lg:mx-0",
        className,
      )}
    >
      {contextHolder}

      {/* Logo */}
      <div className="relative w-full max-w-48 lg:max-w-52 aspect-[4/1] mx-auto lg:mx-0">
        <Image
          src="/statics/logo.png"
          alt="Logo"
          fill
          style={{ objectFit: "contain" }}
          sizes="100vw"
        />
      </div>

      <div className="min-h-[calc(100vh-250px)] flex flex-col justify-center w-full mt-4">
        <h3 className="text-2xl xl:text-3xl font-roman-bold mb-2">Sign In</h3>
        <p className="text-brand/500 mb-4">
          Don&apos;t have account!{" "}
          <Link
            href={"/sign-up"}
            className="font-medium hover:text-primary text-secondery"
          >
            Create Account
          </Link>
        </p>

        {/* Demo Account Selector */}
        <div className="mb-6 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
            Demo Account
          </p>
          <DemoAccountSelector
            onSelect={handleDemoSelect}
            onClear={handleDemoClear}
            selectedEmail={selectedDemoEmail}
          />
        </div>

        {/* Sign In Form */}
        <Form
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          requiredMark={false}
          className="w-full"
        >
          <Form.Item
            label="User Email"
            name="email"
            rules={[
              { type: "email", message: "Input a valid email!" },
              { required: true, message: "Email is required!" },
            ]}
          >
            <Input
              size="large"
              placeholder="user@ac.com"
              readOnly={!!selectedDemoEmail}
            />
          </Form.Item>

          {/* Password: hidden when demo selected, visible for normal login */}
          {!selectedDemoEmail ? (
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required!" }]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
          ) : (
            // Carry the password value silently
            <Form.Item name="password" hidden>
              <Input />
            </Form.Item>
          )}

          <div className="flex justify-between">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {!selectedDemoEmail && (
              <Link
                href={"/forget-pass"}
                className="hover:text-primary! text-secondery! mt-1"
              >
                Forget password
              </Link>
            )}
          </div>

          <div className="w-full flex justify-center">
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

      {/* Demo Warning Modal — shown on login click when demo account selected */}
      <Modal
        open={modalOpen}
        onCancel={handleModalCancel}
        onOk={handleModalConfirm}
        okText="I understand, login"
        cancelText="Cancel"
        confirmLoading={isLoading}
        title="⚠️ Demo Account — Do not modify"
      >
        <p className="text-gray-600 mb-4">
          This account is provided for <strong>demo purposes only</strong>.
          Please do not change any information.
        </p>
        <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
          <p>
            <span className="text-gray-400">Email :</span>{" "}
            <span className="font-medium">{selectedDemoEmail}</span>
          </p>
          <p>
            <span className="text-gray-400">Password :</span>{" "}
            <span className="font-medium tracking-widest">••••••••</span>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default SignIn;
