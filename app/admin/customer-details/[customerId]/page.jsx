"use client"

import { getCustomerPurchases } from "@/actions/storeAdmin/customer/customerActions";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";
import { reshapePrice } from "@/utils/format";
import { format } from "date-fns";
import { use } from "react";

const CustomerDetails =  ({ params }) => {
  const { customerId } = use(params);
  const { data: customer } = useAsync(getCustomerPurchases, [customerId], [customerId]) || {};
  console.log(customer)

  return (
    <Container>
      <PageHeader headText="customer Details" />
      {/* details */}
      <h2 className="text-2xl font-semibold capitalize">
        {customer.products[0]?.customerInfo?.[0]?.name}
      </h2>
      <div className="flex w-full flex-wrap px-1 sm:px-2">
        {customer.products[0]?.customerInfo?.[0]?.email}<br />
        {customer.products[0]?.customerInfo?.[0]?.phone}
      </div>
      <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-3">
            {customer?.products?.map((e, i) =>
              <div key={i} className="space-y-1 rounded p-3 shadow">
                <div className="flex justify-between">
                  <h2 className="text-md font-semibold capitalize">
                    {e.name}
                  </h2>
                  {new Date(e?.createdAt).toLocaleDateString()}
                </div>
                <p className="text-gray-800">{e.status}: <b className="!text-red-400"> {e.status === "due" && reshapePrice(e.due)}</b></p>
                <div className="flex justify-between">
                  <p className="text-gray-800">{reshapePrice(e.price)} - qty: {e.quantity}</p>
                  <p className="text-gray-800">{e.trxid}</p>
                </div>
              </div>
            )}

          </div>
          <div className="space-y-3">
            <div className="rounded shadow shadow-primary">
              <div className="space-y-1 rounded p-2 shadow sm:p-3">
                <h2 className="text-md pb-2 font-semibold capitalize">
                  Total Order Made
                </h2>
                <div className="flex h-full max-h-[300px] w-full flex-wrap space-y-1 overflow-x-auto px-1 sm:px-2">
                  {customer?.products?.length || 0}
                </div>
              </div>
            </div>
            <div className="rounded shadow shadow-primary">
              <div className="space-y-1 rounded p-2 shadow sm:p-3">
                <h2 className="text-md pb-2 font-semibold capitalize">
                  Total Order Made
                </h2>
                <div className="space-y-1 rounded p-2">
                  {reshapePrice(customer.grandTotalPrice || 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CustomerDetails;
