"use client";

import Button from "@/components/common/Button/Button";
import FormInput from "@/components/common/FormInput/FormInput";
import SelectInput from "@/components/common/SelectInput/SelectInput";
import { useAuth } from "@/contexts/authContext";
import { API_BASE_URL } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EmployeeUpdateForm = ({ employee }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [isActive, setActive] = useState(false)
  const [monthlySalary, setMonthlySalary] = useState(null);
  const [permission, setPermission] = useState("");
  const [joiningDate, setJoiningDate] = useState(Date.now());
  const [picture, SetPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { user } = useAuth();
  const router = useRouter();

  const permissions = [
    { key: "sales_personnel", value: "Sales Personnel" },
    { key: "accountant", value: "Accountant" }
  ]

  //set default employee data
  useEffect(() => {
    setActive(employee?.data?.isActive)
    setName(employee?.data?.name);
    setEmail(employee?.data?.email);
    setPhone(employee?.data?.phone);
    setPosition(employee?.data?.position);
    setMonthlySalary(employee?.data?.monthlySalary);
    setPermission(employee?.data?.permission)
    setJoiningDate(
      new Date(employee?.data?.joiningDate).toISOString().split("T")[0],
    );
  }, [employee]);

  console.log({ isActive })
  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/employee/update-employee/${employee?.data?._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name,
            email,
            phone,
            position,
            permission,
            isActive,
            monthlySalary,
            joiningDate,
            picture,
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
        toast.success("Employee Added Successful!");
        router.push("/admin/employee-list");
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <FormInput
            label={"employee name"}
            type="text"
            value={name}
            name="name"
            placeholder="enter category name"
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text-sm font-semibold text-red-500">
            {errors?.errors?.name?.msg}
          </p>
        </div>
        <div className="space-y-2">
          <FormInput
            label={"Employee Email"}
            type="email"
            value={email}
            name="email"
            placeholder="enter employee email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-sm font-semibold text-red-500">
            {errors?.errors?.email?.msg}
          </p>
        </div>
        <div className="space-y-2">
          <FormInput
            label={"Employee phone"}
            type="number"
            value={phone}
            name="phone"
            placeholder="enter employee phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <p className="text-sm font-semibold text-red-500">
            {errors?.errors?.phone?.msg}
          </p>
        </div>
        <div className="space-y-2">
          <SelectInput
            label="Permission"
            defaultValue={permission}
            name="permission"
            onChange={(e) => setPermission(e.target.value)}
          >
            <option value="">Select Permission</option>
            {permissions?.map((permission) => (
              <option value={permission.key} key={permission.key}>
                {permission.value}
              </option>
            ))}
          </SelectInput>
          <p className="text-sm font-semibold text-red-500">
            {errors?.errors?.permission?.msg}
          </p>
        </div>
        <div className="space-y-2">
          <FormInput
            label={"Employee position"}
            type="text"
            value={position}
            name="position"
            placeholder="enter employee position"
            onChange={(e) => setPosition(e.target.value)}
          />
          <p className="text-sm font-semibold text-red-500">
            {errors?.errors?.position?.msg}
          </p>
        </div>
        <div className="space-y-2">
          <FormInput
            label={"Employee joining date"}
            type="date"
            value={joiningDate}
            name="joiningDate"
            placeholder="enter employee joining date"
            onChange={(e) => setJoiningDate(e.target.value)}
          />
          <p className="text-sm font-semibold text-red-500">
            {errors?.errors?.joiningDate?.msg}
          </p>
        </div>
        <div className="space-y-2">
          <FormInput
            label={"Employee monthly Salary"}
            type="number"
            value={monthlySalary}
            name="monthlySalary"
            placeholder="enter employee monthly salary"
            onChange={(e) => setMonthlySalary(e.target.value)}
          />
          <p className="text-sm font-semibold text-red-500">
            {errors?.errors?.monthlySalary?.msg}
          </p>
        </div>

        <FormInput
          label={"category image"}
          type="file"
          value={""}
          name="picture"
          placeholder="enter category image"
          onChange={(e) => SetPicture(e.target.file[0])}
        />
        <div className="flex w-full gap-x-3 rounded-[3px] px-1.5 py-2.5 text-sm ring-1 ring-primary placeholder:capitalize focus:outline-none focus:ring-1 focus:ring-green-700">
          <input
            id="checkbox"
            type="checkbox"
            value={isActive}
            name="isActive"
            onChange={(e) => setActive(!isActive)}
          />
          <label
            htmlFor="checkbox"
            className="w-full cursor-pointer select-none font-semibold"
          >
            Revoke Access
          </label>
        </div>
        <Button
          className="w-full !uppercase"
          disabled={loading}
          isPending={loading}
        >
          update employee
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

export default EmployeeUpdateForm;
