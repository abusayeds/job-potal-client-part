import React from "react";
import { TUniObject } from "@/types";
import { cn } from "@/utils/cn";
import { Button, Col, Form, FormProps, message, Row, Select } from "antd";
import { BsBriefcase } from "react-icons/bs";
import { useAppSelector } from "@/redux/hook";
import { filterData } from "@/constants/filter.const";
import { useJobAlertMutation } from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";

const JobAlerts = ({ className }: { className?: string }) => {
  const [form] = Form.useForm();
  const { user } = useAppSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useJobAlertMutation();

  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    try {
      await mutation(values).unwrap();
      messageApi.open({
        key: "registration",
        type: "success",
        content: "Job alert information submitted successfully!",
        duration: 3,
      });
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  return (
    <div className={cn("space-y-3 py-3", className)}>
      {contextHolder}
      <p className="text-xl sm:text-2xl">Job Alerts</p>
      <Form
        form={form}
        // name={"normal_login"}
        layout="vertical"
        initialValues={{
          jobType: user?.jobType,
          jobLevel: user?.jobLevel,
        }}
        onFinish={onFinish}
        requiredMark={false}
        className="w-full"
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="jobType"
              label="Job Type"
              rules={[{ required: true, message: "Type is required!" }]}
            >
              <Select
                size="large"
                showSearch
                mode="multiple"
                placeholder="Job Type"
                // filterOption={(input, option) =>
                //   (option?.label ?? "")
                //     .toLowerCase()
                //     .includes(input.toLowerCase())
                // }
                // loading={cateLoading}
                options={
                  filterData[1].options
                  // categoryData?.data?.map((item: TJobCategory) => ({
                  //   label: item.catagoryType,
                  //   value: item.catagoryType,
                  // })) || []
                }
                prefix={
                  <BsBriefcase size={20} className="mr-1 text-primary/90" />
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="jobLevel"
              label="Job Level"
              rules={[{ required: true, message: "Level is required!" }]}
            >
              <Select
                size="large"
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select..."
                options={filterData[5].options}
              />
            </Form.Item>
          </Col>
          {/* <Col xs={24} sm={12}>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Location is required!" }]}
            >
              <Input
                className=""
                size="large"
                placeholder="City, state, country name"
                prefix={
                  <PiMapPinLine size={19} className="mr-1 text-primary/90" />
                }
              />
            </Form.Item>
          </Col> */}
        </Row>
        <div className="w-full flex pt-0.5">
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
      </Form>
    </div>
  );
};

export default JobAlerts;
