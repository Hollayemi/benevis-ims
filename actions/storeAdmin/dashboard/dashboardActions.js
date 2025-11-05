import { Fetch } from "@/utils/Fetch";
import { API_BASE_URL } from "@/lib/config";

//get finance for store
export const getFinance = async () => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/financial`,
      { cache: "no-cache" },
    );
    console.log({ res })
    const data = await res.json();

    console.log(data)
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//get total purchase and sales for daily
export const getPurchaseAndSales = async () => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/dashboard/purchase-sale`,
      { cache: "no-cache" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//get yearly buy and sales
export const lastYearBuyAndSales = async () => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/dashboard/buy-sale`,
      { cache: "no-cache" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
