import { BASE_URL } from "./BASE _URL";
import Cookies from "js-cookie";
interface FetchOptions extends RequestInit {
  next?: {
    revalidate?: number;
  };
  token?: string;
}
interface QueryParam {
  name: string;
  value: string;
}
export async function fetchPostApi(
  endpoint: string,
  body: any,
  args?: QueryParam[],
  options: FetchOptions = {}
) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (args) {
    args.forEach((item) => {
      url.searchParams.append(item.name, item.value);
    });
  }
  const token = Cookies.get('authToken');
  const headers = new Headers(options.headers || {});
  if (token ) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const config: RequestInit & { next?: { revalidate?: number } } = {
    ...options,
    method: "POST", 
    headers,  
    body: JSON.stringify(body), 
    next: options.next || { revalidate: 10 },
  };

  try {
    const response = await fetch(url.toString(), config);
    return await response.json();
  } catch (error) {
    console.error("Fetch POST error:", error);
    throw error;
  }
}
export async function fetchGetApi(
  endpoint: string,
  args?: QueryParam[],
  options: FetchOptions = {}
) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (args) {
    args.forEach((item) => {
      url.searchParams.append(item.name, item.value);
    });
  }

  const headers = new Headers(options.headers || {});
  const token = Cookies.get("authToken");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const config: RequestInit & { next?: { revalidate?: number } } = {
    ...options,
    headers,
    next: options.next || { revalidate: 10 },
  };

  try {
    const response = await fetch(url.toString(), config);
    return await response.json();
  } catch (error) {
    console.error("Fetch GET error:", error);
    throw error;
  }
}