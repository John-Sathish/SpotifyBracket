import useCookie from 'react-use-cookie';
import { useNavigate } from 'react-router-dom';
import Sharebutton from "./Sharebutton";
import React from "react";
import HomeButton from "./HomeButton";
import { useState, useEffect } from 'react';
import RoundAlbumList from './RoundAlbumList';
import { fetchAlbum } from './SpotifyAPI';
import './CSS/App.css';
import styles from './CSS/AlbumContainer.module.css';
{
    //Test Page to keep track on data stored in the cookies.
    // No use in real process.
    // Once not used, just simple change the path from start to AlbumContainer
}

const AlbumList = () => {
    const [CurrentRank, setCurrentRank] = useCookie('CurrentRank','');
    const [Ranks, setRanks] = useCookie('Ranks','');
    const [AlbumsCookie, setAlbumsCookie] = useCookie('Albums','');
    const [CurrentPointer, setCurrentPointer] = useCookie('CurrentPointer','');
    console.log(AlbumsCookie);
    const albums: Array<string> = JSON.parse(AlbumsCookie);
    const ranks: Array<number> = JSON.parse(Ranks);
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useCookie('AccessToken', '');

    useEffect(() => {
        const fetchAlbumNames = async () => {
            const fetchedAlbumNames: string[] = [];

            // get albums based on their rank to output in bracket
            for (let i = ranks.length; i >= 1; i /= 2) {
                for (let j = 0; j < ranks.length; j++) {
                    // get all albums which have made it to the next round, and add it to `fetchedAlbumNames`
                    if (ranks[j] <= i) {
                        const data = await fetchAlbum(albums[j], accessToken);
                        fetchedAlbumNames.push(data.name);
                        // try {
                        //     const response = await fetch(`https://api.spotify.com/v1/albums/${albums[j]}`, {
                        //         method: 'GET',
                        //         headers: { Authorization: `Bearer ${accessToken}` },
                        //     });
        
                        //     if (!response.ok) {
                        //         throw new Error('Failed to fetch album details');
                        //     }
        
                        //     const albumData = await response.json();
                        //     fetchedAlbumNames.push(albumData.name);
                        // } catch (error) {
                        //     fetchedAlbumNames.push('Unknown Album');
                        // }
                    }
                }
            }
        };
        // call the function declared above
        fetchAlbumNames();
    }, []);

    // navigate to to the compare screen
    function nextScene() {
        navigate("/compare");
    }
    
    return (
        <>
            <h1 className='title'>Bracket View</h1>
            <Sharebutton />
            <HomeButton />
            {albums.length === 0 && <span style={{ color: 'white' }}>Error: Not enough albums to start the game.</span>}
            {albums.length > 0 && (
                <>
                    <button className='restart-button' onClick={nextScene}>Next</button>
              

                    {ranks.map((_, index) => {
                        const roundNum = ranks.length / (Math.pow(2, index));
                        // if the round number goes below 1, stop creating rounds
                        if (roundNum < 1) {
                            return null;
                        }
                        else { 
                            // create a `RoundAlbumList` 
                            // pass in the current rank, list of albums and their associated rank 
                            return <RoundAlbumList key={index} roundNumber={ranks.length / Math.pow(2, index)} albums={albums} ranks={ranks}/>
                        }
                    })}
                </>
            )}
        </>
    );
};

export default AlbumList;