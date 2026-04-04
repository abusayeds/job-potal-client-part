"use client";

import CategoryModal from "@/components/Admin/Category/CategoryModal";
import { imageUrl } from "@/config";
import { errorAlert, TResError } from "@/lib/alerts";
import { sweetAlertConfirmation } from "@/lib/alerts/sweetAlertConfirmation";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "@/redux/features/category/category.api";
import { TUniObject } from "@/types";
import { Button, Image, message, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";

const Page = () => {
  // const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const showModal = (data: TUniObject) => {
    setModalData(data);
    setIsOpenModal(true);
  };

  // console.log(modalData);

  const { data, isLoading } = useGetAllCategoryQuery([]);
  const jobCategories = data?.data || [];

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    // console.log("deleet===========>", id);
    try {
      const response = await deleteCategory(id).unwrap();
      messageApi.open({
        key: "category",
        type: "success",
        content:
          response?.data?.message ||
          response?.message ||
          "Category Deleted static successfully!",
        duration: 3,
      });
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };

  const columns: TableColumnsType = [
    {
      title: "#S.ID",
      dataIndex: "_id",
      render: (text) => <p>{text.slice(0, 7) + "..."}</p>,
    },
    {
      title: "",
      dataIndex: "logo",
      render: (text) => (
        <Image width={50} src={imageUrl + text} alt="category_image" />
      ),
      align: "end",
    },
    {
      title: "Category Name",
      dataIndex: "catagoryType",
      render: (text: string) => <p className="whitespace-pre">{text}</p>,
    },
    {
      title: "Action",
      render: (data) => (
        <div className="w-full flex justify-center gap-2">
          <button
            onClick={() => showModal({ type: "edit", editedCategory: data })}
            className="text-start bg-gray-50 hover:bg-gray-100 py-0.5 px-2 cursor-pointer flex items-center gap-2 rounded-sm"
          >
            <CiEdit size={14} /> Edit
          </button>
          <button
            onClick={() =>
              sweetAlertConfirmation({
                func: () => handleDelete(data._id),
                title: "Delete Category",
                object: "delete this category",
                okay: "Delete",
              })
            }
            className="text-start bg-gray-50 hover:bg-gray-100 py-0.5 px-2 cursor-pointer flex items-center gap-2 rounded-sm"
          >
            <IoTrashOutline size={14} /> Delete
          </button>
        </div>
      ),
      align: "center",
    },
  ];
  return (
    <div className="space-y-5">
      {contextHolder}
      <div className="flex justify-end pb-2 lg:pb-0">
        <Button
          onClick={() => showModal({ type: "add new" })}
          type="primary"
          size="large"
          className=""
        >
          + Add Category
        </Button>
      </div>
      <div className="max-w-full overflow-x-auto border border-gray-200 p-1 pb-0 rounded-xl">
        <h4 className="text-xl xl:text-2xl font-medium text-white bg-secondery px-6 py-3 rounded-t-lg">
          Category List
        </h4>
        <Table
          loading={isLoading}
          // scroll={{y: 100,}}
          // rowSelection={ { type: "checkbox", ...rowSelection }}
          columns={columns}
          dataSource={jobCategories}
          pagination={false}
          rowKey="_id"
        />
      </div>
      <CategoryModal
        isModalOpen={isOpenModal}
        setIsModalOpen={setIsOpenModal}
        modalData={modalData}
      />
    </div>
  );
};

export default Page;
