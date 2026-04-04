"use client";

import { TUniObject } from "@/types";
import { Button, Form, FormProps, message, Select } from "antd";

import EmploymentAddModal from "../ui/EmploymentAddModal";
import ReferencesAddModal from "../ui/ReferencesAddModal";
import { useUpdateEmploymentMutation } from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";
import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";

const options = [
  {
    label: "Programming",
    title: "Programming",
    options: [
      { label: "C++", value: "c++" },
      { label: "JavaScript", value: "javascript" },
      { label: "Python", value: "python" },
      { label: "Java", value: "java" },
      { label: "Ruby", value: "ruby" },
    ],
  },
  {
    label: "Technical",
    title: "Technical",
    options: [
      { label: "Networking", value: "networking" },
      { label: "Database Management", value: "database_management" },
      { label: "Cloud Computing", value: "cloud_computing" },
      { label: "DevOps", value: "devops" },
      { label: "Security", value: "security" },
    ],
  },
  {
    label: "Soft Skills",
    title: "Soft Skills",
    options: [
      { label: "Communication", value: "communication" },
      { label: "Leadership", value: "leadership" },
      { label: "Teamwork", value: "teamwork" },
      { label: "Time Management", value: "time_management" },
      { label: "Problem Solving", value: "problem_solving" },
    ],
  },
  {
    label: "Design",
    title: "Design",
    options: [
      { label: "UI/UX Design", value: "ui_ux_design" },
      { label: "Graphic Design", value: "graphic_design" },
      { label: "Web Design", value: "web_design" },
      { label: "Illustration", value: "illustration" },
      { label: "Animation", value: "animation" },
    ],
  },
  {
    label: "Marketing",
    title: "Marketing",
    options: [
      { label: "SEO", value: "seo" },
      { label: "Content Marketing", value: "content_marketing" },
      { label: "Social Media", value: "social_media" },
      { label: "Email Marketing", value: "email_marketing" },
      { label: "Affiliate Marketing", value: "affiliate_marketing" },
    ],
  },
  {
    label: "Data Science",
    title: "Data Science",
    options: [
      { label: "Machine Learning", value: "machine_learning" },
      { label: "Deep Learning", value: "deep_learning" },
      { label: "Data Visualization", value: "data_visualization" },
      { label: "Statistical Analysis", value: "statistical_analysis" },
      { label: "Big Data", value: "big_data" },
    ],
  },
];

const Employment = () => {
  const [form] = Form.useForm();
  const { user } = useAppSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useUpdateEmploymentMutation();

  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    try {
      await mutation({
        body: values,
        type: "professional_skills",
      }).unwrap();
      messageApi.open({
        key: "registration",
        type: "success",
        content: "Skills has been submitted successfully!",
        duration: 3,
      });
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      professional_skills: user?.professional_skills,
    });
  }, [user]);
  return (
    <div className="space-y-3 py-3">
      {contextHolder}
      <p className="text-xl sm:text-2xl">Employment History</p>
      <EmploymentAddModal />
      <p className="text-xl sm:text-2xl mt-4">References</p>
      <ReferencesAddModal />
      <p className="text-xl sm:text-2xl mt-4">Professional Skills</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="w-full"
      >
        <Form.Item
          label="Job Title"
          name="professional_skills"
          rules={[{ required: true, message: "Skills are required!" }]}
        >
          <Select
            mode="tags"
            size="large"
            style={{ width: "100%" }}
            placeholder="Tags Mode"
            options={options}
            maxCount={10}
            maxTagCount={"responsive"}
            dropdownRender={(menu) => (
              <>
                {menu}
                <div style={{ padding: "8px", textAlign: "center" }}>
                  <span>
                    {(form.getFieldValue("skills") || []).length} / 10 selected
                  </span>
                </div>
              </>
            )}
          />
        </Form.Item>

        <div className="w-full">
          <Button
            loading={isLoading}
            type="primary"
            size="large"
            htmlType="submit"
            className="px-4 w-fit"
          >
            Save to Profile
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Employment;
