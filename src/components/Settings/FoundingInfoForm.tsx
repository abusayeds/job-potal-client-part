import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from "antd";
import React, { useRef } from "react";
import CustomEditor, { TTinyMcEditor } from "../ui/CustomEditor";
import { TUniObject } from "@/types";
import { PiLinkSimple } from "react-icons/pi";
import { errorAlert, TResError } from "@/lib/alerts";
import { useUpdateInfoMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hook";
import { filterData } from "@/constants/filter.const";
import dayjs from "dayjs";
import { BsPlusCircle } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";

const FoundingInfoForm = () => {
  const [form] = Form.useForm();
  const editorRef = useRef<TTinyMcEditor>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAppSelector((state) => state.auth);
  const [mutation, { isLoading }] = useUpdateInfoMutation();
  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    // return console.log(values);
    if (editorRef.current && typeof editorRef.current.getContent() === "string")
      values.companyVision = editorRef.current.getContent();
    try {
      await mutation({
        body: values,
        step: 2,
      }).unwrap();
      messageApi.open({
        key: "registration",
        type: "success",
        content:
          "Company founding information has been submitted successfully!",
        duration: 2,
      });
      // onChange("social");
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  return (
    <div className="space-y-3 py-3">
      {contextHolder}
      <p className="text-xl sm:text-2xl">Founding Information</p>
      <Form
        form={form}
        // name={"normal_login"}
        layout="vertical"
        initialValues={{
          organizationType: user?.organizationType,
          industry: user?.industry,
          teamSize: user?.teamSize,
          foundIn: dayjs(user?.foundIn),
          companyWebsite: user?.companyWebsite,
          companyVision: user?.companyVision,
          benefits: user?.benefits?.length ? user?.benefits : [""],
        }}
        onFinish={onFinish}
        // onValuesChange={onValuesChange}
        requiredMark={false}
        className="w-full"
      >
        <Row gutter={[24, 0]}>
          <Col span={24} lg={8}>
            <Form.Item
              name="organizationType"
              label="Organization Type"
              rules={[{ required: true, message: "Organization is required!" }]}
            >
              <Select
                size="large"
                style={{ width: "100%" }}
                placeholder="Select..."
                options={filterData[4].options.slice(1)}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            <Form.Item
              name="industry"
              label="Industry Type"
              rules={[{ required: true, message: "Industry is required!" }]}
            >
              <Select
                size="large"
                style={{ width: "100%" }}
                placeholder="Select..."
                options={filterData[3].options.slice(1)}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            <Form.Item
              name="teamSize"
              label="Team Size"
              rules={[
                { required: true, message: "Team Size is required!" },
                {
                  pattern: /^\+?[0-9\s]*$/,
                  message: "Please input valid number!",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                placeholder="00"
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            <Form.Item
              name="foundIn"
              label="Founded in:"
              rules={[{ required: true, message: "Founded date is required!" }]}
            >
              <DatePicker
                size="large"
                placeholder="DD-MM-YYYY"
                format="DD-MM-YYYY"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={16}>
            <Form.Item
              label="Company Website (Optional)"
              name="companyWebsite"
              rules={[
                {
                  pattern: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
                  message: "Please enter a valid url!",
                },
              ]}
            >
              <Input
                prefix={
                  <PiLinkSimple size={18} className="text-blue-500 mx-1.5" />
                }
                size="large"
                placeholder="Website url..."
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <p className="pb-1.5">Benefits</p>
            <Form.List
              name="benefits"
              rules={[
                {
                  validator: async (_, benefits) => {
                    if (!benefits || benefits.length < 4) {
                      return Promise.reject(new Error("At least 4 benefits"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(
                    (
                      field: {
                        key: number;
                        name: number;
                        fieldKey?: number;
                        isListField?: boolean;
                      },
                      index: number
                    ) => (
                      <div key={index} className="flex gap-1.5">
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input benefit's name or delete this field.",
                            },
                          ]}
                          style={{ width: "100%" }}
                        >
                          <Input
                            prefix={
                              <span className="text-gray-500">
                                {++index + "."}
                              </span>
                            }
                            placeholder={".Enter here..."}
                            size="large"
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <BiMinusCircle
                            size={21}
                            className="dynamic-delete-button mt-3"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </div>
                    )
                  )}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: 200 }}
                      icon={<BsPlusCircle />}
                    >
                      Add benefit
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={24}>
            <Form.Item
              name="companyVision"
              label="Company Vision"
              rules={[
                {
                  validator() {
                    if (
                      !(
                        editorRef.current &&
                        typeof editorRef.current.getContent() === "string" &&
                        editorRef.current.getContent().length > 0
                      )
                    ) {
                      return Promise.reject("Vision is required!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <CustomEditor
                ref={editorRef}
                defaultValue={user?.companyVision}
                placeholder={"Tell us about your company vision..."}
                init={{ statusbar: true }}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="w-full flex justify-center lg:justify-start pt-1">
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

export default FoundingInfoForm;
