import{ useEffect, useState } from 'react';
import useCookie from 'react-use-cookie';
import { useNavigate } from 'react-router-dom';
import './CSS/UserManual.css';
import './CSS/LoginPage.css';
import HomeButton from "./HomeButton";

const UserManual = () => {
    const navigate = useNavigate();

    function returnToGame(){
        navigate("/start")
    }

    return (
        <>
            <h1 className='title'>How To Play</h1>
            {/* <button className='howToPlay' onClick={returnToGame}>Start Playing!</button> */}
            <HomeButton/>
            <div className='info-box-container'>
                <div className='info-box' id='howToPlay'>
                    <h3>Choose Your Game</h3>
                    <hr/><br/>
                    <p className='info-text'>
                        <ul>
                            <li>Choose between your own saved albums or recently released albums.</li>
                            <li>Choose the number of albums in your game.</li>
                        </ul>
                    </p>
                </div>
                <div className='info-box' id='howToPlay'>
                <h3>Vote For An Album</h3>
                    <hr/><br/>
                    <p className='info-text'>
                        <ul>
                            <li>Press the `Pick` button to choose an album.</li>
                            <li>Before choosing an album, be sure to listen to the preview track.</li>
                        </ul>
                    </p>
                </div>
                <div className='info-box' id='howToPlay'>
                <h3>Still Interested?</h3>
                    <hr/><br/>
                    <p className='info-text'>
                        <ul>
                            <li>Whenever you see an album image, click it to take you to its page on Spotify</li>
                        </ul>
                    </p>
                </div>
            </div>
        </>
    );
}

export default UserManual;