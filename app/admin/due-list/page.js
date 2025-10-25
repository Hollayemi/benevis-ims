"use client"

import { getDueSales } from "@/actions/storeAdmin/sales/salesActions";
import DueContainer from "@/components/admin/Due/DueContainer";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";
import { use } from "react";

const DueList = ({ searchParams }) => {
  const { page, limit } = use(searchParams);
  const { data: dueData } = useAsync(getDueSales, [limit, page], [limit, page]);

  return (
    <Container>
      <PageHeader headText="Due list" />

      {/* due container */}
      <DueContainer data={dueData} page={page} limit={limit} />
    </Container>
  );
};

export default DueList;
