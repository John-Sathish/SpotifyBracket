import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UserManual from "../src/UserManual"
import { BrowserRouter } from "react-router-dom";

//Mock useNavigate to remove functionality
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));

describe('UserManual Component', () => {
    beforeEach(() => {
        render(<BrowserRouter><UserManual /></BrowserRouter>);
      });
    
    it('displays correct title', () => {
        expect(screen.getByText("How To Play")).toBeTruthy();
    });

    it('renders all information boxes', () => {
        expect(screen.getByText("Choose Your Game")).toBeTruthy();
        expect(screen.getByText("Vote For An Album")).toBeTruthy();
        expect(screen.getByText("Still Interested?")).toBeTruthy();
    });

    it("renders share and home button", () => {
        const { container } = render(<BrowserRouter><UserManual /></BrowserRouter>);
        expect(container.getElementsByClassName("sharebutton")).toBeTruthy();
        expect(container.getElementsByClassName("homebutton")).toBeTruthy();
    });
});