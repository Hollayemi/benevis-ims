"use client"

import { getAllBank } from "@/actions/storeAdmin/bank/bankActions";
import { getSale } from "@/actions/storeAdmin/sales/salesActions";
import DuePaymentForm from "@/components/admin/Due/DuePaymentForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";
import { use } from "react";

const DuePayment = ({ params }) => {
  const { saleId } = use(params);
  const { data: dueSale } = useAsync(getSale, [saleId]);
  //get all bank
  const { data: banks } = useAsync(getAllBank);
  return (
    <Container>
      <PageHeader headText="Due payment" />

      {/* add due payment  */}
      <div className="flex h-full min-h-[75vh] w-full items-center justify-center rounded-md bg-white/50 p-4 px-2 py-5 shadow-sm shadow-primary backdrop-blur">
        <div className="w-full max-w-[400px] rounded p-5 shadow">
          {/* form componet */}
          <DuePaymentForm dueSale={dueSale} banks={banks} />
        </div>
      </div>
    </Container>
  );
};

export default DuePayment;
