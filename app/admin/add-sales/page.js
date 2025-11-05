"use client";

import { getAllBank } from "@/actions/storeAdmin/bank/bankActions";
import { getAllCustomer } from "@/actions/storeAdmin/customer/customerActions";
import AddSalesContainer from "@/components/admin/Sales/AddSales/AddSalesContainer";
import CartItemsContainer from "@/components/admin/Sales/AddSales/CartItemsContainer";
import PaymentContainer from "@/components/admin/Sales/AddSales/PaymentContainer";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";

export const dynamic = "force-dynamic";


const AddSales = () => {
  //get all customer
  const { data: customers } = useAsync(getAllCustomer);

  //get all bank
  const { data: banks } = useAsync(getAllBank);

  return (
    <Container>
      {/* add page header */}
      <PageHeader headText="Add Sales" />
      {/*  */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="col-span-2 space-y-5">
          {/* search products  and add to cart*/}
          <AddSalesContainer />

          {/* add to cart items list */}
          <CartItemsContainer />
        </div>

        {/* payment section */}
        <PaymentContainer customerData={customers} banks={banks} />
      </div>
    </Container>
  );
};

export default AddSales;
