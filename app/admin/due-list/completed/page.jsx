"use client";

import { getAllSales } from "@/actions/storeAdmin/sales/salesActions";
import ActionButtons from "@/components/admin/Sales/Sales-list/ActionButtons";
import SearchFilter from "@/components/admin/Sales/Sales-list/SearchFilter";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Pagination from "@/components/common/Pagination/Pagination";
import { useAsync } from "@/hook/useAsync";
import { reshapePrice } from "@/utils/format";
import { format } from "date-fns";
import { use } from "react";

const AllSales = ({ searchParams }) => {
  const { page, limit, query, filter = "completed" } = use(searchParams);
  const { data: sales } = useAsync(getAllSales, [limit, page, query, filter], [limit, page, query, filter]);

  return (
    <Container>
      {/* add page header */}
      <PageHeader headText="Completed Sales" />

      {/* all purchase item table */}
      <div className="table-container relative overflow-x-auto rounded-md shadow-sm shadow-primary">
        <table className="w-full text-left text-sm text-text/80 rtl:text-right">
          <thead className="bg-primary/25 text-center text-xs uppercase text-text">
            <tr>
              <th scope="col" className="px-2 py-4">
                customer name
              </th>

              <th scope="col" className="px-2 py-4">
                payment Method
              </th>
              <th scope="col" className="px-2 py-4">
                payment Status
              </th>
              <th scope="col" className="px-2 py-4">
                Total Price
              </th>
              <th scope="col" className="px-2 py-4">
                Transaction ID
              </th>
              <th scope="col" className="px-2 py-4">
                date
              </th>
              <th scope="col" className="px-2 py-4 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* showing sales */}
            {sales?.data?.map((sale) => (
              <tr
                className="border-b text-center odd:bg-primary/10 even:bg-secondary/5 hover:bg-secondary/10"
                key={sale._id}
              >
                <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-900">
                  {sale.customer?.name || "N/A"}
                </td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-2 py-4 font-medium capitalize text-gray-900"
                >
                  {sale?.paymentMethod}
                </th>
                <th
                  scope="row"
                  className="whitespace-nowrap px-2 py-4 font-medium"
                >
                  <span
                    className={`rounded-md px-1 capitalize ${sale?.paymentStatus === "due" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
                  >
                    {sale?.paymentStatus}
                  </span>
                </th>
                <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-800">
                  {reshapePrice(sale?.totalPrice)}
                </td>
                <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-800">
                  {sale?.trxid || "N/A"}
                </td>
                <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-800">
                  {format(new Date(sale?.createdAt), "dd MMM yyyy")}
                </td>
                <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-800">
                  <ActionButtons id={sale._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sales?.data?.length === 0 && (
          <p className="text-md py-4 text-center font-semibold capitalize text-text">
            no sales found!
          </p>
        )}
      </div>
      {/* pagination  */}
      <div className="flex h-full w-full justify-end">
        <Pagination data={sales} />
      </div>
    </Container>
  );
};

export default AllSales;
