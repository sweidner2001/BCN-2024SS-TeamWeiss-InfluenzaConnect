import React, {useState, useEffect, useRef} from 'react';
import InputLabel from "./InputLabel";
import ErrorField from "./ErrorField";
import {useController, UseControllerProps} from "react-hook-form";


/**
 * @interface InputMultiSelectDropdownProps Datentyp
 * @extends UseControllerProps
 * @author Sebastian Weidner
 * @since 21.06.2024
 * @version 1.0
 *
 * @member fieldWidth Breite des Elements
 * @member label Text über Input-Feld
 * @member selectOptions Input-Optionen die zur Eingabe zur Verfügung stehen
 * @member error anzuzeigende Fehlernachricht
 *
 * @member name Name, unter dem das Element im Formular registriert wird
 * @member control Verknüpfung zum Formular
 */
interface InputMultiSelectDropdownProps extends UseControllerProps{
    fieldWidth: number;
    label: string;
    backgroundText: string;
    selectOptions: string[]
    error?: string;
}


const InputMultiSelectDropdown: React.FC<InputMultiSelectDropdownProps> = ({control, name, ...probs }) => {

    //__________________ Variablen: __________________
    const { field } = useController({
        control,
        name
    });
    let classNameWidth = probs.fieldWidth ? 'sm:col-span-' + probs.fieldWidth : 'col-span-full';


    //_________________ Hooks: ______________
    const [selectedOptions, setSelectedOptions] = useState<string[]>(field.value || []);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);



    //_________________ Events: _________________
    // Event-Handler, wenn auf ein List-Element geklickt wird
    const handleSelectOption = (option: string) => {

        let newSelectedOptions :string[] = [];

        // Wenn das Element schon selektiert wurde, dann Auswahl wieder aufheben:
        if (selectedOptions.includes(option)) {
            newSelectedOptions = selectedOptions.filter(selected => selected !== option);
            setSelectedOptions(newSelectedOptions);
        } else {
            // Element in die Auswahlliste mit aufnehmen:
            newSelectedOptions =[...selectedOptions, option];
            setSelectedOptions(newSelectedOptions);
        }

        field.onChange(newSelectedOptions);
    };




    // Event-Handler, damit sich das Dropdown schließt, wenn außerhalb des Elements geklickt wurde:
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    // Eventhandler, dass sich das Dropdown schließt muss registriert werden:
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        // Wir returnen eine Parameterlose Funktion:
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);





    //______________________ HTML: ________________________
    return (
        <div className={classNameWidth} >
            <InputLabel label={probs.label} onClick={() => setIsDropdownOpen(!isDropdownOpen)}/>

            {/* MultiSelect-Dropdown - Input-Field */}
            <div ref={dropdownRef} className="mt-2 relative">
                 <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`px-4 py-2 rounded-lg block w-full cursor-pointer 
                                  border-0 shadow-sm ring-1 ring-inset outline-none ${isDropdownOpen ? 'ring-indigo-700' : 'ring-gray-300'}`}>

                    {/* Wenn keine Einträge ausgewählt wurden, dann Hintergrund-Text anzeigen */}
                    {selectedOptions.length === 0 ? (
                        <span className="text-gray-400">{probs.backgroundText}</span>
                    ) : (
                        // Ansonsten ausgewählte Einträge auswählen
                        selectedOptions.map((option, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 text-sm mr-2
                                                             bg-blue-100 text-blue-700 rounded-full ">
                                {option}
                                {/*Löschen Button im ausgewählten Eintrag*/}
                                <button className="ml-2 text-red-500 hover:text-red-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectOption(option);
                                        }}>&times;</button>
                            </span>
                        ))
                    )}
                </div>

                {/* MultiSelect-Dropdown - Dropdown-Liste */}
                {isDropdownOpen && (
                    <div
                        className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                        <ul>
                            {probs.selectOptions.map((option, index) => (
                                <li key={index} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center 
                                    ${selectedOptions.includes(option) ? 'bg-blue-100 text-blue-700' : ''}`}
                                    onClick={() => handleSelectOption(option)}>
                                    {option}
                                    {selectedOptions.includes(option) && (
                                        <span className="ml-2 text-red-500 hover:text-red-700"
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleSelectOption(option);
                                              }}>&times;</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <ErrorField errorMessage={probs.error}/>
            </div>
        </div>

    );
};

export default InputMultiSelectDropdown;
