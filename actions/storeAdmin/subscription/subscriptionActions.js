import { Fetch } from "@/utils/Fetch";
import { API_BASE_URL } from "@/lib/config";

//get banks with paginations
export const getSubscriptions = async (limit, page) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/subscription/subscription-list?page=${page}&limit=${limit}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};
