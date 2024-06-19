import React from 'react';
import InputLabel from './InputLabel'
import ErrorField from "./ErrorField";


/**
 * @interface InputFieldProps Datentyp
 * @author Sebastian Weidner
 * @since 08.06.2024
 * @version 1.0
 *
 * @member fieldWidth Breite des Elements
 * @member id ID des Input-Feldes
 * @member label Text über Input-Feld
 * @member type Input-Type
 * @member required Ist das Feld ein Pflichtfeld / Eingabepflicht?
 * @member autoComplete Wert für die Auto-Vervollständigung {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete}
 * @member error anzuzeigende Fehlernachricht
 */
interface InputFieldProps {
    fieldWidth: number;
    id: string;
    label: string;
    type: string;
    register: any;
    autoComplete?: string;
    error?: string;
}




/**
 * @function InputField normales Input-Feld
 * @author Sebastian Weidner
 * @since 08.06.2024
 * @version 1.0
 *
 * @param InputFieldProps Eigenschaften
 */
const InputField: React.FC<InputFieldProps> = ({...probs}) => {

    // Variablen
    // let classNameWidth= probs.fieldWidth ? 'sm:col-span-' + probs.fieldWidth : 'col-span-full';
    let classNameWidth = "sm:col-span-4";
    // HTML
    return (
        <div className={classNameWidth}>
            <InputLabel htmlFor={probs.id} label={probs.label}/>
            <div className="mt-2">
                <input type={probs.type} id={probs.id} autoComplete={probs.autoComplete} placeholder={probs.label}
                       {...probs.register}
                       className='px-4 py-2 rounded-lg block w-full
                              text-gray-900 placeholder:text-gray-400
                              border-0 shadow-sm ring-1 ring-inset ring-gray-300
                              focus:outline-none focus:ring-1 focus:ring-indigo-700'/>
                <ErrorField errorMessage={probs.error}/>
            </div>
        </div>
    );
};



export default InputField;