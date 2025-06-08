import Employee from "../../../model/Employee";
import ApiClient from "../../../services/ApiClient";
import { employees } from "../data/employees-mock";
 class ApiClientTest implements ApiClient {
  setToken(_: string): void {}
  addEmployee(_: Employee): Promise<Employee> {
    return Promise.resolve({
      id: "7",
      fullName: "Vasya Pupkin",
      birthDate: "2000-01-01",
      avatar: "",
      department: "QA",
      salary: 10000,
    });
  }
  updateEmployee(updater: {
    id: string;
    empl: Partial<Employee>;
  }): Promise<Employee> {
    return Promise.resolve({
      id: "1",
      fullName: "Vasya Pupkin",
      birthDate: "2000-01-01",
      avatar: "",
      department: "QA",
      salary: 20000,
    });
  }
  deleteEmployee(id: string): Promise<Employee> {
    return Promise.resolve({
      id: "1",
      fullName: "Vasya Pupkin",
      birthDate: "2000-01-01",
      avatar: "",
      department: "QA",
      salary: 20000,
    });
  }
  getEmployee(id: string): Promise<Employee | null> {
    return Promise.resolve({
      id: "1",
      fullName: "Vasya Pupkin",
      birthDate: "2000-01-01",
      avatar: "",
      department: "QA",
      salary: 20000,
    });
  }
  getAll(config?: { headers?: any; params?: any }): Promise<Employee[]> {
    return Promise.resolve(employees);
  }
  getBySalary(
    minSalary: number,
    maxSalary: number,
    config?: { headers?: any; params?: any }
  ): Promise<Employee[]> {
    throw new Error("Method not implemented.");
  }
  getByAge(
    minAge: number,
    maxAge: number,
    config?: { headers?: any; params?: any }
  ): Promise<Employee[]> {
    throw new Error("Method not implemented.");
  }
}


const apiClientTest = new ApiClientTest();
export default apiClientTest;