import useCookie from 'react-use-cookie';
export interface AlbumInfo {
    id:string;
    name?:string;
    artist?:string;
    img_url?: string;
    img_width?: number;
    img_height?: number;
    total_tracks?: number;//number of tracks in that album
    preview_url?: string;// Can be null so need condition check, it is a preview track of 30sec
    album_Url?:string;//It returns the album url link on spotify
}
export interface UserInfo {
    id:string;
    display_name?:string;
    img_url?: string;
    img_width?: number;
    img_height?: number;
    //User Spotify Data, need to declare
    User_Playlist?: number;
    User_SavedAlbum?: number;
    //Get User Top items
    //Add Item to Playback Queue
}


//Parameter endPoint - decide the data to fetch.
export async function fetchData(endPoint: string, token:string) :Promise<any>{
    try {
        const result = await fetch(endPoint, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!result.ok) {
            throw new Error(`Failed to fetch data: ${result.status} ${result.statusText}`);
        }

        return await result.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}
//User to fetch data from Spotify.
export async function fetchUser(token:string):Promise<UserInfo> {
    console.log("-----Start Extract User-----");
    const endPoint = "https://api.spotify.com/v1/me";
    const profile= await fetchData(endPoint, token);
    console.log(profile);
    let info:UserInfo = {
        User_Playlist: 0,
        User_SavedAlbum: 0,
        id: "",
        img_height: 0,
        img_url: "",
        img_width: 0,
        display_name: ""};
    info.id = profile.id;
    info.display_name = profile.name;
    info.img_url = profile.images[0].url;
    info.img_width = profile.images[0].width/5;
    info.img_height = profile.images[0].height/5;
    return info;
}
//Fetches Album data from Spotify API
export async function fetchAlbum(id:string, token:string):Promise<AlbumInfo>{

    // console.log("-----Start ExtractAlbum-----");
    const endPoint = "https://api.spotify.com/v1/albums/"+id;
    // console.log(endPoint);
    const result= await fetchData(endPoint, token);
    //Generate a random track number so play as the preview sound track
    let randomTrackNum: number = Math.floor(Math.random() * (result.total_tracks));
    //Declaring each albumData element using the current album
    let info:AlbumInfo = {id: "null", name: "null"};
    // console.log("next");
    console.log(result);
    console.log("artist[0] : " + result.artists[0].name);
    info.id = result.id;
    info.name = result.name;
    info.artist = result.artists[0].name;
    info.img_url = result.images[0].url;
    info.img_width = result.images[0].width/5;
    info.img_height = result.images[0].height/5;
    info.album_Url = result.external_urls.spotify;
    info.preview_url = result.tracks.items[randomTrackNum].preview_url;//Pick a random track and fetch its preview track sound
    info.total_tracks = result.total_tracks;
    return info;
}

//Extract Album IDs from the JSON data provided.
function extractID(albums :any[], album_no: number) :any[] {
    console.log("starting to extract albums");

    const IdArray = [];
    console.log("starting for loop")
    for (let i=0; i < album_no; i++) {
        console.log("id " + i + ": " + albums[i].id);
        IdArray[i] = albums[i].name;
    }
    return IdArray;
}

//Need to be re-set so that it can be different number of album sizes
export async function getIDs(allAlbumData : AlbumInfo[], album_no: number){
    //console.log("getting albums id");
    //const idArray = [];
    let chosenAlbums = [];
    let bracketSize = album_no;

    //console.log("allAlbumData.length = " + allAlbumData.length);
    if (bracketSize > allAlbumData.length)
        return [];

    for (let i=0; i<bracketSize; i++){
        let randomIndex = Math.floor(Math.random() * allAlbumData.length);
        // console.log("randomIndex = " + randomIndex);
        while (chosenAlbums.includes(allAlbumData[randomIndex].id) == true) {
            randomIndex = Math.floor(Math.random() * allAlbumData.length);
        }
        console.log(allAlbumData[randomIndex].name + " - id " + i + ": " + allAlbumData[randomIndex].id);
        // The problem here is fixed for the Album list only shows id string, changed from . id to .name
        chosenAlbums[i] = allAlbumData[randomIndex].id;
    }
    return chosenAlbums;
}

/*
    Extracts new release albums data from Spotify.
    Json format data is returned from Spotify.
    We further extract album ID from it and store in Cookies AlbumsCookie.

    Works when access token is present in the Cookies.
*/
export async function extractNewRelease(token:string): Promise<AlbumInfo[]>{
    const endPoint = "https://api.spotify.com/v1/browse/new-releases?country=GB&limit=50&offset=0";
    // const result = await fetchData(endPoint, token);
    // const resultArray = extractID(result.albums.items,album_no);
    // const albumdata = JSON.stringify(resultArray);
    // return resultArray;
    try {
        const result = await fetchData(endPoint, token);

        // Extract album information from the result
        const albums: AlbumInfo[] = result.albums.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            img_url: item.images[0].url,
            img_width: item.images[0].width / 5, // Adjust scaling as needed
            img_height: item.images[0].height / 5 // Adjust scaling as needed
        }));

        console.log("Saved albums fetched successfully:", albums);
        return albums;
    } catch (error) {
        console.error("Error fetching saved albums:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

export async function fetchSavedAlbums(token: string): Promise<AlbumInfo[]> {
    console.log("Fetching saved albums...");

    const endPoint = "https://api.spotify.com/v1/me/albums?limit=50"; // Adjust limit as needed

    try {
        const result = await fetchData(endPoint, token);

        // Extract album information from the result
        const albums: AlbumInfo[] = result.items.map((item: any) => ({
            id: item.album.id,
            name: item.album.name,
            img_url: item.album.images[0].url,
            img_width: item.album.images[0].width / 5, // Adjust scaling as needed
            img_height: item.album.images[0].height / 5 // Adjust scaling as needed
        }));

        console.log("Saved albums fetched successfully:", albums);
        return albums;
    } catch (error) {
        console.error("Error fetching saved albums:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}
//
// export async function fetchAlbums(token: string, option: number): Promise<AlbumInfo[]> {
//     let endPoint = "";
//     if(option == 0) {
//         endPoint = "https://api.spotify.com/v1/me/albums?limit=50";//Saved Album
//     }else if(option == 1){
//         //offset, the index for album extraction
//         endPoint = "https://api.spotify.com/v1/browse/new-releases?country=GB&limit=50&offset=0";//New Release
//         console.log("OK new release")
//     }
//
//     try {
//         let result = await fetchData(endPoint, token);
//         if(option == 1)
//             result = result.albums;
//         // Extract album information from the result
//         const albums: AlbumInfo[] = result.items.map((item: any) => ({
//             id: item.album.id,
//             name: item.album.name,
//             img_url: item.album.images[0].url,
//             img_width: item.album.images[0].width / 5, // Adjust scaling as needed
//             img_height: item.album.images[0].height / 5 // Adjust scaling as needed
//         }));
//         console.log("OK fetch album release")
//         return albums;
//     } catch (error) {
//         throw error; // Rethrow the error to handle it in the calling function
//     }
// }