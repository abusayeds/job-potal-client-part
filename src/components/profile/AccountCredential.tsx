/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { AuthModal } from "../AuthModal";
import { authPayloads } from "@/constants/others.constants";
import { fetchGetApi } from "@/lib/fetchApi";
export type TAuthTitleData = {
  title: string;
  forword: string;
  redirect?: string;
  des: string;
  back?: boolean;
};

export function AccountCredential() {
  const [userInfo, setUser] = useState<any>()
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTitleData, setAuthTitleData] = useState<TAuthTitleData | null>(null);
  const fetchUser = async () => {
    const users = await fetchGetApi(`user/my-profile`);
    return users;
  }
  const getUserData = async () => {
    const data = await fetchUser();
    setUser(data?.data);

  };
  useEffect(() => {
    getUserData()
  }, [])
  return (
    <>
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="py-8 flex justify-end">
          <Button
            onClick={() => {
              setAuthTitleData(authPayloads["Change Password"]);
              setIsAuthOpen(true);
            }}
            size={"lg"}
            className={cn("min-w-40 w-fit rounded-full py-6 uppercase")}
            variant={"default"}
          >
            Change Password
          </Button>
        </div>
        <div className="space-y-5 w-full max-w-lg mx-auto bg-[#F7F7F7] p-4 md:p-8 border-4 border-[#AFACFB] rounded-xl">
          <div className="space-y-2">
            <p className="text-sm text-black">Email</p>
            <Input
              value={userInfo?.email}
              readOnly
              className="h-12 rounded-xl bg-white"
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-black">Password</p>
            <Input
              readOnly
              value="******"
              type="password"
              className="h-12 rounded-xl bg-white"
              placeholder="********"
            />
          </div>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthOpen}
        setIsOpen={setIsAuthOpen}
        modalTitleData={authTitleData}
        setModalTitleData={setAuthTitleData}
      />
    </>
  );
}
