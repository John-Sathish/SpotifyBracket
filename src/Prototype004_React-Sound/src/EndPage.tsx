import { useEffect, useState } from 'react';
import useCookie from 'react-use-cookie';
import { useNavigate } from 'react-router-dom';
import './CSS/App.css';

function EndPage() {
    const [CurrentRank, setCurrentRank] = useCookie('CurrentRank', '');
    const [Ranks, setRanks] = useCookie('Ranks', '');
    const [AlbumsCookie, setAlbumsCookie] = useCookie('Albums', '');
    const [CurrentPointer, setCurrentPointer] = useCookie('CurrentPointer', '');
    const [albumNames, setAlbumNames] = useState<{ [key: string]: string }>({});
    const albums: Array<string> = JSON.parse(AlbumsCookie);
    const ranks: Array<number> = JSON.parse(Ranks);
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useCookie('AccessToken', '');
    const [topAlbumInfo, setTopAlbumInfo] = useState({
        img_url: '',
        img_width: 0,
        img_height: 0,
        album_Url: ''
    });

    useEffect(() => {
        console.log("number of ranks : " + ranks + "      " + ranks.length);

        const fetchAlbumNames = async () => {
            let albumDetails = await Promise.all(albums.map(async (albumId) => {
                try {
                    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
                        method: 'GET',
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch album details');
                    }

                    const albumData = await response.json();
                    return {
                        id: albumId,
                        name: albumData.name,
                        img_url: albumData.images[0].url,
                        img_width: albumData.images[0].width / 5,
                        img_height: albumData.images[0].height / 5,
                        album_Url: albumData.external_urls.spotify
                    };
                } catch (error) {
                    console.error('Error fetching album details:', error);
                    return {
                        id: albumId,
                        name: 'Unknown Album',
                        img_url: '',
                        img_width: 0,
                        img_height: 0,
                        album_Url: ''
                    };
                }
            }));

            const albumNameMap = albumDetails.reduce((acc, album) => ({
                ...acc,
                [album.id]: album.name
            }), {});

            setAlbumNames(albumNameMap);

            // Sort albums by rank
            albumDetails.sort((a, b) => ranks[albums.indexOf(a.id)] - ranks[albums.indexOf(b.id)]);
            // Set top album info
            if (albumDetails.length > 0) {
                setTopAlbumInfo(albumDetails[0]);
            }
        };

        fetchAlbumNames();

    }, [AlbumsCookie, Ranks, accessToken]); // Use more precise dependencies

    return (
        <>
            <h1 className="title">FINAL RANKINGS</h1>
            {albums.length > 0 && (
                <>
                    <div>
                        <a href={topAlbumInfo.album_Url} target="_blank" rel="noopener noreferrer">
                            <img src={topAlbumInfo.img_url} alt="Top Album"
                                 style={{width: topAlbumInfo.img_width, height: topAlbumInfo.img_height}}/>
                        </a>
                    </div>
                    <ol>
                        {albums
                            .map((albumId, index) => ({
                                albumId: albumId,
                                rank: ranks[index],
                                name: albumNames[albumId]
                            }))
                            .sort((a, b) => a.rank - b.rank)
                            .map((item) => (
                                <li key={item.albumId} style={{color: 'white'}}>
                                    {item.name}
                                </li>
                            ))}
                    </ol>
                </>
            )}

            <button className='restart-button' onClick={() => navigate("/Start")}>Restart Game</button>
        </>
    );
}

export default EndPage;
