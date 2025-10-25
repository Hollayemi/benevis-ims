"use client"

import { getSale } from "@/actions/storeAdmin/sales/salesActions";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";
import { reshapePrice } from "@/utils/format";
import { format } from "date-fns";
import React, { use } from "react";

const SalesDetails = ({ params }) => {
  const { id: salesId } = use(params);
  const { data: sale } = useAsync(getSale, [salesId], [salesId]);

  console.log(sale?.histories)
  const total = sale?.histories?.reduce((sum, history) => sum + history.amount, 0);
  console.log(total);
  return (
    <Container>
      <PageHeader headText="Sales Details" />
      {/* details */}
      <div className="rounded-lg bg-white/50 p-4 shadow-md backdrop-blur">
        <div className="grid grid-cols-1 gap-5 capitalize md:grid-cols-2">
          <div className="space-y-3">
            {/* customer information */}
            <div className="space-y-3 rounded shadow shadow-primary">
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">Customer Name</h2>
                <p className="text-gray-800">
                  {sale?.data?.customer?.name || "N/A"}
                </p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">Customer Email</h2>
                <p className="text-gray-800">
                  {sale?.data?.customer?.email || "N/A"}
                </p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">Customer Phone</h2>
                <p className="text-gray-800">
                  {sale?.data?.customer?.phone || "N/A"}
                </p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">Customer Address</h2>
                <p className="text-gray-800">
                  {sale?.data?.customer?.address || "N/A"}
                </p>
              </div>
            </div>

            {/* bank information */}
            <div className="space-y-3 rounded shadow shadow-primary">
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">Bank Name</h2>
                <p className="text-gray-800">
                  {sale?.data?.bankInfo?.name || "N/A"}
                </p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">Account Number</h2>
                <p className="text-gray-800">
                  {sale?.data?.bankInfo?.accountNumber || "N/A"}
                </p>
              </div>
            </div>
            {/* product information */}
            {sale?.data?.cart?.map((item) => (
              <div
                className="space-y-3 rounded capitalize shadow shadow-primary"
                key={item._id}
              >
                <div className="space-y-1 rounded p-3 shadow">
                  <h2 className="text-md font-semibold">prodct name</h2>
                  <p className="text-gray-800">{item?.product?.name}</p>
                </div>
                <div className="space-y-1 rounded p-3 shadow">
                  <h2 className="text-md font-semibold">product price</h2>
                  <p className="text-gray-800">{reshapePrice(item?.price)}</p>
                </div>
                <div className="space-y-1 rounded p-3 shadow">
                  <h2 className="text-md font-semibold">product qty</h2>
                  <p className="text-gray-800">{item?.qty}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="space-y-3 rounded shadow shadow-primary">
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">Transaction Id</h2>
                <p className="text-gray-800">{sale?.data?.trxid}</p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">payment Status</h2>
                <p className="text-gray-800">{sale?.data?.paymentStatus}</p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">payment Method</h2>
                <p className="text-gray-800">{sale?.data?.paymentMethod}</p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">Discount Ammounts</h2>
                <p className="text-gray-800">{reshapePrice(sale?.data?.discount)}</p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">Sub Total</h2>
                <p className="text-gray-800">{reshapePrice(sale?.data?.subTotal)}</p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">Total Price</h2>
                <p className="text-gray-800">{reshapePrice(sale?.data?.totalPrice)}</p>
              </div>

              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">payment with pos</h2>
                <p className="text-gray-800">{reshapePrice(sale?.data?.cash)}</p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">payment with bank</h2>
                <p className="text-gray-800">{reshapePrice(sale?.histories?.reduce((sum, history) => sum + history.paymentMethod === "pos" ? history.amount : 0, 0))}</p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">total due</h2>
                <p className="text-gray-800">{reshapePrice(sale?.histories?.reduce((sum, history) => sum + history.paymentMethod !== "bank" ? history.amount : 0, 0))}</p>
              </div>
              <div className="space-y-1 rounded p-3 shadow">
                <h2 className="text-md font-semibold">Due payment history</h2>
                <div className="flex flex-wrap gap-1">
                  {/* showing due payment hostory */}
                  {sale?.histories?.map((history) => (
                    <div
                      className="rounded bg-secondary p-3 text-center text-white"
                      key={history._id}
                    >
                      <p className="">{reshapePrice(history?.amount)}</p>
                      <p className="">
                        {format(new Date(history?.paidAt), "dd MMM yyyy")}
                      </p>
                      <p>{history?.bankInfo?.name}</p>
                    </div>
                  )) || <p className="text-gray-500">No due payment history</p>}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Container>
  );
};

export default SalesDetails;
