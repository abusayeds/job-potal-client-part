import { Button, Form, FormProps, Input, message } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import GlobalModal from "../ui/GlobalModal";
import { TUniObject } from "@/types";
import {
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useEmployerEmployeeQuery,
} from "@/redux/features/employee/employee.api";
import { errorAlert, TResError } from "@/lib/alerts";
import LoaderWraperComp from "../LoaderWraperComp";
import { TUser } from "@/redux/features/auth/authSlice";
import { sweetAlertConfirmation } from "@/lib/alerts/sweetAlertConfirmation";
import { useAppSelector } from "@/redux/hook";
import { imageUrl } from "@/config";
import Link from "next/link";

const Employees = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useAddEmployeeMutation();
  const [deleteMutation, { isLoading: deleteLoading }] =
    useDeleteEmployeeMutation();
  const {
    data,
    isLoading: loading,
    isError,
    error,
  } = useEmployerEmployeeQuery(undefined);

  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    try {
      await mutation(values).unwrap();
      messageApi.open({
        key: "employee",
        type: "success",
        content: "Employee added successfully!",
        duration: 3,
      });
      onClose();
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  const handleDelete = async (id: string) => {
    messageApi.open({
      key: "employee",
      type: "loading",
      content: "Deleting....",
      duration: 3,
    });
    try {
      await deleteMutation(id).unwrap();
      messageApi.open({
        key: "employee",
        type: "success",
        content: "Employee Deleted successfully!",
        duration: 3,
      });
    } catch (error) {
      messageApi.destroy("employee");
      errorAlert({ error: error as TResError });
    }
  };
  const showModal = () => {
    setOpenModal(true);
  };
  const onClose = () => {
    form.resetFields();
    setOpenModal(false);
  };
  return (
    <div className="">
      {contextHolder}
      <div className="flex justify-end pb-2 lg:pb-0">
        <Button onClick={showModal} type="primary" size="large" className="">
          + Add Employee
        </Button>
      </div>
      <div className="space-y-1.5">
        <p className="text-xl sm:text-2xl pb-1">Default Employer’s</p>
        <div className="border border-gray-300 rounded-lg flex flex-col lg:flex-row justify-between items-center gap-4 py-3 px-5 shadow-xs">
          <div className="flex flex-col lg:flex-row  items-center gap-3">
            <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border border-gray-50 drop-shadow-xs">
              <Image
                src={imageUrl + user?.logo}
                alt="logo"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1 text-center lg:text-start">
              <h3 className="text-lg font-medium text-brand">
                {user?.fullName}
              </h3>
              <p className="text-brand/70 text-sm">{user?.email}</p>
            </div>
          </div>
          <Link href={`/settings/profile`}>
            <Button
              type="text"
              size="large"
              // style={{ background: "#E6F2FF" }}
              // className="lg:w-full max-w-60 "
            >
              View Profile
              <FaArrowRightLong size={16} className="mt-1" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-1.5 mt-5">
        <p className="text-xl sm:text-2xl pb-1">Other Employee’s</p>
        <LoaderWraperComp
          isError={isError}
          isLoading={loading}
          dataEmpty={data?.data?.length < 1}
          error={error as TResError}
        >
          <div className="space-y-4">
            {data?.data?.map((employee: TUser) => (
              <div className="border border-gray-300 rounded-lg flex justify-between items-center py-3 px-5 shadow-xs">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-brand">
                    {employee.fullName}
                  </h3>
                  <p className="text-brand/70 text-sm">{employee.email}</p>
                </div>
                <Button
                  onClick={() =>
                    sweetAlertConfirmation({
                      func: () => handleDelete(employee._id),
                      object: "delete this employee",
                      okay: "Confirm",
                    })
                  }
                  disabled={deleteLoading}
                  type="primary"
                  size="large"
                  style={{ background: "red", color: "white" }}
                  className="lg:w-full max-w-52 "
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </LoaderWraperComp>
      </div>
      <GlobalModal
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        onClose={onClose}
        maxWidth="520px"
      >
        <div className="lg:p-2">
          <h5 className="text-2xl font-medium text-center pb-1">
            Add New Employee
          </h5>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="w-full"
          >
            <Form.Item
              label="Employee Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Name is required!",
                },
              ]}
            >
              <Input size="large" placeholder="Full name" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Username is required!",
                },
              ]}
            >
              <Input size="large" placeholder="Ex. johndoe" />
            </Form.Item>
            <Form.Item
              label={"Employee Email"}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Input a valid email!",
                },
                {
                  required: true,
                  message: "Email is required!",
                },
              ]}
            >
              <Input size="large" placeholder="employee@ac.com" />
            </Form.Item>
            <Form.Item
              label="Account Password"
              name="password"
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
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Re-Enter the password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
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
                loading={isLoading}
                htmlType="submit"
                type="primary"
                size="large"
                style={{ padding: "0 2.4rem" }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </GlobalModal>
    </div>
  );
};

export default Employees;
