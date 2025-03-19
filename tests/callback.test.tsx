import React from "react";
import { render, screen } from "@testing-library/react";
import CallBack from "../src/CallBack";
import { BrowserRouter } from "react-router-dom";


describe('CallBack Component', () => {  
    it('renders error message if no authorization code is present', async () => {
      render(<BrowserRouter><CallBack /></BrowserRouter>);
      expect(screen.getByText('Error: Fail to access Spotify.')).toBeTruthy();
    });       
});