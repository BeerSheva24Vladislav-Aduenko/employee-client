import { Spinner, Table, Text, Image } from "@chakra-ui/react";
import { useEmployees } from "./hooks/useEmployees";
const App = () => {
  const { data: employees, isLoading, error } = useEmployees();

  const getData = (date: string) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  
  return isLoading ? (
    <Spinner></Spinner>
  ) : (
    <>
      {error?.message ? (
        <Text color="red" fontSize={"2.5rem"}>
          {error.message}
        </Text>
      ) : (
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Avatar</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Birth Day</Table.ColumnHeader>
              <Table.ColumnHeader>Job Department</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Salary</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {employees?.map((e) => (
              <Table.Row key={e.id}>
                <Table.Cell>
                  <Image
                    src={e.avatar}
                    alt={e.fullName}
                    rounded="md"
                    width="100px"
                  />
                </Table.Cell>
                <Table.Cell>{e.fullName}</Table.Cell>
                <Table.Cell>{getData(e.birthDate)}</Table.Cell>
                <Table.Cell>{e.department}</Table.Cell>
                <Table.Cell textAlign="end">{e.salary}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};

export default App;
