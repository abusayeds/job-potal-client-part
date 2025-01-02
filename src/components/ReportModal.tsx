import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMyContext } from "./MyContext";
// import { fetchGetApi } from "@/lib/fetchApi";
type TReportModalProps = {
  children: React.ReactNode;

};
// async function getSinglestudio(id: string,) {
//   return fetchGetApi(`report/create-report/${id}`);
// }
export function ReportModal({
  children, 
} : TReportModalProps) {
  const { reportModelIsOpen, setReportModelIsOpen } = useMyContext()

  const closeModal = () => setReportModelIsOpen(false);
  return (
    <Dialog open={reportModelIsOpen} onOpenChange={setReportModelIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-between items-center">
              <h1 className="font-medium">Write Report Here</h1>
              <button
                onClick={closeModal}
                className={cn("outline-none mt-2.5 text-red-500")}
              >
                <X size={20} />
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full mx-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
