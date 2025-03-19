import "./CSS/App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useCookie from "react-use-cookie";
import LoginPage from "./LoginPage";
import Start from "./Start";
import EndPage from "./EndPage";
import CallBack from "./CallBack";
import AlbumList from "./AlbumList";
import CompareScene from "./CompareScene";
import spotifyLogo from "./resources/Spotify_Logo_RGB_White.png";
import Sharebutton from "./Sharebutton";
import HomeButton from './HomeButton';
import UserManual from './UserManual';

{
  /*
    The file states the route of our app. which make use for jumping bewteen scenes
    Please follow the formats to add new route:
    <Route path = "new_url" element = {<content_displayed />}
    For content of first page, see LoginPage.tsx
  */
}
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <LoginPage />
              <div className="logo">
                <img
                  src={spotifyLogo}
                  alt="spotify logo"
                  style={{ position: "absolute", top: "0", left: "0" }}
                ></img>
              </div>
            </div>}>
        </Route>
            <Route path = "/start" element = {<Start />} />
            <Route path = "/callback/*" element = {<CallBack />}/>
            <Route path = "/albumList" element = {<AlbumList />} />
            <Route path = "/compare" element = {<CompareScene />} />
            <Route path = "/endpage" element = {<EndPage />} />
            <Route path = "/sharebutton" element = {<Sharebutton />} />
            <Route path = "/homebutton" element = {<HomeButton />} />
            <Route path = "/usermanual" element = {<UserManual />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
