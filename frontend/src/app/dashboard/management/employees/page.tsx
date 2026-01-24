import { Subtitle, Title } from "@/src/components/features";
import { ManageEmployeesDataTable } from "@/src/components/features/tables/manage-employees-table/ManageEmployeesDataTable";

export default function ArticlePage() {
  return (
    <div className="h-full max-w-[1000px] mx-auto">
      <div>
        <Title>Manage Employees</Title>
        <Subtitle>Manage your employees and follow their progress</Subtitle>
      </div>
      <ManageEmployeesDataTable />
    </div>
  );
}
