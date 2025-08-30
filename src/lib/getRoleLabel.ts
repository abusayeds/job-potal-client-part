import { ROLE, TRole } from "@/types";

export const getRoleLabel = (role: TRole) => {
  switch (role) {
    case ROLE.ADMIN:
      return "Admin";
    case ROLE.EMPLOYER:
      return "Employer";
    case ROLE.EMPLOYEE:
      return "Employee";
    case ROLE.CANDIDATE:
      return "Job Seeker";
    default:
      return "Guest";
  }
};
