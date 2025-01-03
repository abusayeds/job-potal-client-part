

"use client";

import React, { createElement, useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { BicepsFlexed, Dumbbell } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

interface SearchType {
  btn: string;
  placeholder: string;
  placeholderTrainer?: string;
  icon: React.ElementType;
  value: boolean;
}

const NavBerInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [studioValue, setStudioValue] = useState("");
  const [trainerValue, setTrainerValue] = useState("");
  const [isTrainer, setIsTrainer] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (pathname === "/") {
    return null;
  }
  const handleEnterKeyStudio = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performStudioSearch();
    }
  };
  const handleEnterKeyTrainer = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performTrainerSearch();
    }
  };
  const performStudioSearch = () => {
    const trimmedStudio = studioValue.trim();

    if (trimmedStudio !== "") {
      router.push(`/studios?search=${encodeURIComponent(trimmedStudio)}`);
    }
  };
  const performTrainerSearch = () => {
    const trimmedTrainer = trainerValue.trim();
    if (trimmedTrainer !== "") {
      router.push(
        `/trainers?search=${encodeURIComponent(trimmedTrainer)}`
      );
    }
  };
  const searchTypes: Record<"trainer" | "studio", SearchType> = {
    trainer: {
      btn: "At Trainer",
      placeholder: "Your Studio",
      placeholderTrainer: "Your Trainer",
      icon: Dumbbell,
      value: true,
    },
    studio: {
      btn: "At Studio",
      placeholder: "Your Studio",
      icon: BicepsFlexed,
      value: false,
    },
  };
  const currentType = isTrainer ? "trainer" : "studio";
  const alternativeType = isTrainer ? "studio" : "trainer";

  return (
    <div className="  mx-auto lg:flex  items-center justify-center gap-5  w-full relative">
      <div className=" flex  lg:items-center lg:justify-center ">
        <div className="relative  " ref={dropdownRef}>
          <Button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            variant={"outline"}
            size={"lg"}
            className="text-sm md:text-base bg-none  normal-case font-questrial font-medium tracking-wide outline-none flex items-center"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            {searchTypes[currentType].btn}
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border  rounded-md shadow-lg z-10 transition ease-out duration-100 transform opacity-100 scale-100">
              <button
                onClick={() => {
                  setIsTrainer(searchTypes[alternativeType].value);
                  setIsDropdownOpen(false);
                  setStudioValue("");
                  setTrainerValue("");
                }}
                className="w-full text-left px-4 py-2 text-sm  "
              >
                {searchTypes[alternativeType].btn}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex flex-col md:flex-row w-full gap-4 mt-4 lg:mt-0">
        {isTrainer && (
          <div className=" relative">
            <Input
              onKeyDown={handleEnterKeyTrainer}
              onChange={(e) => {
                setTrainerValue(e.target.value);
              }}
              value={trainerValue}
              className={`rounded-full w-[300px] h-10 pr-6 pl-11 md:text-base border  border-primary  text-black`}
              placeholder={searchTypes[currentType].placeholderTrainer}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center text-gray-800/90 pointer-events-none">
              {createElement(BicepsFlexed, {
                size: "20",
              })}
            </div>
          </div>
        )}
        <div className="flex  mb-2 md:mb-0 md:mr-2 relative">
          <Input
            onKeyDown={handleEnterKeyStudio}
            onChange={(e) => {
              setStudioValue(e.target.value);
            }}
            value={studioValue}
            className={`rounded-full w-[300px] h-10 pr-6 pl-11 md:text-base border   border-red-500  border-primary text-black`}
            placeholder={searchTypes[currentType].placeholder}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center text-gray-800/90 pointer-events-none">
            {createElement(searchTypes[currentType].icon, {
              size: "20",
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NavBerInput;



