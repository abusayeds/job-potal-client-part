"use client";

import { TUniObject } from "@/types";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  message,
  Row,
  Select,
} from "antd";
import DraggerInput, { TFilePath } from "../ui/DraggerInput";
import { currencies, salaryTypes } from "@/constants";
import AddJobBenefit from "../ui/AddJobBenefit";
import { FaArrowRightLong } from "react-icons/fa6";
import CustomEditor, { TTinyMcEditor } from "../ui/CustomEditor";
import { useRef, useState } from "react";
import { errorAlert, TResError } from "@/lib/alerts";
import { useAppSelector } from "@/redux/hook";
import {
  useJobEditMutation,
  useJobPostMutation,
} from "@/redux/features/jobs/jobs.api";
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api";
import { TJobCategory } from "@/types/category.type";
import { filterData } from "@/constants/filter.const";
import dayjs from "dayjs";
import { PiMapPinLine } from "react-icons/pi";
import { TJobDetails } from "@/types/jobs.type";

const JobUploadForm = ({
  type,
  previous,
}: {
  type: "edit" | "create";
  previous?: TJobDetails;
}) => {
  const [form] = Form.useForm();
  const responsibilityRef = useRef<TTinyMcEditor>(null);
  const descriptionRef = useRef<TTinyMcEditor>(null);
  const { user } = useAppSelector((state) => state.auth);
  const [logoUrl, setLogoUrl] = useState<TFilePath>([]);
  const [bannerUrl, setBannerUrl] = useState<TFilePath>([]);
  const [benefits, setBenefits] = useState<string[]>(
    previous?.jobBenefits
      ? previous.jobBenefits
      : [
          // "Profit Sharing",
          // "Yearly Increment",
          // "Lance allowance",
        ]
  );
  const [messageApi, contextHolder] = message.useMessage();
  const { data: categoryData, isLoading: cateLoading } =
    useGetAllCategoryQuery(undefined);
  const [mutation, { isLoading }] = useJobPostMutation();
  const [updateMutation, { isLoading: updateLoading }] = useJobEditMutation();
  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    const payload: TUniObject = {
      ...values,
    };
    payload.jobBenefits = benefits;
    if (values.minSalary) payload.minSalary = Number(values.minSalary);
    if (values.maxSalary) payload.maxSalary = Number(values.maxSalary);
    if (!!logoUrl[0]) payload.logo = logoUrl[0];
    if (!!bannerUrl[0]) payload.banner = bannerUrl[0];
    if (
      responsibilityRef.current &&
      typeof responsibilityRef.current.getContent() === "string"
    )
      payload.responsibilities = responsibilityRef.current.getContent();
    if (
      descriptionRef.current &&
      typeof descriptionRef.current.getContent() === "string"
    )
      payload.description = descriptionRef.current.getContent();
    // return console.log(payload);
    try {
      if (type === "create") {
        await mutation(payload).unwrap();
        messageApi.open({
          key: "jobs",
          type: "success",
          content: "Your job post has been successfully.",
          duration: 3,
        });
        setBenefits([]);
        form.resetFields();
      } else if (type === "edit") {
        await updateMutation({ id: previous?._id, data: payload }).unwrap();
        messageApi.open({
          key: "jobs",
          type: "success",
          content: "Your job update has been successfully.",
          duration: 3,
        });
      }
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  return (
    <div className="space-y-3 pb-3 pt-1.5">
      {contextHolder}
      {/* <p className="text-xl sm:text-2xl text-center underline underline-offset-4">
        {type !== "edit" ? "Create new" : "Edit this"} Job
      </p> */}
      <Form
        form={form}
        // name={"normal_login"}
        layout="vertical"
        initialValues={
          type === "create"
            ? {
                currency: "USD",
                scheduleDate: dayjs(),
              }
            : {
                ...previous,
                scheduleDate: dayjs(previous?.scheduleDate),
                expirationDate: dayjs(previous?.expirationDate),
              }
        }
        onFinish={onFinish}
        // onValuesChange={onValuesChange}
        requiredMark={false}
        className="w-full"
      >
        <Row gutter={[24, 16]}>
          <Col span={24}>
            <p className="text-lg sm:text-xl">Logo & Banner Image</p>
          </Col>
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
        </Row>
        <Row gutter={[24, 0]}>
          <Col span={24}>
            <p className="text-lg sm:text-xl pb-2">Job Information</p>
          </Col>
          <Col span={24} xl={16}>
            <Form.Item
              name="jobTitle"
              label="Job Tittle"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input
                size="large"
                placeholder="Add job tittle, role, vacancies etc"
              />
            </Form.Item>
          </Col>
          <Col span={24} xl={16}>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Location is required!" }]}
            >
              <Input
                className=""
                size="large"
                placeholder="City, state, country name"
                prefix={
                  <PiMapPinLine size={19} className="mr-1 text-primary/90" />
                }
              />
            </Form.Item>
          </Col>
          <Col span={24} xl={16}>
            <Form.Item
              name="tags"
              label="Tags"
              rules={[
                { required: true, message: "Tags is required!" },
                // ...(!user?.purchasePlan?.multi_categories
                //   ? [
                //       {
                //         validator: (_, value) =>
                //           value && value.length > 1
                //             ? Promise.reject(
                //                 new Error("You can select only one tag!")
                //               )
                //             : Promise.resolve(),
                //       },
                //     ]
                //   : []),
              ]}
            >
              <Select
                // mode="tags"
                mode="multiple"
                // mode={
                //   user?.purchasePlan?.multi_categories ? "multiple" : undefined
                // }
                size="large"
                loading={cateLoading}
                maxCount={!user?.purchasePlan?.multi_categories ? 1 : undefined}
                style={{ width: "100%" }}
                placeholder="Job keyword, tags etc..."
                options={categoryData?.data?.map((item: TJobCategory) => ({
                  label: item.catagoryType,
                  value: item.catagoryType,
                }))}
              />
            </Form.Item>
          </Col>
          {user?.purchasePlan?.schedule_dates && (
            <Col span={24} xl={8}>
              <Form.Item
                name="scheduleDate"
                label="Publish Deadline"
                // rules={[{ required: true, message: "Expiration is required!" }]}
              >
                <DatePicker
                  size="large"
                  placeholder="DD-MM-YYYY"
                  format="DD-MM-YYYY"
                  style={{ width: "100%" }}
                  disabledDate={(current) => {
                    return current && current < dayjs().endOf("day");
                  }}
                />
              </Form.Item>
            </Col>
          )}
          {/* <Col span={24} xl={8}>
            <Form.Item
              name="role"
              label="Job Role"
              rules={[{ required: true, message: "Role is required!" }]}
            >
              <Input size="large" placeholder="" />
            </Form.Item>
          </Col> */}
          <Col span={24}>
            <p className="text-lg sm:text-xl pb-2">Salary</p>
          </Col>
          <Col span={24} xl={8}>
            <Form.Item
              name="minSalary"
              label="Min Salary"
              rules={[
                { required: true, message: "Min Salary is required!" },
                {
                  pattern: /^\+?[0-9\s]*$/,
                  message: "Please input valid number!",
                },
              ]}
            >
              <Input
                size="large"
                addonBefore={
                  <Form.Item name="currency" noStyle>
                    <Select
                      defaultValue="USD"
                      options={currencies.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                }
              />
            </Form.Item>
          </Col>
          <Col span={24} xl={8}>
            <Form.Item
              name="maxSalary"
              label="Max Salary"
              rules={[
                { required: true, message: "Max Salary is required!" },
                {
                  pattern: /^\+?[0-9\s]*$/,
                  message: "Please input valid number!",
                },
              ]}
            >
              <Input
                size="large"
                addonBefore={
                  <Form.Item name="currency" noStyle>
                    <Select
                      defaultValue="USD"
                      options={currencies.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                }
              />
            </Form.Item>
          </Col>
          <Col span={24} xl={8}>
            <Form.Item
              name="salaryType"
              label="Salary Type"
              rules={[{ required: true, message: "Salary type is required!" }]}
            >
              <Select
                size="large"
                style={{ width: "100%" }}
                placeholder="Select..."
                options={salaryTypes.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <p className="text-lg sm:text-xl pb-2">Advance Information</p>
          </Col>
          <Col span={24} xl={8}>
            <Form.Item
              name="educations"
              label="Education"
              rules={[{ required: true, message: "Education is required!" }]}
            >
              <Select
                mode="multiple"
                showSearch
                size="large"
                style={{ width: "100%" }}
                placeholder="Select..."
                options={filterData[2].options.slice(1)}
              />
            </Form.Item>
          </Col>
          <Col span={24} xl={8}>
            <Form.Item
              name="experience"
              label="Experience"
              rules={[{ required: true, message: "Experience is required!" }]}
            >
              <Select
                size="large"
                style={{ width: "100%" }}
                placeholder="Select..."
                options={filterData[0].options}
              />
            </Form.Item>
          </Col>
          <Col span={24} xl={8}>
            <Form.Item
              name="jobType"
              label="Job Type"
              rules={[{ required: true, message: "Type is required!" }]}
            >
              <Select
                showSearch
                size="large"
                style={{ width: "100%" }}
                placeholder="Select..."
                options={filterData[1].options.slice(1)}
              />
            </Form.Item>
          </Col>
          <Col span={24} xl={8}>
            <Form.Item
              name="organizationType"
              label="Organization Type"
              rules={[{ required: true, message: "Organization is required!" }]}
            >
              <Select
                showSearch
                size="large"
                style={{ width: "100%" }}
                placeholder="Select..."
                options={filterData[4].options.slice(1)}
              />
            </Form.Item>
          </Col>
          <Col span={24} xl={8}>
            <Form.Item
              name="expirationDate"
              label="Expiration Deadline"
              rules={[{ required: true, message: "Expiration is required!" }]}
            >
              <DatePicker
                size="large"
                placeholder="DD-MM-YYYY"
                format="DD-MM-YYYY"
                style={{ width: "100%" }}
                disabledDate={(current) => {
                  return current && current <= dayjs().endOf("day");
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24} xl={8}>
            <Form.Item
              name="jobLevel"
              label="Job Level"
              rules={[{ required: true, message: "Level is required!" }]}
            >
              <Select
                size="large"
                style={{ width: "100%" }}
                placeholder="Select..."
                options={filterData[5].options}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <AddJobBenefit benefits={benefits} setBenefits={setBenefits} />
          </Col>
          <Col span={24}>
            <p className="text-lg sm:text-xl pb-2 pt-5">
              Description & Responsibility
            </p>
          </Col>
          <Col span={24}>
            <Form.Item
              name="responsibilities"
              label="Responsibilities"
              rules={[
                {
                  validator() {
                    if (
                      !(
                        responsibilityRef.current &&
                        typeof responsibilityRef.current.getContent() ===
                          "string" &&
                        responsibilityRef.current.getContent().length > 0
                      )
                    ) {
                      return Promise.reject("Responsibilities is required!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <CustomEditor
                ref={responsibilityRef}
                // defaultValue={user?.about}
                placeholder={"Start typing responsibilities..."}
                init={{ statusbar: true }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  validator() {
                    if (
                      !(
                        descriptionRef.current &&
                        typeof descriptionRef.current.getContent() ===
                          "string" &&
                        descriptionRef.current.getContent().length > 0
                      )
                    ) {
                      return Promise.reject("Description is required!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <CustomEditor
                ref={descriptionRef}
                // defaultValue={user?.}
                placeholder={"Start typing description..."}
                init={{ statusbar: true }}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="pt-2 w-full">
          <Button
            type="primary"
            size="large"
            loading={isLoading || updateLoading}
            className="w-full lg:max-w-xs"
            htmlType="submit"
          >
            Post Job <FaArrowRightLong size={16} />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobUploadForm;
