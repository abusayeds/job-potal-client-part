import { errorAlert, TResError } from "@/lib/alerts";
import { sweetAlertConfirmation } from "@/lib/alerts/sweetAlertConfirmation";
import { useUploadCvMutation } from "@/redux/features/auth/authApi";
import { TCv } from "@/redux/features/auth/authSlice";
import { message, Popover } from "antd";
import React from "react";
import { BsFileEarmarkCheck, BsThreeDots } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";

const FileCart = ({ data }: { data: TCv }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useUploadCvMutation();
  const handleDelete = async (id: string) => {
     messageApi.open({
        key: "cv",
        type: "loading",
        content: "Removing...",
        duration: 3,
      });
    try {
      await mutation({
        data: {},
        id: id,
      }).unwrap();
      messageApi.open({
        key: "cv",
        type: "success",
        content: "Successfully Removed!",
        duration: 3,
      });
    } catch (error) {
      messageApi.destroy("cv");
      errorAlert({ error: error as TResError });
    }
  };
  return (
    <div className="flex justify-between items-center gap-2.5 w-full bg-lightgray/50 p-4">
      {contextHolder}
      <div className="flex gap-3 items-center">
        <div className="">
          <BsFileEarmarkCheck className="text-primary/70" size={34} />
        </div>
        <div className="text-sm space-y-1">
          <p className="font-medium">{data.name}</p>
          <span>
            Uploaded on:{" "}
            {new Date(data.createdAt).toLocaleString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      </div>
      <Popover
        content={
          <div className="flex flex-col text-start">
            <button
              // type="text"
              disabled={isLoading}
              onClick={() =>
                sweetAlertConfirmation({
                  func: () => handleDelete(data._id),
                  object: "remove Cv/Resume",
                })
              }
              className="text-start bg-gray-50 hover:bg-gray-100 py-1 px-2 w-24 cursor-pointer flex items-center gap-2 rounded-xs"
            >
              <IoTrashOutline size={14} /> Delete
            </button>
          </div>
        }
        // title="Title"
        trigger="click"
        placement="bottomRight"
        //   onOpenChange={setOpenPopover}
        //   open={openPopover}
      >
        <button className="active:bg-slate-200 p-1.5 rounded-lg">
          <BsThreeDots size={18} />
        </button>
      </Popover>
    </div>
  );
};

export default FileCart;
