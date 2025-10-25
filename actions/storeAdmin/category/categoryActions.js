import { API_BASE_URL } from "@/lib/config";
import { Fetch } from "@/utils/Fetch";

export const getCategories = async (limit, page) => {
  console.log("hereeeeee", API_BASE_URL)
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/category/category-list?page=${page}&limit=${limit}`,
      { cache: "no-cache" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

//get a category
export const getCategory = async (categoryId) => {
  try {
    const res = await Fetch(
      `${API_BASE_URL}/admin/category/${categoryId}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
