import React, { useState } from "react";
import ChangePassword from "../ContactInfos/ChangePassword";
import { Button, Form, FormProps, Input, message } from "antd";
import {
  useUpdateCandidateInfoMutation,
  useUpdateInfoMutation,
} from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";
import { TUniObject } from "@/types";
import { PiMapPinLine } from "react-icons/pi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { LuMail } from "react-icons/lu";
import { useAppSelector } from "@/redux/hook";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import JobAlerts from "../ContactInfos/JobAlerts";
import CloseAccount from "./CloseAccount";

const AccountInfoForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAppSelector((state) => state.auth);
  const [phone, setPhone] = useState(user?.phone || "");
  const [seekerMutation, { isLoading: seekerLoading }] =
    useUpdateCandidateInfoMutation();
  const [mutation, { isLoading }] = useUpdateInfoMutation();
  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    try {
      if (user?.role === "employer" || user?.role === "employe") {
        await mutation({
          body: values,
          step: 4,
        }).unwrap();
      } else if (user?.role === "candidate") {
        await seekerMutation({
          body: values,
          step: 4,
        }).unwrap();
      }
      if (!user?.isCompleted) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text:
            user?.role === "employer"
              ? "Your account information is currently under review. Upon successful completion of the review within the next 24 hours, you will be granted full access to your dashboard and proceed by purchasing your preferred subscription plan to advance with your project."
              : "Your account information is now complete. You can now apply for jobs and access other features.",
          showConfirmButton: true,
          // showCancelButton: true,
          confirmButtonText: "Home ➜",
        }).then((res) => {
          if (res.isConfirmed) {
            router.push("/");
          }
        });
      } else {
        messageApi.open({
          key: "registration",
          type: "success",
          content: "Account information has been submitted successfully!",
          duration: 2,
        });
      }
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  return (
    <div className="divide-y divide-gray-200 space-y-2">
      {contextHolder}
      <div className={"space-y-3 py-3 pb-8"}>
        <p className="text-xl sm:text-2xl">Contact Info</p>
        <Form
          form={form}
          // name={"normal_login"}
          layout="vertical"
          initialValues={{
            address: user?.address,
            phone: user?.phone,
            contactEmail:
              user?.role === "employer" ? user?.contactEmail : user?.email,
          }}
          onFinish={onFinish}
          // onValuesChange={onValuesChange}
          requiredMark={false}
          className="w-full"
        >
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Address is required!" }]}
          >
            <Input
              className=""
              size="large"
              placeholder="City, state, country name"
              prefix={
                <PiMapPinLine size={20} className="mr-1 text-primary/90" />
              }
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Phone is required!" },
              {
                pattern: /^\+?[1-9]\d{7,14}$/,
                message: "Enter a valid number!",
              },
            ]}
          >
            <PhoneInput
              enableSearch
              country={"us"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              containerClass="w-full flex"
              inputClass="!flex-1 w-full py-2 !pl-[70px] sm:!pl-20 !h-[48px] pr-3 !border !border-brand/15 hover:!border-[#007BFF]/95 focus:!border-[#007BFF]/95 !rounded-[5px] focus:outline-none focus:!ring-1 focus:!ring-blue-100 !ring-offset-[0.5px] transition-all"
              buttonClass="!bg-transparent !border-0 !border-r !shadow-none !pl-2 !pr-3 sm:!pr-4 my-2.5 "
              // dropdownClass="!z-50"
            />
          </Form.Item>
          <Form.Item
            label={"Contact Email"}
            name="contactEmail"
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
            <Input
              readOnly={user?.role === "candidate"}
              prefix={<LuMail size={20} className="mr-1 text-primary/90" />}
              size="large"
              placeholder="user@ac.com"
            />
          </Form.Item>
          <div className="w-full flex pt-1">
            <Button
              loading={isLoading || seekerLoading}
              type="primary"
              size="large"
              htmlType="submit"
              className="px-2 w-fit"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
      {user?.role === "candidate" && !!user?.isCompleted && (
        <JobAlerts className="pb-8" />
      )}
      {!!user?.isCompleted && (
        <>
          <ChangePassword className="pb-8" />
          {(user?.role === "candidate" || user?.role === "employer") && (
            <CloseAccount role={user?.role} />
          )}
        </>
      )}
    </div>
  );
};

export default AccountInfoForm;
