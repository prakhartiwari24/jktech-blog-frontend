import { render, screen, waitFor } from "@testing-library/react";
import PostDetailPage from "./PostDetailPage";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "123" }),
    useNavigate: () => mockNavigate,
  };
});
jest.mock("../../config/api", () => ({
  API_URL: "http://localhost:5002",
}));

describe("PostDetailPage", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    localStorage.setItem("token", "test-token");
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const renderPage = () =>
    render(
      <BrowserRouter>
        <PostDetailPage />
      </BrowserRouter>
    );

  it("displays post title and body after fetching", async () => {
    mockAxios
      .onGet("http://localhost:5002/posts/123")
      .reply(200, { title: "Test Post", body: "Post content goes here." });

    renderPage();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Post")).toBeInTheDocument();
      expect(screen.getByText("Post content goes here.")).toBeInTheDocument();
    });
  });

  it("handles fetch error and displays message", async () => {
    mockAxios.onGet("http://localhost:5002/posts/123").reply(404);

    renderPage();

    const error = await screen.findByText(/failed to fetch/i);
    expect(error).toBeInTheDocument();
  });
});
