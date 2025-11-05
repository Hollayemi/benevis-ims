"use client";

import { getSuppliers } from "@/actions/storeAdmin/supplier/supplierActions";
import SupplierItems from "@/components/admin/Supplier/Supplier-list/SupplierItems";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Pagination from "@/components/common/Pagination/Pagination";
import { useAsync } from "@/hook/useAsync";
import { use } from "react";

const SupplierList = ({ searchParams }) => {
  const { page, limit } = use(searchParams);
  const suppliers = useAsync(getSuppliers, [limit, page], [limit, page]).data;

  return (
    <Container>
      {/* add heading */}
      <PageHeader headText="Supplier list" />
      {/* table */}
      {/* all supplier list table */}

      <SupplierItems suppliers={suppliers} />

      {/* pagination  */}
      <div className="flex w-full justify-end pr-3">
        <Pagination data={suppliers} />
      </div>
    </Container>
  );
};

export default SupplierList;
