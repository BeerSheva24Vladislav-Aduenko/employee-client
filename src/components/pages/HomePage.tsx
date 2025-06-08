import EmployeesTable from "../EmployeesTable";
import useEmployeesQuery from "../../state-management/store";
import { apiClient } from "../../services/ApiClientJsonServer";
import useEmployeesMutation from "../../hooks/useEmployeesMutation";
import { Text } from "@chakra-ui/react";

const HomePage = () => {
  const department = useEmployeesQuery((s) => s.employeeQuery.department);
  const mutation = useEmployeesMutation((id) =>
    apiClient.deleteEmployee(id as string)
  );

  return (
    <>
      {mutation.isError && (
        <Text color="red.500"> {mutation.error.message}</Text>
      )}
      <EmployeesTable
        queryFn={() => apiClient.getAll({ params: { department } })}
        deleteEmployee={(id) => mutation.mutate(id)}
        isDeleting={mutation.isPending}
      />
    </>
  );
};

export default HomePage;
