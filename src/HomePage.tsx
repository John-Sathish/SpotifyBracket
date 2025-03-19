import useCookie from 'react-use-cookie';
import './CSS/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import {AlbumInfo,UserInfo,fetchUser,fetchData, fetchSavedAlbums, getIDs} from "./SpotifyAPI";
import {useEffect, useState} from "react";

function HomePage(){

    const [userNameCookie, setUserNameCookie] = useCookie('Name','user');
    const [userData]= useState<UserInfo | null >(null);
    //const[CurrentRank, setCurrentRank] = useCookie('CurrentRank','');
    //const[CurrentPointer, setCurrentPointer] = useCookie('CurrentPointer','');
    //const[Ranks, setRanks] = useCookie('Ranks','');
    const[AccessToken, setAccessToken] = useCookie('AccessToken','');
    //const[AlbumsCookie, setAlbumsCookie] = useCookie('Albums','');
    const navigate = useNavigate();
    //console.log ("Setting Cookie successfully ");
    /*
        Get User's Information------------------------------------------
     */

    // useEffect hook to fetch user data
    useEffect(() => {
        const fetchUser = async (index: string) => {
            const data = await fetchUser(AccessToken);
        };
    });

    async function PlayGame(){
        navigate("./AlbumList")
    }

    return (
        <>
            <h1 className="title">Hello {userData.id}</h1>

            <div className="login-form">
                <button onClick={() => PlayGame}>Play Game</button>
                {/*<button onClick={() => startNewRelease(8)}>Play Game8</button>
                <button onClick={() => startNewRelease(32)}>Play Game32</button>
                <button onClick={() => startNewRelease(50)}>Play Game50</button>*/}
            </div>
            <div> {}</div>
        </>
    );

}

export default HomePage;