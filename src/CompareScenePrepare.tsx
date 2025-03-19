import useCookie from 'react-use-cookie';
import { fetchAlbum } from './SpotifyAPI';


    //Selects the Albums to compare
    export function selectAlbums(currentPointer: number, currentRank: number) : number{
        const[Ranks, setRanks] = useCookie('Ranks','');

        let target: number = -1;
        const ranks : Array<number>= JSON.parse(Ranks);
        for (let i = currentPointer; i< ranks.length; i++) {
            if (currentRank == ranks[i])
                {  
                    return i;
                }
        }

        return target;
    }



    async function selectAlbum() {

    }
    /*
    //Call when the Page is load.
    useEffect(() => {
        console.log("start");
        let temp1 = selectAlbums();
        
        //If value = -1, start another loop with new rank
        if (temp1 == -1) {
            currentPointer = 1;
            currentRank /= 2;
            setCurrentRank(""+currentRank);

            //Game ends when current rank = 1, Game ends
            if (currentRank != 1) {
                temp1 = selectAlbums();
            } 
            else {
                //Game Ends
            }
        }
        currentPointer = temp1 + 1;
        

        console.log("Pointer: " + currentPointer);

        const temp2 = selectAlbums();

        console.log("Checkpointb");
        //Update Cookies
        if ((temp2+1) == Ranks.length) {
            setCurrentPointer(""+0);
            setCurrentRank(""+(currentRank/2));
        } else {
            setCurrentPointer(""+(temp2 + 1));
        }
        console.log(temp1 + ""+ temp2);

        fetchAlbumData(temp1, temp2);

        setTimeout(()=>{navigate("/compare")},2000);
    }, [])


    return (<>
    <h1>Loading...</h1>
    </>);
}
*/

