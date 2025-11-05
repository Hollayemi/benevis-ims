

import AddCategoryForm from "@/components/admin/AddCategory/AddCategoryForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";

const AddCategory = () => {
  return (
    <Container>
      {/* add page header */}
      <PageHeader headText="add category" />

      {/* add category form */}
      <div className="flex h-full min-h-[75vh] w-full items-center justify-center rounded-md bg-white/50 p-4 px-2 py-5 shadow-sm shadow-primary backdrop-blur">
        <div className="w-full max-w-[600px] rounded p-5 shadow">
          {/* form componet */}
          <AddCategoryForm />
        </div>
      </div>
    </Container>
  );
};

export default AddCategory;
