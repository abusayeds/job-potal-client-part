"use client";

import { Button, Form, FormProps, message } from "antd";
import React, { useRef, useState } from "react";
import GlobalModal from "../ui/GlobalModal";
import { LiaArrowRightSolid } from "react-icons/lia";
import CustomEditor, { TTinyMcEditor } from "../ui/CustomEditor";
import { TJobDetails } from "@/types/jobs.type";
import { errorAlert, requiredAlert, TResError } from "@/lib/alerts";
import { useApplyJobMutation } from "@/redux/features/application/application.api";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
type FieldType = {
  latter: string;
};

const ApplyButton = ({ jobData }: { jobData: TJobDetails }) => {
  const [form] = Form.useForm();
  const pathName = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const editorRef = useRef<TTinyMcEditor>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useApplyJobMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async () => {
    if (!user?._id) {
      requiredAlert({ pathName });
      return;
    }
    try {
      await mutation({
        jobId: jobData._id,
        body: {
          coverLetter: editorRef.current ? editorRef.current.getContent() : "",
        },
      }).unwrap();
      messageApi.open({
        key: "apply",
        type: "success",
        content: "Job application submitted successfully!",
        duration: 3,
      });
      form.resetFields();
      setOpenModal(false);
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  const showModal = () => {
    setOpenModal(true);
  };
  const onClose = () => {
    setOpenModal(false);
    form.resetFields();
  };
  return (
    <>
      {contextHolder}
      <Button
        onClick={showModal}
        type="primary"
        size="large"
        style={{ padding: "0 2rem" }}
      >
        Apply Now
      </Button>
      <GlobalModal
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        onClose={onClose}
        maxWidth="720px"
      >
        <div className="lg:p-2">
          <h5 className="text-2xl font-medium">
            Apply Job: {jobData.jobTitle}
          </h5>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="w-full"
          >
            <div className="space-y-2.5 mt-5">
              <Form.Item
                name="coverLetter"
                label="Cover Letter"
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
                        return Promise.reject("Cover letter is required!");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <CustomEditor
                  ref={editorRef}
                  placeholder={"Write here your cover letter..."}
                  init={{ statusbar: true }}
                />
              </Form.Item>
            </div>
            <div className="flex justify-center items-center gap-3 mt-4">
              <div className="hidden sm:block">
                <Button
                  onClick={onClose}
                  type="text"
                  size="large"
                  style={{ background: "#E7F0FA", padding: "0 2.5rem" }}
                >
                  Cancel
                </Button>
              </div>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                style={{ padding: "0 1.5rem" }}
                loading={isLoading}
              >
                Submit
                <LiaArrowRightSolid size={19} style={{ marginTop: 3 }} />
              </Button>
            </div>
          </Form>
        </div>
      </GlobalModal>
    </>
  );
};

export default ApplyButton;
