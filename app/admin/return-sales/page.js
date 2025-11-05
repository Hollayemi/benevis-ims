"use client";

import { returnSales } from "@/actions/storeAdmin/returnSale/returnSaleActions";
import ReturnSaleItem from "@/components/admin/ReturnSales/ReturnSaleItem";
import SearchContainer from "@/components/admin/ReturnSales/SearchContainer";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Pagination from "@/components/common/Pagination/Pagination";
import { useAsync } from "@/hook/useAsync";
import { use } from "react";

export const dynamic = "force-dynamic";

const ReturnSales = ({ searchParams }) => {
  const { page, limit } = use(searchParams);
  const returnSale = useAsync(returnSales, [limit, page], [limit, page]).data;

  return (
    <Container>
      <PageHeader headText="Return Sale" />
      <div className="space-y-10 rounded-md bg-white/50 px-2 py-5 shadow-md backdrop-blur">
        <SearchContainer />

        <div className="space-y-3">
          <p className="text-sm font-medium capitalize">return sale list</p>

          <div className="space-y-5">
            <div className="table-container relative overflow-x-auto rounded-md shadow-sm shadow-primary">

              <table className="w-full text-left text-sm text-text/80 rtl:text-right">
                <thead className="bg-primary/25 text-center text-xs uppercase text-text">
                  <tr>
                    <th scope="col" className="px-2 py-4">
                      Product image
                    </th>
                    <th scope="col" className="px-2 py-4">
                      Product name
                    </th>
                    <th scope="col" className="px-2 py-4">
                      customer name
                    </th>
                    <th scope="col" className="px-2 py-4">
                      Quantity
                    </th>
                    <th scope="col" className="px-2 py-4">
                      total Price
                    </th>
                    <th scope="col" className="px-2 py-4">
                      Transaction ID
                    </th>
                    <th scope="col" className="px-2 py-4">
                      returned Date
                    </th>
                    <th scope="col" className="px-2 py-4 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {returnSale?.data &&
                    returnSale?.data?.map((item) => (
                      <ReturnSaleItem key={item._id} sale={item} />
                    ))}
                </tbody>
              </table>
        
              {returnSale?.data?.length === 0 && (
                <p className="py-3 text-center font-semibold text-primary">
                  No Return Sales Found!
                </p>
              )}
            </div>

            <div className="flex w-full justify-end pr-3">
              <Pagination data={returnSale} />
            </div>

          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReturnSales;
