// useOutsideClick.ts
import { useEffect } from 'react';


/**
 * @function useOutsideClick Event-Handler, damit sich das Dropdown schließt, wenn außerhalb des Elements geklickt wurde:
 * @param ref Referenz des Elements
 * @param callback Funktion die aufgerufen wird, wenn außerhalb des Elements geklickt wurde
 */
const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };


        // Eventhandler, dass sich das Dropdown schließt muss registriert werden:
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};


export default useOutsideClick;
