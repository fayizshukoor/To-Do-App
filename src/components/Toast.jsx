    import { useEffect } from "react";
    import "./Toast.css";

    function Toast({message, onClearToast}){

        useEffect(()=>{
            const timer = setTimeout(()=>{
                onClearToast();
            },2000)

            return ()=>{
                clearTimeout(timer);
            }
        },[message])
        return <div className="toast">{message}</div>
    }

    export default Toast;