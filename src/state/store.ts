import { create } from "zustand";
import Employee from "../model/Employee";

interface EmployeeState {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  clearEmployees: () => void;
}

export const useEmployeeStore = create<EmployeeState>()((set) => ({
  employees: [],
  setEmployees: (employees: Employee[]) => set({ employees }),
  clearEmployees: () => set({ employees: [] }),
}));
