"use client";

import React, { useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  FormProps,
  Input,
  message,
  Row,
} from "antd";
import { BsSend } from "react-icons/bs";
import { errorAlert, TResError } from "@/lib/alerts";
import { sendMail } from "@/services/settings";
type FieldType = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

const ContactForm = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const element = values[key];
        if (element) formData.append(key, element);
      }
    }
    messageApi.open({
      key: "email",
      type: "loading",
      content: "Sending.....",
    });
    try {
      const response = await sendMail(formData);
      setIsLoading(false);
      messageApi.open({
        key: "email",
        type: "success",
        content:
          response?.data?.message || response?.message || "Successfully Sent!",
        duration: 3,
      });
      form.resetFields();
    } catch (error) {
      setIsLoading(false);
      errorAlert({ error: error as TResError });
      messageApi.destroy("email");
    }
  };
  return (
    <div className="w-full border bg-white border-gray-100 rounded-xl p-6 sm:p-8 2xl:p-10">
      {contextHolder}
      <h3 className="text-2xl xl:text-3xl font-medium mb-3 2xl:mb-4">
        Get in Touch
      </h3>
      <Form
        form={form}
        name={"normal_login"}
        layout="vertical"
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onFinish}
        // onValuesChange={onValuesChange}
        requiredMark={false}
        className="w-full"
      >
        <Row gutter={[20, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Your Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Name is required!",
                },
              ]}
            >
              <Input size="large" placeholder="Full name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={"Your Email"}
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
          </Col>
        </Row>
        <Form.Item label="Subject" name="subject">
          <Input size="large" placeholder="Something..." />
        </Form.Item>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorTextPlaceholder: "#1f1f1f",
              },
            },
          }}
        >
          <Form.Item
            name="body"
            rules={[
              {
                required: true,
                message: "Message is required!",
              },
            ]}
          >
            <Input.TextArea
              size="large"
              placeholder="Enter the message here..."
              rows={3}
              showCount
              maxLength={100}
            />
          </Form.Item>
        </ConfigProvider>
        <div className="w-full flex justify-center pt-2">
          <Button
            loading={isLoading}
            type="primary"
            size="large"
            htmlType="submit"
            className="px-2 w-full"
          >
            Send Message <BsSend size={18} className="mt-1" />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;
