"use client";

import LoaderWraperComp from "@/components/LoaderWraperComp";
import { planFeatures } from "@/constants/features.const";
import { errorAlert, TResError } from "@/lib/alerts";
import {
  useSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "@/redux/features/subscription/subscription.api";
import { TSubscription } from "@/types/subscription.type";
import { Checkbox, Form, FormProps, Input, message, Select } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function EditSubscription() {
  //   const [messageApi] = message.useMessage();
  const router = useRouter();

  const { Option } = Select;
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data, isLoading, isError } = useSingleSubscriptionQuery(id);
  const subscriptionData = useMemo(() => data?.data || {}, [data]);

  const [updateSubscription, { isLoading: isUpdateLoading }] =
    useUpdateSubscriptionMutation();

  const [messageApi, contextHolder] = message.useMessage();

  // Set form initial values when data is loaded
  useEffect(() => {
    if (subscriptionData?._id) {
      const initialValues = {
        ...subscriptionData,
        // For unlimited_plan, we need to map the numberOfEmployees array to form fields
        ...(subscriptionData.planName === "unlimited_plan" && {
          small: {
            minEmployees: subscriptionData.numberOfEmployees[0]?.minEmployees,
            maxEmployees: subscriptionData.numberOfEmployees[0]?.maxEmployees,
            price: subscriptionData.numberOfEmployees[0]?.price,
          },
          medium: {
            minEmployees: subscriptionData.numberOfEmployees[1]?.minEmployees,
            maxEmployees: subscriptionData.numberOfEmployees[1]?.maxEmployees,
            price: subscriptionData.numberOfEmployees[1]?.price,
          },
          large: {
            minEmployees: subscriptionData.numberOfEmployees[2]?.minEmployees,
            maxEmployees: subscriptionData.numberOfEmployees[2]?.maxEmployees,
            price: subscriptionData.numberOfEmployees[2]?.price,
          },
        }),
      };
      form.setFieldsValue(initialValues);
    }
  }, [subscriptionData, form]);

  const onFinish: FormProps<TSubscription>["onFinish"] = async (
    values: TSubscription
  ) => {
    console.log(values);
    try {
      let payload = {};

      if (subscriptionData.planName === "unlimited_plan") {
        // Prepare payload for unlimited_plan
        payload = {
          expiryDate:
            Number(values.expiryDate) || Number(subscriptionData.expiryDate),
          jobpost: values.jobpost || subscriptionData.jobpost,
          numberOfEmployees: [
            {
              minEmployees: Number(values.small?.minEmployees),
              maxEmployees: Number(values.small?.maxEmployees),
              price: Number(values.small?.price),
            },
            {
              minEmployees: Number(values.medium?.minEmployees),
              maxEmployees: Number(values.medium?.maxEmployees),
              price: Number(values.medium?.price),
            },
            {
              minEmployees: Number(values.large?.minEmployees),
              maxEmployees: Number(values.large?.maxEmployees),
              price: Number(values.large?.price),
            },
          ],
          unlimited_text: values.unlimited_text || false,
          add_logo_images: values.add_logo_images || false,
          avg_viewed_1000: values.avg_viewed_1000 || false,
          multi_categories: values.multi_categories || false,
          schedule_dates: values.schedule_dates || false,
          unlimited_postings: values.unlimited_postings || false,
          fill_multiple_positions: values.fill_multiple_positions || false,
          continuous_posting: values.continuous_posting || false,
          multi_user_access: values.multi_user_access || false,
          popular_choice: values.popular_choice || false,
          cost_effective: values.cost_effective || false,
          no_time_limit: values.no_time_limit || false,
        };
        // console.log(payload);
      } else if (subscriptionData.planName === "standard_plan") {
        // Prepare payload for standard_plan
        payload = {
          planName: values.planName,
          planPrice: Number(values.planPrice),
          discount: Number(values.discount),
          jobpost: Number(values.jobpost),
          // expiryDate: values.expiryDate,
          unlimited_text: values.unlimited_text || false,
          add_logo_images: values.add_logo_images || false,
          avg_viewed_1000: values.avg_viewed_1000 || false,
          multi_categories: values.multi_categories || false,
          schedule_dates: values.schedule_dates || false,
          unlimited_postings: values.unlimited_postings || false,
          fill_multiple_positions: values.fill_multiple_positions || false,
          continuous_posting: values.continuous_posting || false,
          multi_user_access: values.multi_user_access || false,
          popular_choice: values.popular_choice || false,
          cost_effective: values.cost_effective || false,
          no_time_limit: values.no_time_limit || false,
        };
      } else {
        // Prepare payload for basic_plan
        payload = {
          planName: values.planName,
          planPrice: Number(values.planPrice),
          discount: values.discount,
          jobpost: Number(values.jobpost),
          expiryDate: Number(values.expiryDate),
          unlimited_text: values.unlimited_text || false,
          add_logo_images: values.add_logo_images || false,
          avg_viewed_1000: values.avg_viewed_1000 || false,
          multi_categories: values.multi_categories || false,
          schedule_dates: values.schedule_dates || false,
          unlimited_postings: values.unlimited_postings || false,
          fill_multiple_positions: values.fill_multiple_positions || false,
          continuous_posting: values.continuous_posting || false,
          multi_user_access: values.multi_user_access || false,
          popular_choice: values.popular_choice || false,
          cost_effective: values.cost_effective || false,
          no_time_limit: values.no_time_limit || false,
        };
        // console.log(payload);
      }

      const response = await updateSubscription({
        id: subscriptionData._id,
        body: payload,
      }).unwrap();
      // console.log(response?.message);
      messageApi.open({
        key: "subscription",
        type: "success",
        content:
          response?.data?.message ||
          response?.message ||
          "Subscription Updateed successfully!",
        duration: 3,
      });
      router.back();
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  return (
    <LoaderWraperComp isLoading={isLoading} isError={isError}>
      {contextHolder}
      <div className=" w-[60%] mx-auto bg-gray-100 p-4 rounded-2xl shadow-2xl">
        <h3 className="text-xl font-semibold text-center flex justify-center items-center gap-2">
          <button className="cursor-pointer" onClick={() => router.back()}>
            <FaArrowLeft />
          </button>
          Edit your{" "}
          <span className="text-2xl font-bold text-primary">
            {subscriptionData?.planName}
          </span>{" "}
          Subscription{" "}
        </h3>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="mt-6"
          initialValues={subscriptionData}
        >
          <Form.Item name="planName" label="Plan Name">
            <Input placeholder="planName" type="text" size="large" readOnly />
          </Form.Item>

          {subscriptionData?.planName === "unlimited_plan" && (
            <div className="grid grid-cols-3 justify-center items-center gap-8">
              <div>
                <h3>Small size</h3>
                <div className="grid grid-cols-2 justify-center items-center gap-2">
                  <Form.Item
                    name={["small", "minEmployees"]}
                    rules={[{ required: true, message: "Required field" }]}
                  >
                    <Input
                      placeholder="minEmployees"
                      type="number"
                      size="large"
                      min="0"
                      step="1"
                    />
                  </Form.Item>
                  <Form.Item
                    name={["small", "maxEmployees"]}
                    rules={[{ required: true, message: "Required field" }]}
                  >
                    <Input
                      placeholder="maxEmployees"
                      type="number"
                      size="large"
                      min="0"
                      step="1"
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name={["small", "price"]}
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input
                    placeholder="Price"
                    prefix="$"
                    type="number"
                    size="large"
                    min="0"
                    step="1"
                  />
                </Form.Item>
              </div>
              <div>
                <h3>Medium size</h3>
                <div className="grid grid-cols-2 justify-center items-center gap-2">
                  <Form.Item
                    name={["medium", "minEmployees"]}
                    rules={[{ required: true, message: "Required field" }]}
                  >
                    <Input
                      placeholder="minEmployees"
                      type="number"
                      size="large"
                      min="0"
                      step="1"
                    />
                  </Form.Item>
                  <Form.Item
                    name={["medium", "maxEmployees"]}
                    rules={[{ required: true, message: "Required field" }]}
                  >
                    <Input
                      placeholder="maxEmployees"
                      type="number"
                      size="large"
                      min="0"
                      step="1"
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name={["medium", "price"]}
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input
                    placeholder="Price"
                    prefix="$"
                    type="number"
                    size="large"
                    min="0"
                    step="1"
                  />
                </Form.Item>
              </div>
              <div>
                <h3>Large size</h3>
                <div className="grid grid-cols-2 justify-center items-center gap-2">
                  <Form.Item
                    name={["large", "minEmployees"]}
                    rules={[{ required: true, message: "Required field" }]}
                  >
                    <Input
                      placeholder="minEmployees"
                      type="number"
                      size="large"
                      min="0"
                      step="1"
                    />
                  </Form.Item>
                  <Form.Item
                    name={["large", "maxEmployees"]}
                    rules={[{ required: true, message: "Required field" }]}
                  >
                    <Input
                      placeholder="maxEmployees"
                      type="number"
                      size="large"
                      min="0"
                      step="1"
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name={["large", "price"]}
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input
                    placeholder="Price"
                    prefix="$"
                    type="number"
                    size="large"
                    min="0"
                    step="1"
                  />
                </Form.Item>
              </div>
            </div>
          )}

          {subscriptionData?.planName !== "unlimited_plan" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="planPrice"
                label="Plan Price"
                rules={[
                  {
                    required: true,
                    message: "Required field",
                  },
                ]}
              >
                <Input
                  placeholder="Price"
                  prefix="$"
                  type="number"
                  size="large"
                  min="0"
                  step="0.01"
                />
              </Form.Item>

              <Form.Item name="discount" label="Plan Discount">
                <Input
                  placeholder="Discount"
                  prefix="$"
                  type="number"
                  size="large"
                  min="0"
                  step="1"
                  disabled={subscriptionData?.planName === "basic_plan"}
                />
              </Form.Item>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="jobpost"
              label="Job Post"
              rules={[
                { required: true, message: "Please enter plan job post" },
              ]}
            >
              <Input
                placeholder="Job posts"
                type={
                  subscriptionData?.planName === "unlimited_plan"
                    ? "text"
                    : "number"
                }
                size="large"
                min="1"
                step="1"
                readOnly={subscriptionData?.planName === "unlimited_plan"}
              />
            </Form.Item>
            {subscriptionData?.planName !== "standard_plan" && (
              <Form.Item
                name="expiryDate"
                label="Plan Expiry (Days)"
                rules={[
                  {
                    required: true,
                    message: "Please enter plan expiry in days",
                  },
                ]}
              >
                {/* <Input type="number" size="large" min="1" step="1" /> */}
                <Select placeholder="Client/Professional" size="large">
                  {subscriptionData?.planName === "unlimited_plan" ? (
                    <>
                      <Option value="365">1 Year</Option>
                      <Option value="730">2 Years</Option>
                    </>
                  ) : (
                    <>
                      <Option value="30">1 Month</Option>
                      <Option value="60">2 Months</Option>
                    </>
                  )}
                </Select>
              </Form.Item>

              //
              //     <Form.Item
              //   name="serviceFor"
              //   label="Service for"
              //   rules={[{ required: true, message: "Please select service type" }]}
              // >
              //   <Select placeholder="Client/Professional" size="large">
              //     <Option value="Basic Plan">Client</Option>
              //     <Option value="Premium Plan">Professional</Option>
              //   </Select>
              // </Form.Item>
              //
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4 pl-4">Facilities</h3>
            <div className="px-12">
              {planFeatures.map((facility) => (
                <div
                  key={facility.name}
                  className="flex items-center justify-between"
                >
                  {facility.text}
                  <Form.Item name={facility.name} valuePropName="checked">
                    <Checkbox disabled={facility.name === "planName"} />
                  </Form.Item>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              className="bg-primary hover:bg-primary/80 text-white font-semibold px-12 py-2 rounded-full"
              disabled={isUpdateLoading}
            >
              {isUpdateLoading ? "Updating..." : "Submit"}
            </button>
          </div>
        </Form>
      </div>
    </LoaderWraperComp>
  );
}
