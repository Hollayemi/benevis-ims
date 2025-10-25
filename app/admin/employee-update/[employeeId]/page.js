"use client";

import { getAEmployee } from "@/actions/storeAdmin/employee/employeeActions";
import EmployeeUpdateForm from "@/components/admin/Employee/EmployeeUpdateForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";


const UpdateEmployee = ({ params }) => {
  const employeeId = use(params).employeeId;

  const employee = useAsync(getAEmployee, [employeeId], [employeeId]).data;
  return (
    <Container>
      {/* add page header */}
      <PageHeader headText="add purchase" />

      <div className="flex h-full min-h-[75vh] w-full items-center justify-center rounded-md bg-white/50 p-4 px-2 py-5 shadow-sm shadow-primary backdrop-blur">
        <div className="w-full max-w-[600px]">
          {/* update employee form */}
          <EmployeeUpdateForm employee={employee} />
        </div>
      </div>
    </Container>
  );
};

export default UpdateEmployee;
