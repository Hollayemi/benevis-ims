

import AddSupplierForm from "@/components/admin/Supplier/AddSupplier/AddSupplierForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";

const AddSupplier = () => {
  return (
    <Container>
      {/* page heading */}
      <PageHeader headText="Add supplier" />
      {/* supplier add form */}
      <section className="flex h-full min-h-[75vh] w-full items-center rounded-md bg-white/50 px-2 py-5 shadow-sm shadow-primary">
        <AddSupplierForm />
      </section>
    </Container>
  );
};

export default AddSupplier;
