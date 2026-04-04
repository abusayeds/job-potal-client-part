import { Button, Form, FormProps, Input, message } from "antd";
import GlobalModal from "./GlobalModal";
import PageHeading from "./PageHeading";
import { errorAlert, TResError } from "@/lib/alerts";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";

type FieldType = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};
const ChangePassword = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useChangePasswordMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await mutation(values).unwrap();
      messageApi.open({
        key: "auth",
        type: "success",
        content: "Your password has been changed successfully.",
        duration: 3,
      });
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  return (
    <GlobalModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
      {contextHolder}
      <div className="p-4">
        <PageHeading
          backPath={"/sign-in"}
          title={"Change Password"}
          hideIcon={true}
        />
        <p className=" drop-shadow text-[#464343] my-3">
          Your password must be 8-10 character long.
        </p>
        <Form
          name="normal_login"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          requiredMark={false}
          onFinish={onFinish}
        >
          <Form.Item
            label={<span className="font-medium text-base">Old Password</span>}
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please input old password!",
              },
              {
                min: 12,
                message: "Must be at least 12 characters!",
              },
            ]}
            hasFeedback
          >
            <Input.Password size="large" placeholder="**********" />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium text-base">New Password</span>}
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
          <Form.Item
            label={
              <span className="font-medium text-base">
                Confirm New Password
              </span>
            }
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please Re-Enter new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password size="large" placeholder="**********" />
          </Form.Item>
          <div className="text-end">
            <Button
              href="/forget-pass"
              target="_blank"
              size="small"
              type="link"
            >
              Forgot Password ?
            </Button>
          </div>
          <div className="w-full flex justify-center pt-4 ">
            <Button
              loading={isLoading}
              type="primary"
              size="large"
              htmlType="submit"
              className="w-full px-2 "
            >
              Save Password
            </Button>
          </div>
        </Form>
      </div>
    </GlobalModal>
  );
};

export default ChangePassword;
