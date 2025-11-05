import { Fetch } from "@/utils/Fetch";
import { API_BASE_URL } from "@/lib/config";

//get customers with paginations
export const getCustomers = async (limit, page) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/customer?page=${page}&limit=${limit}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCustomerPurchases = async (customerId) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/customer/purchases/${customerId}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};
//get customers
export const getAllCustomer = async () => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/customer/all`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

//get customer
export const getACustomer = async (customerId) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/customer/${customerId}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};
