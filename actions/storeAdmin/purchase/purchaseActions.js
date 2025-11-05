

import { Fetch } from "@/utils/Fetch";
import { API_BASE_URL } from "@/lib/config";

export const getPurchases = async (limit, page) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/purchase/all?page=${page}&limit=${limit}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//get a purchase
export const getPurchase = async (purchaseId) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/purchase/${purchaseId}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//delete a purchase
export const DeletePurchase = async (purchaseId) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/purchase/delete/${purchaseId}`,
      { cache: "no-store", method: "DELETE" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
