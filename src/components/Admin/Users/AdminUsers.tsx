"use client";

import LoaderWraperComp from "@/components/LoaderWraperComp";
import GlobalModal from "@/components/ui/GlobalModal";
import { errorAlert, TResError } from "@/lib/alerts";
import { sweetAlertConfirmation } from "@/lib/alerts/sweetAlertConfirmation";
import { getRoleLabel } from "@/lib/getRoleLabel";
import {
  useAdminUsersQuery,
  useDeleteUserMutation,
  useUserStatusChangeMutation,
} from "@/redux/features/users/users.api";
import { TQuery, TRole, TUniObject } from "@/types";
import { debounceSearch } from "@/utils/debounce";
import { handleDownload } from "@/utils/fileDownloadFromUrl";
import {
  Button,
  Form,
  Input,
  message,
  Pagination,
  Table,
  TableColumnsType,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiCalendar, BiFlag, BiGlobe, BiMapPin, BiPhone } from "react-icons/bi";
import { CgOrganisation } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import { IoSearchOutline, IoTrash } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";

const AdminUsers = ({ role }: { role: TRole }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState<TUniObject>({});

  const [query, setQuery] = useState<TQuery<{ role?: TRole }>>({
    page: 1,
    limit: 10,
    role: role,
  });

  const [messageApi, contextHolder] = message.useMessage();

  const queryArg = Object.entries(query)
    .filter((value) => value[1])
    .map(([name, value]) => ({ name, value: value.toString() }));

  const { data, isLoading, isError, error } = useAdminUsersQuery(queryArg);
  const candidates = data?.data?.user || [];

  const [changeUserStatus] = useUserStatusChangeMutation();
  const [deleteJobSeeker] = useDeleteUserMutation();

  const showModal = (data: TUniObject) => {
    if (role === "candidate") {
      setModalData(data);
      setIsOpenModal(true);
    } else if (role === "employer") {
      setModalData(data);
      setIsOpenModal(true);
      // router.push(`/admin/users/employer/${data._id}`);
    }
  };

  const handleChangeUserStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await changeUserStatus({
        id,
        body: { isActive },
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
      setIsOpenModal(false);
      form.resetFields();
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
      const response = await deleteJobSeeker(id).unwrap();
      messageApi.open({
        key: "user",
        type: "success",
        content:
          response?.data?.message ||
          response?.message ||
          "Delete successfully!",
        duration: 3,
      });
    } catch (error) {
      messageApi.destroy("user");
      errorAlert({ error: error as TResError });
    }
  };

  const columns: TableColumnsType<TUniObject> = [
    {
      title: "Name",
      dataIndex: "fullName",
      render: (text: string) => <p>{text ? text : "N/A"}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text: string) => <p>{text}</p>,
      // align: "center",
    },
    ...(role === "employer"
      ? [
          {
            title: "Company Name",
            dataIndex: "companyName",
            render: (text: string) => <p>{text ? text : "N/A"}</p>,
          },
        ]
      : []),
    ...(role === "employer"
      ? [
          {
            title: "Company Address",
            dataIndex: "address",
            render: (text: string) => <p>{text ? text : "N/A"}</p>,
          },
        ]
      : []),
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive: boolean) => (
        <p>
          {isActive ? (
            <p className="text-green-600 font-semibold"> Active </p>
          ) : (
            <p className="text-red-600 font-semibold"> Blocked </p>
          )}
        </p>
      ),
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      render: (text) => (
        <p>
          {new Date(text).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      ),
      align: "center",
    },
    {
      title: "Action",
      render: (record) => (
        <div className="flex justify-center gap-4">
          <Button
            onClick={() =>
              sweetAlertConfirmation({
                func: () => handleDelete(record._id),
                object: "remove this account",
                okay: "Remove",
                title: "Remove!!",
              })
            }
            size="small"
            type="default"
            shape="circle"
          >
            <IoTrash size={16} className="text-red-400" />
          </Button>
          <Button
            onClick={() => showModal({ ...record, role })}
            size="small"
            type="text"
            shape="circle"
            style={{ backgroundColor: "#f0f0f0" }}
          >
            <AiOutlineInfoCircle size={22} />
          </Button>
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="border border-gray-200 rounded-xl mt-5 p-1 pb-0">
        <div className="flex items-center justify-between gap-2 rounded-t-lg py-4 px-6 bg-secondery">
          <h3 className="text-xl xl:text-2xl font-medium text-white">
            {getRoleLabel(role)}’s List ( Total {getRoleLabel(role)}:{" "}
            {data?.data?.pagination?.totalData} )
          </h3>
          <div className="flex justify-end gap-3">
            {/* <DatePicker
              // value={dayjs(`${cartYear}`, "YYYY")}
              // onChange={onChange}
              style={{ height: 36, borderRadius: 20, width: 170 }}
            /> */}
            <Input
              onChange={(e) =>
                debounceSearch({
                  setter: setQuery,
                  newValue: e.target.value,
                  name: "searchTerm",
                })
              }
              allowClear
              placeholder="Search here.."
              suffix={
                <div className="pl-1.5 border-l border-gray-300">
                  <IoSearchOutline size={18} />
                </div>
              }
              style={{
                height: 36,
                borderRadius: 20,
                width: "100%",
                maxWidth: 250,
              }}
            />
          </div>
        </div>
        <LoaderWraperComp
          isError={isError}
          isLoading={isLoading}
          error={error as TResError}
          className="h-[70vh]"
        >
          <Table
            columns={columns}
            dataSource={candidates}
            pagination={false}
            rowKey="_id"
          />
        </LoaderWraperComp>
        {data?.data?.pagination?.totalData > 1 && (
          <div className="py-4">
            <Pagination
              // total={50}
              align="center"
              showQuickJumper={true}
              showSizeChanger={true}
              total={data?.data?.pagination?.totalData || 1}
              current={query.page}
              defaultCurrent={1}
              onChange={(page) => setQuery((c) => ({ ...c, page }))}
              pageSize={query.limit}
              onShowSizeChange={(_current, size) =>
                setQuery((c) => ({ ...c, limit: size }))
              }
            />
          </div>
        )}
      </div>

      <GlobalModal isModalOpen={isOpenModal} setIsModalOpen={setIsOpenModal}>
        {/* Header Section with Profile Image */}
        <div className="relative text-center">
          <div className="w-24 h-24 mx-auto mb-2 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            <Image
              src={"/test/profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {modalData?.fullName ? modalData?.fullName : "N/A"}
          </h1>
          <p className="text-gray-400 text-sm">{getRoleLabel(role)} Profile</p>
        </div>

        {/* Profile Information */}
        <div className="lg:px-6 py-6 space-y-2 xl:space-y-4">
          {modalData.role === "employer" && (
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CgOrganisation className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">
                  Organization
                </p>
                <p className="text-gray-800 font-semibold">
                  {modalData?.organizationType
                    ? modalData?.organizationType
                    : "N/A"}
                </p>
              </div>
            </div>
          )}
          {modalData.role === "employer" && (
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TbUsersGroup className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Team Size</p>
                <p className="text-gray-800 font-semibold">
                  {modalData?.teamSize ? modalData?.teamSize : "N/A"}{" "}
                  Participants
                </p>
              </div>
            </div>
          )}
          {modalData.role === "candidate" && (
            <>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BiCalendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium">
                    Date of Birth
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {modalData?.dathOfBirth
                      ? new Date(
                          // data?.data?.candidateInfo?.dateOfBrith
                          modalData?.dathOfBirth
                        ).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <BiFlag className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium">
                    Nationality
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {modalData?.nationality ? modalData?.nationality : "N/A"}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <BiMapPin className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Address</p>
              <p className="text-gray-800 font-semibold">
                {modalData?.address ? modalData?.address : "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <BiGlobe className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Website</p>
              <a
                href={modalData?.website ? modalData?.website : "N/A"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:text-purple-700 hover:underline"
              >
                {modalData?.website ? modalData?.website : "N/A"}
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <CiMail className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Email</p>
              <a
                href={`mailto:${"user@gmail.com"}`}
                className="text-orange-600 font-semibold hover:text-orange-700 hover:underline break-all"
              >
                {modalData?.email ? modalData.email : "N/A"}
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <BiPhone className="w-5 h-5 text-teal-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Phone</p>
              <a
                href={`tel:${modalData?.phone ? modalData?.phone : "N/A"}`}
                className="text-teal-600 font-semibold hover:text-teal-700 hover:underline"
              >
                {modalData?.phone ? modalData?.phone : "N/A"}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pb-3 lg:px-6 max-w-sm mx-auto">
          {modalData.role === "candidate" ? (
            <Button
              // onClick={() => handleDownload(path)}
              onClick={() => handleDownload(modalData?.cv?.[0]?.file)}
              className="w-full"
            >
              CV Download
            </Button>
          ) : (
            <Button
              onClick={() =>
                router.push(`/admin/companies/verified/${modalData?._id}`)
              }
              // target="_blank"
              className="w-full"
            >
              Company
            </Button>
          )}

          {modalData?.isActive === true ? (
            // {modalData?.isActive === false ? (
            <button
              onClick={() => handleChangeUserStatus(modalData._id, false)}
              className="w-full bg-red-600 text-white border rounded cursor-pointer hover:bg-white hover:text-red-600 transition-colors shadow-lg"
            >
              Deactivate
            </button>
          ) : (
            <button
              onClick={() => handleChangeUserStatus(modalData._id, true)}
              className="w-full bg-blue-600 text-white border rounded cursor-pointer hover:bg-white hover:text-blue-600 transition-colors shadow-lg"
            >
              Active
            </button>
          )}
        </div>
      </GlobalModal>
      {/*  */}

      {/*  */}
    </>
  );
};

export default AdminUsers;
