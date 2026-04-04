"use client";
import { handleDownload } from "@/utils/fileDownloadFromUrl";
import { Button } from "antd";
import React from "react";
import { BsDownload } from "react-icons/bs";

const CvDownloadBtn = ({ path }: { path: string }) => {
  return (
    <Button onClick={() => handleDownload(path)} type="text" size="large">
      <BsDownload size={22} />
    </Button>
  );
};

export default CvDownloadBtn;
