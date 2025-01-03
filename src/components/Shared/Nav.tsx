"use client";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { AuthModal } from "../AuthModal";
import { authPayloads } from "@/constants/others.constants";
import Link from "next/link";
import AccountNavPop from "./AccountNavPop";
import { useMyContext } from "../MyContext";
import { usePathname } from "next/navigation";
import { getDecodedToken } from "@/utils/decodeToken";
import NavBerInput from "./NavberInput";


const Nav = () => {

  const { isAuthOpen,
    setIsAuthOpen,
    authTitleData,
    setAuthTitleData,
  } = useMyContext()
  const pathName = usePathname()
  const user = getDecodedToken()
  const [isOpen, setIsOpen] = useState(false);
  const toggleSheet = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    setIsAuthOpen(false);
    setAuthTitleData(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);


  return (
    <>
      <div className="border-b border-t border-primary py-4 sticky top-0 z-40 w-full shadow bg-white">
        <Container className="flex justify-between items-center gap-2  py-0 lg:py-0">

          <div className=" flex gap-16  ">
            <Link href={"/"} className="flex justify-start items-center   gap-3 ">
              <div className="h-10 lg:h-12 w-12 lg:w-14">
                <Image
                  src={logo}
                  alt="logo"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-primary font-syne lg:font-semibold text-xl lg:text-2xl relative whitespace-pre ">
                R8 My Trainers
                <p className="font-normal text-[7px] md:text-[8px] border border-[#052255] rounded-full absolute top-0.5 -right-6 leading-3 p-[1.5px] h-fit">
                  TM
                </p>
              </div>
            </Link>

            <div className=" lg:block  hidden">
              <NavBerInput></NavBerInput>
            </div>


          </div>
          <button
            onClick={toggleSheet}
            className="lg:hidden sm:p-1 rounded active:bg-gray-100 "
          >
            <Menu size={22} />
          </button>
          <div className="hidden lg:flex justify-end items-center gap-3">
            {user ? (
              <AccountNavPop />
            ) : (
              <>
                <Button
                  onClick={() => {
                    setAuthTitleData(authPayloads["Log In"]);
                    setIsAuthOpen(true);
                  }}
                  className="rounded-full"
                  variant={"outline"}
                  size={"lg"}
                >
                  Log In
                </Button>
                <Button
                  onClick={() => {
                    setAuthTitleData(authPayloads["Sign Up"]);
                    setIsAuthOpen(true);
                  }}
                  className="rounded-full"
                  variant={"default"}
                  size={"lg"}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Container>
        <AuthModal
          isOpen={isAuthOpen}
          setIsOpen={setIsAuthOpen}
          modalTitleData={authTitleData}
          setModalTitleData={setAuthTitleData}
        />
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle className="flex justify-between items-center border-b pb-4 px-0 pl-2">
              <div className="h-10 lg:h-12 w-12 lg:w-14">
                <Image
                  src={logo}
                  alt="logo"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </div>
              <button
                onClick={toggleSheet}
                className="text-red-400 outline-none"
              >
                <X size={24} />
              </button>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-start space-y-3 py-4 px-2 w-full">
            <NavBerInput></NavBerInput>
            <Link onClick={() => setIsOpen(false)} href={'profile-information?Profile=Profile'}> Profile</Link>
            <>
              <button
                onClick={() => {
                  setAuthTitleData(authPayloads["Log In"]);
                  setIsAuthOpen(true);
                  setIsOpen(false)
                }}
                className="py-1.5 outline-none "
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setAuthTitleData(authPayloads["Sign Up"]);
                  setIsAuthOpen(true);
                  setIsOpen(false)
                }}
                className="py-1.5 outline-none "
              >
                Sign Up
              </button>
            </>
            {/* alert --- impfortant for mobile device */}
            {/* <>
              <button className="py-1.5 outline-none">Profile</button>
              <button className="py-1.5 outline-none">Account Settings</button>
              <button className="py-1.5 outline-none">Rating</button>
              <button className="py-1.5 outline-none">Saved Trainer</button>
              <SheetFooter className="border-b pb-2 w-full">
                <Button
                  className="bg-foreground"
                  onClick={() => redirect("/d")}
                  variant={"ghost"}
                >
                  Log Out
                </Button>
              </SheetFooter>
            </> */}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Nav;
