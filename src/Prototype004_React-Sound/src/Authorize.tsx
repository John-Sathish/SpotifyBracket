

/*
    Connects to Spotify and generate authorization code with PKCE Flow.
    In the process,
    generateCodeVerifier -> Generate code verifier
    generateCodeChallenge -> Transfer the verifier using SHA26 algoithm
    redirectToAuthCodeFlow -> Send request to Spotify with code verifier generated
        *Parameter "scope" to change the scope of information collected from user 

    It will be navigated to the callback page after the authorization process.
        See CallBack.tsx
*/


function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "https://yellow-bush-0b5ea2203.5.azurestaticapps.net/callback/");
    params.append("scope", "user-library-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    console.log("Checkpoint1");

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

//Exported for testing
export const exportedGenerateCodeVerifier = generateCodeVerifier;
export const exportedGenerateCodeChallenge = generateCodeChallenge;