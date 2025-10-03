"use client";

import { errorAlert, TResError } from "@/lib/alerts";
import { useFavoriteActionMutation } from "@/redux/features/users/users.api";
import { useAppSelector } from "@/redux/hook";
import { cn } from "@/utils/cn";
import { Button, message } from "antd";
import React, { createElement } from "react";
import { PiBookmarkSimple, PiBookmarkSimpleFill } from "react-icons/pi";

const BookmarkButton = ({
  dataId,
  size= "middle",
  type = "text",
  shape = "default",
  className,
}: {
  dataId: string;
  size?: "large" | "middle" | "small";
  shape?: "round" | "circle" | "default";
  type?: "default" | "link" | "text" | "primary";
  className?: string;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const [mutation, { isLoading }] = useFavoriteActionMutation();
  const handleBookmark = async () => {
    messageApi.open({
      key: "bookmark",
      type: "loading",
      content: "Loading...",
    });
    try {
      const res = await mutation(dataId).unwrap();
      messageApi.open({
        key: "bookmark",
        type: "success",
        content: res?.message || "Bookmark updated successfully!",
        duration: 3,
      });
    } catch (error) {
      errorAlert({ error: error as TResError });
      messageApi.destroy("bookmark");
    }
  };
  const isBookmarked = user?.favorites?.includes(dataId); // This should be replaced with actual state management logic
  return (
    <div>
      {contextHolder}
      <Button
        onClick={handleBookmark}
        type={type}
        size={size}
        disabled={isLoading}
        style={{ background: "#E7F0FA" }}
        shape={shape}
        className="w-fit"
      >
        {createElement(isBookmarked ? PiBookmarkSimpleFill : PiBookmarkSimple, {
          className: cn(`w-4 h-4 ${className}`),
        })}
      </Button>
    </div>
  );
};

export default BookmarkButton;
