"use client";

import React, { useState } from "react";
import { Button, Table, TableColumnsType, message } from "antd";
import { HiArrowDownTray } from "react-icons/hi2";
import LoaderWraperComp from "../LoaderWraperComp";
import { useInvoicesQuery } from "@/redux/features/transaction/transaction.api";
import { getPlanLabel } from "@/lib/getPlanLabel";
import { TPlanName } from "@/types/subscription.type";
import { TQuery } from "@/types";
import { pdf } from "@react-pdf/renderer";
import { InvoiceData, MyDocument } from "./InvoicePDF";
import { TResError } from "@/lib/alerts";

// Type for invoice data (adjust based on your actual data structure)

const LatestInvoices = () => {
  const [query, setQuery] = useState<TQuery>({ page: 1, limit: 10 });
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useInvoicesQuery(
    Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  );

  // Function to handle PDF download
  const handleDownloadPDF = async (invoiceData: InvoiceData) => {
    
    try {
      setDownloadingId(invoiceData._id);

      // Generate PDF blob
      const blob = await pdf(<MyDocument data={invoiceData} />).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoiceData._id}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      message.success("Invoice downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      message.error("Failed to download invoice. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const columns: TableColumnsType<InvoiceData> = [
    {
      title: "#SI.No",
      dataIndex: "subscriptionId",
      render: (text, _data, index) => <p>{text.slice(4)}</p>,
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      render: (text: string) => (
        <p className="whitespace-pre">{text.split("T")[0]}</p>
      ),
    },
    {
      title: "PLAN",
      dataIndex: "planName",
      render: (text: TPlanName) => <p>{getPlanLabel(text)}</p>,
      align: "center",
    },
    {
      title: "AMOUNT",
      dataIndex: "planPrice",
      render: (text: string) => <p>$ {text}</p>,
      align: "center",
    },
    {
      title: "DISCOUNT",
      dataIndex: "discount",
      render: (text: string) => <p>{text ? `$ ${text}` : "N/A"}</p>,
      align: "center",
    },
    {
      title: "Action",
      render: (_text, data: InvoiceData) => (
        <Button
          onClick={() => handleDownloadPDF(data)}
          shape="circle"
          type="text"
          loading={downloadingId === data._id}
          disabled={downloadingId !== null}
          title="Download Invoice PDF"
        >
          <HiArrowDownTray size={19} />
        </Button>
      ),
      align: "center",
    },
  ];

  return (
    <div className="">
      <p className="font-medium mb-3">Latest Invoices</p>
      <LoaderWraperComp
        isError={isError}
        isLoading={false}
        error={error as TResError}
      >
        <div className="max-w-full overflow-x-auto">
          <Table<InvoiceData>
            loading={isLoading}
            columns={columns}
            dataSource={data?.data?.latest_invoice}
            rowKey="_id"
            pagination={{
              position: ["bottomCenter"],
              showQuickJumper: true,
              showSizeChanger: false,
              total: data?.data?.pagination?.totalData || 1,
              defaultCurrent: 1,
              current: query.page,
              onChange: (page) => setQuery((c) => ({ ...c, page })),
              pageSize: query.limit,
            }}
          />
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default LatestInvoices;
