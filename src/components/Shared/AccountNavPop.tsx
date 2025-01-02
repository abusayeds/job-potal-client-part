"use client";
import React from "react";
import Swal from "sweetalert2";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Cookies from 'js-cookie';
import Link from "next/link";
import { useMyContext } from "../MyContext";
import { useRouter } from "next/navigation";
import { getDecodedToken } from "@/utils/decodeToken";

const AccountNavPop = () => {
  const { getUser ,  } = useMyContext()
  const  user = getDecodedToken()
  const router = useRouter()
  const handleLogout = () => {
    Swal.fire({
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "     Logout    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        Cookies.remove('authToken', { path: '/' });
      }
      getUser()
      router.push('/')
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <h1 className="text-xl select-none cursor-pointer">
          HEY, {user?.fristName} {user?.lastName}
        </h1>
      </PopoverTrigger>
      <PopoverContent className="w-64 mt-6">
        <div className="flex flex-col space-y-2">
          <Link href={`/profile-information?Profile=${encodeURIComponent('Profile')}`} passHref><button className="py-1.5 outline-none w-full text-start">Profile</button></Link>
          <Link href={`/profile-information?Profile=${encodeURIComponent('Account')}`} passHref><button className="py-1.5 outline-none w-full text-start">Account Settings</button></Link>
          <Link href={`/profile-information?Profile=${encodeURIComponent('Ratins')}`} passHref><button className="py-1.5 outline-none w-full text-start">Rating</button></Link>
          <Link href={`/profile-information?Profile=${encodeURIComponent('Trainers')}`} passHref><button className="py-1.5 outline-none w-full text-start">Saved Trainer</button></Link>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-5 bg-gray-100 hover:bg-gray-200 text-red-500 transition-all group rounded outline-none cursor-pointer"
          >
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccountNavPop;
