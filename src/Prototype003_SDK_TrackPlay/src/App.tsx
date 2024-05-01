import './CSS/App.css'
import { useState } from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import useCookie from 'react-use-cookie';
import LoginPage from './LoginPage';
import Start from './Start';
import CallBack from './CallBack';
import AlbumList from './AlbumList';
import CompareScene from './CompareScene';
import spotifyLogo from './resources/Spotify_Logo_RGB_Black.png';

import PlayMusic from './PlayMusic'//For music Player


{
  /*
    The file states the route of our app.
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
          <Route path = "/" element = {<div className="App">
            <LoginPage />
            <div className = "logo">
              <img src = {spotifyLogo} alt="spotify logo" width="210" height="70" style={{ position: 'relative', left: '75%'}}></img>
            </div>
          </div>}>
          </Route>
          <Route path ="/start" element = {<Start />} />
          <Route path = "/callback/*" element = {<CallBack />}/>
          <Route path = "/albumList" element = {<AlbumList/>} />
          <Route path = "/compare" element = {<CompareScene/>} />
          <Route path = "/playmusic" element = {<PlayMusic/>} />
        </Routes>
      </BrowserRouter>

  )
}

export default App
//instuction on terminal is       npx json-server --watch data/db.json --port 8080