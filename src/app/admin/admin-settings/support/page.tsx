"use client";

import PageHeading from "@/components/ui/PageHeading";
import { errorAlert, TResError } from "@/lib/alerts";
import { useSupportMailPhoneMutation } from "@/redux/features/settings/settings.api";
import { TUniObject } from "@/types";
import { Button, Form, FormProps, Input, message } from "antd";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type FieldType = {
  email: string;
};
const Page = () => {
  const [form] = Form.useForm();
  const [phone, setPhone] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const [support, { isLoading }] = useSupportMailPhoneMutation();
  //   const router = useRouter();
  // const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
  //   console.log(values);

  //   // try {
  //   // const response = await setData(values).unwrap();
  //   // } catch (error) {

  //   // }
  // };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log(values);
    const payload: TUniObject = {
      value: {
        ...values,
      },
    };
    console.log(payload);
    try {
      await support({
        body: payload,
        step: 1,
      }).unwrap();
      messageApi.open({
        key: "update",
        type: "success",
        content: "Support updated successfully!",
        duration: 2,
      });
      form.resetFields();
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
    // router.back();
  };

  return (
    <>
      {contextHolder}
      <div className="space-y-5">
        <PageHeading
          title={"Support Mail"}
          className="pb-5 border-b border-blue-400"
        />
        {/* <LoaderWraperComp
            isLoading={isLoading}
            isError={isError}
            className={"h-[70vh]"}
          > */}
        <div className="max-w-2xl">
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
              label={"E-mail"}
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
            <div className="pt-2">
              <Button
                loading={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full max-w-[250px]"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
        {/* </LoaderWraperComp> */}
      </div>
    </>
  );
};

export default Page;
