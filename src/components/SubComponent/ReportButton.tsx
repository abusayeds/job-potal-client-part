"use client";

import { Flag } from "lucide-react";
import React, { useState } from "react";
import { ReportModal } from "../ReportModal";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { getDecodedToken } from "@/utils/decodeToken";
import { useMyContext } from "../MyContext";
import { authPayloads } from "@/constants/others.constants";
import { fetchPostApi } from "@/lib/fetchApi";
import Swal from "sweetalert2";

const ReportButton = ({ id }: { id: string }) => {

  const { setReportModelIsOpen, setIsAuthOpen, setAuthTitleData } = useMyContext();
  const user = getDecodedToken();
  const [reportText, setReportText] = useState("");
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportText(e.target.value);
  };
  const handleSubmit = async () => {



    const response = await fetchPostApi(`report/create-report/${id}`, {
      write: reportText,
    });
    if (response?.success === true) {
      await Swal.fire({
        icon: "success",
        title: "Report Submitted",
        text: "Your report has been successfully submitted. Thank you!",
        confirmButtonText: "OK",
      });
      setReportModelIsOpen(false);
      setReportText("");
     
    } else {
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          response?.message ||
          "There was an issue submitting your report. Please try again later.",
        confirmButtonText: "OK",
      });
      Swal.close();
    }


  };


  return (
    <>
      <button
        onClick={() => {
          if (user?.role === "user") {
            setReportModelIsOpen(true);
          } else {
            setAuthTitleData({ ...authPayloads["Log In"], redirect: `flagopen` });
            setIsAuthOpen(true);
          }
        }}
        className="outline-none text-black hover:text-red-500"
      >
        <Flag size={23} />
      </button>
      <ReportModal>
        <div className="py-2 space-x-3">
          <Textarea
            rows={6}
            placeholder="Type here......"
            value={reportText}
            onChange={handleTextareaChange}
          />
          <div className="flex justify-center gap-4 pt-8">
            <Button
              onClick={() => setReportModelIsOpen(false)}
              className="rounded-full uppercase tracking-wider"
              variant={"outline"}
              size={"lg"}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="rounded-full uppercase tracking-wider"
              variant={"destructive"}
              size={"lg"}
            >
              Submit
            </Button>
          </div>
        </div>
      </ReportModal>
    </>
  );
};

export default ReportButton;
