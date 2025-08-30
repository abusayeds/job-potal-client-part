"use client";

import { errorAlert, TResError } from "@/lib/alerts";
import {
  useUpdateCandidateInfoMutation,
  useUpdateInfoMutation,
} from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hook";
import { TUniObject } from "@/types";
import { Button, Col, Form, FormProps, Input, message, Row } from "antd";
import { createElement } from "react";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import { RiInstagramFill } from "react-icons/ri";

const socialPlatforms = [
  {
    name: "youtube",
    label: "Toutube",
    icon: FaYoutube,
  },
  {
    name: "facebook",
    label: "Facebook",
    icon: FaFacebookF,
  },
  {
    name: "instagram",
    label: "Instagram",
    icon: RiInstagramFill,
  },
  {
    name: "linkedin",
    label: "Linkedin",
    icon: FaLinkedinIn,
  },
  {
    name: "twitter",
    label: "Twitter",
    icon: FaTwitter,
  },
];

const SocialLinkInfoForm = () =>
  //   {
  //   onChange,
  // }: {
  //   onChange: (text: string) => void;
  // }
  {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [mutation, { isLoading }] = useUpdateInfoMutation();
    const [seekerMutation, { isLoading: seekerLoading }] =
      useUpdateCandidateInfoMutation();
    const { user } = useAppSelector((state) => state.auth);
    const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
      try {
        if (user?.role === "employer") {
          await mutation({
            body: values,
            step: 3,
          }).unwrap();
        } else if (user?.role === "candidate") {
          await seekerMutation({
            body: values,
            step: 3,
          }).unwrap();
        }
        messageApi.open({
          key: "registration",
          type: "success",
          content: "Social link has been submitted successfully!",
          duration: 2,
        });
        // if (user?.role === "candidate" && !user.isCompleted) onChange("account");
      } catch (error) {
        errorAlert({ error: error as TResError });
      }
    };

    const validateUrl = (_: unknown, value: string) => {
      if (!value) {
        return Promise.resolve();
      }
      const urlPattern =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(value)) {
        return Promise.reject(new Error("Please enter a valid URL"));
      }
      return Promise.resolve();
    };
    const handleClearField = (fieldName: string) => {
      form.setFieldsValue({ [fieldName]: "" });
    };
    return (
      <div className="space-y-3 py-3">
        {contextHolder}
        <p className="text-xl sm:text-2xl">Social Information</p>
        <Form
          form={form}
          // name={"normal_login"}
          layout="vertical"
          initialValues={{
            youtube: user?.youtube,
            facebook: user?.facebook,
            instagram: user?.instagram,
            linkedin: user?.linkedin,
            twitter: user?.twitter,
          }}
          onFinish={onFinish}
          // onValuesChange={onValuesChange}
          requiredMark={false}
          className="w-full"
        >
          {socialPlatforms.map((platform, index) => (
            <Row
              gutter={[
                {
                  xs: 0,
                  sm: 8,
                  lg: 24,
                },
                {
                  // xs: 8,
                  // md: 26,
                  // lg: 24,
                },
              ]}
              key={platform.name}
            >
              <Col xs={21} md={18} xl={14}>
                <Form.Item
                  name={platform.name}
                  label={"Socila Link " + ++index}
                  rules={[
                    { validator: validateUrl },
                    //   { required: true, message: `${platform.label} is required!` },
                  ]}
                  // style={{ marginBottom: "20px" }}
                >
                  <Input
                    size="large"
                    placeholder="Profile link/url..."
                    prefix={
                      <div className="flex items-center gap-2 lg:min-w-24 border-r border-gray-400 pr-1.5 sm:mr-1">
                        {createElement(platform.icon, {
                          className: "h-4 w-4 text-primary",
                        })}
                        <span className="text-sm hidden sm:block">
                          {platform.label}
                        </span>
                      </div>
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={3} md={4}>
                <Form.Item label={<span className="sr-only">{index}</span>}>
                  <Button
                    htmlType="button"
                    onClick={() => handleClearField(platform.name)}
                    shape="circle"
                    type="text"
                    size="large"
                  >
                    <FiMinusCircle className="text-red-400" size={25} />
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          ))}
          <div className="w-full flex justify-center md:justify-start pt-1">
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
    );
  };

export default SocialLinkInfoForm;
