"use client";

import { getSubscriptions } from "@/actions/storeAdmin/subscription/subscriptionActions";
import ActionButtons from "@/components/admin/Subscription/ActionButtons";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Pagination from "@/components/common/Pagination/Pagination";
import { format } from "date-fns";

const SubscriptionList = ({ searchParams }) => {
  const { page, limit } = use(searchParams);
  const histories = useAsync(getSubscriptions, [limit, page], [limit, page]).data;
  
  return (
    <Container>
      {/* add page header */}
      <PageHeader headText="Subscription list" />

      {/* all history list table */}
      <div className="table-container relative overflow-x-auto rounded-md shadow-sm shadow-primary">
        <table className="w-full text-left text-sm text-text/80 rtl:text-right">
          <thead className="bg-primary/25 text-xs uppercase text-text">
            <tr className="text-nowrap text-center">
              <th scope="col" className="px-2 py-4">
                transaction Id
              </th>
              <th scope="col" className="px-2 py-4">
                payment Date
              </th>
              <th scope="col" className="px-2 py-4">
                Plan type
              </th>
              <th scope="col" className="px-2 py-4">
                payment Method
              </th>
              <th scope="col" className="px-2 py-4">
                expiry Date
              </th>
              <th scope="col" className="px-2 py-4 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {histories?.data?.map((history) => (
              <tr
                className="text-nowrap border-b text-center font-medium odd:bg-primary/10 even:bg-secondary/5 hover:bg-secondary/10"
                key={history._id}
              >
                <td className="px-2 py-4">{history?.transactionId}</td>
                <td className="px-2 py-4">
                  {format(new Date(history?.paymentDate), "dd MMM yyyy")}
                </td>
                <th className="whitespace-nowrap px-2 py-4 font-medium">
                  {history?.plan}
                </th>
                <td className="whitespace-nowrap px-2 py-4">
                  {history?.paymentMethod}
                </td>
                <td className="px-2 py-4 text-green-800">
                  {format(new Date(history?.expiryDate), "dd MMM yyyy")}
                </td>
                <td className="px-2 py-4 text-center">
                  <ActionButtons id={history._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* error message */}
        {histories?.data?.length === 0 && (
          <p className="py-3 text-center font-semibold capitalize">
            No history found!
          </p>
        )}
        {histories?.errors && (
          <p className="py-3 text-center font-semibold capitalize">
            {histories?.errors?.common?.msg}
          </p>
        )}
      </div>
      {/* pagination  */}
      <div className="flex w-full justify-end pr-3">
        <Pagination data={histories} />
      </div>
    </Container>
  );
};

export default SubscriptionList;
