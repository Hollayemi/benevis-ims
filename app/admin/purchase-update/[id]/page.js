"use client";

import { getCategories } from "@/actions/storeAdmin/category/categoryActions";
import { getPurchase } from "@/actions/storeAdmin/purchase/purchaseActions";
import { getSuppliers } from "@/actions/storeAdmin/supplier/supplierActions";
import PurchaseUpdateForm from "@/components/admin/Purchase/PurchaseUpdateForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";
import { use } from "react"

const PurchaseUpdate = ({ params }) => {
  const purchaseId = use(params).id;
  //get categories
  const categories = useAsync(getCategories, [], [])?.data || {};
  //get suppliers
  const suppliers = useAsync(getSuppliers, [], [])?.data || {};
  //get purchase details by id
  const purchase = useAsync(getPurchase, [purchaseId], [purchaseId])?.data || {};

  return (
    <Container>
      {/* add page header */}
      <PageHeader headText="Update purchase" />

      {/* update product form */}
      <PurchaseUpdateForm
        categories={categories}
        suppliers={suppliers}
        purchase={purchase}
      />
    </Container>
  );
};

export default PurchaseUpdate;
