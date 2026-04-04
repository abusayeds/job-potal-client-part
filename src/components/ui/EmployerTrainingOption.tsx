"use client";
import React from "react";
import { sweetAlertConfirmation } from "@/lib/alerts/sweetAlertConfirmation";
import { useRouter } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { message } from "antd";
import { errorAlert, TResError } from "@/lib/alerts";
import { TTraining } from "@/types/training.type";
import { useDeleteTrainingMutation } from "@/redux/features/training/training.api";

const EmployerTrainingOption = ({ training }: { training: TTraining }) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation] = useDeleteTrainingMutation();
  const handleDelete = async (id: string) => {
    messageApi.open({
      key: "job",
      type: "loading",
      content: "Deleting...",
      duration: 3,
    });
    try {
      await mutation(id).unwrap();
      messageApi.open({
        key: "job",
        type: "success",
        content: "Successfully deleted!",
        duration: 3,
      });
    } catch (error) {
      messageApi.destroy("job");
      errorAlert({ error: error as TResError });
    }
  };
  return (
    <>
      {contextHolder}
      <div className="flex flex-col text-start space-y-1">
        <button
          onClick={() => router.push(`/training/${training._id}`)}
          className="text-start bg-gray-50 hover:bg-gray-100 py-0.5 px-2 cursor-pointer flex items-center gap-2 rounded-xs"
        >
          <TbListDetails className="shrink-0" size={14} /> Training Details
        </button>
        {/* <button
          onClick={() => router.push(`/personal-jobs/edit?slug=${training._id}`)}
          className="text-start bg-gray-50 hover:bg-gray-100 py-0.5 px-2 w-32 cursor-pointer flex items-center gap-2 rounded-xs"
        >
          <CiEdit size={14} /> Job Edit
        </button> */}
        <button
          onClick={() =>
            sweetAlertConfirmation({
              func: () => handleDelete(training._id),
              object: "delete this training",
              okay: "Delete",
            })
          }
          className="text-start bg-gray-50 hover:bg-gray-100 py-0.5 px-2 cursor-pointer flex items-center gap-2 rounded-xs"
        >
          <IoTrashOutline size={14} /> Delete
        </button>
      </div>
    </>
  );
};

export default EmployerTrainingOption;
