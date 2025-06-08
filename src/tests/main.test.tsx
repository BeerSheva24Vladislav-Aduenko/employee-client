import { describe, it, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { useUserDataStore } from "../state-management/store";
import Layout from "../components/pages/Layout";
import { Provider } from "../components/ui/provider";
import { BrowserRouter } from "react-router-dom";
import { employees } from "./_mocks_/data/employees-mock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EmployeesTable from "../components/EmployeesTable";
import apiClientTest from "./_mocks_/services/ApiClientTest";

const renderLayout = () => {
  render(
    <Provider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
};

beforeEach(() => {
  useUserDataStore.setState({ userData: null });
  cleanup();
});

describe("Nav items according to auth data", () => {
  it("should render only Login if no authorized user", () => {
    renderLayout();

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/home/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/add/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/statistics/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/search/i)).not.toBeInTheDocument();
  });

  it("should render Home, Search, Statistics, Logout for regular USER", () => {
    useUserDataStore.setState({
      userData: { username: "user", role: "USER", token: "token" },
    });

    renderLayout();

    // screen.debug(undefined, Infinity); - 1ый что выведет(по умолчанию document.body), 2ое количество символов(Infinity без ограничения)
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/statistics/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(screen.queryByText(/add/i)).not.toBeInTheDocument();
  });

  it("should render Home, Search, Statistics, Logout, Add for ADMIN", () => {
    useUserDataStore.setState({
      userData: { username: "admin", role: "ADMIN", token: "token" },
    });

    renderLayout();

    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/statistics/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });
});

describe(`rendering ${employees.length} table cells in the component EmployeesTable`, () => {
  it(` User has role "User" no addition action cells should be render in the table`, async () => {
    useUserDataStore.setState({
      userData: { username: "user", role: "USER", token: "token" },
    });
    render(
      <Provider>
        <QueryClientProvider client={new QueryClient()}>
          <EmployeesTable queryFn={() => apiClientTest.getAll()} />
        </QueryClientProvider>
      </Provider>
    );
    await expect(screen.findAllByText(/vasya/i)).resolves.toHaveLength(
      employees.length
    );
    await expect(
      screen.findByRole("button", { name: /delete/i })
    ).rejects.toThrow();
  });
});

describe(`rendering ${employees.length} table cells in the component EmployeesTable`, () => {
  it(` User has role "Admin" have addition action cells in the table`, async () => {
    useUserDataStore.setState({
      userData: { username: "user", role: "ADMIN", token: "token" },
    });
    render(
      <Provider>
        <QueryClientProvider client={new QueryClient()}>
          <EmployeesTable queryFn={() => apiClientTest.getAll()} />
        </QueryClientProvider>
      </Provider>
    );
    await expect(screen.findAllByText(/vasya/i)).resolves.toHaveLength(
      employees.length
    );
    // await expect(screen.findAllByRole("row")).resolves.toHaveLength(      Проверка по количеству строк
    //   employees.length + 1
    // ); 
    await expect(
      screen.findAllByRole("button", { name: /delete/i })
    ).resolves.toHaveLength(employees.length);
  });
});
