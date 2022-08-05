import { useEffect, useRef, useState } from 'react';



export default function useDetectClickOut(initState, downloaded) {
   
    const triggerRef = useRef(null); // optional
    const nodeRef = useRef(null); // required 
    const [show, setShow] = useState(initState);

    const handleClickOutside = event => {
        //if click is on trigger element, toggle modal
            if(triggerRef.current && 
                triggerRef.current.contains(event.target) && !downloaded) {
                return setShow(!show);
            }
            
            //if modal is open and click is outside modal, close it
            // console.log(nodeRef.current && 
            //     !nodeRef.current.contains(event.target))
                
            if(nodeRef.current && 
            !nodeRef.current.contains(event.target) && !downloaded) {
                return setShow(false);
            }

    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
        document.removeEventListener("click", handleClickOutside, true);
        };

    });
    return {
    triggerRef,
    nodeRef,
    show,
    setShow
    }
 }