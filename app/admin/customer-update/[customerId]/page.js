"use client";

import { getACustomer } from "@/actions/storeAdmin/customer/customerActions";
import CustomerUpdateForm from "@/components/admin/Customer/CustomerUpdateForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";

const CustomerUpdate = (props) => {
  const params = use(props).params;

  const { customerId } = params;

  // get a customer for showing update customer form
  const { data: customer } = useAsync(getACustomer, [customerId], [customerId]) || {};

  return (
    <Container>
      {/* page heading */}
      <PageHeader headText={"Update customer"} />
      {/* update form */}
      <div className="flex h-[75vh] w-full items-center justify-center rounded-md bg-white px-2 py-5 shadow-sm shadow-primary">
        <div className="w-full max-w-[400px] rounded p-5 shadow">
          {/* form componet */}
          <CustomerUpdateForm customer={customer} />
        </div>
      </div>
    </Container>
  );
};

export default CustomerUpdate;
