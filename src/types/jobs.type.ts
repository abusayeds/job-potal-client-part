import { TUser } from "@/redux/features/auth/authSlice";

export enum TCurrency {
    USD = "USD",
    EURO = "EURO",
    GBP = "GBP",
    NAIRA = "NAIRA",
    RAND = "RAND",
    CEDI = "CEDI"
}

export type TJobDetails = {
    _id: string;
    userId: TUser;
    companyId: TUser;
    logo: string;
    banner: string;
    jobTitle: string;
    tags: string[];
    minSalary: number;
    maxSalary: number;
    currency: TCurrency;
    salaryType: string;
    experience: string;
    jobType: string;
    location: string;
    educations: string[];
    expirationDate: string;
    jobLavel: string;
    jobBenefits: string[];
    description: string;
    responsibilities: string;
    scheduleDate: string;
    createdAt: string;
    updatedAt: string;
    allApplication: string;
    organizationType: string;
};

export type TJobApplication = {
    _id: string;
    jobId: TJobDetails;
    userId: {
        _id: string;
        fullName: string;
        userName: string;
        email: string;
        role: "candidate";
        benefits: string[];
        isCompleted: boolean;
        isActive: boolean;
        isApprove: boolean;
        isDeleted: boolean;
        isVerify: boolean;
        step: number;
        createdAt: string; // ISO date string
        updatedAt: string;
        __v: number;
        candidateInfo: {
            _id: string;
            email: string;
            educations: string[];
            jobType: string[];
            jobLevel: string[];
            cv: string[]; // array of file paths or filenames
            __v: number;
            experience: string; // e.g. "2-4"
            logo: string;
            parsonalWebsite: string;
            title: string;
            biography: string;
            dateOfBrith: string; // YYYY-MM-DD
            gender: string;
            maritalStatus: string;
            nationality: string;
            facebook: string;
            address: string;
            contactEmail: string;
            phone: string;
        };
    };
};