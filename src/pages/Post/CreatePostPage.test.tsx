import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePostPage from "./CreatePostPage";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
jest.mock("../../config/api", () => ({
  API_URL: "http://localhost:5002",
}));

describe("CreatePostPage", () => {
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
        <CreatePostPage />
      </BrowserRouter>
    );

  it("renders the form fields", () => {
    renderPage();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/body/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("allows user to type in title and body", async () => {
    renderPage();

    const titleInput = screen.getByLabelText(/title/i);
    const bodyInput = screen.getByLabelText(/body/i);

    await userEvent.type(titleInput, "My Awesome Post");
    await userEvent.type(bodyInput, "This is the body of the post.");

    expect(titleInput).toHaveValue("My Awesome Post");
    expect(bodyInput).toHaveValue("This is the body of the post.");
  });

  it("submits the form and navigates to dashboard", async () => {
    mockAxios
      .onPost("http://localhost:5002/posts")
      .reply(201, { message: "Post created" });

    renderPage();

    await userEvent.type(screen.getByLabelText(/title/i), "Test Title");
    await userEvent.type(screen.getByLabelText(/body/i), "Test Body");

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });
});
