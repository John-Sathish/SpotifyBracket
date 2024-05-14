import React, { useState, useEffect } from "react";
import { redirectToAuthCodeFlow } from "./Authorize";

{
  /*
      The Button triggers authorization process with Spotify.
      See authorize.tsx for details.
      It will be navigated to the callback page after the authorization process.
      See CallBack.tsx
    */
}

function AuthorizeButton() {
  const clientId = "90579652abd24038b08f04e236b5731b";

  async function RedirectToSpotify() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("start");
    if (!code) redirectToAuthCodeFlow(clientId);
  }

  return (
    <>
      <button onClick={RedirectToSpotify}>Login with Spotify</button>
    </>
  );
}

export default AuthorizeButton;
