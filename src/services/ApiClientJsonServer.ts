import axios from "axios";
import Employee from "../model/Employee";
import ApiClient from "./ApiClient";

export class ApiClientJsonServer implements ApiClient {
  private readonly baseUrl = "http://localhost:3000/employees" as string;

  addEmployee(empl: Employee): Promise<Employee> {
    throw new Error("Method not implemented.");
  }
  updateEmployee(id: number, empl: Partial<Employee>): Promise<Employee> {
    throw new Error("Method not implemented.");
  }
  deleteEmployee(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getEmployee(id: number): Promise<Employee | null> {
    throw new Error("Method not implemented.");
  }
  async getAll(config?: { headers?: any; params?: any }): Promise<Employee[]> {
    try {
      const response = await axios.get(this.baseUrl, config);;
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
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
