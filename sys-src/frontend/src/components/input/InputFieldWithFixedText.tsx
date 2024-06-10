import React from 'react';
import InputLabel from './InputLabel'


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
    // register: any;
    required: boolean;
    autoComplete?: string;
    error?: string;
}


/**
 * @function InputFieldWithFixedText Input-Feld mit feststehenden Text am Anfang
 * @author Sebastian Weidner
 * @since 08.06.2024
 * @version 1.0
 *
 * @param InputFieldProps Eigenschaften
 */
const InputFieldWithFixedText: React.FC<InputFieldProps & {fixedText:string}> = ({fixedText, ...probs}) => {
    return (
        <div className={"sm:col-span-" + probs.fieldWidth}>
            <InputLabel htmlFor={probs.id} label={probs.label}/>
            <div className="mt-2">
                <div className="flex rounded-lg shadow-sm sm:max-w-md
                                ring-1 ring-inset ring-gray-300
                                focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-700">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{fixedText}</span>
                    <input type={probs.type} id={probs.id} autoComplete={probs.autoComplete} placeholder={probs.label} required={probs.required}
                           className="block flex-1 border-0 bg-transparent py-1.5 pl-1 sm:text-sm sm:leading-6
                                       text-gray-900 placeholder:text-gray-400
                                       focus:ring-0 focus:outline-none "/>
                </div>
            </div>
        </div>
    );
};




export default InputFieldWithFixedText;