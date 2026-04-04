"use server";

import { apiUrl } from "@/config";
// import { cookies } from "next/headers";
// import { revalidateTag } from "next/cache";

export const getSitePolicies = async (path: string) => {
    try {
        const res = await fetch(`${apiUrl}/${path}`, {
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
export const getSupportInfo = async () => {
    try {
        const res = await fetch(`${apiUrl}/setting/support`, {
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

export const sendMail = async (data: FormData) => {
    //   const token = (await cookies()).get("accessToken")?.value || "";
    // console.log("token", token);

    try {
        const res = await fetch(`${apiUrl}/user/send-mail`, {
            method: "POST",
            body: data,
        });
        // revalidateTag("GAME");
        if (!res.ok) {
            throw new Error('Network response was not ok'); // Add a check for failed responses (non-2xx codes)
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Error(error);
    }
};