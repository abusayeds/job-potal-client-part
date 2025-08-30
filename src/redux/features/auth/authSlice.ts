import { TRole, TUniObject } from "@/types";
import { TJobDetails } from "@/types/jobs.type";
import { TSubscription } from "@/types/subscription.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


export type TCv = {
  _id: string;
  name: string;
  file: string;
  createdAt: string;
};

export type TEmploymentRecord = {
  _id: string;
  title: string;
  company: string;
  jobLocation: string;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  jobDuties: string;
}

export type TReferenceFormData = {
  _id: string;
  referenceType: "personal" | "professional";
  organizationName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
}
export type TUser = {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: TRole;
  isApprove?: boolean;
  isCompleted?: boolean;
  step: number;
  purchasePlan?: TSubscription & TUniObject;
  // company info
  logo?: string;
  companyName?: string;
  banner?: string;
  about?: string;
  // founding info
  organizationType?: string;
  industry?: string;
  teamSize?: number;
  foundIn?: string;
  companyWebsite?: string;
  companyVision?: string;
  benefits?: Array<string>;
  // social link
  youtube?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  // account info
  address?: string;
  contactEmail?: string;
  createdAt?: string;

  // seeker 
  // personal info 1
  title?: string;
  experience?: string;
  educations?: string[];
  parsonalWebsite?: string;

  // profile
  nationality?: string;
  dateOfBrith?: string;
  gender?: string;
  maritalStatus?: string;
  biography?: string;

  // alert job
  jobType?: string;
  jobLevel?: string;
  cv?: TCv[];

  favorites?: string[];

  // employment history
  employments: TEmploymentRecord[];
  professional_skills?: string[];
  references: TReferenceFormData[];
};

// const initialUser: TUser = {
//   _id: "64544",
//   name: "John Doe",
//   email: "john@gmail.com",
//   role: (Cookies.get("token") as TRole) || "candidate",
// };
// 
interface AuthState {
  favorite: TJobDetails[] | TUser[];
  user: TUser | null;
  token: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  favorite: [],
  // token: null,
  token: Cookies.get("token") || null,
  isLoading: true,
};

// Create the slice with typed state and actions
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: TUser }>) {
      state.user = action.payload.user;
      state.isLoading = false;
    },
    setLogin(state, action: PayloadAction<{ user: TUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      Cookies.set("token", action.payload.token, {
        expires: 365,
        // secure: false,
        sameSite: "strict",
      });
    },
    setFavorite(state, action) {
      state.favorite = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      Cookies.remove("token");
    },
  },
});

export const { setUser, setLogin, setFavorite, logout } = authSlice.actions;
export default authSlice.reducer;
