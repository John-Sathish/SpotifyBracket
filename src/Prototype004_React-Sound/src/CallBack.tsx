import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCookie from 'react-use-cookie';
import './CSS/LoginPage.css';

{
    /*
    Page redirects after the authorization process by Spotify.
    A successful return will bring the authorization code in the URL.
    A error page will show if no code is returned.

    Process will continue for a success return to obtain the access token which stored in cookies.
    It will then be redirected to the start page.
    See Start.tsx.
    */
}

const CallBack = () => {
    const[UserNameCookie, setUserNameCookie] = useCookie('Name', 'user');
    const[UserCookie, setUserCookie] = useCookie('id', 'user');

    const[AccessToken, setAccessToken] = useCookie('AccessToken','')
    const[errorState, setErrorState] = useState<boolean>(false);
    const navigate = useNavigate();
    const clientId = "90579652abd24038b08f04e236b5731b";
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    
    //Generates and stores the access token for further interaction with the API.
    //code - authorization code is generated by Spotify with approval of user.
    async function getAccessToken(clientId: any, code: string): Promise<any> {
        const verifier = localStorage.getItem("verifier");
    
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "https://lemon-rock-02226c903.5.azurestaticapps.net/callback/");
        params.append("code_verifier", verifier!);
    
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        //issue
        const response = await result.json();
        //setAccessToken(access_token);
        console.log({response});
        return response;
    }

    //Fetches the user profile with spotify API
    //Access token as parameter.
    //Return the JSON format data contains user profile.
    async function fetchProfile(token: string): Promise<any> {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
        return await result.json();
    }

    //Function to generate the Access Token and collect User name from Spotify.
    async function collectData(code: string) {
          
            const accessToken = await getAccessToken(clientId, code);
            setAccessToken(accessToken.access_token);
            const profile = await fetchProfile(accessToken);
            if (profile.display_name)
                setUserNameCookie(profile.display_name);
            console.log(UserNameCookie);
            console.log(AccessToken);           
    }

    /*
        Checks when the page first loaded to see if authorization code is generated or not.
        If code is present, collect data from spotify and navigate to start page.
        See Start.tsx
    */
    useEffect(()=> {
    if (code) {
        console.log("Checkpoint1"); 
        collectData(code);
        navigate("/start");//Go to Start Page----------------------------------------------------
    }else 
    {
        setErrorState(true);
    }
    },[])

    return (<>
    {errorState && <h1>Error: Fail to access Spotify.</h1>}
    </>
    );
}

export default CallBack;
