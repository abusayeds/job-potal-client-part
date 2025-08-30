import { apiUrl } from "@/config";

export const trainingsSearch = async (args?: Record<string, string | string[] | undefined>) => {
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
            `${apiUrl}/training/all?${params.toString()}`,
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

export const trainingDetails = async (id: string) => {
    try {
        const res = await fetch(
            `${apiUrl}/training/single/${id}`,
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