import React from "react";
import SettingNav from "@/components/Settings/SettingNav";

const page = async () => {

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-medium">Settings</h1>
        {/* <Button
          href={role === "candidate" ? "/applied-jobs" : "/our-jobs"}
          type="text"
        >
          <span className="text-sm sm:text-base">View all</span>
          <HiOutlineArrowRight size={18} />
        </Button> */}
      </div>
      <SettingNav />
    </div>
  );
};

export default page;
