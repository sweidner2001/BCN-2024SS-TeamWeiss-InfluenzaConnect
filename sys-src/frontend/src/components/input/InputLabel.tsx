import React from "react";


/**
 * @function InputLabel Label für Input-Felder
 * @author Sebastian Weidner
 * @since 08.06.2024
 * @version 1.0
 *
 * @param htmlFor Id des Input-Feldes, um das Label damit zu verknüpfen
 * @param label Anzuzeigender Text
 * @param onClick eigener onClick-Eventhandler-Funktion
 */
export default function InputLabel({htmlFor, label, onClick} : {htmlFor?:string, label:string, onClick?:(...args: any[]) => void}) {
    return (
        <label htmlFor={htmlFor} onClick={onClick} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
    );
};

