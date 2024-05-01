import useCookie from 'react-use-cookie';
import './CSS/LoginPage.css';
import { useNavigate } from 'react-router'; 
import { extractNewRelease, fetchSavedAlbums, getIDs} from './SpotifyAPI';

/*
    Start page of the game.
    Plans to show all game options in this pages.
    Currently only the new release albums game is present.
    Jumps to the album list page when button is clecked.
    See AlbumList.tsx.
*/


function Start() {
    const [userNameCookie, setUserNameCookie] = useCookie('Name','user');
    const[CurrentRank, setCurrentRank] = useCookie('CurrentRank','');
    const[CurrentPointer, setCurrentPointer] = useCookie('CurrentPointer','');
    const[Ranks, setRanks] = useCookie('Ranks','');
    const[AccessToken, setAccessToken] = useCookie('AccessToken','');
    const[AlbumsCookie, setAlbumsCookie] = useCookie('Albums','');
    const navigate = useNavigate();
    

    /*
        Initialises game with New Release Albums
    */
    async function startNewRelease(){
        console.log("Start ExtractAlbum");
        // const albumArray = await extractNewRelease(AccessToken);
        // const albumArray = await getSavedAlbums(AccessToken);
        const albumDataArray = await fetchSavedAlbums(AccessToken);
        const albumArray = await getIDs(albumDataArray);

        setCurrentRank("16");
        setCurrentPointer("0");
        const rankArray = [];
        for (let i = 0; i < 16; i++) {
            rankArray[i] = 16;
        }  

        setAlbumsCookie(JSON.stringify(albumArray));

        setRanks(JSON.stringify(rankArray));
        
        
        console.log("Album_array: " + albumArray);    

        navigate("/albumList");
    }
    


    console.log ("well");
    return (
        <>
            <h1 className="title">Hello {userNameCookie}</h1>
        
            <div className="login-form" >
                <button onClick = {startNewRelease}>Play Game</button>
            </div>
        </>
    );
}

export default Start;