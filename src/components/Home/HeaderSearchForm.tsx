"use client";

import React, { createElement, useState } from "react";
import { Input } from "../ui/input";
import { BicepsFlexed, Dumbbell } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HeaderSearchForm = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [toggleTrainer, setToggleTrainer] = useState(false);
  const [error, setError] = useState(""); // State for error message

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmedValue = inputValue.trim();
      if (trimmedValue !== "") {
        setError("");
        router.push(
          `${!toggleTrainer ? "/trainers" : "/studios"}?search=${trimmedValue}`
        );
      } else {
        setError("Please enter a search term.");
      }
    }
  };

  const searchTypes = [
    {
      btn: "I’d like to look up a Trainer by name",
      placeholder: "Your Trainer",
      icon: Dumbbell,
    },
    {
      btn: "I want to find a studio at a trainer",
      placeholder: "Your Studio",
      icon: BicepsFlexed,
    },
  ];

 

  return (
    <div className="max-w-[90%] md:max-w-lg mx-auto">
      <div className="relative">
        <Input
          onKeyDown={handleEnterKey}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError(""); 
          }}
          value={inputValue}
          className={`rounded-full w-full h-10 md:h-12 pr-6 pl-11 md:text-base border ${
            error ? "border-red-500" : "border-primary"
          } text-black`}
          placeholder={searchTypes[toggleTrainer ? 1 : 0].placeholder}
        />
        <div className="absolute inset-y-0 left-4 flex items-center text-gray-800/90">
          {createElement(searchTypes[toggleTrainer ? 1 : 0].icon, {
            size: "20",
          })}
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
      )}
      <div className="flex justify-center items-center mt-2 md:mt-4">
        <Button
          onClick={() => setToggleTrainer(!toggleTrainer)}
          variant={"link"}
          size={"lg"}
          className="text-sm md:text-base normal-case font-questrial active:scale-100 font-medium tracking-wider outline-none"
        >
          {searchTypes[toggleTrainer ? 0 : 1].btn}
        </Button>
      </div>
    </div>
  );
};

export default HeaderSearchForm;
