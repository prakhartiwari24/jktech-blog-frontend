import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-facebook-login/dist/facebook-login-render-props");

jest.mock("../../config/api", () => ({
  API_URL: "http://localhost:5002",
}));

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, "Login", "/");
  });

  const renderWithRouter = (ui: React.ReactElement) =>
    render(<BrowserRouter>{ui}</BrowserRouter>);

  it("shows login button if not logged in", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByText(/Login with Google/i)).toBeInTheDocument();
  });

  it("shows logout button if token exists", () => {
    localStorage.setItem("token", "fake-jwt");
    renderWithRouter(<LoginPage />);
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it("removes token on logout and navigates", () => {
    localStorage.setItem("token", "fake-jwt");
    renderWithRouter(<LoginPage />);
    const logoutBtn = screen.getByText(/Logout/i);
    fireEvent.click(logoutBtn);
    expect(localStorage.getItem("token")).toBeNull();
  });
});
