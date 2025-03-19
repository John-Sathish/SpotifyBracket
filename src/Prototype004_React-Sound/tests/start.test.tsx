import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import Start from '../src/Start';
import Sharebutton from '../src/Sharebutton'

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
    
    it('displays correct title', () => {
        expect(screen.getByText("Album Brackets Game")).toBeTruthy();
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
        expect(screen.getByText("16 Albums")).toBeTruthy();
        expect(screen.getByText("32 Albums")).toBeTruthy();
    });

    it("renders share and home button", () => {
        const { container } = render(<BrowserRouter><Start /></BrowserRouter>);
        expect(container.getElementsByClassName("sharebutton")).toBeTruthy();
        expect(container.getElementsByClassName("homebutton")).toBeTruthy();
    });

    it("renders how to play button with correct name", () => {
        expect(screen.getByText("How To Play")).toBeTruthy();
    });
});