


import { Fetch } from "@/utils/Fetch";
import { API_BASE_URL } from "@/lib/config";

//get all stores with pagination
export const getAllStores = async (limit, page) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/superadmin/stores/store-list?page=${page}&limit=${limit}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

// get store details by id
export const getStoreDetails = async (storeId) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/superadmin/stores/store-details/${storeId}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

// Change store active status
export const changeStoreActiveStatus = async (storeId, isActive) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/superadmin/stores/update-store-status/${storeId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};
