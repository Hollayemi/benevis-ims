"use client";

import { getCategories } from "@/actions/storeAdmin/category/categoryActions";
import { getStock } from "@/actions/storeAdmin/stock/stockActions";
import { getSuppliers } from "@/actions/storeAdmin/supplier/supplierActions";
import StockUpdateForm from "@/components/admin/Stock/StockUpdateForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";
import { use } from "react";

const UpdateStock = ({ params }) => {
  const stockId = use(params).stockId;
  //get categories
  const categories = useAsync(getCategories).data;
  //get suppliers
  const suppliers = useAsync(getSuppliers).data;
  //get purchase details by id
  const stock = useAsync(getStock, [stockId], [stockId]).data;

  return (
    <Container>
      {/* add page header */}
      <PageHeader headText="Update Stock" />

      {/* update product form */}
      <StockUpdateForm
        categories={categories}
        suppliers={suppliers}
        stock={stock}
      />
    </Container>
  );
};

export default UpdateStock;
