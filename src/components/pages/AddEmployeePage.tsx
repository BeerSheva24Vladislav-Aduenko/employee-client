import EmployeeForm from '../EmployeeForm'
import useEmployeesMutation from '../../hooks/useEmployeesMutation'
import { apiClient } from '../../services/ApiClientJsonServer'
import Employee from '../../model/Employee'

const AddEmployeePage = () => {
    const mutation = useEmployeesMutation((empl) => apiClient.addEmployee(empl as Employee))
  return (
    <EmployeeForm submitter = {(empl) => mutation.mutate(empl)}></EmployeeForm>
  )
}

export default AddEmployeePage