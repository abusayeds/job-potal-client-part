"use client";

import React, { useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  TimePicker,
  Row,
  Col,
  message,
} from "antd";
import { trainingFilter } from "@/constants/filter.const";
import DraggerInput, { TFilePath } from "../ui/DraggerInput";
import { TUniObject } from "@/types";
import CustomEditor, { TTinyMcEditor } from "../ui/CustomEditor";
import { usePostTrainingMutation } from "@/redux/features/training/training.api";
import { errorAlert, TResError } from "@/lib/alerts";

const TrainingUploadForm: React.FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const editorRef = useRef<TTinyMcEditor>(null);
  const [imageUrl, setImageUrl] = useState<TFilePath>([]);
  const [mutation, { isLoading }] = usePostTrainingMutation();

  const onFinish = async (values: any) => {
    const formattedTime = values.time.map((time: any) => time.format("HH:mm"));
    const payload: TUniObject = {
      ...values,
      time: formattedTime, // Update the time field with the formatted values
    };
    // return console.log(payload);
    if (!!imageUrl[0]) payload.image = imageUrl[0];
    if (editorRef.current && typeof editorRef.current.getContent() === "string")
      payload.description = editorRef.current.getContent();
    try {
      await mutation(payload).unwrap();
      messageApi.open({
        key: "training",
        type: "success",
        content: "Your training has been successfully created.",
        duration: 3,
      });
      form.resetFields();
      setImageUrl([]);
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  return (
    <Form
      form={form}
      name="trainingForm"
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{
        //   title: "Node.js Training",
        //   date: moment("2025-10-01"),
        //   catagory: "Professional Development",
        format: "in_person",
        //   duration: "5 hours",
        //   Instructor: "John Doe",
        //   learning_credits: 10,
        //   time: ["10:00 AM", "01:00 PM"],
        //   description: "This training covers advanced concepts in Node.js, including asynchronous programming, streams, and event-driven architecture."
      }}
      layout="vertical"
    >
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Form.Item
            name="title"
            label="Training Title"
            rules={[
              { required: true, message: "Please enter the training title!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              size="large"
              placeholder="Select type"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={trainingFilter[0].options}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            label="Banner Image"
            name="image"
            rules={[
              {
                required: !imageUrl[0],
                message: "Banner is required!",
              },
            ]}
          >
            <DraggerInput
              setFilePaths={setImageUrl}
              showUploadList={true}
              defaultCalss="lg:h-28 py-4"
              title={
                <h4 className="font-semibold text-brand/50">
                  Browse photo or drop here
                </h4>
              }
              subTitle="A photo larger than. Max photo size 10 MB."
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24} md={12}>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker showTime size="large" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            name="time"
            label="Training Time"
            rules={[
              { required: true, message: "Please select the training time!" },
            ]}
          >
            <TimePicker.RangePicker
              format="HH:mm"
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: "Please enter the duration!" }]}
          >
            <Input
              size="large"
              placeholder="E.g. 4 hours (duration of the training)"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Form.Item
            name="format"
            label="Format"
            rules={[{ required: true, message: "Please select a format!" }]}
          >
            <Select
              size="large"
              placeholder="Select type"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={trainingFilter[1].options}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                validator: async (_, value) => {
                  const format = form.getFieldValue("format");
                  if (format === "in-person" && !value) {
                    return Promise.reject("Please enter the address!");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="Description"
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
                return Promise.reject("Description is required!");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <CustomEditor
          ref={editorRef}
          //   defaultValue={user?.about}
          placeholder={
            "Please provide a description of your training. Include key details about the program and what candidates can expect."
          }
          init={{ statusbar: true }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={isLoading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TrainingUploadForm;
