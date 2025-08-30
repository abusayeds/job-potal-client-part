import { Button, Form, FormProps, Input, message } from "antd";
import GlobalModal from "../ui/GlobalModal";
import { useState } from "react";
import DraggerInput, { TFilePath } from "../ui/DraggerInput";
import { useUploadCvMutation } from "@/redux/features/auth/authApi";
import { TUniObject } from "@/types";
import { errorAlert, TResError } from "@/lib/alerts";
import { HiOutlineUpload } from "react-icons/hi";

type FieldType = {
  file: string;
  name: string;
};
const CvUploadModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [logoUrl, setLogoUrl] = useState<TFilePath>([]);
  const [mutation, { isLoading }] = useUploadCvMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const payload: TUniObject = {
      ...values,
    };
    if (!!logoUrl[0]) payload.file = logoUrl[0];
    try {
      await mutation({
        data: {
          cv: [payload],
        },
        step: 1,
      }).unwrap();
      messageApi.open({
        key: "cv",
        type: "success",
        content: "Cv/Resume submitted successfully!",
        duration: 2,
      });
      form.resetFields();
      setLogoUrl([]);
      setIsModalOpen(false);
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  const onClose = () => {
    form.resetFields();
    setLogoUrl([]);
    // console.log("first");
  };
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} size="large" className="w-full">
        Add Cv/Resume <HiOutlineUpload size={20} />
      </Button>
      {contextHolder}
      <GlobalModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        onClose={onClose}
      >
        <div className="p-4">
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            requiredMark={false}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="name"
              label="Cv/Resume Title"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input size="large" placeholder="Enter title" />
            </Form.Item>
            <Form.Item
              //   label="Pdf"
              name="file"
              rules={[
                {
                  required: !logoUrl[0],
                  message: "CV is required!",
                },
              ]}
            >
              <DraggerInput
                setFilePaths={setLogoUrl}
                showUploadList={true}
                accept="application/pdf"
                defaultCalss="py-1"
                title={
                  <p className="font-semibold text-brand/50">
                    {"Add Cv/Resume"}
                  </p>
                }
                subTitle="Browse file or drop here. only pdf"
              />
            </Form.Item>
            <div className="w-full flex justify-center pt-4 ">
              <Button
                loading={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full px-2 "
              >
                Save CV
              </Button>
            </div>
          </Form>
        </div>
      </GlobalModal>
    </>
  );
};

export default CvUploadModal;
