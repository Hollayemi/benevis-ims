

"use client";
import Button from "@/components/common/Button/Button";
import FormInput from "@/components/common/FormInput/FormInput";
import SelectInput from "@/components/common/SelectInput/SelectInput";
import useAddToCart from "@/contexts/addToCartContext";
import { reshapePrice } from "@/utils/format";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/lib/config";

const PaymentContainer = ({ customerData, banks }) => {
  const { carts, setCarts, setQuery, setProducts } = useAddToCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cash, setCash] = useState(0);
  const [bank, setBank] = useState(0);
  const [buyer, setBuyer] = useState("");
  const [selectBank, setSelectBank] = useState(null);
  const [due, setDue] = useState(0);
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectCustomer, setSelectCustomer] = useState("new");

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const total = carts.reduce((acc, item) => acc + item.total, 0);
    setSubTotal(total);

    const calculatedTotalPrice = total - discount;
    setTotalPrice(calculatedTotalPrice);

    // Set cash only if it's 0 (meaning user hasn't manually changed it)
    // if (parseFloat(cash) === 0) {
    //   setCash(calculatedTotalPrice);
    // }

    setDue(
      calculatedTotalPrice - (parseFloat(cash) || 0) - (parseFloat(bank) || 0),
    );
  }, [carts, discount, bank, cash]);

  // set customer
  const setCustomerHandler = (val) => {
    if (val === "new") {
      setSelectCustomer("new");
    } else if (val === "old") {
      setSelectCustomer("old");
    } else {
      setSelectCustomer("new");
    }
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    //set customer infomations for new or old customer
    let customerInfo;
    if (selectCustomer === "new") {
      customerInfo = {
        name,
        email,
        phone,
        address,
      };
    } else if (selectCustomer === "old") {
      customerInfo = customer;
    }

    // if (selectCustomer === "new" && due > 0) {
    //   alert("You can add due only for existing customer!");
    //   setLoading(false);
    //   return;
    // }

    // set payment method
    var paymentMethod = "bank";
    if (cash <= 0 && bank > 0) {
      paymentMethod = "bank";
    } else if (cash > 0 && bank <= 0) {
      paymentMethod = "cash";
    } else if (cash > 0 && bank > 0) {
      paymentMethod = "cash/bank";
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/sale/sales-pament`,
        {
          method: "POST",
          body: JSON.stringify({
            customer: customerInfo,
            discount,
            subTotal,
            cash,
            bank,
            bankInfo: selectBank,
            due,
            buyer,
            totalPrice,
            paymentStatus: due > 0 ? "due" : "completed",
            paymentMethod,
            cart: [
              ...carts.map((item) => ({
                product: item._id,
                qty: item.qty,
                price: item.sellingPrice,
              })),
            ],
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );
      const data = await res.json();

      if (data?.data?._id) {
        setCarts([]);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCash(0);
        setDue(0);
        setBank(0);
        setQuery("");
        setProducts([]);
        setLoading(false);
        toast.success("Sales Created Successful!");
        setSelectCustomer("new");
        router.push("/admin/add-sales");
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
    <div className="rounded-md bg-white/50 px-2 py-5 shadow backdrop-blur">
      {errors?.errors?.common && (
        <p className="mb-2 rounded-sm bg-red-500 py-2 text-center font-semibold text-white">
          {errors.errors.common.msg}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <p className="pb-2 text-[15px] font-semibold uppercase">
          Customer Info
        </p>
        {/* select customer */}
        <div className="flex w-full overflow-hidden rounded bg-gray-50 ring-1 ring-primary">
          <div
            className={`w-full border-e border-secondary py-2 text-center duration-300 ease-linear ${selectCustomer === "new" ? "bg-primary text-gray-100" : ""}`}
            onClick={() => setCustomerHandler("new")}
          >
            <p className="cursor-pointer select-none text-sm font-medium">
              new customer
            </p>
          </div>
          <div
            className={`w-full py-2 text-center duration-300 ease-linear ${selectCustomer === "old" ? "bg-primary text-gray-100" : ""}`}
            onClick={() => setCustomerHandler("old")}
          >
            <p className="cursor-pointer select-none text-sm font-medium">
              Existing customer
            </p>
          </div>
        </div>

        {/* existing customer select box */}
        {selectCustomer === "old" && (
          <div className="space-y-3 pt-3">
            <SelectInput
              label="Select Customer"
              name="customer"
              value={customer}
              onChange={(e) => { setCustomer(e.target.value) }}
              required={selectCustomer === "old"}
            >
              <option value="">Select customer</option>
              {customerData?.data?.length > 0 &&
                customerData?.data?.map((customer) => (
                  <option key={customer?._id} value={customer?._id}>
                    {customer?.name}
                  </option>
                ))}
            </SelectInput>


            <div className="space-y-3 pt-3">
              <FormInput
                label="Buyer Name"
                type="text"
                placeholder="buyer name"
                name="name"
                className="bg-transparent"
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
              />
            </div>

          </div>
        )}


        {/* new customer form */}
        {selectCustomer === "new" && (
          <div className="space-y-3 pt-3">
            <FormInput
              label="name"
              type="text"
              placeholder="customer name"
              name="name"
              className="bg-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              label="email"
              type="email"
              placeholder="customer email"
              name="email"
              className="bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              label=" phone"
              type="number"
              placeholder="customer phone"
              name="phone"
              className="bg-transparent"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <FormInput
              label=" Address"
              type="text"
              placeholder="customer address"
              name="address"
              className="bg-transparent"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        )}

        <div className="">
          {/* discount */}
          <p className="pb-1 pt-3 text-sm font-semibold capitalize">
            sale discount :
          </p>
          <FormInput
            label={0}
            type="number"
            placeholder="discount amount"
            name="discount"
            className="bg-transparent"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          {/* payment method */}
          <p className="pb-1 pt-3 text-base font-semibold uppercase">
            Payment method
          </p>
          {/* cash
          <div className="space-y-2 pb-1 pt-3">
            <p className="text-sm font-medium capitalize">cash</p>
            <FormInput
              label={0}
              type="number"
              placeholder="cash amount"
              name="cash"
              className="bg-transparent"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
            />
          </div> */}
          {/* bank */}


        </div>
        <div className="mt-5 space-y-1 rounded bg-secondary/50 px-2 py-1">
          <p className="flex items-center justify-between text-base font-medium uppercase text-gray-900">
            <span>sub Price:</span> <span>{reshapePrice(subTotal)}</span>
          </p>
          <p className="flex items-center justify-between text-base font-medium uppercase text-gray-900">
            <span>discount amounts:</span> <span>{reshapePrice(discount)}</span>
          </p>
          <p className="flex items-center justify-between text-base font-medium uppercase text-gray-900">
            <span>total due:</span> <span>{reshapePrice(due)}</span>
          </p>
          <span className="block border-b" />
          <p className="flex items-center justify-between text-base font-medium uppercase text-gray-900">
            <span>Total price:</span> <span>{reshapePrice(totalPrice)}</span>
          </p>
        </div>

        <div className="pt-5">
          <Button className="w-full" isPending={loading}>
            Record Sales
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentContainer;
