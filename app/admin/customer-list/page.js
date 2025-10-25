"use client";

import { getCustomers } from "@/actions/storeAdmin/customer/customerActions";
import CustomerItem from "@/components/admin/Customer/CustomerItem";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Pagination from "@/components/common/Pagination/Pagination";
import { useAsync } from "@/hook/useAsync";
import { use } from "react";


const CustomerList =  ({ searchParams }) => {
  const { page, limit } = use(searchParams);

  const data = useAsync(getCustomers, [limit, page], [limit, page]).data;

  // decide what to render
  let content;

  if (data?.errors) {
    content = <p className="py-3 text-center">{data?.errors?.common?.msg}</p>;
  }

  if (data?.data && data?.data?.length > 0) {
    content = data?.data?.map((customer) => (
      <CustomerItem key={customer._id} customer={customer} />
    ));
  }

  return (
    <Container className="group relative w-full">
      {/* add page header */}
      <PageHeader headText="customer List" />
      {/* category table */}
      <div className="table-container relative overflow-x-auto rounded-md shadow-sm shadow-primary">
        <table className="w-full text-left text-sm text-text/80 rtl:text-right">
          <thead className="text-nowrap bg-primary/25 text-center text-xs uppercase text-text">
            <tr>
              <th scope="col" className="px-2 py-4">
                image
              </th>
              <th scope="col" className="px-2 py-4">
                name
              </th>
              <th scope="col" className="px-2 py-4">
                email
              </th>
              <th scope="col" className="px-2 py-4">
                phone
              </th>
              <th scope="col" className="px-2 py-4">
                address
              </th>
              <th scope="col" className="px-2 py-4 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
        {data?.data && data?.data?.length === 0 && (
          <p className="py-4 text-center font-medium text-black/70">
            No customer found!
          </p>
        )}
      </div>

      {/* pagination  */}
      <div className="flex w-full justify-end pr-3">
        <Pagination data={data} />
      </div>
    </Container>
  );
};
export default CustomerList;
