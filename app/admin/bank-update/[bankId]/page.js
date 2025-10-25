"use client";

import { getABank } from "@/actions/storeAdmin/bank/bankActions";
import UpdateBankForm from "@/components/admin/Bank/UpdateBankForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";
import { use } from "react";

const BankUpdate = ({ params }) => {
  const { bankId } = use(params);

  const { data: bank } = useAsync(getABank, [bankId], [bankId]);

  return (
    <Container>
      {/* page heading */}
      <PageHeader headText={"Update Bank"} />
      {/* update form */}
      <div className="flex h-full min-h-[75vh] w-full items-center justify-center rounded-md bg-white/50 p-4 px-2 py-5 shadow-sm shadow-primary backdrop-blur">
        <div className="w-full max-w-[400px] rounded p-5 shadow">
          {/* form componet */}
          <UpdateBankForm bank={bank?.data} />
        </div>
      </div>
    </Container>
  );
};

export default BankUpdate;
