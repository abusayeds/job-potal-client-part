"use client";

import React, { createElement, useEffect, useState } from "react";
import { Popover, Progress, Tabs } from "antd";
import type { TabsProps } from "antd";
import ProfileInfoForm from "./ProfileInfoForm";
import CompanyInfoForm from "./CompanyInfoForm";
import FoundingInfoForm from "./FoundingInfoForm";
import PersonalInfoForm from "./PersonalInfoForm";
import SocialLinkInfoForm from "./SocialLinkInfoForm";
import AccountInfoForm from "./AccountInfoForm";
import useGetHash from "@/lib/hooks/getHash";
import Employees from "./Employees";
import { MdOutlineClose } from "react-icons/md";
import { LuCheck } from "react-icons/lu";
import { useAppSelector } from "@/redux/hook";
import { TRole } from "@/types";
import { successAlert } from "@/lib/alerts";
import Employment from "./Employment";

const SettingNav = () => {
  const hash = useGetHash();
  const { user } = useAppSelector((state) => state.auth);
  const [active, setActive] = useState<string>();

  const onChange = (key: string) => {
    setActive(key);
    window.location.hash = key;
  };
  // console.log(user?.role);
  const items: TabsProps["items"] = [
    {
      key: "basic-info",
      label: user?.role === "candidate" ? "Personal Info" : "Company Info",
      role: ["employer", "employee", "candidate"],
      children:
        user?.role === "candidate" ? <PersonalInfoForm /> : <CompanyInfoForm />,
    },
    {
      key: "founding",
      label: "Founding Info",
      role: ["employer", "employee"],
      children: <FoundingInfoForm />,
    },
    // {
    //   key: "p-info",
    //   label: "Personal",
    //   role: ["candidate"],
    //   children: <PersonalInfoForm />,
    // },
    {
      key: "profile",
      label: "Profile",
      role: ["candidate"],
      children: <ProfileInfoForm />,
    },
    {
      key: "social",
      label: "Social Links",
      role: ["candidate", "employer", "employee"],
      children: (
        <SocialLinkInfoForm
        // onChange={onChange}
        />
      ),
    },
    {
      key: "account",
      label: "Account",
      role: ["candidate", "employer", "employe"],
      children: <AccountInfoForm />,
    },
    {
      key: "employment",
      label: "Employment",
      role: ["candidate"],
      children: <Employment />,
    },
    ...(user?.purchasePlan?.multi_user_access
      ? [
          {
            key: "employee",
            label: "Employee",
            role: ["employer"],
            children: <Employees />,
          },
        ]
      : []),
  ].filter((item) => item.role.includes(user?.role as TRole));
  useEffect(() => {
    if (!user?.isCompleted && user?.role === "employer" && user?.step < 4) {
      switch (user?.step) {
        case 1:
          onChange("founding");
          successAlert({
            message:
              "Please complete the founding information for admin verification.",
            confirmButton: true,
            title: false,
          });
          break;
        case 2:
          onChange("social");
          successAlert({
            message:
              "Please provide your company's social media links for admin verification.",
            confirmButton: true,
            title: false,
          });
          break;
        case 3:
          onChange("account");
          successAlert({
            message:
              "Please complete your account information to continue the verification process.",
            confirmButton: true,
            title: false,
          });
          break;
        default:
          onChange("basic-info");
          successAlert({
            message:
              "Please fill in the basic company information to begin admin verification.",
            confirmButton: true,
            title: false,
          });
          break;
      }
    } else if (
      !user?.isCompleted &&
      user?.role === "candidate" &&
      user?.step < 4
    ) {
      switch (user?.step) {
        case 1:
          onChange("profile");
          successAlert({
            message:
              "Please provide your profile information to complete your profile.",
            confirmButton: true,
            title: false,
          });
          break;
        case 2:
          onChange("social");
          successAlert({
            message:
              "Please provide your social media links to complete your profile.",
            confirmButton: true,
            title: false,
          });
          break;
        case 3:
          onChange("account");
          successAlert({
            message:
              "Please provide your account information to complete your profile.",
            confirmButton: true,
            title: false,
          });
          break;
        default:
          onChange("basic-info");
          successAlert({
            message:
              "Please provide your personal details to complete your profile.",
            confirmButton: true,
            title: false,
          });
          break;
      }
    }
  }, [active, user]);
  return (
    <div className="">
      {user?.role !== "employe" && (
        <Popover
          // `Progress in providing Inforamtion`
          placement="right"
          title={null}
          content={
            <div>
              {items.map(
                (item, index) =>
                  !(
                    item.label === "Employee" || item.label === "Employment"
                  ) && (
                    <p
                      key={index}
                      className="flex gap-1.5 items-center justify-between text-xs font-medium"
                    >
                      <span>{item.label}</span>
                      {createElement(
                        index < (user?.step ?? 0) ? LuCheck : MdOutlineClose,
                        {
                          className: `h-3 w-3 ${
                            index < (user?.step ?? 0)
                              ? "text-green-400"
                              : "text-red-500"
                          }`,
                        }
                      )}
                    </p>
                  )
              )}
            </div>
          }
        >
          <Progress
            type="dashboard"
            steps={user?.role === "employer" ? 4 : 4}
            percent={(user?.step ?? 0) * 25}
            trailColor="rgba(0, 0, 0, 0.06)"
            strokeWidth={20}
            size={"small"}
          />
        </Popover>
      )}
      <Tabs
        defaultActiveKey={items[0]?.key}
        activeKey={active || hash?.slice(1)}
        items={items}
        onChange={onChange}
        size="small"
        style={{ fontFamily: "roman" }}
      />
    </div>
  );
};

export default SettingNav;
