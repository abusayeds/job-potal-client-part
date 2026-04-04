"use client";

import { planFeatures } from "@/constants/features.const";
import { errorAlert, TResError } from "@/lib/alerts";
import { getPlanLabel } from "@/lib/getPlanLabel";
import { getYearByDay } from "@/lib/getYearByDay";
import { useChackoutMutation } from "@/redux/features/transaction/transaction.api";
import { TUniObject } from "@/types";
import { TSubscription } from "@/types/subscription.type";
import { cn } from "@/utils/cn";
import { Button, Form, FormProps, message, Select } from "antd";
import { useRouter } from "next/navigation";
import React, { createElement, useState } from "react";
import { RiCheckboxCircleLine, RiCloseCircleLine } from "react-icons/ri";
import GlobalModal from "../ui/GlobalModal";

const PricingCard: React.FC<{
  data: TSubscription;
  viewType: "admin" | "employer";
}> = ({ data, viewType }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [openModal, setOpenModal] = useState(false);
  const [mutation, { isLoading }] = useChackoutMutation();
  // const [renewableMutation] = useRenewableMutation();
  const handlePurchasePlan = async (payload: TUniObject) => {
    try {
      const clientBase = window.location.origin;
      const response = await mutation({
        body: {
          success_url: clientBase + "/payment-success",
          cancel_url: clientBase + "/payment-canceled",
        },
        ...payload,
      }).unwrap();
      messageApi.open({
        key: "purchase",
        type: "success",
        content: "Redirecting to payment gateway, please wait...",
        duration: 2,
      });
      window.location.href = response.data.url;
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    handlePurchasePlan({ ...values, planId: data._id });
  };
  const onClose = () => {
    form.resetFields();
  };
  // console.log(data);
  return (
    <>
      {contextHolder}
      <div className="relative max-w-sm mx-auto lg:mx-0">
        {!!data.discount && (
          <div className="md:absolute -top-9 right-0 w-full text-2xl border- bg-gradient-to-t from-[#483D83] to-[#44DA6D] text-white py-2 text-center rounded-t-2xl">
            Save ${data.discount}
          </div>
        )}
        <div
          className={cn(
            "bg-white rounded-3xl shadow-lg border border-[#2E944A] py-6",
            {
              "rounded-t-none border-t-0": !!data.discount,
            }
          )}
        >
          <div
            className={cn(
              "flex flex-col justify-center min-h-[100px] mb-4 gap-1",
              { "gap-2": !data.multi_user_access }
            )}
          >
            <h2 className="text-3xl font-semibold text-center text-brand capitalize">
              {getPlanLabel(data.planName)}
            </h2>
            <div className="text-center max-w-64 mx-auto">
              <span
                className={cn(
                  "text-2xl xl:text-3xl font-semibold text-primary w-fit",
                  {
                    "text-xl xl:text-2xl font-medium": data.multi_user_access,
                  }
                )}
              >
                {data.multi_user_access
                  ? "Price Varies based on Organization Size"
                  : ` $${data.planPrice}`}
              </span>
              {data.planName !== "standard_plan" && (
                <span className=" text-gray-500 capitalize">
                  {" "}
                  / {getYearByDay(data.expiryDate)}
                </span>
              )}
            </div>
          </div>
          <button className="w-full bg-gradient-to-tr from-[#2E944A] to-[#007BFFE5] text-white py-3 mb-4">
            Try {getPlanLabel(data.planName)} for{" "}
            {data.jobpost === 1 ? "Single" : data.jobpost} Job post
          </button>
          <div className="space-y-2 px-6">
            {/* {planFeatures.map((feature: TUniObject, index: number) => (
              <div key={index} className="flex items-start">
                {createElement(
                  data[feature.name as keyof TSubscription] === true
                    ? RiCheckboxCircleLine
                    : RiCloseCircleLine,
                  {
                    className: `shrink-0 w-4 h-4 mr-2 mt-0.5 ${
                      feature.included ? "text-green-500" : "text-red-400"
                    }`,
                  }
                )}
                <p className="text-[15px] text-brand/80">{feature.text}</p>
              </div>
            ))} */}
            {planFeatures.map((feature: TUniObject, index: number) => (
              <div key={index} className="flex items-start">
                {createElement(
                  data[feature.name as keyof TSubscription]
                    ? RiCheckboxCircleLine
                    : RiCloseCircleLine,
                  {
                    className: `shrink-0 w-4 h-4 mr-2 mt-0.5 ${
                      data[feature.name as keyof TSubscription]
                        ? "text-green-500"
                        : "text-red-400"
                    }`,
                  }
                )}
                <p className="text-[15px] text-brand/80">{feature.text}</p>
              </div>
            ))}
          </div>
          <div className="px-10 pt-3">
            <Button
              onClick={() => {
                if (viewType !== "admin" && !!data.multi_user_access) {
                  setOpenModal(true);
                } else if (viewType !== "admin") {
                  handlePurchasePlan({ planId: data._id });
                } else if (viewType === "admin") {
                  router.push(`subscription/${data?._id}`);
                  console.log("Edit admin ");
                }
              }}
              type="primary"
              size="large"
              shape="round"
              className="w-full"
              loading={isLoading}
              // style={{ borderRadius: 12 }}
            >
              {viewType === "admin" ? "Edit Plan" : "Subscribe".toUpperCase()}
            </Button>
          </div>
        </div>
      </div>
      <GlobalModal
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        onClose={onClose}
        maxWidth="444px"
      >
        <div className="w-full p-4">
          <div className="mb-2">
            <h1 className="text-xl xl:text-2xl font-semibold mb-2">
              Add the company size to your account.
            </h1>
          </div>
          <Form
            form={form}
            name="normal_login"
            layout="vertical"
            // initialValues={{
            //   remember: true,
            // }}
            onFinish={onFinish}
            requiredMark={false}
            className="text-start"
          >
            <Form.Item
              label={"Number of Employee"}
              name="numberOfEmployeeIndex"
              rules={[
                {
                  required: true,
                  message: "Please input employee number!",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Select "
                allowClear
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={data.numberOfEmployees?.map((item, index) => ({
                  label: `$${item.price} (${item.minEmployees}-${item.maxEmployees} Employee)`,
                  value: index.toString(),
                }))}
              />
            </Form.Item>
            {/* <Form.Item
              name="renewable"
              valuePropName="checked"
              label={null}
              style={{ margin: 0 }}
            >
              <Checkbox><span className="font-medium">Auto Renewable</span></Checkbox>
            </Form.Item> */}
            <div className="w-full flex justify-center pt-1.5">
              <Button
                loading={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full"
              >
                Purchase Now
              </Button>
            </div>
            <div className="mt-4 text-center">
              Annual Subscription – Auto-renews every year.
              {/* : $399 (1–25 Employees) */}
            </div>
          </Form>
        </div>
      </GlobalModal>
    </>
  );
};

export default PricingCard;
