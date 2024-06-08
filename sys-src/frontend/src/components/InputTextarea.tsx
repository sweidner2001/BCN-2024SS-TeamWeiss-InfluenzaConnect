import React from 'react';
import InputLabel from './InputLabel'

/**
 * @interface TextareaProps Datentyp
 * @author Sebastian Weidner
 * @since 08.06.2024
 * @version 1.0
 *
 * @member fieldWidth Breite des Elements, wird nichts übergeben, dann wird die volle Breite genutzt
 * @member id ID der Textarea
 * @member label Text über Textarea
 * @member descr Beschreibung über der Textarea
 * @member defaultValue Default-Value der Textarea
 * @member textboxRows Wie viele Zeilen sollen angezeigt werden?
 * @member required Ist das Feld ein Pflichtfeld / Eingabepflicht?
 * @member error anzuzeigende Fehlernachricht
 */
interface TextareaProps {
    fieldWidth?: number;
    id: string;
    label: string;
    descr:string;
    defaultValue?:string;
    textboxRows:number;
    // register: any;
    required: boolean;
    error?: string;
}



/**
 * @function InputTextarea normales Input-Feld
 * @author Sebastian Weidner
 * @since 08.06.2024
 * @version 1.0
 *
 * @param TextareaProps Eigenschaften
 */
const InputTextarea: React.FC<TextareaProps> = ({...probs}) => {
    return (
        <div className={ probs.fieldWidth ? 'sm:col-span-' + probs.fieldWidth : 'col-span-full'}>
            <InputLabel htmlFor={probs.id} label={probs.label}/>
            <p className="mt-1 text-sm leading-6 text-gray-600">{probs.descr}</p>
            <textarea id={probs.id} required={probs.required}
                      rows={probs.textboxRows} defaultValue={probs.defaultValue}
                      className="px-2 py-2 block w-full
                                text-gray-900 text-sm placeholder:text-gray-400
                                border-0 shadow-sm rounded-lg
                                ring-1 ring-inset ring-gray-300
                                focus:outline-none focus:ring-1 focus:ring-indigo-700"/>
        </div>
    );
};


export default InputTextarea;