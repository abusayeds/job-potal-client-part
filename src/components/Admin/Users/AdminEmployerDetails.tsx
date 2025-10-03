"use client";

import EmployerOverviewCart from "@/components/Employers/EmployerOverviewCart";
import GlobalModal from "@/components/ui/GlobalModal";
import { imageUrl } from "@/config";
import { errorAlert, TRejectResObj, TResError } from "@/lib/alerts";
import { useUserStatusChangeMutation } from "@/redux/features/users/users.api";
import { TDetails } from "@/types";
import { Button, Form, Input, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createElement, useState } from "react";
import { FaFacebookF, FaInstagramSquare, FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import { IoBagAddOutline } from "react-icons/io5";
import { LiaIndustrySolid } from "react-icons/lia";
import { MdOutlinePhoneInTalk, MdOutlineVerified } from "react-icons/md";
import { SiStartrek } from "react-icons/si";
import { SlOrganization } from "react-icons/sl";
import { TfiWorld } from "react-icons/tfi";
import { VscOrganization } from "react-icons/vsc";

const AdminEmployerDetails = ({
  // viewType,
  employerDetails,
}: {
  viewType: "verified" | "requested";
  // employerDetails: TDetails;
  employerDetails: TDetails;
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [isDeactiveOpenModal, setIsDeactiveOpenModal] = useState(false);
  const [deactiveId, setDeactiveId] = useState<string>("");

  const [changeUserStatus] = useUserStatusChangeMutation();

  const [messageApi, contextHolder] = message.useMessage();

  //   const [active] = useActiveUserMutation();
  //   const [deActive] = useDeActiveUserMutation();

  const showRejectModal = (id: string) => {
    setDeactiveId(id);
    setIsDeactiveOpenModal(true);
  };

  const handleAccept = async (id: string, isApprove: boolean) => {
    console.log("employer  accepted ", id);
    try {
      const response = await changeUserStatus({
        id,
        body: {
          isApprove,
        },
      }).unwrap();
      messageApi.open({
        key: "Status",
        type: "success",
        content:
          response?.data?.message ||
          response?.message ||
          "Status change successfully!",
        duration: 3,
      });
      router.push(`/admin/companies/verified`);
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  const handleReject = async (
    id: string,
    isApprove: boolean,
    isCompleted: boolean,
    values: TRejectResObj
  ) => {
    console.log("Handle Deactive", id, values);
    try {
      const response = await changeUserStatus({
        id,
        body: {
          isApprove,
          isCompleted,
          title: values.title,
          description: values.description,
        },
      }).unwrap();
      messageApi.open({
        key: "Status",
        type: "success",
        content:
          response?.data?.message ||
          response?.message ||
          "Status change successfully!",
        duration: 3,
      });
      form.resetFields();
      setIsDeactiveOpenModal(false);
      router.back();
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  //   const handleAccept = async (id: string) => {
  //     console.log(id);
  //     try {
  //       const response = await active(id).unwrap();
  //       messageApi.open({
  //         key: "Accept",
  //         type: "success",
  //         content:
  //           response?.data?.message ||
  //           response?.message ||
  //           "Accept Employer successfully!",
  //         duration: 3,
  //       });
  //       // setIsOpenModal(false);
  //       // form.resetFields();
  //     } catch (error) {
  //       errorAlert({ error: error as TResError });
  //     }

  //     console.log("first", id);
  //   };

  //   const handleDeactive = async (id: string) => {
  //     try {
  //       const response = await deActive(id).unwrap();
  //       messageApi.open({
  //         key: "Deactive",
  //         type: "success",
  //         content:
  //           response?.data?.message ||
  //           response?.message ||
  //           "Deactivate successfully!",
  //         duration: 3,
  //       });
  //       // setIsOpenModal(false);
  //       // form.resetFields();
  //     } catch (error) {
  //       errorAlert({ error: error as TResError });
  //     }
  //   };

  console.log(employerDetails);
  const shareLinks = [
    { icon: FaFacebookF, url: employerDetails?.facebook, label: "Facebook" },
    {
      icon: FaInstagramSquare,
      url: "https://www.instagram.com/",
      label: "Instagram",
    },
    { icon: FaLinkedinIn, url: employerDetails?.linkedin, label: "LinkedIn" },
    { icon: FaTwitter, url: "https://x.com/", label: "Twitter" },
  ];
  const companyInfo = [
    {
      label: "FOUNDED IN:",
      // value: "14 June, 2021",
      value: employerDetails?.foundIn
        ? new Date(employerDetails?.foundIn).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "N/A",

      icon: SiStartrek,
    },
    {
      label: "ORGANIZATION TYPE",
      // value: "Private Company",
      value: employerDetails?.organizationType || "N/A",
      icon: SlOrganization,
    },
    {
      label: "INDUSTRY TYPES",
      // value: "Technology",
      value: employerDetails?.industry || "N/A",
      icon: LiaIndustrySolid,
    },
    {
      label: "TEAM SIZE",
      // value: "120-300 Employee",
      value: employerDetails?.teamSize
        ? `${employerDetails?.teamSize} Employee`
        : "N/A",
      icon: VscOrganization,
    },
  ];
  const contactInfoData = [
    {
      type: "Website",
      icon: TfiWorld,
      label: "www.estherhoward.com",
      value: employerDetails?.companyWebsite || "N/A",
    },
    {
      type: "Phone",
      icon: MdOutlinePhoneInTalk,
      label: "+1-202-555-0141",
      value: employerDetails?.phone || "N/A",
    },
    {
      type: "Email Address",
      icon: GoMail,
      label: "esther.howard@gmail.com",
      value: employerDetails?.email || "N/A",
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="relative">
        <div className="w-full h-[180px] z-0">
          <Image
            // src="/test/job-details-bg.svg"
            src={imageUrl + employerDetails?.banner}
            alt="background"
            width={1000}
            height={1000}
            // fill
            // sizes="100vw"
            // style={{
            //   objectFit: "cover",
            //   zIndex: -1,
            //   borderRadius: "0.5rem",
            // }}
            className="w-full h-full object-cover rounded-lg drop-shadow-sm"
          />
        </div>
        <div className="-mt-16 w-full px-[7%] lg:px-[5%] drop-shadow-xl">
          <div className="w-full flex flex-col xl:flex-row justify-between items-center gap-8 bg-white rounded-lg px-6 py-6 z-10">
            <div className="flex flex-col lg:flex-row gap-3 justify-between items-center">
              <div className="flex-shrink-0 w-20 rounded-full overflow-hidden border border-gray-50 drop-shadow-sm">
                <Image
                  // src={"/test/employer.svg"}
                  src={imageUrl + employerDetails?.logo}
                  alt="logo"
                  width={500}
                  height={500}
                />
              </div>
              <div className="space-y-2.5 text-center lg:text-start">
                <h5 className="text-2xl">{employerDetails?.companyName}</h5>
                <p className="text-brand/60 whitespace-pre">
                  {employerDetails?.industry}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 bg-primary/10 w-full lg:w-fit lg:min-w-sm py-4 px-4 sm:px-6 lg:px-8 rounded">
              <div className="flex gap-3 items-center">
                <div className="bg-white p-2 sm:p-3 rounded">
                  <IoBagAddOutline size={25} />
                </div>
                <div className="space-y-0.5">
                  <p className="sm:text-lg font-semibold">
                    {" "}
                    {employerDetails?.totalJobs}{" "}
                  </p>
                  <p className="text-sm text-brand/60"> Current Job</p>
                </div>
              </div>
              {/* {viewType === "requested" && ( */}
              {employerDetails?.isApprove === true &&
              employerDetails?.isCompleted === true ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-green-500 font-medium">Verified</span>{" "}
                    <MdOutlineVerified
                      size={20}
                      className="text-green-500 mb-0.5"
                    />
                  </div>
                  {/* <Button
                    // onClick={() => handleDeactive(employerDetails?._id)}
                    className="w-full"
                    type="text"
                    style={{ font: "red" }}
                  >
                    Deactive
                  </Button> */}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => showRejectModal(employerDetails?._id)}
                    className="w-full"
                    type="primary"
                    style={{ background: "red" }}
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleAccept(employerDetails?._id, true)}
                    className="w-full"
                    type="primary"
                  >
                    Accept
                  </Button>
                </div>
              )}
              {/* {viewType === "verified" && (
                <div className="flex items-center gap-1">
                  <span className="text-green-500 font-medium">Verified</span>{" "}
                  <MdOutlineVerified
                    size={20}
                    className="text-green-500 mb-0.5"
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-8 lg:gap-5 xl:gap-10 2xl:gap-16 mt-12 lg:divide-x divide-gray-200">
          <div className="col-span-1 lg:col-span-5 space-y-8 lg:pr-4 2xl:pr-8">
            <div>
              <h5 className="font-semibold mb-3 text-brand">Description</h5>
              <div
                className="no-tailwind text-brand/70"
                dangerouslySetInnerHTML={{ __html: employerDetails?.about }}
              />
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-brand">
                Company Benefits
              </h5>
              <div className="text-brand/70">
                {employerDetails?.benefits &&
                employerDetails?.benefits.length > 0
                  ? employerDetails?.benefits.map((benefit, index) => (
                      <ul key={index} className="list-disc pl-5 space-y-3 mt-2">
                        <li>{benefit}</li>
                      </ul>
                    ))
                  : "No benefits listed."}
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-brand">Company Vision</h5>
              <div
                className="no-tailwind text-brand/70"
                dangerouslySetInnerHTML={{
                  __html: employerDetails?.companyVision,
                }}
              />
            </div>
            {/* <div className="flex gap-3 items-center flex-wrap">
              <span className="pr-2 text-lg whitespace-pre w-full">
                Share here :
              </span>{" "}
              {shareLinks.map(
                (link, index) =>
                  link.url && (
                    <Button
                      key={index}
                      href={link.url}
                      target="_blank"
                      size="large"
                      style={{ height: "40px" }}
                    >
                      <link.icon size={20} /> {link.label}
                    </Button>
                  )
              )}
            </div> */}
          </div>
          <div className="col-span-1 lg:col-span-4 space-y-8 order-first lg:order-last">
            <div className="px-6">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-3 gap-y-8">
                {companyInfo.map((detail, index) => (
                  <EmployerOverviewCart data={detail} key={index} />
                ))}
              </div>
            </div>
            <div className="p-6 border-2 border-gray-100 rounded-lg">
              <h5 className="font-semibold mb-3 text-brand">
                Contact Information
              </h5>
              <div className="divide-y divide-gray-200">
                {contactInfoData.map((info, index) => (
                  <div className="flex gap-5 items-center py-5" key={index}>
                    {createElement(info.icon, {
                      className: "size-6 sm:size-7 text-primary",
                    })}
                    <div className="space-y-1">
                      <p className="text-sm text-brand/60 uppercase">
                        {info.type}
                      </p>
                      <h5 className="text-lg text-brand font-medium">
                        {info.value}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-2 border-gray-100 rounded-lg">
              <h5 className="font-semibold mb-4 text-brand">Follow us on:</h5>
              <div className="space-x-1">
                {shareLinks.map((link, index) => (
                  <Button
                    key={index}
                    type="text"
                    href={link.url}
                    target="_blank"
                    size="large"
                    style={{ height: "40px" }}
                  >
                    <link.icon size={20} />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* deactive Modal start */}
      <GlobalModal
        isModalOpen={isDeactiveOpenModal}
        setIsModalOpen={setIsDeactiveOpenModal}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => handleReject(deactiveId, false, false, values)}
          className="mt-6"
          // initialValues={{ protectionFee }}
        >
          <h3 className="font-semibold text-xl text-red-500 mb-4">
            {" "}
            Are you sure? you want to deactive... <br /> Please explain them for
            better understand{" "}
          </h3>
          <Form.Item
            name="title"
            label="Title"
            // rules={[{ required: true, message: "Please enter Title here" }]}
          >
            <Input placeholder="Title type here" type="text" size="large" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter description here" },
            ]}
          >
            <Input.TextArea
              placeholder="Description type here"
              rows={4}
              size="large"
            />
          </Form.Item>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              // onClick={() => handleReject(deactiveId, values)}
              className="bg-red-600 text-white border rounded cursor-pointer hover:bg-white hover:text-red-600 transition-colors shadow-lg px-4 py-2"
            >
              Reject
            </button>
          </div>
        </Form>
      </GlobalModal>
      {/* deactive Modal end */}
    </>
  );
};

export default AdminEmployerDetails;
