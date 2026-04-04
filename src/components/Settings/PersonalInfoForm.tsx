"use client";

import { TUniObject } from "@/types";
import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  message,
  Row,
  Select,
} from "antd";
import DraggerInput, { TFilePath } from "../ui/DraggerInput";
import { PiLinkSimple } from "react-icons/pi";
import FileCart from "../ui/FileCart";
import { useState } from "react";
import { useUpdateCandidateInfoMutation } from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";
import { filterData } from "@/constants/filter.const";
import { useAppSelector } from "@/redux/hook";
import CvUploadModal from "../seekers/CvUploadModal";

const PersonalInfoForm = () => {
  const [form] = Form.useForm();
  const { user } = useAppSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const [logoUrl, setLogoUrl] = useState<TFilePath>([]);
  const [mutation, { isLoading }] = useUpdateCandidateInfoMutation();

  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    const payload: TUniObject = {
      ...values,
    };
    if (!!logoUrl[0]) payload.logo = logoUrl[0];
    try {
      await mutation({
        body: payload,
        step: 1,
      }).unwrap();
      messageApi.open({
        key: "registration",
        type: "success",
        content: "Personal information submitted successfully!",
        duration: 2,
      });
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  return (
    <div className="space-y-3 py-3">
      {contextHolder}
      <p className="text-xl sm:text-2xl">Basic Information</p>
      <Form
        form={form}
        // name={"normal_login"}
        layout="vertical"
        initialValues={{
          logo: user?.logo,
          fullName: user?.fullName,
          title: user?.title,
          experience: user?.experience,
          educations: user?.educations,
          parsonalWebsite: user?.parsonalWebsite,
        }}
        onFinish={onFinish}
        // onValuesChange={onValuesChange}
        requiredMark={false}
        className="w-full"
      >
        <Row gutter={[24, 16]}>
          <Col xs={24} lg={6}>
            <Form.Item
              label="Profile Picture"
              name="logo"
              rules={[
                {
                  required: !logoUrl[0],
                  message: "Photo is required!",
                },
              ]}
            >
              <DraggerInput
                setFilePaths={setLogoUrl}
                showUploadList={true}
                defaultCalss="lg:h-52 py-4"
                subTitle="Click or drag picture👤"
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={18}>
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="fullName"
                  label="Full name"
                  rules={[{ required: true, message: "Name is required!" }]}
                >
                  <Input size="large" placeholder="Enter name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="title"
                  label="Tittle/Headline"
                  rules={[{ required: true, message: "Title is required!" }]}
                >
                  <Input size="large" placeholder="Enter title" />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  rules={[
                    { required: true, message: "Experience is required!" },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Select year"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={filterData[0].options}
                  />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label="Educations"
                  name="educations"
                  rules={[
                    { required: true, message: "Education is required!" },
                  ]}
                >
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Qualification "
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={filterData[2].options}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Personal Website (Optional)"
                  name="parsonalWebsite"
                  rules={[
                    {
                      pattern: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
                      message: "Please enter a valid url!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <PiLinkSimple
                        size={18}
                        className="text-blue-500 mx-1.5"
                      />
                    }
                    size="large"
                    placeholder="Website url..."
                  />
                </Form.Item>
              </Col>
              <div className="w-full flex justify-center ">
                <Button
                  loading={isLoading}
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="px-2 w-fit"
                >
                  Save Changes
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
      </Form>
      <p className="text-xl sm:text-2xl pt-8">Your Cv/Resume</p>
      <div className="space-y-3 w-full md:max-w-96">
        {user?.cv?.map((item) => (
          <FileCart data={item} key={item._id} />
        ))}
        <CvUploadModal />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
