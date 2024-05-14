import useCookie from 'react-use-cookie';
import{ useEffect, useState } from 'react';
import { AlbumInfo } from './AlbumContainer';


//User to fetch data from Spotify.
//Parameter endPoint - decide the data to fetch.
async function fetchData(endPoint: string, token:string) :Promise<any>{
    // console.log("Data extracting");
    
    // const result = await fetch(endPoint, {
    //     method: "GET", 
    //     headers: { Authorization: `Bearer ${token}` }
    // });

    // return await result.json();
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

//Fetches Album data from Spotify API
export async function fetchAlbum(id:string, token:string):Promise<AlbumInfo>{
    
    console.log("Start ExtractAlbum3");

    const endPoint = "https://api.spotify.com/v1/albums/"+id;
    console.log(endPoint);
    const result= await fetchData(endPoint, token);

    let info:AlbumInfo = {id: "null", name: "null"};
    console.log("next");
    console.log(result);
    info.id = result.id;
    info.name = result.name;
    info.img_url = result.images[0].url;
    info.img_width = result.images[0].width/5;
    info.img_height = result.images[0].height/5;
    info.total_tracks =result.total_tracks;
    info.track_Url = result.items.preview_url;
    //info.
    return info;
}

//Extract Album IDs from the JSON data provided.
function extractID(albums :any[]) :any[] {
    console.log("starting to extract albums");
    const IdArray = [];
    let i=0;
    console.log("starting for loop")
    for (let album of albums) {
        console.log("id " + i + ": " + album.id);
        IdArray[i] = album.id;
        i++;
    }
    return IdArray;
}

export async function getIDs(allAlbumData : AlbumInfo[]){
    console.log("getting albums id");
    const idArray = [];
    let i=0;
    let chosenAlbums = [];
    let bracketSize = 16;

    console.log("allAlbumData.length = " + allAlbumData.length);
    
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

    // for (let album of allAlbumData){
    //     console.log("id " + i + ": " + album.id);
    //     idArray[i] = album.id;
    //     i++;
    // }


    return chosenAlbums;
}

/*
    Extracts new release albums data from Spotify.
    Json format data is returned from Spotify.
    We further extract album ID from it and store in Cookies AlbumsCookie.

    Works when access token is present in the Cookies.
*/
export async function extractNewRelease(token:string){
    

    console.log("new releases - Checkpoint3"); 
    
    const endPoint = "https://api.spotify.com/v1/browse/new-releases?country=GB&limit=16&offset=0";

    console.log(token)
    const result = await fetchData(endPoint, token);
    const resultArray = extractID(result.albums.items);
    console.log("new releases - checkpoint 5");

    const albumdata = JSON.stringify(resultArray);

    
    console.log(albumdata);
    console.log("new releases - checkpoint 6");

    return resultArray;
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
