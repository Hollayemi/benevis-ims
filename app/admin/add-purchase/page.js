"use client";

import { getCategories } from "@/actions/storeAdmin/category/categoryActions";
import { getSuppliers } from "@/actions/storeAdmin/supplier/supplierActions";
import PurchaseForm from "@/components/admin/Purchase/PurchaseForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";
import { Suspense } from "react";

export const dynamic = "force-dynamic";


const AddPurchase = () => {
  //get categories
  const { data: categories } = useAsync(getCategories);
  //get suppliers
  const { data: suppliers } = useAsync(getSuppliers);
  
  return (
    <Container>
      {/* add page header */}
      <PageHeader headText="add purchase" />

      {/* add product form */}
      <Suspense fallback={<p className="pt-1 text-sm">...</p>}>
        <PurchaseForm categories={categories} suppliers={suppliers} />
      </Suspense>
    </Container>
  );
};

export default AddPurchase;
