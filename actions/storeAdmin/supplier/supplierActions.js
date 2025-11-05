

import { Fetch } from "@/utils/Fetch";
import { API_BASE_URL } from "@/lib/config";
import { redirect } from "next/navigation";

//get suppliers
export const getSuppliers = async (limit, page) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/supplier/suppliers?page=${page}&limit=${limit}`,
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return err.message;
  }
};

//get suppliers
export const getSupplier = async (id) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/supplier/${id}`,
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return err.message;
  }
};

//add supplier
export const addSupplier = async (prevState, formData) => {
  try {
    const formDataObject = Object.fromEntries(formData.entries());

    const res = await Fetch(
      `${API_BASE_URL}/admin/supplier/create-supplier`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formDataObject),
      },
    );
    const data = await res.json();

    if (data?.data?._id) {
      redirect("/admin/supplier-list");
    }

    if (data?.errors) {
      return data;
    }
  } catch (err) {
    return err.message;
  }
};
