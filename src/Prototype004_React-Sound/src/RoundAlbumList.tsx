import React, { useState, useEffect } from 'react';
import useCookie from 'react-use-cookie';
import { fetchAlbum } from './SpotifyAPI';
import RoundDiv from './RoundDiv';
import './CSS/App.css';
import styles from './CSS/AlbumContainer.module.css';

const RoundAlbumList = ({ roundNumber, albums, ranks }) => {
    const [roundAlbums, setRoundAlbums] = useState([]);
    const [accessToken, setAccessToken] = useCookie('AccessToken', '');
    
    useEffect(() => {
        const fetchRoundAlbums = async () => {
            const roundAlbumsData = [];
            
            // loop through the rank array
            for (let j = 0; j < ranks.length; j++) {
                // if the rank is less than the round number, fetch the album and add it to `roundAlbumsData` array
                if (ranks[j] <= roundNumber) {
                    const albumData = await fetchAlbum(albums[j], accessToken);
                    roundAlbumsData.push(albumData);
                }
            }
            
            // set `roundAlbums` to be the the albums added to `roundAlbumsData` 
            setRoundAlbums(roundAlbumsData);
        };

        // call the function declared above
        fetchRoundAlbums();
    }, [albums, ranks, roundNumber]);

    return (
        <div>
            {/* create a `RoundDiv` element */}
            {/* this element will disply all the albums in the current round and space them evenly */}
            {/* pass in the number of albums in the round */}
            {/* set the size of the images */}
            <RoundDiv numAlbums={roundNumber}>
                {roundAlbums.map((albumData, index) => (
                    <a href={albumData.album_Url} target='_blank'>
                        <img
                            key={index}
                            src={albumData.img_url}
                            alt={albumData.name}
                            style={{ margin: '5px', width: '100px', height: '100px' }}
                            className={styles.bracketAlbum}
                            title={`${albumData.name} - ${albumData.artist}`}
                        />
                    </a>
                    
                ))}
            </RoundDiv>
        </div>
    );
};

export default RoundAlbumList;
