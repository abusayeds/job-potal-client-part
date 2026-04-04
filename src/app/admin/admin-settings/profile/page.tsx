"use client";

import ChangePassword from "@/components/ui/ChangePassword";
import DraggerInput, { TFilePath } from "@/components/ui/DraggerInput";
import { imageUrl as imageEnvUrl } from "@/config";
import { errorAlert, TResError } from "@/lib/alerts";
import { getRoleLabel } from "@/lib/getRoleLabel";
import { handleImageError } from "@/lib/handleImageError";
import { useUpdateAdminProfileMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hook";
import { TRole, TUniObject } from "@/types";
import {
  Avatar,
  Button,
  Form,
  FormProps,
  Image,
  Input,
  message,
  Popover,
} from "antd";
import { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
// import { imageUrl as imageEnvUrl } from "@/config";

// const profileData = {
//   name: "Enrique Khan",
//   email: "enrique@gmail.com",
//   phone: "+880 150597212",
// };

const Page = () => {
  const [form] = Form.useForm();
  const [editAble, setEditAble] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [imageUrl, setImageUrl] = useState<string>();
  const [passModalOpen, setPassModalOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAppSelector((state) => state.auth);
  // console.log(user);

  const [logoUrl, setLogoUrl] = useState<TFilePath>([]);

  const [updateProfile, { isLoading }] = useUpdateAdminProfileMutation();

  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    const payload: TUniObject = {
      ...values,
    };
    if (!!logoUrl[0]) payload.logo = logoUrl[0];
    try {
      // let response;
      // if (modalData.type === "edit") {
      //   response = await updateCategory({
      //     body: payload,
      //     id: modalData.editedCategory._id,
      //   }).unwrap();
      // } else {
      //   response = await createCategory({
      //     body: payload,
      //   }).unwrap();
      // }

      const response = await updateProfile(payload).unwrap();
      messageApi.open({
        key: "Edit Profile",
        type: "success",
        content:
          response?.data?.message ||
          response?.message ||
          "Edit Profile static successfully!",
        duration: 3,
      });
      setEditAble(false);
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  // const props: UploadProps = {
  //   onRemove: (file) => {
  //     const index = fileList.indexOf(file);
  //     const newFileList = fileList.slice();
  //     newFileList.splice(index, 1);
  //     setFileList(newFileList);
  //   },
  //   accept: "image/png,image/jpeg",
  //   beforeUpload: (file) => {
  //     setFileList([file]);
  //     const url = URL.createObjectURL(file);
  //     setImageUrl(url);
  //     return false;
  //   },
  //   showUploadList: false,
  // };
  // console.log(props);

  const content = (
    <div className="flex flex-col gap-2 py-1">
      <Button
        type="default"
        onClick={() => {
          setEditAble(true);
          setOpenPopover(false);
        }}
      >
        Edit Info
      </Button>
      <Button
        type="default"
        onClick={() => {
          setPassModalOpen(true);
          setOpenPopover(false);
        }}
      >
        Change Password
      </Button>
    </div>
  );
  useEffect(() => {
    form.setFieldsValue({
      fullName: user?.fullName,
      email: user?.email,
      logo: imageEnvUrl + user?.logo,
    });
  }, [user]);
  return (
    <>
      {contextHolder}
      <div className="min-h-[80vh] h-full w-full flex flex-col justify-center items-center ">
        <div className="w-fit bg-white min-h-[600px] xl:min-w-2xl flex flex-col justify-center items-center gap-8 rounded-lg px-6 py-10 drop-shadow-sm relative">
          {!editAble && (
            <div className="absolute top-6 right-4">
              <Popover
                content={content}
                // title="Title"
                trigger="click"
                placement="bottomRight"
                onOpenChange={setOpenPopover}
                open={openPopover}
              >
                <button className="active:bg-slate-200 p-2 rounded-lg">
                  <PiDotsThreeOutlineVerticalBold size={20} />
                </button>
              </Popover>
            </div>
          )}
          <Form
            form={form}
            name="basic"
            layout="vertical"
            className="w-full max-w-lg mx-auto"
            onFinish={onFinish}
            autoComplete="off"
            // initialValues={{
            //   fullName: user?.fullName,
            //   email: user?.email,
            //   logo: imageEnvUrl + logoUrl[0],
            // }}
          >
            <div className="flex flex-col items-center justify-center mb-2">
              {/* <div
              className={cn(
                "h-48 w-48 overflow-hidden rounded-full outline-2 outline-offset-1 outline-gray-300",
                {
                  "rounded-none": editAble,
                }
              )}
            > */}
              {!editAble && (
                <Avatar
                  // shape={editAble ? "square" : "circle"}
                  shape={"circle"}
                  size={200}
                  icon={
                    <Image
                      src={
                        user?.logo
                          ? imageEnvUrl + user.logo
                          : "/demo-profile.jpg"
                      }
                      alt=""
                      onError={handleImageError}
                    />
                  }
                />
              )}
              {/* </div> */}
              {editAble && (
                // <Upload {...props}>
                //   <Button
                //     size="middle"
                //     type="link"
                //     icon={<IoCloudUploadOutline />}
                //     style={{ marginTop: 10 }}
                //   >
                //     Select Image
                //   </Button>
                // </Upload>
                <Form.Item
                  name="logo"
                  // rules={[
                  //   {
                  //     required: !logoUrl[0],
                  //     message: "Logo is required!",
                  //   },
                  // ]}
                >
                  <DraggerInput
                    setFilePaths={setLogoUrl}
                    showUploadList={true}
                    // defaultCalss="lg:h-48 py-4"
                    // title={
                    //   <h4 className="font-semibold text-brand/50">
                    //     Browse photo or drop here
                    //   </h4>
                    // }
                    // subTitle="A photo larger than. Max photo size 10 MB."
                    subTitle="Select Image. Max photo size 10 MB."
                  />
                </Form.Item>
              )}
              <h4 className="text-2xl text-[#222222] mt-2">
                {getRoleLabel(user?.role as TRole)}
              </h4>
            </div>

            <Form.Item
              name="fullName"
              className="text-lg text-[#1F8D84] font-medium"
              label={"Name"}
            >
              <Input
                readOnly={!editAble}
                size="large"
                suffix={editAble ? <LuPencil size={16} /> : null}
              />
            </Form.Item>
            <Form.Item
              className="text-lg text-[#1F8D84] font-medium"
              label={"Email"}
              name="email"
            >
              <Input readOnly size="large" />
            </Form.Item>
            {!!editAble && (
              <div className="flex justify-center gap-3 px-3 pt-5 max-w-sm mx-auto">
                <Button
                  onClick={() => {
                    setEditAble(false);
                    form.resetFields();
                  }}
                  className="w-full"
                  style={{ height: 40 }}
                >
                  Cancel
                </Button>
                {/* <Button className="w-full" type="primary" style={{ height: 40 }}>
                Update
              </Button> */}
                <Button
                  className="w-full"
                  type="primary"
                  style={{ height: 40 }}
                  htmlType="submit"
                  loading={isLoading}
                >
                  Update
                </Button>
              </div>
            )}
          </Form>
          {/* <div className="w-full max-w-lg mx-auto pt-2 border-t">
        {settingsItem.map((setting, index) => (
          <div
            key={index}
            className="h-[64px] font-medium hover:bg-[#0804e528] py-4 mb-2 px-6 rounded-lg flex items-center justify-between cursor-pointer transition-all"
            onClick={() => navigate(setting.path)}
          >
            <h2 className="capitalize">{setting.title}</h2>
            <FaAngleRight size={16} />
          </div>
        ))}
      </div> */}
        </div>
        <ChangePassword
          isModalOpen={passModalOpen}
          setIsModalOpen={setPassModalOpen}
        />
      </div>
    </>
  );
};

export default Page;
