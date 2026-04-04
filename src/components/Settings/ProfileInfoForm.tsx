"use client";

import { TUniObject } from "@/types";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  message,
  Row,
  Select,
} from "antd";
import { errorAlert, TResError } from "@/lib/alerts";
import { useUpdateCandidateInfoMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hook";
import { countries } from "countries-list";
import dayjs from "dayjs";

const ProfileInfoForm = () => {
  const [form] = Form.useForm();
  const { user } = useAppSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useUpdateCandidateInfoMutation();

  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    const payload: TUniObject = {
      ...values,
    };
    try {
      await mutation({
        body: payload,
        step: 2,
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
  const maritalStatusOptions = [
    { label: "Single", value: "Single" },
    { label: "Married", value: "Married" },
    { label: "Divorced", value: "Divorced" },
    { label: "Widowed", value: "Widowed" },
    { label: "Separated", value: "Separated" },
  ];

  return (
    <div className="space-y-3 py-3">
      {contextHolder}
      <p className="text-xl sm:text-2xl">Profile Information</p>
      <Form
        form={form}
        // name={"normal_login"}
        layout="vertical"
        initialValues={{
          nationality: user?.nationality,
          dateOfBrith: user?.dateOfBrith && dayjs(user?.dateOfBrith),
          gender: user?.gender,
          maritalStatus: user?.maritalStatus,
          biography: user?.biography,
        }}
        onFinish={onFinish}
        // onValuesChange={onValuesChange}
        requiredMark={false}
        className="w-full"
      >
        <Row
          gutter={[
            {
              xs: 10,
              sm: 16,
              lg: 24,
            },
            {
              // xs: 8,
              // md: 26,
              // lg: 24,
            },
          ]}
        >
          <Col xs={24} sm={12}>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[{ required: true, message: "Nationality is required!" }]}
            >
              <Select
                size="large"
                showSearch
                placeholder="Select..."
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={Object.entries(countries).map((country) => ({
                  label: country[1].name,
                  value: country[1].name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Date of Birth"
              name="dateOfBrith"
              rules={[{ required: true, message: "Birth date is required!" }]}
            >
              <DatePicker
                size="large"
                placeholder="DD-MM-YYYY"
                format="DD-MM-YYYY"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Gender is required!" }]}
            >
              <Select
                size="large"
                placeholder="Select..."
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Other", value: "Other" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              label="Marital Status"
              name="maritalStatus"
              rules={[
                { required: true, message: "Marital Status is required!" },
              ]}
            >
              <Select
                size="large"
                placeholder="Select status "
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={maritalStatusOptions}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Biography"
              name="biography"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea
                rows={6}
                showCount
                maxLength={500}
                placeholder="Write down your biography here. Let the employers know who you are..."
              />
            </Form.Item>
          </Col>
          <div className="w-full flex justify-center lg:justify-start px-2">
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
      </Form>
    </div>
  );
};

export default ProfileInfoForm;
