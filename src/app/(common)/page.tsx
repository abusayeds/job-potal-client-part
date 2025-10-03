import BecomeUser from "@/components/Home/BecomeUser";
import HeroSection from "@/components/Home/HeroSection";
import PopularCategory from "@/components/Home/PopularCategory";
import SearchJob from "@/components/Home/SearchJob";
import TopCompanies from "@/components/Home/TopCompanies";
import WorkProcess from "@/components/Home/WorkProcess";
import { appStatus, popularCategory, popularCompanies } from "@/services";

export default async function page() {
  const categoryData = await popularCategory();
  const companiesData = await popularCompanies();
  const appStatusData = await appStatus();
  return (
    <div className="">
      <HeroSection data={appStatusData}/>
      <WorkProcess />
      <PopularCategory data={categoryData} />
      <SearchJob />
      <TopCompanies data={companiesData} />
      <BecomeUser />
    </div>
  );
}
