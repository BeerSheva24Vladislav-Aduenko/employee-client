import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useUserDataStore } from "../state-management/store";
import Layout from "../components/pages/Layout";
import { Provider } from "../components/ui/provider";
import { BrowserRouter } from "react-router-dom";

describe("Nav items according to auth data", () => {
  it("should render only Login if no authorized user", () => {
    useUserDataStore.setState({ userData: null });
  });
  render(
    <Provider>
      <BrowserRouter>
        <Layout></Layout>
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/home/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/add/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/statistics/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/search/i)).not.toBeInTheDocument();
});
