import React, {useRef, useState} from 'react';
import useHandleClickOutside from "../../functions/useHandleClickOutside";


/**
 * @interface InputMultiSelectDropdownProps Datentyp
 * @author Sebastian Weidner
 * @since 30.06.2024
 * @version 1.0
 *
 * @member selectOptions Anzuzeigende Elemente in Form einen assoziativen Arrays
 * @member label Text über Input-Feld
 * @member onChange Methode, die die akutell ausgewählten Elemente des MultiSelectCheckboxDropdown übergeben bekommt (Keys von selectOptions)
 * @member initialSelectedOptions bereits ausgewähtle Einträge (Keys von selectOptions)
 */
interface InputMultiSelectDropdownProps {
    selectOptions: { [key: string]: string };
    label: string;
    onChange: (selectedOptions: string[]) => void; // Callback für Änderungen hinzufügen
    initialSelectedOptions?: string[];
}



/**
 * @function InputMultiSelectCheckboxDropdown Multiselect-Dropdown Element, das Checkboxen für die Auswahl der Einträge hat.
 * @author Sebastian Weidner
 * @since 30.06.2024
 * @version 1.0
 */
const InputMultiSelectCheckboxDropdown: React.FC<InputMultiSelectDropdownProps> = ({ selectOptions, label, onChange , initialSelectedOptions = []}) => {

    //_____________________ React-Hooks: _______________________
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelectedOptions);
    const dropdownRef = useRef<HTMLDivElement>(null);



    //_____________________ Eventhandler: _______________________
    // Dropdown öffnen / schließen:
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionToggle = (option: string) => {
        // Wenn Item schon ausgewählt wurde, dann wieder deselektieren, ansonsten selektieren:
        const newSelectedOptions = selectedOptions.includes(option) ? selectedOptions.filter(item => item !== option) : [...selectedOptions, option];

        // Zustand setzen und dann die Änderung an onChange übergeben
        setSelectedOptions(newSelectedOptions);

        // Selektierte Items nach Außen weiterleiten:
        onChange(newSelectedOptions);
    };


    // Event-Handler, damit sich das Dropdown schließt, wenn außerhalb des Elements geklickt wurde:
    useHandleClickOutside(dropdownRef, () => setIsDropdownOpen(false));


    //_____________________ HTML: _______________________
    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>

            {/* Button */}
            <div>
                <span className="rounded-md shadow-sm">
                    <button type="button" id="options-menu" onClick={toggleDropdown}
                        className="inline-flex justify-center items-center w-full px-4 py-2
                                    rounded-md border border-gray-300 bg-white text-medium font-medium text-gray-700
                                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-haspopup="true" aria-expanded="true">
                        {/* Filter-Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"/>
                        </svg>
                        {label}

                        {/* Pfeil-Icon */}
                        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                        </svg>
                    </button>

                </span>
            </div>

            {/* Dropdown mit Checkboxes */}
            {isDropdownOpen && (
                // <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-min">
                <div className="absolute  mt-2 right-0  bg-white border border-gray-300 rounded shadow-lg z-10 min-w-min">
                    <ul>
                        {Object.keys(selectOptions).map((option) => (

                            // Eintrag einfärben, wenn er ausgewählt wurde
                            <li key={option} onClick={() => handleOptionToggle(option)}
                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm 
                                            ${selectedOptions.includes(option) ? 'bg-blue-100 text-blue-700' : ''}`}>
                                {/* Checkbox */}
                                <input type="checkbox" onChange={() => handleOptionToggle(option)} checked={selectedOptions.includes(option)}
                                        className="form-checkbox h-4 w-4 text-indigo-600 mr-3"/>
                                {/* Label */}
                                {selectOptions[option]}
                            </li>

                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default InputMultiSelectCheckboxDropdown;
