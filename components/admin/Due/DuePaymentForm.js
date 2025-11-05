

"use client";

import Button from "@/components/common/Button/Button";
import FormInput from "@/components/common/FormInput/FormInput";
import RadioButton from "@/components/common/FormInput/RadioButton";
import SelectInput from "@/components/common/SelectInput/SelectInput";
import { useAuth } from "@/contexts/authContext";
import { API_BASE_URL } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const DuePaymentForm = ({ dueSale, banks }) => {
  const [amount, setAmount] = useState("");
  const [selectBank, setSelectBank] = useState("")
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [method, setMethod] = useState("bank")
  const [cash, setCash] = useState(0);
  const [bank, setBank] = useState(0);

  const { user } = useAuth();
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/sale/due-sales-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, bankInfo: selectBank, paymentMethod: method, saleId: dueSale?.data?._id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );
      const data = await res.json();

      if (data?.data?._id) {
        setLoading(false);
        toast.success("Due Added Successful!");
        router.push("/admin/due-list");
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
      <div className="space-y-3">
        <div className="flex h-full w-full justify-between gap-4 border-b pb-2">
          <p className="text-sm font-medium capitalize">Customer Name</p>
          <p className="text-sm font-semibold">
            {dueSale?.data?.customer?.name || "N/A"}
          </p>
        </div>

        <div className="flex h-full w-full justify-between gap-4 border-b pb-2">
          <p className="text-sm font-medium capitalize">Transaction id</p>
          <p className="text-sm font-semibold">{dueSale?.data?.trxid}</p>
        </div>
        <div className="flex h-full w-full justify-between gap-4 border-b pb-2">
          <p className="text-sm font-medium capitalize">total price</p>
          <p className="text-sm font-semibold">
            {dueSale?.data?.totalPrice}
          </p>
        </div>
        <div className="flex h-full w-full justify-between gap-4 border-b pb-2">
          <p className="text-sm font-medium capitalize">total due</p>
          <p className="text-sm font-semibold">{dueSale?.data?.due}</p>
        </div>
        <div className="flex h-full w-full justify-between gap-4 border-b pb-2">
          <p className="text-sm font-medium capitalize">payment method</p>
          <div className="flex gap-5">
            {/* <div>
              <input type="radio" id="pos" onChange={(e) => setMethod(e.target.value)} name="method" value="pos" />
              <label htmlFor="pos" className="text-sm pl-3">POS</label>
            </div> */}
            <div>
              <input type="radio" id="bank" onChange={(e) => setMethod(e.target.value)} name="method" value="bank" />
              <label htmlFor="bank" className="text-sm pl-3">Bank</label>
            </div>
          </div>
        </div>
        {method === "bank" && <div className="flex w-full gap-5">
          <div className="w-full pt-3">
            <SelectInput
              label={""}
              name="selectBank"
              onChange={(e) => setSelectBank(e.target.value)}
              required={method === "bank"}
            >
              <option value="">Select Bank</option>
              {banks?.data?.map((bank) => (
                <option
                  value={bank._id}
                  key={bank._id}
                  className="capitalize"
                >
                  {bank.name.slice(0, 20)}
                </option>
              ))}
            </SelectInput>
          </div>
        </div>}
        <FormInput
          type="number"
          placeholder="Enter Your Payment amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <Button className="w-full" isPending={loading}>
          Record Payment
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

export default DuePaymentForm;
