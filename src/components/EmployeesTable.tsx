import { Avatar, Box, Spinner, Table, Text, Button } from "@chakra-ui/react";
import useEmployees from "../hooks/useEmployees";
import { MutationFunction, QueryFunction } from "@tanstack/react-query";
import Employee from "../model/Employee";
import { FC } from "react";
import DepartmentSelector from "./DepartmentSelector";
import useEmployeesMutation from "../hooks/useEmployeesMutation";
import { apiClient } from "../services/ApiClientJsonServer";
import { useColorModeValue } from "./ui/color-mode";
interface Props {
  queryFn: QueryFunction<Employee[]>
}
const EmployeesTable: FC<Props> = ({queryFn}) => {
 
  const { data: employees, error, isLoading } = useEmployees(queryFn);
  const mutationDelete = useEmployeesMutation((id) => apiClient.deleteEmployee(id as string));
  const mutationUpdate = useEmployeesMutation((updater) =>
     apiClient.updateEmployee(updater as {id: string, empl: Partial<Employee>}))
   function deleteFun(empl: Employee) {
    if(confirm(`You are going to delete employee ${empl.fullName}`)) {
      mutationDelete.mutate(empl.id);
    }
  }
  return (
    <>
      {error ? (
        <Text>{error.message}</Text>
      ) : (
        <>
          {isLoading && <Spinner></Spinner>}
          <Box marginLeft={"30vw"} marginBottom = "2vh">
            <DepartmentSelector></DepartmentSelector>
          </Box>
          <Table.ScrollArea borderWidth="1px" rounded="md" height="50vh" >
            <Table.Root size="sm" stickyHeader className="table">
              <Table.Header fontSize={{sm:"1.1rem",md:"1.2"}}>
                <Table.Row bg="bg.subtle" zIndex={"auto"}>
                  <Table.ColumnHeader hideBelow={"md"}></Table.ColumnHeader>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Department</Table.ColumnHeader>
                  <Table.ColumnHeader  hideBelow={"sm"} >Salary</Table.ColumnHeader>
                  <Table.ColumnHeader  hideBelow={"sm"} >Birthdate</Table.ColumnHeader>
                  <Table.ColumnHeader  ></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {employees?.map((empl) => (
                  <Table.Row key={empl.id} >
                    <Table.Cell  hideBelow={"md"}>
                      <Avatar.Root>
                        <Avatar.Fallback name={empl.fullName} />
                        <Avatar.Image src={empl.avatar} />
                      </Avatar.Root>
                    </Table.Cell>
                    <Table.Cell>{empl.fullName}</Table.Cell>
                    <Table.Cell>{empl.department}</Table.Cell>
                    <Table.Cell  hideBelow={"sm"}>{empl.salary}</Table.Cell>
                    <Table.Cell  hideBelow={"sm"}>{empl.birthDate}</Table.Cell>
                    <Table.Cell  >
                      <Button onClick={()=>deleteFun(empl)} bg={useColorModeValue("red.500", "red.200")}>DELETE</Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </>
      )}
    </>
  );
};

export default EmployeesTable;
