import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import Start from '../src/Start';

//Mock useNavigate to remove functionality
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));

describe('Start Component', () => {
    beforeEach(() => {
        render(<BrowserRouter><Start /></BrowserRouter>);
      });
    
    it('displays the username in the title', () => {
        expect(screen.getByText(/Hello/i)).toBeTruthy();
    });
  
    it("renders Saved Albums button with correct name", () => {
        expect(screen.getByText("Saved Albums")).toBeTruthy();
    });
  
    it("renders New Release button with correct name", () => {
        expect(screen.getByText("New Release")).toBeTruthy();
    });

    it("renders correct num albums buttons when Saved Albums button is clicked", () => {
        const button = screen.getByText("Saved Albums");
        
        fireEvent.click(button);
        
        expect(screen.getByText("8 Albums")).toBeTruthy();
        expect(screen.getByText("16 Albums")).toBeTruthy();
        expect(screen.getByText("32 Albums")).toBeTruthy();
    });

    it("renders correct num albums buttons when New Release button is clicked", () => {
        const button = screen.getByText("New Release");
        
        fireEvent.click(button);
        
        expect(screen.getByText("8 Albums")).toBeTruthy();
        expect(screen.getByText("32 Albums")).toBeTruthy();
        expect(screen.getByText("50 Albums")).toBeTruthy();
    });
});