import { errorAlert, TResError } from "@/lib/alerts";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { TUniObject } from "@/types";
import { cn } from "@/utils/cn";
import { Button, Col, Form, FormProps, Input, message, Row } from "antd";

const ChangePassword = ({ className }: { className?: string }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useChangePasswordMutation();
  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    try {
      await mutation(values).unwrap();
      messageApi.open({
        key: "auth",
        type: "success",
        content: "Your password has been changed successfully.",
        duration: 3,
      });
      form.resetFields();
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  return (
    <div className={cn("space-y-3 py-3", className)}>
      {contextHolder}
      <p className="text-xl sm:text-2xl">Change Password</p>
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
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Current Password"
              name="oldPassword"
              rules={[
                {
                  min: 12,
                  message: "Must be at least 12 characters!",
                },
                {
                  required: true,
                  message: "Current Password is required!",
                },
              ]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                {
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject("Password is required!");
                    }
                    const pattern =
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
                    if (!pattern.test(value)) {
                      return Promise.reject(
                        "Include uppercase, lowercase, number, special character!"
                      );
                    }
                    if (value.length < 12) {
                      return Promise.reject("Must be at least 12 characters!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Re-Enter the password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The password that you entered do not match!")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
          </Col>
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

export default ChangePassword;
