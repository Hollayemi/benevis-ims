"use client";

import { getCategories } from "@/actions/storeAdmin/category/categoryActions";
import { getSuppliers } from "@/actions/storeAdmin/supplier/supplierActions";
import StockForm from "@/components/admin/Stock/StockForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";
import { Suspense } from "react";


const AddStock = () => {
  //get categories
  const { data: categories } = useAsync(getCategories);
  //get suppliers
  const { data: suppliers } = useAsync(getSuppliers);
  return (
    <Container>
      {/* add page header */}
      <PageHeader
        headText="add stock"
        link="/admin/stock-list"
        linkName="stock list"
      />

      <Suspense fallback={<p className="py-2 text-sm">Loading...</p>}>
        {/* add stock form */}
        <StockForm categories={categories} suppliers={suppliers} />
      </Suspense>
    </Container>
  );
};

export default AddStock;
