import React, { useState } from "react";
import { TUniObject } from "@/types";
import { cn } from "@/utils/cn";
import { Button, Form, FormProps, Input } from "antd";
import { PiMapPinLine } from "react-icons/pi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { LuMail } from "react-icons/lu";

const BasicInfo = ({ className }: { className?: string }) => {
  const [form] = Form.useForm();
  const [phone, setPhone] = useState("");
  //   const [fileList, setFileList] = useState<UploadFile[]>([]);
  //   const [imageUrl, setImageUrl] = useState<string>();
  //   const router = useRouter();

  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    console.log(values);
    // try {
    // const response = await setData(values).unwrap();
    // } catch (error) {
    // }
  };
  console.log(phone);
  return (
    <div className={cn("space-y-3 py-3", className)}>
      <p className="text-xl sm:text-2xl">Contact Info</p>
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
          name="address"
          label="Address"
          rules={[{ required: true, message: "Address is required!" }]}
        >
          <Input
            className=""
            size="large"
            placeholder="City, state, country name"
            prefix={<PiMapPinLine size={20} className="mr-1 text-primary/90" />}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Phone is required!" },
            { pattern: /^\+?[1-9]\d{7,14}$/, message: "Enter a valid number!" },
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
          <Input
            prefix={<LuMail size={20} className="mr-1 text-primary/90" />}
            size="large"
            placeholder="user@ac.com"
          />
        </Form.Item>
        <div className="w-full flex pt-0.5">
          <Button
            // loading={isLoading}
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
  );
};

export default BasicInfo;
