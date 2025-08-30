import DraggerInput, { TFilePath } from "@/components/ui/DraggerInput";
import GlobalModal from "@/components/ui/GlobalModal";
import { errorAlert, TResError } from "@/lib/alerts";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/category/category.api";
import { TUniObject } from "@/types";
import { Button, Form, FormProps, Input, message } from "antd";
import { useState } from "react";

// type FieldType = {
//   name: string;
//   image: string;
// };

type TCategoryModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  modalData: TUniObject;
};
const CategoryModal = ({
  isModalOpen,
  setIsModalOpen,
  modalData,
}: TCategoryModalProps) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [logoUrl, setLogoUrl] = useState<TFilePath>([]);

  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdateLoading }] =
    useUpdateCategoryMutation();

  // console.log(modalData.singleData._id);

  // console.log(modalData.type);
  // modalData.type = add new
  // modalData.type = edit

  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    const payload: TUniObject = {
      ...values,
    };
    if (!!logoUrl[0]) payload.logo = logoUrl[0];
    try {
      let response;
      if (modalData.type === "edit") {
        response = await updateCategory({
          body: payload,
          id: modalData.editedCategory._id,
        }).unwrap();
      } else {
        response = await createCategory({
          body: payload,
        }).unwrap();
      }
      messageApi.open({
        key: "category",
        type: "success",
        content:
          response?.data?.message ||
          response?.message ||
          "Category created static successfully!",
        duration: 3,
      });

      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  const onClose = () => {
    form.resetFields();
    // console.log("first");
  };

  return (
    <GlobalModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onClose={onClose}
      maxWidth="444px"
    >
      {contextHolder}
      <div className="w-full p-4">
        <div className="mb-2">
          <h1 className="text-2xl xl:text-3xl font-semibold capitalize mb-2">
            {modalData.type} Category
          </h1>
        </div>
        <Form
          form={form}
          name="normal_login"
          layout="vertical"
          initialValues={{
            ...modalData?.editedCategory,
          }}
          onFinish={onFinish}
          requiredMark={false}
          className="text-start"
        >
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

          <Form.Item
            label={"Category Type"}
            name="catagoryType"
            rules={[
              {
                required: true,
                message: "Please input category type!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter type here" />
          </Form.Item>

          <div className="w-full flex justify-center pt-2">
            <Button
              // onClick={onClose}
              loading={modalData.type === "edit" ? isUpdateLoading : isLoading}
              type="primary"
              size="large"
              // htmlType="button"
              htmlType="submit"
              className="px-2 w-full"
            >
              {modalData.type === "edit" ? "Update" : "Add Category"}
            </Button>
          </div>
        </Form>
      </div>
    </GlobalModal>
  );
};

export default CategoryModal;
