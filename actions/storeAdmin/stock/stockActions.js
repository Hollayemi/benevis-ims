

import { API_BASE_URL } from "@/lib/config";
import { Fetch } from "@/utils/Fetch";

//get all stock
export const getStocks = async (limit, page) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/stock/all?page=${page}&limit=${limit}`,
      { cache: "no-cache" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getReport = async (startDate, endDate, productId) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();

    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (productId) params.append('productId', productId);

    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/stock/report/all?${params.toString()}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.log('Error in getReport:', e.message);
    // Return a structured error response or empty data
    return []
  }
};

//get a stock
export const getStock = async (stockId) => {
  try {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/stock/${stockId}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//search stock products
export const searchStock = async (query) => {
  try {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/stock/search?name=${query}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//delete a stock
export const DeleteStock = async (stockId) => {
  try {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/stock/delete/${stockId}`,
      { cache: "no-store", method: "DELETE" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
