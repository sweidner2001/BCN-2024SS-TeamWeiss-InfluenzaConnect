import React from 'react';
import InputLabel from './InputLabel'
import ErrorField from "./ErrorField";


/**
 * @interface InputSelectProps Datentyp
 * @author Sebastian Weidner
 * @since 08.06.2024
 * @version 1.0
 *
 * @member fieldWidth Breite des Elements, wird nichts übergeben, dann wird die volle Breite genutzt
 * @member id ID des Select-Elements
 * @member label Text über Textarea
 * @member required Ist das Feld ein Pflichtfeld / Eingabepflicht?
 * @member selectOptions Auszuwählende Einträge
 * @member autoComplete Wert für die Auto-Vervollständigung {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete}
 * @member error anzuzeigende Fehlernachricht
 */
interface InputSelectProps {
    fieldWidth: number;
    id: string;
    label: string;
    register: any;
    selectOptions:Array<string>
    autoComplete?: string;
    error?: string;
}



/**
 * @function InputSelect Select-Auswahl-Element
 * @author Sebastian Weidner
 * @since 08.06.2024
 * @version 1.0
 *
 * @param InputSelectProps Eigenschaften
 */
const InputSelect: React.FC<InputSelectProps> = ({...probs}) => {

    // Variablen:
    let classNameWidth= probs.fieldWidth ? 'sm:col-span-' + probs.fieldWidth : 'col-span-full';

    // HTML:
    return (
        <div className={classNameWidth}>
            <InputLabel htmlFor={probs.id} label={probs.label}/>
            <div className="mt-2">
                <select id={probs.id} autoComplete={probs.autoComplete}
                        {...probs.register}
                        className="px-2 py-2 rounded-lg block w-full
                                    text-gray-900 placeholder:text-gray-400
                                    border-0 shadow-sm
                                    ring-1 ring-inset ring-gray-300
                                    focus:outline-none focus:ring-1 focus:ring-indigo-700">
                    {probs.selectOptions.map(elem =>
                        <option key={elem} value={elem}>{elem}</option>)
                    }
                </select>
                <ErrorField errorMessage={probs.error}/>
            </div>
        </div>
    );
};


export default InputSelect;