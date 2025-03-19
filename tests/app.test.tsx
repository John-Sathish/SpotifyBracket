import React from 'react'
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import LoginPage from "../src/LoginPage";
import CallBack from '../src/CallBack';
import Start from '../src/Start';
import AlbumList from '../src/AlbumList';
import CompareScene from '../src/CompareScene';
import EndPage from '../src/EndPage';


// Overrides BrowserRouter so children are wrapped in <div> element
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

// Mock components for routing tests
jest.mock('../src/LoginPage');
jest.mock('../src/CallBack');
jest.mock('../src/Start');
jest.mock('../src/AlbumList');
jest.mock('../src/CompareScene');
jest.mock('../src/EndPage');

describe("Displayble components", () => {
  it("displays Spotify logo", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByAltText("spotify logo")).toBeTruthy();
  });
});

describe("Routing", () => {
  it("renders LoginPage for default route", () => {
    (LoginPage as jest.Mock).mockImplementation(() => <div>LoginPageMock</div>);
    
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByText("LoginPageMock")).toBeTruthy();
  })

  it("renders Callback for callback route", () => {
    (CallBack as jest.Mock).mockImplementation(() => <div>CallbackMock</div>);
    
    render(<MemoryRouter initialEntries={["/callback/*"]}><App /></MemoryRouter>);
    expect(screen.getByText("CallbackMock")).toBeTruthy();
  })

  it("renders Start for start route", () => {
    (Start as jest.Mock).mockImplementation(() => <div>StartMock</div>);
    
    render(<MemoryRouter initialEntries={["/start"]}><App /></MemoryRouter>);
    expect(screen.getByText("StartMock")).toBeTruthy();
  })

  it("renders AlbumList for albumlist route" , () => {
    (AlbumList as jest.Mock).mockImplementation(() => <div>AlbumListMock</div>);
    
    render(<MemoryRouter initialEntries={["/albumlist"]}><App /></MemoryRouter>);
    expect(screen.getByText("AlbumListMock")).toBeTruthy();
  })

  it("renders CompareScene for compare route", () => {
    (CompareScene as jest.Mock).mockImplementation(() => <div>CompareSceneMock</div>);
    
    render(<MemoryRouter initialEntries={["/compare"]}><App /></MemoryRouter>);
    expect(screen.getByText("CompareSceneMock")).toBeTruthy();
  })

  it("renders EndPage for endpage route", () => {
    (EndPage as jest.Mock).mockImplementation(() => <div>EndPageMock</div>);
    
    render(<MemoryRouter initialEntries={["/endpage"]}><App /></MemoryRouter>);
    expect(screen.getByText("EndPageMock")).toBeTruthy();
  })
});