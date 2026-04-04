"use server";

import { apiUrl } from "@/config";
// import { cookies } from "next/headers";
// import { revalidateTag } from "next/cache";

// home
export const popularCategory = async () => {
    try {
        const res = await fetch(`${apiUrl}/category/popular`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });
        if (!res.ok) {
            throw new Error('Network response was not ok'); // Add a check for failed responses (non-2xx codes)
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Error(error);
    }
};
export const popularCompanies = async () => {
    try {
        const res = await fetch(`${apiUrl}/user/top-companies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });
        if (!res.ok) {
            throw new Error('Network response was not ok'); // Add a check for failed responses (non-2xx codes)
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return error;
    }
};
export const appStatus = async () => {
    try {
        const res = await fetch(`${apiUrl}/user/statistics`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });
        if (!res.ok) {
            throw new Error('Network response was not ok'); // Add a check for failed responses (non-2xx codes)
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return error;
    }
};

// find job search
export const jobsSearch = async (args?: Record<string, string | string[] | undefined>) => {
    const params = args
        ? new URLSearchParams(
            Object.entries(args).flatMap(([key, value]) =>
                Array.isArray(value)
                    ? value.map(v => [key, v])
                    : [[key, value as string]]
            ) as [string, string][]
        ).toString()
        : "";
    try {
        const res = await fetch(
            `${apiUrl}/job/all?${params.toString()}`,
            // {
            //     next: {
            //         tags: ["GAME"],
            //     },
            // }
        );
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Error(error);
    }
};
export const getCompanyJobs = async (id: string) => {
    try {
        const res = await fetch(
            `${apiUrl}/job/all/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Error(error);
    }
};
export const getJobDetails = async (id: string) => {
    try {
        const res = await fetch(
            `${apiUrl}/job/single/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Error(error);
    }
};

// job seekers
export const jobSeekerSearch = async (args?: Record<string, string | string[] | undefined>) => {
    const params = args
        ? new URLSearchParams(
            Object.entries(args).flatMap(([key, value]) =>
                Array.isArray(value)
                    ? value.map(v => [key, v])
                    : [[key, value as string]]
            ) as [string, string][]
        ).toString()
        : "";
    try {
        const res = await fetch(
            `${apiUrl}/user/seekers?${params.toString()}`,
            // {
            //     next: {
            //         tags: ["GAME"],
            //     },
            // }
        );
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Error(error);
    }
};
export const getSeekerDetails = async (id: string) => {
    try {
        const res = await fetch(
            `${apiUrl}/user/seeker/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Error(error);
    }
};
// employer
export const employerSearch = async (args?: Record<string, string | string[] | undefined>) => {
    const params = args
        ? new URLSearchParams(
            Object.entries(args).flatMap(([key, value]) =>
                Array.isArray(value)
                    ? value.map(v => [key, v])
                    : [[key, value as string]]
            ) as [string, string][]
        ).toString()
        : "";
    try {
        const res = await fetch(
            `${apiUrl}/user/employers?${params.toString()}`,
            // {
            //     next: {
            //         tags: ["GAME"],
            //     },
            // }
        );
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Error(error);
    }
};
export const getEmployerDetails = async (id: string) => {
    try {
        const res = await fetch(
            `${apiUrl}/user/single-employer/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Error(error);
    }
};
// // ------------ add game --------------
// export const addGame = async (data: FormData) => {
//   const token = (await cookies()).get("accessToken")?.value || "";
//   // console.log("token", token);

//   try {
//     const res = await fetch(`${process.env.BASE_URL}/game/upload_game`, {
//       method: "POST",
//       body: data,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     revalidateTag("GAME");
//     return await res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// export const getSingleGame = async (id: string) => {
//   try {
//     const res = await fetch(
//       `${process.env.BASE_URL}/game/getAllGame/${id}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return await res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// // ------------ all games --------------
// export const allGames = async () => {
//   try {
//     const res = await fetch(`${process.env.BASE_URL}/game/getAllGame`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       next: {
//         tags: ["GAME"],
//       },
//     });
//     return await res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// // ------------ top game of the day --------------
// export const topGamesDay = async () => {
//   try {
//     const res = await fetch(`${process.env.BASE_URL}/game/top-game/day`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       next: {
//         tags: ["GAME"],
//       },
//     });
//     return await res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// //------------ top game of the week --------------
// export const topGamesWeek = async () => {
//   try {
//     const res = await fetch(`${process.env.BASE_URL}/game/top-game/week`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       next: {
//         tags: ["GAME"],
//       },
//     });
//     return await res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// export const gameSearch = async (query?: {
//   [key: string]: string | string[] | undefined;
// }) => {
//   const params = new URLSearchParams();

//   if (query?.searchTerm) {
//     params.append("searchTerm", query?.searchTerm.toString());
//   }
//   try {
//     const res = await fetch(
//       `${process.env.BASE_URL}/game/search-game?${params.toString()}`,
//       {
//         next: {
//           tags: ["GAME"],
//         },
//       }
//     );
//     return await res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// export const upvoteGame = async (gameId: string) => {
//   const token = (await cookies()).get("accessToken")?.value || "";
//   // console.log("token", gameId);
//   try {
//     const res = await fetch(`${process.env.BASE_URL}/game/upvote-game`, {
//       body: JSON.stringify(gameId),
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     revalidateTag("GAME");
//     return await res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };
