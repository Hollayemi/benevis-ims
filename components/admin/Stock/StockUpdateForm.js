

"use client";

import Button from "@/components/common/Button/Button";
import FormInput from "@/components/common/FormInput/FormInput";
import TextArea from "@/components/common/FormInput/TextArea";
import SelectInput from "@/components/common/SelectInput/SelectInput";
import { storeCategories } from "@/utils/categories";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/lib/config";

const StockUpdateForm = ({ categories, suppliers, stock }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uom, setUom] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sku, setSku] = useState("");
  const [supplier, setSupplier] = useState("");
  const [image, setImage] = useState(null);
  const [barcode, setBarcode] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const { user } = useAuth();

  const router = useRouter();
  console.log(stock?.data)

  // load default purchase from data
  useEffect(() => {
    if (stock?.data) {
      setName(stock.data.name);
      setDescription(stock.data?.description);
      setCategory(stock?.data?.category ?? "");
      setUom(stock.data?.uom);
      setPurchasePrice(stock.data?.purchasePrice);
      setSellingPrice(stock.data?.sellingPrice);
      setQuantity(stock.data?.quantity);
      setSku(stock.data?.sku);
      setSupplier(stock.data?.supplierInfo);
      setImage(stock.data?.image);
      setBarcode(stock.data?.barcode);
      setStatus(stock.data?.status);
    }
  }, [stock]);

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/stock/update/${stock.data?._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name,
            description,
            category,
            subcategory: selectedSubcategory,
            uom,
            purchasePrice,
            sellingPrice,
            quantity,
            sku,
            supplierInfo: supplier,
            picture: image,
            barcode,
            status,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );
      const data = await res.json();

      if (data?.data?._id) {
        setLoading(false);
        router.push("/admin/stock-list");
        toast.success("Stock Updated Successful!");
      } else {
        setLoading(false);
        setErrors(data);
      }
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
  const myCategories = categories?.data || []
  const handleCategoryChange = (e) => {
    setcategory(e.target.value);
    setSelectedSubcategory(""); // reset when new category selected
  };
  return (
    <div className="rounded-md bg-white px-2 py-5 shadow-sm shadow-primary">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <FormInput
                label="product name"
                type="text"
                placeholder="Enter your product name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-sm font-semibold text-red-500">
                {errors?.errors?.name?.msg}
              </p>
            </div>

            <div className="space-y-2">
              <TextArea
                label="product description"
                type="text"
                placeholder="Enter your product description"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="text-sm font-semibold text-red-500">
                {errors?.errors?.description?.msg}
              </p>
            </div>

            {/* <div className="space-y-2">
              <SelectInput
                label="Category"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue={stock?.data?.category}
              >
                <option value="">Select Category</option>
                {categories?.data?.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </SelectInput>
              <p className="text-sm font-semibold text-red-500">
                {errors?.errors?.category?.msg}
              </p>
            </div> */}

            <div className="space-y-2">
              <SelectInput
                label="Unit of Measure"
                name="uom"
                onChange={(e) => setUom(e.target.value)}
                defaultValue={stock?.data?.uom}
              >
                <option value="">Select Unit</option>
                <option value="KG">KG</option>
                <option value="PIECE">PIECE</option>
                <option value="LITER">LITER</option>
              </SelectInput>
              <p className="text-sm font-semibold text-red-500">
                {errors?.errors?.uom?.msg}
              </p>
            </div>

            <div className="space-y-2">
              <FormInput
                label="Purchase Price"
                type="number"
                placeholder="Enter product Purchase Price"
                value={purchasePrice}
                name="purchasePrice"
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
              <p className="text-sm font-semibold text-red-500">
                {errors?.errors?.purchasePrice?.msg}
              </p>
            </div>

            <div className="space-y-2">
              <FormInput
                label={`Selling Price ${uom ? "(per " + uom + ")" : ""}`}
                type="number"
                placeholder="Enter product Selling Price"
                value={sellingPrice}
                name="sellingPrice"
                onChange={(e) => setSellingPrice(e.target.value)}
              />
              <p className="text-sm font-semibold text-red-500">
                {errors?.errors?.sellingPrice?.msg}
              </p>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div className="space-y-2">
                <FormInput
                  label="Quantity"
                  type="text"
                  placeholder="Quantity"
                  value={quantity}
                  name="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="text-sm font-semibold text-red-500">
                  {errors?.errors?.quantity?.msg}
                </p>
              </div>

              <div className="space-y-2">
                <SelectInput
                  label="Supplier Info"
                  name="supplier"
                  onChange={(e) => setSupplier(e.target.value)}
                  defaultValue={stock?.data?.supplierInfo}
                >
                  <option value="">Select Supplier</option>
                  {suppliers?.data?.map((supplier) => (
                    <option value={supplier._id} key={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
                </SelectInput>
                <p className="text-sm font-semibold text-red-500">
                  {errors?.errors?.supplier?.msg}
                </p>
              </div>

              <div className="space-y-2">
                <FormInput
                  label="Product Image"
                  type="file"
                  placeholder="Select product Image"
                  value={image}
                  name="image"
                  onChange={(e) => setImage(e.target.value[0])}
                />
                <p className="text-sm font-semibold text-red-500">
                  {errors?.errors?.image?.msg}
                </p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <SelectInput
                  label="Category"
                  name="category"
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {myCategories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </SelectInput>
                <p className="text-sm font-semibold text-red-500">
                  {errors?.errors?.category?.msg}
                </p>
              </div>

              {/* Subcategory */}
              {category && myCategories.filter(e => e.name === category)[0]?.subcategories && (
                <div className="space-y-2">
                  <SelectInput
                    label="Subcategory"
                    name="subcategory"
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                  >
                    <option value="">Select Subcategory</option>
                    {myCategories
                      .find((cat) => cat.name === category)
                      ?.subcategories.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                  </SelectInput>
                  <p className="text-sm font-semibold text-red-500">
                    {errors?.errors?.subcategory?.msg}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <SelectInput
                  label="Status"
                  type="text"
                  placeholder="Enter product status"
                  name="status"
                  defaultValue={stock?.data?.status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </SelectInput>
                {/* <p className="text-sm font-semibold text-red-500">
                  {errors?.errors?.name?.msg}
                </p> */}
              </div>

              <div>
                <Button className="w-full" loading={loading}>
                  Update product
                </Button>
              </div>
              {errors?.errors?.common && (
                <p className="rounded bg-red-600 py-2 text-center text-sm font-medium text-white">
                  {errors?.errors?.common?.msg}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StockUpdateForm;
