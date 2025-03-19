import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AuthorizeButton from "../src/AuthorizeButton";
import { redirectToAuthCodeFlow } from "../src/Authorize";
import LoginPage from "../src/LoginPage";

// Mock Authorize module
jest.mock("../src/Authorize", () => ({
  redirectToAuthCodeFlow: jest.fn(),  // Mock redirectToAuthCodeFlow function to remove functionality
}));

describe("LoginPage component", () => {  
  it("displays correct title", () => {
    render(<LoginPage />);
    expect(screen.getByText("Album Brackets Game")).toBeTruthy();
  });

  it("renders form correctly", () => {
    const { container } = render(<LoginPage />)
    expect(container.getElementsByClassName("login-form")).toBeTruthy();
  })
});

describe("AuthorizeButton component", () => {
  beforeEach(() => {
    render(<AuthorizeButton />);
  });
  
  it("renders button with correct name", () => {
    expect(screen.getByText("Login with Spotify")).toBeTruthy();
  });

  it("redirects to Spotify when clicked", () => {
    const button = screen.getByText("Login with Spotify");

    fireEvent.click(button);
    expect(redirectToAuthCodeFlow).toHaveBeenCalledWith(
      "90579652abd24038b08f04e236b5731b"
    );
  });
});