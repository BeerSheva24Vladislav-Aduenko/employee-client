import { describe, it, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { useUserDataStore } from "../state-management/store";
import Layout from "../components/pages/Layout";
import { Provider } from "../components/ui/provider";
import { BrowserRouter } from "react-router-dom";

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

    // screen.debug(undefined, Infinity);
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
