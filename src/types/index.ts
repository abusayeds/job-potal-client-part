import { HTMLAttributes, ReactNode } from "react";

export const ROLE = {
  ADMIN: "admin",
  CANDIDATE: "candidate",
  EMPLOYER: "employer",
  EMPLOYEE: "employe",
} as const;

export type TLayoutProps = {
  children: ReactNode;
};
export type TContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  mClassName?: string;
};

export type TComponentProps = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
};

export type TArgs = { name: string; value: string }[] | undefined;

export type TRole = (typeof ROLE)[keyof typeof ROLE];

export type TUniObject<T = object> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
} & T;

// page props type
export type Params = Promise<{ slug: string }>;
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type TPageProps = {
  params: Params;
  searchParams: SearchParams;
};

// query type
export type TQuery<T = object> = {
  page: number;
  search?: string;
  limit: number;
} & T;
export type TSetQuery<T = object> = React.Dispatch<
  React.SetStateAction<TQuery<T>>
>;

export type TDetails = {
  _id: string;
  about: string;
  address: string;
  banner: string;
  companyName: string;
  companyVision: string;
  companyWebsite: string;
  contactEmail: string;
  email: string;
  facebook: string;
  linkedin: string;
  foundIn: string;
  fullName: string;
  industry: string;
  isActive: boolean;
  isApprove: boolean;
  isCompleted: boolean;
  isDeleted: boolean;
  logo: string;
  organizationType: string;
  phone: string;
  purchasePlan: string;
  role: string;
  step: number;
  teamSize: number;
  totalJobs: string;
  benefits: string[];
};

export type TJobDatas = Array<{
  _id: string;
  fullName: string;
  email: string;
  logo: string;
  role: string;
  address: string;
  isApprove: boolean;
}>;

export type TPagination = {
  totalPage: number;
  currentPage: number;
  prevPage: number;
  nextPage: number;
  totalData: number;
};
