import React, { useState, useEffect } from "react";
import Sound from 'react-sound';
import useCookie from 'react-use-cookie';
import { fetchAlbum, AlbumInfo } from "./SpotifyAPI";
import { useNavigate } from 'react-router-dom'; // Ensure correct import for useNavigate
import styles from './CSS/AlbumContainer.module.css';
import Sharebutton from "./Sharebutton"; // For Styling
import pause from "./resources/pause.png";
import play from "./resources/play.png";

{
    /*
         This is the Section for comparing songs, contain ALbumn informations
     */
}
interface AlbumContainerProps {
    index: number;
}

const AlbumContainer: React.FC<AlbumContainerProps> = ({ index }) => {
    // State for storing the album data fetched from Spotify API. Initially null.
    const [albumData, setAlbumData] = useState<AlbumInfo | null>(null);
    // State to track if album data is loaded.
    const [loadState, setLoadState] = useState<boolean>(false);
    // State to control the play status of the Sound component.
    const [playStatus, setPlayStatus] = useState<Sound.status>(Sound.status.STOPPED);
    // Use cookies to persist albums, access token, and ranks between sessions.
    const [albumsCookie, setAlbumsCookie] = useCookie('Albums', '');
    const albums: Array<string> = JSON.parse(albumsCookie || '[]');
    const [accessToken, setAccessToken] = useCookie('AccessToken', '');
    const navigate = useNavigate();
    const [ranksCookie, setRanksCookie] = useCookie('Ranks', '');
    const ranks: Array<number> = JSON.parse(ranksCookie || '[]');

    // useEffect hook to fetch album data on component mount or when dependencies change.
    useEffect(() => {
        const fetchAlbumData = async (index: number) => {
            const data = await fetchAlbum(albums[index], accessToken);
            setAlbumData(data);
            setLoadState(true);
        };
        fetchAlbumData(index);
    }, [accessToken]);

    // Function to toggle play status of the track.
    const playMusic = () => {
        setPlayStatus(playStatus === Sound.status.PLAYING ? Sound.status.STOPPED : Sound.status.PLAYING);
    };

    // Function to handle album selection, updating rank, and navigating to album list.
    const beSelected = () => {
        console.log("Pick");
        ranks[index] /= 2;
        setRanksCookie(JSON.stringify(ranks));
        navigate("/albumList");
    };

    // JSX to render the album information, control buttons, and the Sound component for audio playback.
    return (
        <div className={styles.albumContainer}>
            {loadState && albumData && (
                <>
                    {/* Display album name and image */}
                    <div className={styles.albumName}> {albumData.name} </div>
                    <div className={styles.albumName}> {albumData.artist} </div>
                    <a href={albumData.album_Url} target='_blank'>
                        <img className={styles.albumImage} src={albumData.img_url} alt="Album Image" width={albumData.img_width} height={albumData.img_height} />
                    </a>
                    <br />
                    {/* Buttons to control track playback and album selection --------------------------------------------------------*/}
                    {/* Conditional rendering based on the presence of a preview URL */}
                    {albumData.preview_url ? (
                        <>
                            {/* Button to control track playback */}
                            {/* <button className={styles.button} onClick={playMusic}>{playStatus === Sound.status.PLAYING ? 'Pause' : 'Play'} Track</button> */}
                            <button className={styles.playButton} onClick={playMusic}>
                                <img 
                                    src={playStatus === Sound.status.PLAYING ? pause : play} 
                                    alt={playStatus === Sound.status.PLAYING ? 'Pause' : 'Play'}
                                    className={styles.buttonIcon}
                                />
                            </button>
                            <br />

                            {/* Sound component for playing the preview URL */}
                            <Sound
                                url={albumData.preview_url}
                                playStatus={playStatus}
                                onFinishedPlaying={() => setPlayStatus(Sound.status.STOPPED)}
                            />
                        </>
                    ) : (
                        <div className={styles.noPreviewMessage}>No preview sound Track.</div>
                    )}
                    
                    <button className={styles.button} onClick={beSelected}>Pick</button>
                    <br />
                    {/* --------------------------------------------------------------------------------------------------------------*/}
                    {/* Link to Check the Whole album on Spotify */}
                    {/* <a className={styles.playButton} href={albumData.album_Url} target="_blank" rel="noopener noreferrer">Album Link on Spotify</a> */}
                    {/* <button className={styles.playButton} onClick={() => window.open(albumData.album_Url, '_blank', 'noopener noreferrer')}>Album Link on Spotify</button> */}
                    <br />
                    {/* Sound component for playing the preview URL, only if album URL is present */}
                    {albumData.album_Url && (
                        <Sound
                            url={albumData.preview_url}
                            playStatus={playStatus}
                            onFinishedPlaying={() => setPlayStatus(Sound.status.STOPPED)}
                        />
                    )}
                    {/* --------------------------------------------------------------------------------------------------------------*/}

                </>
            )}
            {/* Loading state Updates */}
            {!loadState && <h1 className={styles.loadingState}>Loading...</h1>}
        </div>
    );
};

export default AlbumContainer;
