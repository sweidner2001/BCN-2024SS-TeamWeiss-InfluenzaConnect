import React from "react";


/**
 * @function InputLabel Label für Input-Felder
 * @author Sebastian Weidner
 * @since 08.06.2024
 * @version 1.0
 *
 * @param htmlFor Id des Input-Feldes, um das Label damit zu verknüpfen
 * @param label Anzuzeigender Text
 */
export default function InputLabel({htmlFor, label} : {htmlFor:string, label:string}) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
    );
};

