

import { Fetch } from "@/utils/Fetch";
import { toast } from "react-toastify";

//get all sales
export const getAllSales = async (limit, page, query, filter) => {
  try {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/sale/sales?query=${query}&filter=${filter}&page=${page}&limit=${limit}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

// getReport
export const getReport = async (limit, page, customer, startDate, endDate, query, filter) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();

    if (limit) params.append('limit', limit);
    if (page) params.append('page', page);
    if (customer) params.append('customer', customer);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (query) params.append('query', query);
    if (filter) params.append('filter', filter);

    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/sale/report?${params.toString()}`,
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
    return {
      data: [],
      summary: {
        totalItems: 0,
        totalSale: 0,
        bank: 0,
        cash: 0,
        customers: [],
        totalOrders: 0
      },
      pagination: {
        total: 0,
        currentPage: page || 1,
        totalPages: 0,
        limit: limit || 10
      }
    };
  }
};
//get all sales
export const getDueSales = async (limit, page) => {
  try {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/sale/due-list?page=${page}&limit=${limit}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//get sales by trxId
export const getSalesByTrxId = async (trxId) => {
  try {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/sale/sales/search?trxId=${trxId}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//get sales by trxId
export const getDueSalesByNameTrxId = async (query) => {
  try {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/sale/due/search?query=${query}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//get a single sale
export const getSale = async (saleId) => {
  try {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/sale/sales/${saleId}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//delete a sale
export const DeleteSale = async (salesId) => {
  try {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/sale/sales/${salesId}`,
      { cache: "no-store", method: "DELETE" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};


//handle submit
export const updateSale = async (data) => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/sale/sales-pament`,
      {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const data = await res.json();

    // if (data?.data?._id) {
    //   setCarts([]);
    //   setName("");
    //   setEmail("");
    //   setPhone("");
    //   setAddress("");
    //   setCash(0);
    //   setDue(0);
    //   setBank(0);
    //   setQuery("");
    //   setProducts([]);
    //   setLoading(false);
    //   toast.success("Sales Created Successful!");
    //   setSelectCustomer("new");
    //   // router.push("/admin/add-sales");
    // } else {
    //   setLoading(false);
    //   setErrors(data);
    // }
  } catch (err) {
    setLoading(false);
    setErrors({
      errors: {
        common: {
          // msg: err.message,
          msg: "Intranal server error!",
        },
      },
    });
  }
};