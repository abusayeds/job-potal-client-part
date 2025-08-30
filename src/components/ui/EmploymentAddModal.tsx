import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  message,
  Row,
} from "antd";
import GlobalModal from "../ui/GlobalModal";
import { useState } from "react";
import { TUniObject } from "@/types";
import { BiCalendar, BiMapPin, BiTrash } from "react-icons/bi";
import {
  useDeleteEmploymentMutation,
  useUpdateEmploymentMutation,
} from "@/redux/features/auth/authApi";
import { errorAlert, TResError } from "@/lib/alerts";
import { useAppSelector } from "@/redux/hook";
import { TEmploymentRecord } from "@/redux/features/auth/authSlice";
import { sweetAlertConfirmation } from "@/lib/alerts/sweetAlertConfirmation";

const EmploymentAddModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAppSelector((state) => state.auth);
  const [mutation, { isLoading }] = useUpdateEmploymentMutation();
  const [deleteEmployment] = useDeleteEmploymentMutation();

  const onValuesChange = (_changedValues: any, allValues: any) => {
    setFormValues(allValues);
  };

  const onClose = () => {
    form.resetFields();
    setFormValues({});
  };

  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    const payload = {
      ...values,
    };
    if (!values.currentlyWorking) {
      payload.startDate = values.dateOfEmployment[0];
      payload.endDate = values.dateOfEmployment[1];
    } else {
      payload.startDate = values.dateOfEmployment;
      payload.endDate = null;
    }
    delete payload.dateOfEmployment;
    try {
      await mutation({
        body: payload,
        type: "employment",
      }).unwrap();
      messageApi.open({
        key: "registration",
        type: "success",
        content: "Employment information has been submitted successfully!",
        duration: 3,
      });
      onClose();
      setIsModalOpen(false);
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  const handleDelete = async (id: string) => {
    messageApi.open({
      key: "user",
      type: "success",
      content: "Loading....",
      duration: 3,
    });
    try {
      const response = await deleteEmployment({
        recordId: id,
        type: "employment",
      }).unwrap();
      messageApi.open({
        key: "user",
        type: "success",
        content:
          response?.data?.message ||
          response?.message ||
          "Removed successfully!",
        duration: 3,
      });
    } catch (error) {
      messageApi.destroy("user");
      errorAlert({ error: error as TResError });
    }
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateDuration = (
    startDate: string,
    endDate: string | null
  ): string => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0) {
      return months > 0 ? `${years}y ${months}m` : `${years}y`;
    }
    return `${months}m`;
  };

  return (
    <>
      {contextHolder}
      <div className="space-y-6">
        {user?.employments?.map((job: TEmploymentRecord) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            <div className="px-6 py-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium mb-2">
                        {job.company}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        sweetAlertConfirmation({
                          func: () => handleDelete(job._id),
                          object: "remove this History",
                          okay: "Remove",
                          title: "Remove!!",
                        })
                      }
                      className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
                      title="Delete employment record"
                      type="button"
                    >
                      <BiTrash className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <BiMapPin className="h-4 w-4" />
                      <span>{job.jobLocation}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BiCalendar className="h-4 w-4" />
                      <span>
                        {formatDate(job.startDate)} - {formatDate(job.endDate)}
                      </span>
                      <span className="text-gray-400">
                        ({calculateDuration(job.startDate, job.endDate)})
                      </span>
                    </div>
                    {!job.endDate && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-md p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Job Responsibilities
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {job.jobDuties}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {(user?.employments?.length ?? 0) < 5 && (
        <Button onClick={() => setIsModalOpen(true)} type="dashed" block>
          Add Employment
        </Button>
      )}
      <GlobalModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        onClose={onClose}
      >
        <div className="space-y-3 py-3">
          <p className="text-xl sm:text-2xl">Add Employment</p>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            requiredMark={false}
            className="w-full"
            initialValues={{ currentlyWorking: false }}
          >
            <Row gutter={[{ xs: 10, sm: 16 }, {}]}>
              <Col xs={24}>
                <Form.Item
                  label="Job Title"
                  name="title"
                  rules={[
                    { required: true, message: "Job title is required!" },
                  ]}
                >
                  <Input size="large" placeholder="E.g. Software Engineer" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label="Company"
                  name="company"
                  rules={[{ required: true, message: "Company is required!" }]}
                >
                  <Input size="large" placeholder="" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label="Location"
                  name="jobLocation"
                  rules={[
                    { required: true, message: "Job location is required!" },
                  ]}
                >
                  <Input size="large" placeholder="E.g. New York, USA" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24}>
                <Form.Item
                  label="Date of employment"
                  name="dateOfEmployment"
                  rules={[
                    { required: true, message: "Employment date is required!" },
                  ]}
                >
                  {formValues.currentlyWorking ? (
                    // ✅ If currently working → show DatePicker for start date only
                    <DatePicker
                      size="large"
                      format="DD-MM-YYYY"
                      style={{ width: "100%" }}
                      placeholder="Join Date"
                    />
                  ) : (
                    // ✅ If not currently working → show RangePicker
                    <DatePicker.RangePicker
                      size="large"
                      format="DD-MM-YYYY"
                      style={{ width: "100%" }}
                      placeholder={["Start Date", "End Date"]}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="currentlyWorking"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox
                    style={{ marginBottom: 12 }}
                    onClick={() =>
                      form.setFieldsValue({ dateOfEmployment: undefined })
                    }
                  >
                    Currently Working here
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Duties/Responsibilities"
                  name="jobDuties"
                  rules={[
                    { required: true, message: "Job duties are required!" },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Describe your job duties/tasks"
                  />
                </Form.Item>
              </Col>

              <div className="w-full flex justify-center px-2">
                <Button
                  loading={isLoading}
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="px-4 w-fit"
                >
                  Save to Profile
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      </GlobalModal>
    </>
  );
};

export default EmploymentAddModal;
