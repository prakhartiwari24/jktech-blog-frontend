import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardPage from "./DashBoard";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("../../config/api", () => ({
  API_URL: "http://localhost:5002",
}));
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("DashboardPage", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    localStorage.setItem("token", "test-token");
    mockAxios = new MockAdapter(axios);
    mockAxios.onGet("http://localhost:5002/posts").reply(200, []);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockAxios.reset();
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

  it("navigates to create post page when Create Post button is clicked", async () => {
    renderComponent();

    const createBtn = await screen.findByRole("button", {
      name: /create post/i,
    });
    await userEvent.click(createBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/create");
  });

  it("navigates to post detail on card click", async () => {
    mockAxios
      .onGet("http://localhost:5002/posts")
      .reply(200, [{ _id: "123", title: "Test Post", body: "Some content" }]);

    renderComponent();

    const postCard = await screen.findByText("Test Post");
    await userEvent.click(postCard);

    expect(mockNavigate).toHaveBeenCalledWith("/post/123");
  });
});
