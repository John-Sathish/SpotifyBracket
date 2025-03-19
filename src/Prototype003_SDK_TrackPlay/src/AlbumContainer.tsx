import { useState , useEffect}  from "react";
import useCookie from 'react-use-cookie';
import { fetchAlbum } from "./SpotifyAPI";
import { useNavigate } from 'react-router';
import Sound from 'react-sound';

export interface AlbumInfo {
    id:string;
    name?:string;
    img_url?: string;
    img_width?: number;
    img_height?: number;
    preview_url?: string;
    total_tracks?: number;
    track_Url?:String;
}

function AlbumContainer ({index}: {index:number}) {
    const [albumData, setAlbumData] = useState<AlbumInfo>(null);
    const[loadState, setloadState] = useState<boolean>(false);
    const[AlbumsCookie, setAlbumsCookie] = useCookie('Albums','');
    const albums : Array<string>= JSON.parse(AlbumsCookie);
    const[AccessToken, setAccessToken] = useCookie('AccessToken','');
    const navigate = useNavigate();
    const[Ranks, setRanks] = useCookie('Ranks','');
    const ranks : Array<number>= JSON.parse(Ranks);


    
    //Handles when album is selected.
    function beSelected() {
        console.log("Pick");
        ranks [index] /=2;
        setRanks (JSON.stringify(ranks));
        navigate("/albumList");
    }

    useEffect(()=> {
        async function fetchAlbumData(index) {
            const data = await fetchAlbum(albums[index], AccessToken);
            setAlbumData(data);
            setloadState(true);
        }

        fetchAlbumData(index);
    }, [])

    function playMusic(){
        navigate("/playmusic");
    }

    /*
    For albumDta, check SpotifyAPI.tsx
     */
    //Game Page outline
    return (<>
    {loadState && <>
        Name: {albumData.name} <br/>
        <img src={albumData.img_url} alt="Album Image" width={albumData.img_width}
             height={albumData.img_height}></img>
        <br/>
        <button onClick={playMusic}>Play Track</button>
        <br/>
        <button onClick={beSelected}>Pick</button>
        <br/>
        <h1>albumData.track_Url</h1>
    </>}
        {!loadState && <h1>Loading...</h1>}
    </>);
}

export default AlbumContainer;

