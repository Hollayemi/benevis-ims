"use client";

import { getReport } from "@/actions/storeAdmin/stock/stockActions"
import ReportFilter from "@/components/admin/Report/SearchFilter"
import Container from "@/components/common/Container/Container"
import PageHeader from "@/components/common/PageHeader/PageHeader"
import { formatDate, reshapePrice } from "@/utils/format"

const Report = ({ searchParams }) => {
    const { startDate, endDate, productId } = searchParams;

    const { data: result } = useAsync(getReport, [startDate, endDate, productId]
    , [startDate, endDate, productId]) || {}

    console.log({ result })

    // const CardSample = ({ title, stat, currency }) => (
    //     <div className="w-52 p-2 h-24 bg-blue-200 shadow rounded-md">
    //         <h3 className="text-lg ">{title}</h3>

    //         <h4 className=" font-black text-bold mt-5 text-2xl ">{currency ? reshapePrice(stat) : stat}</h4>
    //     </div>
    // )

    return (
        <Container>
            <PageHeader headText="Stock Report" rightSide={`${formatDate(startDate,)} - ${formatDate(endDate)}`} />
            <ReportFilter />

            {/* all purchase item table */}
            <div className="table-container relative overflow-x-auto rounded-md shadow-sm shadow-primary">
                <table className="w-full text-left text-sm text-text/80 rtl:text-right">
                    <thead className="bg-primary/25 text-center text-xs uppercase text-text">
                        <tr>
                            <th scope="col" className="px-2 py-4">
                                Product Name
                            </th>
                            <th scope="col" className="px-2 py-4">
                                Supplier
                            </th>
                            <th>
                                Amount Sold
                            </th>
                            <th scope="col" className="px-2 py-4">
                                Opened With
                            </th>
                            <th scope="col" className="px-2 py-4">
                                Quantity Added
                            </th>
                            <th scope="col" className="px-2 py-4">
                                Closing With
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* showing sales */}
                        {result?.map((report, i) => (
                            <tr
                                className="border-b text-center odd:bg-primary/10 even:bg-secondary/5 hover:bg-secondary/10"
                                key={i}
                            >
                                <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-900">
                                    {report.product.name || "N/A"}
                                </td>
                                <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-900">
                                    {report.supplier.name || "N/A"}
                                </td>
                                <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-900">
                                    {report.amountSold || 0}
                                </td>
                                <th
                                    scope="row"
                                    className="whitespace-nowrap px-2 py-4 font-medium capitalize text-gray-900"
                                >
                                    {report?.openedWith}
                                </th>
                                <th
                                    scope="row"
                                    className="whitespace-nowrap px-2 py-4 font-medium"
                                >
                                    <span>
                                        {report?.amountAdded}
                                    </span>
                                </th>
                              
                                <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-800">
                                    {report?.closingWith || "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {result?.length === 0 && (
                    <p className="text-md py-4 text-center font-semibold capitalize text-text">
                        no data found!
                    </p>
                )}
            </div>

            {/* pagination  */}
            {/* <div className="flex h-full w-full justify-end">
                <Pagination data={pagination} />
            </div> */}
        </Container >

    )
}

export default Report