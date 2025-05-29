import { useQuery } from "@tanstack/react-query";
import { ApiClientJsonServer } from "../services/ApiClientJsonServer";
import Employee from "../model/Employee";

const apiClient = new ApiClientJsonServer();

export const useEmployees = () => {
  return useQuery<Employee[], Error>({
    queryKey: ["employees"],
    queryFn: () => apiClient.getAll(),
    staleTime: 1000 * 60
  });
};
