"use client";

import { getSupplier } from "@/actions/storeAdmin/supplier/supplierActions";
import UpdateSupplierForm from "@/components/admin/Supplier/SupplierUpdate/UpdateSupplierForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";

const UpdateSupplier = ({ params }) => {
  const supplierId = use(params).supplierId;

  //get supplier by supplier Id
  const supplier = useAsync(getSupplier, [supplierId], [supplierId]).data;

  return (
    <Container>
      {/* add heading */}
      <PageHeader headText="Update Supplier" />
      {/* supplier add form */}
      <section className="flex h-full min-h-[75vh] w-full items-center rounded-md bg-white px-2 py-5 shadow-sm shadow-primary">
        <UpdateSupplierForm supplier={supplier.data} />
      </section>
    </Container>
  );
};

export default UpdateSupplier;
