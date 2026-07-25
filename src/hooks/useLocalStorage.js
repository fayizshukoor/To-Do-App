import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue){
    const [value , setValue] = useState(()=>{
        const storedValue = localStorage.getItem(key);
        if(storedValue){
            return JSON.parse(storedValue);
        }

        return initialValue;
    });

    useEffect(()=>{
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    },[key, value]);


    return [value, setValue];
}

export default useLocalStorage;