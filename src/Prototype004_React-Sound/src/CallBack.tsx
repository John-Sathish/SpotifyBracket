import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useCookie from 'react-use-cookie';
import './CSS/LoginPage.css';

/*
  This page handles the redirect after Spotify authorization.
  If successful, it retrieves the authorization code from the URL,
  exchanges it for an access token, fetches the user's profile,
  saves the data in cookies, and redirects to the Start page.
*/

const CallBack = () => {
  const [UserNameCookie, setUserNameCookie] = useCookie('Name', 'user');
  const [UserCookie, setUserCookie] = useCookie('id', 'user');
  const [AccessToken, setAccessToken] = useCookie('AccessToken', '');

  const [errorState, setErrorState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const clientId = "90579652abd24038b08f04e236b5731b";

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  // Function to exchange authorization code for access token
  async function getAccessToken(clientId: string, code: string): Promise<any> {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", `${window.location.origin}/SpotifyBracket/#/callback`);
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const response = await result.json();

    console.log("Access Token Response:", response);

    if (!response.access_token) {
      throw new Error("Failed to get access token");
    }

    return response;
  }

  // Function to fetch user profile using access token
  async function fetchProfile(token: string): Promise<any> {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    const profile = await result.json();

    console.log("Fetched Profile:", profile);

    return profile;
  }

  // Collects data from Spotify and stores it in cookies
  async function collectData(code: string) {
    try {
      const accessToken = await getAccessToken(clientId, code);
      setAccessToken(accessToken.access_token);

      const profile = await fetchProfile(accessToken.access_token);

      if (profile.display_name) {
        setUserNameCookie(profile.display_name);
        console.log("Set UserNameCookie:", profile.display_name);
      }

      if (profile.id) {
        setUserCookie(profile.id);
        console.log("Set UserCookie:", profile.id);
      }

      console.log("AccessToken stored in cookie:", accessToken.access_token);

    } catch (error) {
      console.error("Error collecting data:", error);
      setErrorState(true);
    }
  }

  useEffect(() => {
    const run = async () => {
      if (code) {
        setLoading(true);
        console.log("Authorization Code:", code);

        await collectData(code);

        setLoading(false);

        // Navigate after data collection is complete
        navigate("/start");
      } else {
        setErrorState(true);
      }
    };

    run();
  }, []);

  return (
    <>
      {loading && <h1>Processing login with Spotify...</h1>}
      {errorState && <h1>Error: Failed to access Spotify.</h1>}
    </>
  );
};

export default CallBack;
