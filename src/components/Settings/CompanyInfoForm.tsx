import { TUniObject } from "@/types";
import { Button, Col, Form, FormProps, Input, message, Row } from "antd";
import React, { useRef, useState } from "react";
import DraggerInput, { TFilePath } from "../ui/DraggerInput";
import CustomEditor, { TTinyMcEditor } from "../ui/CustomEditor";
import { useUpdateInfoMutation } from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";
import { useAppSelector } from "@/redux/hook";

const CompanyInfoForm = () => {
  const [form] = Form.useForm();
  const editorRef = useRef<TTinyMcEditor>(null);
  const { user } = useAppSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const [logoUrl, setLogoUrl] = useState<TFilePath>([]);
  const [bannerUrl, setBannerUrl] = useState<TFilePath>([]);
  const [mutation, { isLoading }] = useUpdateInfoMutation();
  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    const payload: TUniObject = {
      ...values,
    };
    if (!!logoUrl[0]) payload.logo = logoUrl[0];
    if (!!bannerUrl[0]) payload.banner = bannerUrl[0];
    if (editorRef.current && typeof editorRef.current.getContent() === "string")
      payload.about = editorRef.current.getContent();
    try {
      await mutation({
        body: payload,
        step: 1,
      }).unwrap();
      messageApi.open({
        key: "registration",
        type: "success",
        content: "Company information submitted successfully!",
        duration: 2,
      });
      // onChange("founding");
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  return (
    <div className="space-y-3 py-3">
      {contextHolder}
      <p className="text-xl sm:text-2xl">Logo & Banner Image</p>
      <Form
        form={form}
        // name={"normal_login"}
        layout="vertical"
        initialValues={{
          logo: user?.logo,
          banner: user?.banner,
          companyName: user?.companyName,
          about: user?.about,
        }}
        onFinish={onFinish}
        // onValuesChange={onValuesChange}
        requiredMark={false}
        className="w-full"
      >
        <Row gutter={[24, 0]}>
          <Col xs={24} lg={6}>
            <Form.Item
              label="Upload Logo"
              name="logo"
              rules={[
                {
                  required: !logoUrl[0],
                  message: "Logo is required!",
                },
              ]}
            >
              <DraggerInput
                setFilePaths={setLogoUrl}
                showUploadList={true}
                defaultCalss="lg:h-48 py-4"
                title={
                  <h4 className="font-semibold text-brand/50">
                    Browse photo or drop here
                  </h4>
                }
                subTitle="A photo larger than. Max photo size 10 MB."
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={18}>
            <Form.Item
              label="Banner Image"
              name="banner"
              rules={[
                {
                  required: !bannerUrl[0],
                  message: "Banner is required!",
                },
              ]}
            >
              <DraggerInput
                setFilePaths={setBannerUrl}
                showUploadList={true}
                defaultCalss="lg:h-48 py-4"
                title={
                  <h4 className="font-semibold text-brand/50">
                    Browse photo or drop here
                  </h4>
                }
                subTitle="Bannar images optical dimension 1520x400.Max photo size 10 MB."
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{ required: true, message: "Name is required!" }]}
            >
              <Input size="large" placeholder="" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="about"
              label="About Us"
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
                      return Promise.reject("About is required!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <CustomEditor
                ref={editorRef}
                defaultValue={user?.about}
                placeholder={
                  "Write down about your company here. Let the candidate know who we are..."
                }
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

export default CompanyInfoForm;
