import { useState,useEffect } from "react";

const useFetch = (url:any) => {
    const [count, setCount] = useState(null);
    const [isPending, setIsPending] = useState(true);//used for loading
    // const {data : LoginPage} = useFetch('http://localhost:8080/users')
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(url)
        .then(res =>{
            if(!res.ok){
                throw Error('could not fetch the data for that resource');//here is a bug and it would not been show on console
            }
            return res.json();
        } )
        .then(data => { //successfully read
            setCount(data);
            setIsPending(false);
            setError(null);// once get rid of the error message,deleting the wrong message
        })
        .catch(err => { //catch error and let the user know
            setIsPending(false);
            setError(err.meassage); 
            //console.log(error);
        })
    },[url]);
    return {count,isPending,error}
}
export default useFetch;