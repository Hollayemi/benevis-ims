"use client";

import { getReport } from "@/actions/storeAdmin/sales/salesActions"
import ReportFilter from "@/components/admin/Report/SearchFilter"
import ActionButtons from "@/components/admin/Sales/Sales-list/ActionButtons"
import Container from "@/components/common/Container/Container"
import PageHeader from "@/components/common/PageHeader/PageHeader"
import Pagination from "@/components/common/Pagination/Pagination"
import { useAsync } from "@/hook/useAsync";
import { formatDate, reshapePrice } from "@/utils/format"
import { format } from "date-fns"
import { use } from "react";

const Report = ({ searchParams }) => {
  const { page, limit, customer, startDate, endDate, filter, query } = use(searchParams);

  // const sales = await getAllSales({
  //   limit: limit ? parseInt(limit) : undefined,
  //   page: page ? parseInt(page) : undefined,
  //   startDate,
  //   endDate,
  //   filter
  // });

  const { data: result } = useAsync(getReport, [
    limit,
    page,
    customer,
    startDate,
    endDate,
    query,
    filter
  ], [
    limit,
    page,
    customer,
    startDate,
    endDate,
    query,
    filter
  ]) || {};

  const { data, summary, pagination } = result || {};

console.log({ summary })

const CardSample = ({ title, stat, currency }) => (
  <div className="w-52 p-2 h-24 bg-blue-200 shadow rounded-md">
    <h3 className="text-lg ">{title}</h3>

    <h4 className=" font-black text-bold mt-5 text-2xl ">{currency ? reshapePrice(stat) : stat}</h4>
  </div>
)

return (
  <Container>
    <PageHeader headText="Report" rightSide={`${formatDate(startDate,)} - ${formatDate(endDate)}`} />
    <ReportFilter dropdown={summary?.customers} dropdownName={"customer"} status acceptQuery />
    <div className="flex justify-evenly flex-wrap gap-4">
      <CardSample title="Total Orders" stat={summary?.totalOrders} />
      <CardSample title="Total Items" stat={summary?.totalItems} />
      <CardSample title="Total Sales" stat={summary?.totalSale} currency />
      <CardSample title="Due Payment" stat={summary?.due} currency />
      <CardSample title="Bank" stat={summary?.received} currency />
      {/* <CardSample title="Customers" stat={summary.customers?.length} /> */}
    </div>
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
          {data?.map((sale) => (
            <tr
              className="border-b text-center odd:bg-primary/10 even:bg-secondary/5 hover:bg-secondary/10"
              key={sale._id}
            >
              <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-900">
                {sale.buyer || sale.customer?.name || "N/A"}
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
      {data?.length === 0 && (
        <p className="text-md py-4 text-center font-semibold capitalize text-text">
          no sales found!
        </p>
      )}
    </div>

    {/* pagination  */}
    <div className="flex h-full w-full justify-end">
      <Pagination data={pagination} />
    </div>
  </Container>
)
}

export default Report