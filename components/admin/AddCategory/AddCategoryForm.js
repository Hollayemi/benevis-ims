"use client";

import Button from "@/components/common/Button/Button";
import FormInput from "@/components/common/FormInput/FormInput";
import TextArea from "@/components/common/FormInput/TextArea";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";
import { toast } from "react-toastify";

const AddCategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { user } = useAuth();

  // Add new subcategory field
  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, ""]);
  };

  // Update subcategory value
  const handleSubcategoryChange = (index, value) => {
    const newSubcategories = [...subcategories];
    newSubcategories[index] = value;
    setSubcategories(newSubcategories);
  };

  // Remove a subcategory field
  const handleRemoveSubcategory = (index) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/category/add-category`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            description,
            subcategories: subcategories.filter((s) => s.trim() !== ""),
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      const data = await res.json();

      if (data?.data?._id) {
        setLoading(false);
        setName("");
        setDescription("");
        setSubcategories([""]);
        toast.success("Category & Subcategories Added Successfully!");
      } else {
        setLoading(false);
        setErrors(data);
      }
    } catch (err) {
      setLoading(false);
      setErrors({
        errors: {
          common: {
            msg: "Internal server error!",
          },
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="overflow-auto">
      <div className="space-y-4">
        {/* Category Name */}
        <div className="space-y-2">
          <FormInput
            label={"Category Name"}
            type="text"
            value={name}
            name="name"
            placeholder="Enter category name"
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text-sm font-semibold text-red-500">
            {errors?.errors?.name?.msg}
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <TextArea
            label={"Category Description"}
            type="text"
            value={description}
            name="description"
            placeholder="Enter Category description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-sm font-semibold text-red-500">
            {errors?.errors?.description?.msg}
          </p>
        </div>

        {/* Subcategories */}
        <div className="space-y-2">
          <label className="font-medium">Subcategories</label>
          {subcategories.map((sub, index) => (
            <div key={index} className="flex items-center gap-2">
              <FormInput
                type="text"
                value={sub}
                name={`subcategory-${index}`}
                placeholder={`Enter subcategory ${index + 1}`}
                onChange={(e) => handleSubcategoryChange(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  className="text-red-500 font-bold"
                  onClick={() => handleRemoveSubcategory(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-gray-200 text-black"
            onClick={() => handleAddSubcategory()}
          >
            + Add
          </button>
        </div>

        {/* Image */}
        <FormInput
          label={"Category Image"}
          type="file"
          value={""}
          name="picture"
          placeholder="Enter category image"
          onChange={(e) => setPicture((e.target).files[0])}
        />

        {/* Submit */}
        <Button className="w-full" disabled={loading} isPending={loading}>
          Add
        </Button>

        {errors?.errors?.common && (
          <p className="rounded bg-red-600 py-2 text-center text-sm font-medium text-white">
            {errors?.errors?.common?.msg}
          </p>
        )}
      </div>
    </form>
  );
};

export default AddCategoryForm;
