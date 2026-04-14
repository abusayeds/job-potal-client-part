// DemoAccountSelector.tsx
"use client";

import { useState } from "react";
import { BriefcaseIcon, UserIcon } from "lucide-react";

type Role = "jobseeker" | "employer";

interface DemoAccount {
  email: string;
  role: Role;
}

const DEMO_PASSWORD = "1qazxsw2";

const DEMO_ACCOUNTS: Record<Role, DemoAccount[]> = {
  jobseeker: [
    { email: "jobseeker@gmail.com", role: "jobseeker" },
    { email: "jobseeker1@gmail.com", role: "jobseeker" },
    { email: "jobseeker2@gmail.com", role: "jobseeker" },
    { email: "jobseeker3@gmail.com", role: "jobseeker" },
    { email: "jobseeker4@gmail.com", role: "jobseeker" },
  ],
  employer: [
    { email: "employer@gmail.com", role: "employer" },
    { email: "employer1@gmail.com", role: "employer" },
    { email: "employer2@gmail.com", role: "employer" },
    { email: "employer3@gmail.com", role: "employer" },
    { email: "employer4@gmail.com", role: "employer" },
  ],
};

interface DemoAccountSelectorProps {
  onSelect: (email: string, password: string) => void;
  onClear: () => void;
  selectedEmail: string | null;
}

const DemoAccountSelector = ({
  onSelect,
  onClear,
  selectedEmail,
}: DemoAccountSelectorProps) => {
  const [activeRole, setActiveRole] = useState<Role | null>(null);

  const handleRoleChange = (role: Role) => {
    if (activeRole === role) {
      setActiveRole(null);
      return;
    }
    setActiveRole(role);
  };

  const handleAccountClick = (email: string) => {
    onSelect(email, DEMO_PASSWORD);
  };

  return (
    <>
      {/* Role Tabs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {(["jobseeker", "employer"] as Role[]).map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => handleRoleChange(role)}
            className={`
              flex flex-col items-center gap-1 py-3 px-4 rounded-xl border transition-all
              ${
                activeRole === role
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            {role === "jobseeker" ? (
              <UserIcon size={20} />
            ) : (
              <BriefcaseIcon size={20} />
            )}
            <span className="text-sm font-medium capitalize">
              {role === "jobseeker" ? "Job Seeker" : "Employer"}
            </span>
          </button>
        ))}
      </div>

      {/* Account List */}
      {activeRole !== null && (
        <>
          <p className="text-xs text-gray-400 mb-2">Select a demo account</p>
          <div className="flex flex-col gap-2">
            {DEMO_ACCOUNTS[activeRole].map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleAccountClick(acc.email)}
                className={`
                  flex items-center justify-between px-4 py-2.5 rounded-lg border text-left transition-all
                  ${
                    selectedEmail === acc.email
                      ? "border-primary bg-primary/10"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                <span className="text-sm text-gray-800">{acc.email}</span>
                <span
                  className={`
                    text-xs px-2 py-0.5 rounded-full font-medium
                    ${
                      acc.role === "jobseeker"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-violet-100 text-violet-700"
                    }
                  `}
                >
                  {acc.role === "jobseeker" ? "Job Seeker" : "Employer"}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Selected demo info + clear option */}
      {selectedEmail && (
        <div className="mt-3 p-3 rounded-lg border border-amber-200 bg-amber-50">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-amber-800 mb-0.5">
                ✓ Demo account selected
              </p>
              <p className="text-xs text-amber-700">{selectedEmail}</p>
            </div>
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-amber-600 hover:text-amber-800 underline whitespace-nowrap mt-0.5 transition-colors"
            >
              Use my own account
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoAccountSelector;
