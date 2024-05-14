import{ useEffect, useState } from 'react';
import useCookie from 'react-use-cookie';
import AlbumContainer from './AlbumContainer';
import "./CSS/UserManual.css";
import "./CSS/App.css";
import HomeButton from './HomeButton';
import ShareButton from './Sharebutton';

import { useNavigate } from 'react-router-dom';
{
    /*
        Holds the scene of comparison betweens Albums.
        Should merge with AlbumContainer?
    */
}
const CompareScene = () => {
    const[loadState, setloadState] = useState<boolean>(false);
    const[index1, setIndex1] = useState<number> (-1);
    const[index2, setIndex2] = useState<number> (-1);
    const[CurrentRank, setCurrentRank] = useCookie('CurrentRank','');
    const[CurrentPointer, setCurrentPointer] = useCookie('CurrentPointer','');
    const[Ranks, setRanks] = useCookie('Ranks','');
    const ranks : Array<number>= JSON.parse(Ranks);
    let currentPointer : number = parseInt(CurrentPointer);
    let currentRank: number = parseInt(CurrentRank);//The game best "rank", like best 8 best 16,
    const navigate = useNavigate();

    //Selects the Albums to compare
    //Return -1 if no eligible album is found
    function selectAlbums() : number{
        for (let i = currentPointer; i< ranks.length; i++) {
            if (currentRank == ranks[i])
            {
                return i;
            }
        }
        return -1;
    }

    //Call when the Page is load.
    useEffect(() => {
        console.log("start");
        let temp1 = selectAlbums();

        //If value = -1, start another loop with new rank
        if (temp1 == -1) {
            currentPointer = 0;
            currentRank /= 2;
            setCurrentRank(""+currentRank);

            //Game ends when current rank = 1, Game ends
            
        }
        if (currentRank != 1) {
            temp1 = selectAlbums();
        }
        else {
            navigate("/EndPage");
        }
        currentPointer = temp1 + 1;

        setIndex1(temp1);

        console.log("Pointer: " + currentPointer);

        const temp2 = selectAlbums();
        setIndex2(temp2);

        console.log("Checkpointb");
        //Update Cookies
        if ((temp2+1) != Ranks.length) {
            setCurrentPointer(""+(temp2+1));
        } else {
            setCurrentPointer(""+(temp2));
        }
        setloadState(true);
        console.log(temp1 + ""+ temp2);
    }, [])


    return (<>
        <h1 className='title'>Choose An Album</h1>
        <HomeButton />
        <ShareButton />
        {loadState && <>
            <div className='info-box-container'>
                <div className='info-box'>
                    <AlbumContainer index = {index1} />
                </div>
                <div className='info-box'>
                    <AlbumContainer index = {index2} />
                </div>
            </div>

        </>}

        {!loadState && <h1>Loading...</h1>}
    </>);
}

export default CompareScene;