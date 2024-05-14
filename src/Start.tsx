import useCookie from "react-use-cookie";
import { useNavigate } from 'react-router-dom';
import { useState } from "react"; // Import useState
import { extractNewRelease, fetchSavedAlbums, getIDs } from "./SpotifyAPI";
import styles from "./CSS/Main.module.css";
import "./CSS/UserManual.css";
import Sharebutton from "./Sharebutton";
import HomeButton from "./HomeButton";

{
  /*
        Start page of the game.
        Plans to show all game options in this pages.
        Currently only the new release albums game is present.
        Jumps to the album list page when button is clecked.
        See AlbumList.tsx.
    */
}

function Start() {
  const [userNameCookie, setUserNameCookie] = useCookie("Name", "user");
  const [CurrentRank, setCurrentRank] = useCookie("CurrentRank", "");
  const [CurrentPointer, setCurrentPointer] = useCookie("CurrentPointer", "");
  const [Ranks, setRanks] = useCookie("Ranks", "");
  const [AccessToken, setAccessToken] = useCookie("AccessToken", "");
  const [AlbumsCookie, setAlbumsCookie] = useCookie("Albums", "");
  const navigate = useNavigate();

  /*
        Initialises game with New Release Albums
    */
  // States for controlling the visibility of the dropdowns
  const [showSavedAlbumsDropdown, setShowSavedAlbumsDropdown] = useState(false);
  const [showNewReleasesDropdown, setShowNewReleasesDropdown] = useState(false);

  // Toggle functions for dropdowns
  const toggleSavedAlbumsDropdown = () => {
    setShowSavedAlbumsDropdown(!showSavedAlbumsDropdown);
  }
  const toggleNewReleasesDropdown = () => {
    setShowNewReleasesDropdown(!showNewReleasesDropdown);
  }

  function userManual(){
    navigate("/UserManual");
  }


  async function StartGame(gameSize: number, option: number): Promise<void> {
    console.log("Start ExtractAlbum" + gameSize);

    let albumArray;


    if (option == 1) {
      //albumArray = await extractNewRelease(AccessToken, gameSize);
      const albumDataArray = await extractNewRelease(AccessToken);
      albumArray = await getIDs(albumDataArray, gameSize);
    }
    // const albumArray = await getSavedAlbums(AccessToken);
    else if (option == 0) {
      const albumDataArray = await fetchSavedAlbums(AccessToken);
      albumArray = await getIDs(albumDataArray, gameSize);

        // const albumArray = await extractNewRelease(AccessToken);
        // const albumArray = await getSavedAlbums(AccessToken);
        //const albumDataArray = await fetchSavedAlbums(AccessToken);
        //const albumArray = await getIDs(albumDataArray);

        /*
          Wired Shit
        */
        const rankArray = [];
        setCurrentRank(gameSize.toString());
        setCurrentPointer("0");
        for (let i = 0; i < gameSize; i++) {
            rankArray[i] = gameSize;
        }

        setAlbumsCookie(JSON.stringify(albumArray));
        setRanks(JSON.stringify(rankArray));
        console.log("Album_array: " + albumArray);
        navigate("/compare");
    }

    if (albumArray.length == 0)
      console.log("Not enough albums to start the game.");

    // const albumArray = await extractNewRelease(AccessToken);
    // const albumArray = await getSavedAlbums(AccessToken);
    //const albumDataArray = await fetchSavedAlbums(AccessToken);
    //const albumArray = await getIDs(albumDataArray);

    const rankArray = [];
    setCurrentRank(gameSize.toString());
    setCurrentPointer("0");
    for (let i = 0; i < gameSize; i++) {
      rankArray[i] = gameSize;
    }

    setAlbumsCookie(JSON.stringify(albumArray));
    setRanks(JSON.stringify(rankArray));
    console.log("Album_array: " + albumArray);
    navigate("/albumList");
  }

  //console.log ("well");
  return (
    <>
    <Sharebutton />
    <HomeButton />
    <button className='howToPlay' onClick={userManual}>How To Play</button>
      <h1 className="title">Album Brackets Game</h1>

      <div className={styles.buttonsContainer}>
      <div className='info-box-container'>

        <div className='info-box'>
        <button className={styles.button} onClick={toggleSavedAlbumsDropdown}>
          Saved Albums
        </button>
        {showSavedAlbumsDropdown && (
          <div className={styles.startButtons}>
            <button onClick={() => StartGame(8, 0)}>8 Albums</button>
            <button onClick={() => StartGame(16, 0)}>16 Albums</button>
            <button onClick={() => StartGame(32, 0)}>32 Albums</button>
          </div>
        )}
        </div>

            <div className='info-box'>
        <button className={styles.button} onClick={toggleNewReleasesDropdown}>
          New Release
        </button>
        {showNewReleasesDropdown && (
          <div className={styles.startButtons}>
            <button onClick={() => StartGame(8, 1)}>8 Albums</button>
            <button onClick={() => StartGame(16, 1)}>16 Albums</button>
            <button onClick={() => StartGame(32, 1)}>32 Albums</button>
          </div>
        )}
        </div>
        </div>
      </div>
    </>
  );
}

export default Start;
