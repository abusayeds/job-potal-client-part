import { TUser } from "@/redux/features/auth/authSlice";

export type TTraining = {
    Instructor: string;
    category: string;
    companyName: string;
    date: string;
    description: string;
    duration: string;
    employeId: TUser;
    format: string;
    image: string;
    learning_credits: string;
    time: string[];
    address: string;
    title: string;
    _id: string;
}