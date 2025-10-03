import { ROLE } from "@/types";
import { DashboardItem } from "@/types/sidebar.type";
import { AiOutlineSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUsersCog } from "react-icons/fa";
import { FaRegChessQueen } from "react-icons/fa6";
import { GoBookmark } from "react-icons/go";
import { GrMoney } from "react-icons/gr";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  IoAddCircleOutline,
  IoMailUnreadOutline,
  IoWarningOutline,
} from "react-icons/io5";
import {
  MdOutlineDashboard,
  MdOutlineModelTraining,
  MdOutlineSwitchAccount,
  MdOutlineVerified,
} from "react-icons/md";
import {
  PiBriefcase,
  PiNotebookDuotone,
  PiShieldCheckLight,
  PiStack,
} from "react-icons/pi";
import { RiUserSearchLine } from "react-icons/ri";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { TbUserShield } from "react-icons/tb";
import { TiInfoLargeOutline } from "react-icons/ti";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

export const dashboardItems: DashboardItem[] = [
  {
    name: "Overview",
    path: "overview",
    icon: HiOutlineSquare3Stack3D,
    role: [ROLE.EMPLOYER, ROLE.EMPLOYEE, ROLE.CANDIDATE],
  },
  // candidate
  {
    name: "Applied Jobs",
    path: "personal-jobs",
    icon: PiBriefcase,
    role: [ROLE.CANDIDATE],
  },
  {
    name: "Favorite Jobs",
    path: "favorite-jobs",
    icon: GoBookmark,
    role: [ROLE.CANDIDATE],
  },
  {
    name: "Job Alert",
    path: "job-alerts",
    icon: IoMdNotificationsOutline,
    role: [ROLE.CANDIDATE],
  },
  {
    name: "My Jobs",
    path: "personal-jobs",
    icon: PiBriefcase,
    role: [ROLE.EMPLOYEE],
  },
  // employer
  {
    name: "Our Jobs",
    path: "personal-jobs",
    icon: PiBriefcase,
    role: [ROLE.EMPLOYER],
  },
  {
    name: "Post Job",
    path: "job-post",
    icon: IoAddCircleOutline,
    role: [ROLE.EMPLOYEE, ROLE.EMPLOYER],
  },
  {
    name: "Job Seeker",
    path: "saved-candidate",
    icon: GoBookmark,
    role: [ROLE.EMPLOYER],
  },
  {
    name: "Plans & Billing",
    path: "plan-bills",
    icon: PiNotebookDuotone,
    role: [ROLE.EMPLOYER],
  },
  {
    name: "Events",
    path: "events",
    icon: MdOutlineModelTraining,
    role: [ROLE.EMPLOYER],
  },
  {
    name: "Registered Event",
    path: "registered-events",
    icon: MdOutlineModelTraining,
    role: [ROLE.CANDIDATE],
  },
  {
    name: "Settings",
    path: "settings",
    icon: AiOutlineSetting,
    role: [ROLE.EMPLOYER, ROLE.CANDIDATE, ROLE.EMPLOYEE],
  },
];

export const adminDashboardItems: DashboardItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: MdOutlineDashboard,
    role: [ROLE.ADMIN],
  },
  {
    name: "All Users",
    path: "users",
    icon: FaUsersCog,
    role: [ROLE.ADMIN],
    children: [
      {
        name: "Job Seekers",
        path: "job-seeker",
        icon: RiUserSearchLine,
        role: [ROLE.ADMIN],
      },
      {
        name: "Employers",
        icon: TbUserShield,
        path: "employer",
        role: [ROLE.ADMIN],
      },
    ],
  },
  {
    name: "Companies",
    path: "companies",
    icon: MdOutlineSwitchAccount,
    role: [ROLE.ADMIN],
    children: [
      {
        name: "Requested ac",
        path: "requested",
        icon: VscGitPullRequestGoToChanges,
        role: [ROLE.ADMIN],
      },
      {
        name: "Verified ac",
        path: "verified",
        icon: MdOutlineVerified,
        role: [ROLE.ADMIN],
      },
    ],
  },

  {
    name: "Category",
    path: "category",
    icon: PiStack,
    role: [ROLE.ADMIN],
  },
  {
    name: "Earnings",
    path: "earning",
    icon: GrMoney,
    role: [ROLE.ADMIN],
  },
  {
    name: "Subscription",
    path: "subscription",
    icon: FaRegChessQueen,
    role: [ROLE.ADMIN],
  },

  {
    name: "Settings",
    path: "admin-settings",
    icon: AiOutlineSetting,
    role: [ROLE.ADMIN],
    children: [
      {
        name: "Profile",
        path: "profile",
        icon: CgProfile,
        role: [ROLE.ADMIN],
      },
      {
        name: "Terms of Use",
        icon: TiInfoLargeOutline,
        path: "terms",
        role: [ROLE.ADMIN],
      },
      {
        name: "All Policy’s",
        icon: PiShieldCheckLight,
        path: "policies",
        role: [ROLE.ADMIN],
      },
      {
        name: "About Us",
        icon: RxQuestionMarkCircled,
        path: "about-us",
        role: [ROLE.ADMIN],
      },
      {
        name: "Disclaimer",
        icon: IoWarningOutline,
        path: "disclaimer",
        role: [ROLE.ADMIN],
      },
      {
        name: "Refund & Cancellation",
        icon: IoWarningOutline,
        path: "refund",
        role: [ROLE.ADMIN],
      },
      {
        name: "Support Mail",
        icon: IoMailUnreadOutline,
        path: "support",
        role: [ROLE.ADMIN],
      },
    ],
  },
];
