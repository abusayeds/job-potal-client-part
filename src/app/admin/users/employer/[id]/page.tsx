"use client";

import AdminEmployerDetails from "@/components/Admin/Users/AdminEmployerDetails";
import { useAdminSingleUserDetailsQuery } from "@/redux/features/users/users.api";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  console.log(id);

  const { data } = useAdminSingleUserDetailsQuery(id);

  const employerDetails = data?.data || {};

  // console.log("employer details================>", data);

  return (
    <AdminEmployerDetails
      viewType="verified"
      employerDetails={employerDetails}
    />
  );
};

export default Page;
