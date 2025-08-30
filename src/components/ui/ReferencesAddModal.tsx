import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  message,
  Radio,
  Row,
  Tag,
} from "antd";
import GlobalModal from "./GlobalModal";
import { useState } from "react";
import { BiMailSend, BiPhone, BiTrash, BiUser } from "react-icons/bi";
import { CgOrganisation } from "react-icons/cg";
import { useAppSelector } from "@/redux/hook";
import {
  useDeleteEmploymentMutation,
  useUpdateEmploymentMutation,
} from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";
import { sweetAlertConfirmation } from "@/lib/alerts/sweetAlertConfirmation";
import { TUniObject } from "@/types";

interface ReferenceFormData {
  referenceType: "personal" | "professional";
  organizationName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
}

const ReferencesAddModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAppSelector((state) => state.auth);
  const [mutation, { isLoading }] = useUpdateEmploymentMutation();
  const [deleteEmployment] = useDeleteEmploymentMutation();

  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    try {
      await mutation({
        body: values,
        type: "references",
      }).unwrap();
      messageApi.open({
        key: "registration",
        type: "success",
        content: "Reference has been submitted successfully!",
        duration: 3,
      });
      onClose();
      setIsModalOpen(false);
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  const handleDelete = async (id: string) => {
    messageApi.open({
      key: "user",
      type: "success",
      content: "Loading....",
      duration: 3,
    });
    try {
      const response = await deleteEmployment({
        recordId: id,
        type: "references",
      }).unwrap();
      messageApi.open({
        key: "user",
        type: "success",
        content:
          response?.data?.message ||
          response?.message ||
          "Removed successfully!",
        duration: 3,
      });
    } catch (error) {
      messageApi.destroy("user");
      errorAlert({ error: error as TResError });
    }
  };

  const onClose = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className="space-y-5 divide-y divide-gray-200">
        {user?.references?.map((reference) => (
          <div className="flex items-start gap-4 pb-5" key={reference._id}>
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <BiUser size={24} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {reference.contactName}
                </h3>
                <Tag
                  color={
                    reference.referenceType === "professional"
                      ? "blue"
                      : "green"
                  }
                >
                  {reference.referenceType.charAt(0).toUpperCase() +
                    reference.referenceType.slice(1)}
                </Tag>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <CgOrganisation size={16} className="text-gray-400" />
                  <span className="truncate">{reference.organizationName}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <BiMailSend size={16} className="text-gray-400" />
                  <a
                    href={`mailto:${reference.email}`}
                    className="text-blue-600 hover:text-blue-800 truncate"
                  >
                    {reference.email}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <BiPhone size={16} className="text-gray-400" />
                  <a
                    href={`tel:${reference.phoneNumber}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {reference.phoneNumber}
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                sweetAlertConfirmation({
                  func: () => handleDelete(reference._id),
                  object: "remove this account",
                  okay: "Remove",
                  title: "Remove!!",
                })
              }
              className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
              title="Delete employment record"
              type="button"
            >
              <BiTrash className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
      {(user?.references?.length ?? 0) < 3 && (
        <Button onClick={() => setIsModalOpen(true)} type="dashed" block>
          Add Reference
        </Button>
      )}
      <GlobalModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        onClose={onClose}
      >
        <div className="space-y-3 py-3">
          <p className="text-xl sm:text-2xl">Add Reference</p>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="w-full"
          >
            <Form.Item
              label="Reference Type"
              name="referenceType"
              initialValue="personal"
              rules={[
                {
                  required: true,
                  message: "Please select a reference type",
                },
              ]}
            >
              <Radio.Group
                options={[
                  { value: "personal", label: "Personal" },
                  { value: "professional", label: "Professional" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Organization Name"
              name="organizationName"
              rules={[
                {
                  required: true,
                  message: "Please enter the organization name",
                },
              ]}
            >
              <Input className="w-full" placeholder="Enter organization name" />
            </Form.Item>

            <Form.Item
              label="Contact Full Name"
              name="contactName"
              rules={[
                { required: true, message: "Please enter the contact name" },
              ]}
            >
              <Input className="w-full" placeholder="Enter full name" />
            </Form.Item>

            <Row gutter={[{ xs: 10, sm: 16 }, {}]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the email address",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    className="w-full"
                    placeholder="Enter email address"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the phone number",
                    },
                  ]}
                >
                  <Input
                    type="tel"
                    className="w-full"
                    placeholder="Enter phone number"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Save to Profile
            </Button>
          </Form>
        </div>
      </GlobalModal>
    </>
  );
};

export default ReferencesAddModal;
