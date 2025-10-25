"use client";

import { getCategories } from "@/actions/storeAdmin/category/categoryActions";
import { getPurchase } from "@/actions/storeAdmin/purchase/purchaseActions";
import { getSale } from "@/actions/storeAdmin/sales/salesActions";
import { getSuppliers } from "@/actions/storeAdmin/supplier/supplierActions";
import PurchaseUpdateForm from "@/components/admin/Purchase/PurchaseUpdateForm";
import SaleUpdateForm from "@/components/admin/Sales/Update/form";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { use } from "react";


const PurchaseUpdate = ({ params }) => {
  const saleId = use(params).id;
  //get categories
  const { data: categories } = useAsync(getCategories);
  //get suppliers
  const { data: suppliers } = useAsync(getSuppliers);
  //get purchase details by id
  const { data: sale } = useAsync(getSale, [saleId], [saleId]);


  return (
    <Container>
      {/* add page header */}
      <PageHeader headText="Update sale" />

      {/* update product form */}
      <SaleUpdateForm
        categories={categories}
        suppliers={suppliers}
        sale={sale}
      />
    </Container>
  );
};

export default PurchaseUpdate;
