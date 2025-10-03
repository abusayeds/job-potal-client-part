"use client";

import GlobalModal from "@/components/ui/GlobalModal";
import { getPlanLabel } from "@/lib/getPlanLabel";
import { useGetEarningHistoryQuery } from "@/redux/features/earning/earning.api";
import { TQuery, TUniObject } from "@/types";
import { TPlanName } from "@/types/subscription.type";
import { Button, Pagination, Table, TableColumnsType } from "antd";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Page = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState<TUniObject>({});
  const showModal = (data: TUniObject) => {
    setModalData(data);
    setIsOpenModal(true);
  };
  const [query, setQuery] = useState<TQuery>({
    page: 1,
    limit: 10,
  });
  const queryParams = Object.entries(query)
    .filter((value) => value[1])
    .map(([name, value]) => ({ name, value: value.toString() }));
  const { data, isLoading } = useGetEarningHistoryQuery(queryParams);

  const statusData = [
    {
      icon: "/images/earnings/earning.svg",
      label: "Earning's",
      value: data?.data?.totalEarning || "N/A",
    },
    {
      icon: "/images/earnings/balance.svg",
      label: "Balance",
      value: data?.data?.totalEarning || "N/A",
    },
  ];

  const columns: TableColumnsType<TUniObject> = [
    {
      title: "#SL.No",
      dataIndex: "_id",
      render: (text) => <p>{text.slice(0, 7) + "..."}</p>,
    },
    {
      title: "Company Name",
      dataIndex: "company",
      render: (text: string) => <p>{text ? text : "N/A"}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text: string) => <p>{text ? text : "N/A"}</p>,
      align: "center",
    },
    {
      title: "Subscription",
      dataIndex: "planName",
      render: (text: string) => <p>{text ? getPlanLabel(text as TPlanName) : "N/A"}</p>,
      // align: "center",
    },
    {
      title: "Purchase Date",
      dataIndex: "createdAt",
      // render: (text) => <p>{new Date(text).toLocaleDateString()}</p>,
      render: (text) => (
        <p>
          {text
            ? new Date(text).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "N/A"}
        </p>
      ),
      // align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text: string) => <p>${text ? text : "N/A"}</p>,
      // align: "center",
    },
    {
      title: "Action",
      render: (record) => (
        <Button
          onClick={() => showModal(record)}
          size="small"
          type="text"
          shape="circle"
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <AiOutlineInfoCircle size={22} />
        </Button>
      ),
      align: "center",
    },
  ];

  const dataC = data?.data?.earningsList || [];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5 2xl:gap-8 justify-between">
        {statusData.map((item, inx) => (
          <div
            key={inx}
            className="px-5 xl:px-7 py-5 rounded-lg flex justify-between items-center gap-4 drop-shadow-sm border border-primary/10 bg-white w-full"
          >
            <div className="w-24 h-fit">
              <Image src={item.icon} alt="img" width={500} height={500} />
            </div>
            <div className="space-y-2.5 text-end">
              <h3 className="xl:text-lg text-brand/70 capitalize">
                Total {item.label}
              </h3>
              <h3 className="text-3xl xl:text-4xl text-brand font-roman-bold">
                ${item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className=" border border-gray-200 p-1 pb-0 rounded-xl">
        <h4 className="text-xl xl:text-2xl font-medium text-white bg-secondery px-6 py-3 rounded-t-lg">
          Category List
        </h4>
        <Table
          loading={isLoading}
          // scroll={{y: 100,}}
          // rowSelection={ { type: "checkbox", ...rowSelection }}
          columns={columns}
          dataSource={dataC}
          pagination={false}
          rowKey="_id"
        />
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
      <GlobalModal
        isModalOpen={isOpenModal}
        setIsModalOpen={setIsOpenModal}
        maxWidth="544px"
      >
        <div className="w-full px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Earning’s Details</h1>
          </div>
          <div className="space-y-3 divide-y divide-gray-200 text-base mt-5 mb-2">
            <div className="flex justify-between gap-1.5 pb-3">
              <p className="font-semibold">Employer’s Name</p>{" "}
              <p>{modalData.fullName ? modalData.fullName : "N/A"}</p>
            </div>
            <div className="flex justify-between gap-1.5 pb-3">
              <p className="font-semibold">Company Name</p>{" "}
              <p>{modalData.company ? modalData.company : "N/A"}</p>
            </div>
            <div className="flex justify-between gap-1.5 pb-3">
              <p className="font-semibold">Subscription</p>{" "}
              <p>{modalData.planName ? modalData.planName : "N/A"}</p>
            </div>
            <div className="flex justify-between gap-1.5 pb-3">
              <p className="font-semibold">Email</p>{" "}
              <p>{modalData.email ? modalData.email : "N/A"}</p>
            </div>
            <div className="flex justify-between gap-1.5 pb-3">
              <p className="font-semibold">Amount</p>{" "}
              <p>${modalData.amount ? modalData.amount : "N/A"}</p>
            </div>
            <div className="flex justify-between gap-1.5 pb-3">
              {/* <p>Date</p> <p>{modalData.createdAt}</p> */}
              <p className="font-semibold">Date</p>{" "}
              <p>
                {modalData.createdAt
                  ? new Date(modalData.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => setIsOpenModal(false)}
              className="w-fit rounded-full text-white bg-primary px-8 p-2"
            >
              Okay
            </button>
          </div>
        </div>
      </GlobalModal>
    </div>
  );
};

export default Page;
