import { useEffect, useState } from 'react';
import useCookie from 'react-use-cookie';
import AlbumContainer from './AlbumContainer';
import { useNavigate } from 'react-router-dom';
import './CSS/App.css';


function EndPage() {
    const [CurrentRank, setCurrentRank] = useCookie('CurrentRank', '');
    const [Ranks, setRanks] = useCookie('Ranks', '');
    const [AlbumsCookie, setAlbumsCookie] = useCookie('Albums', '');
    const [CurrentPointer, setCurrentPointer] = useCookie('CurrentPointer', '');
    const [albumNames, setAlbumNames] = useState<{ [key: string]: string }>({});
    console.log(AlbumsCookie);
    const albums: Array<string> = JSON.parse(AlbumsCookie);
    const ranks: Array<number> = JSON.parse(Ranks);
    console.log(albums);
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useCookie('AccessToken', '');

    useEffect(() => {
        console.log("number of ranks : " + ranks + "      " + ranks.length);

        const fetchAlbumNames = async () => {
            const names: { [key: string]: string } = {};

            for (const albumId of albums) {
                try {
                    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
                        method: 'GET',
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch album details');
                    }

                    const albumData = await response.json();
                    names[albumId] = albumData.name;
                } catch (error) {
                    // console.error('Error fetching album name:', error);
                    names[albumId] = 'Unknown Album';
                }
            }
            setAlbumNames(names);
        };

        fetchAlbumNames();

    }, []);

    return (
        <>
            <h1 className="title">FINAL RANKINGS</h1>
            {albums.length > 0 && (
                <>
                    <ol>
                        
                        {albums
                            .map((albumId, index) => ({
                                albumId: albumId,
                                rank: ranks[index]
                            }))
                            .sort((a, b) => a.rank - b.rank)
                            .map((item) => (
                                <li key={item.albumId} style={{color: 'white'}}>
                                    {albumNames[item.albumId]}
                                </li>
                            ))}
                    </ol>
                </>
            )}


            {/* <div className="Restart"> */}
            <button className='restart-button' onClick={() => navigate("/Start")}>Restart Game</button>
            {/* </div> */}

        </>
    );

}

export default EndPage;
