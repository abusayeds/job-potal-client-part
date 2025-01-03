import ProfileInfo from "@/components/SubComponent/ProfileInfo";
import { Suspense } from "react";

const Page = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileInfo></ProfileInfo>
    </Suspense>
  );
};

export default Page;
