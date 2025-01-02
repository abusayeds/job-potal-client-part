"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import ToggleOption from "@/components/profile/ToggleOption";
import { ProfileInfoForm } from "@/components/profile/ProfileInfoForm";
import { AccountCredential } from "@/components/profile/AccountCredential";
import MyRatings from "@/components/profile/MyRatings";
import SavedTrainers from "@/components/profile/SavedTrainers";
import {  useSearchParams } from "next/navigation";



const Page = () => {
  const [toggleData, setToggleData] = useState("Profile");
  const searchParams = useSearchParams();
  const Profile = searchParams.get('Profile'); 

  useEffect(() => {
    if (Profile && typeof Profile === 'string') {
      setToggleData(Profile);
    }
  }, [Profile]);
  return (
    <Container className="flex flex-col justify-center items-center space-y-5">
      <ToggleOption toggleData={toggleData} setToggleData={setToggleData} />
      <div className="w-full">
        {toggleData === "Profile" && <ProfileInfoForm />}
        {toggleData === "Account" && <AccountCredential />}
        {toggleData === "Ratins" && <MyRatings />}
        {toggleData === "Trainers" && <SavedTrainers />}
      </div>
    </Container>
  );
};

export default Page;
