"use client";

import CustomEditor, { TTinyMcEditor } from "@/components/ui/CustomEditor";
import PageHeading from "@/components/ui/PageHeading";
import { errorAlert, TResError } from "@/lib/alerts";
import {
  useEditDisclaimerMutation,
  useGetDisclaimerQuery,
} from "@/redux/features/settings/settings.api";
import { TUniObject } from "@/types";
import { Button, Form, FormProps, message } from "antd";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type FieldType = {
  value?: string;
};

const Page = () => {
  const router = useRouter();
  const [form] = Form.useForm<FieldType>();
  const editorRef = useRef<TTinyMcEditor>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const { data } = useGetDisclaimerQuery({});

  const [editDisclaimer, {isLoading}] = useEditDisclaimerMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log(values);
    const payload: TUniObject = {
      ...values,
    };

    if (editorRef.current && typeof editorRef.current.getContent() === "string")
      payload.description = editorRef.current.getContent();
    try {
      await editDisclaimer({
        body: payload,
        step: 1,
      }).unwrap();
      messageApi.open({
        key: "update",
        type: "success",
        content: "Disclaimer updated successfully!",
        duration: 2,
      });
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
    router.back();
  };
  return (
    <>
      {contextHolder}
      <div className="space-y-5">
        <PageHeading title={"Edit Disclaimer"} />
        {/* <LoaderWraperComp
            isLoading={isLoading}
            isError={isError}
            className={"h-[70vh]"}
          > */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="w-full"
        >
          <div className="min-h-[calc(100vh-220px)] flex flex-col justify-between">
            <Form.Item
              name="description"
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
                      return Promise.reject("Terms is required!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <CustomEditor
                ref={editorRef}
                defaultValue={data?.data[0]?.description}
                init={{ statusbar: true }}
              />
            </Form.Item>
            <div className="flex justify-end pt-10">
              <Button
              loading={isLoading}
                size="large"
                htmlType="submit"
                type="primary"
                className="w-full max-w-[250px]"
              >
                Save
              </Button>
            </div>
          </div>
        </Form>

        {/* </LoaderWraperComp> */}
      </div>
    </>
  );
};

export default Page;
