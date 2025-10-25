"use client";

import { getAEmployee } from "@/actions/storeAdmin/employee/employeeActions";
import AddSalaryForm from "@/components/admin/Employee/AddSalaryForm";
import HistoryCard from "@/components/admin/Employee/HistoryCard";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { useAsync } from "@/hook/useAsync";
import { format } from "date-fns";
import { use } from "react";

const EmployeeDetails = ({ params }) => {
  const employeeId =  use(params).employeeId;
  const employee = useAsync(getAEmployee, [employeeId], [employeeId]);

  return (
    <Container>
      <PageHeader headText="employee Details" />
      {/* details */}
      <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <div className="space-y-1 rounded p-3 shadow">
              <h2 className="text-md font-semibold capitalize">
                Employee Name
              </h2>
              <p className="text-gray-800">{employee?.data?.name}</p>
            </div>
            <div className="space-y-1 rounded p-3 shadow">
              <h2 className="text-md font-semibold capitalize">
                Employee email
              </h2>
              <p className="text-gray-800">{employee?.data?.email}</p>
            </div>
            <div className="space-y-1 rounded p-3 shadow">
              <h2 className="text-md font-semibold capitalize">
                Employee phone
              </h2>
              <p className="text-gray-800">{employee?.data?.phone}</p>
            </div>
            <div className="space-y-1 rounded p-3 shadow">
              <h2 className="text-md font-semibold capitalize">
                Employee position
              </h2>
              <p className="text-gray-800">{employee?.data?.position}</p>
            </div>
            <div className="space-y-1 rounded p-3 shadow">
              <h2 className="text-md font-semibold capitalize">
                Employee joining date
              </h2>
              <p className="text-gray-800">
                {format(new Date(employee?.data?.joiningDate), "dd MMM yyyy")}
              </p>
            </div>
            <div className="space-y-1 rounded p-3 shadow">
              <h2 className="text-md font-semibold capitalize">
                Employee monthly Salary
              </h2>
              <p className="text-gray-800">
                ₦ {employee?.data?.monthlySalary}.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded shadow shadow-primary">
              <div className="space-y-1 rounded p-2 shadow sm:p-3">
                <h2 className="text-md pb-2 font-semibold capitalize">
                  salary History
                </h2>
                <div className="flex h-full max-h-[300px] w-full flex-wrap space-y-1 overflow-x-auto px-1 sm:px-2">
                  {employee?.data?.salaryHistory?.length > 0 ? (
                    employee?.data?.salaryHistory
                      .reverse()
                      .map((salary) => (
                        <HistoryCard
                          key={salary?._id}
                          salary={salary}
                          employeeId={employeeId}
                        />
                      ))
                  ) : (
                    <p className="text-sm font-semibold capitalize">
                      No salary History found!
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded shadow shadow-primary">
              <div className="space-y-1 rounded p-2 shadow sm:p-3">
                <h2 className="text-md pb-2 font-semibold capitalize">
                  Add Salary
                </h2>
                <div className="space-y-1 rounded p-2">
                  <AddSalaryForm employeeId={employee?.data?._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EmployeeDetails;
