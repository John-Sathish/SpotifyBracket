import useCookie from 'react-use-cookie';
import { useNavigate } from 'react-router'; 

{
    //Test Page to keep track on data stored in the cookies.
    //No use in real process.
}

const AlbumList = () => {

    const[CurrentRank, setCurrentRank] = useCookie('CurrentRank','');
    const[Ranks, setRanks] = useCookie('Ranks','');
    const[AlbumsCookie, setAlbumsCookie] = useCookie('Albums','');
    const[CurrentPointer, setCurrentPointer] = useCookie('CurrentPointer','');
    console.log(AlbumsCookie);
    const albums : Array<String>= JSON.parse(AlbumsCookie);
    const ranks : Array<number>= JSON.parse(Ranks);
    console.log(albums);
    const navigate = useNavigate();

    function nextScene() {
        navigate("/compare");
    }

    return (
    <>
    <h1>Albums List</h1>

    <button onClick={nextScene}>Next</button>
    <p>
        Current Rank: {CurrentRank} <br />
        Current Pointer: {CurrentPointer}
    </p>

    <ol>
        {albums.map((id: string, index: number) =>
    <li id = {id}>{id}: {ranks[index]}</li>)}
    </ol>
    
    </>)
}

export default AlbumList;