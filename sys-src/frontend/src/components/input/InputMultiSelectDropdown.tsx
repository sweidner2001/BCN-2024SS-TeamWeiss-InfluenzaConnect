import React, {useState, useEffect, useRef} from 'react';
import InputLabel from "./InputLabel";
import ErrorField from "./ErrorField";



interface InputMultiSelectDropdownProps {
    fieldWidth: number;
    id: string;
    label: string;
    register?: any;
    selectOptions: Array<string>
    autoComplete?: string;
    error?: string;
}




const InputMultiSelectDropdown: React.FC<InputMultiSelectDropdownProps> = ({...probs}) => {
    //_________________ Hooks: ______________
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    // Variablen:
    let classNameWidth = probs.fieldWidth ? 'sm:col-span-' + probs.fieldWidth : 'col-span-full';


    //_________________ Events: _________________
    // Event-Handler, wenn auf ein List-Element geklickt wird
    const handleSelectOption = (option: string) => {

        // Wenn das Element schon selektiert wurde, dann Auwahl wieder aufheben:
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(selected => selected !== option));
        } else {
            // Element in die Auswahlliste mit aufnehmen:
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    // Event-Handler, wenn auf einen Cancel-Button von einen ausgewählten Eintrag geklickt wurde:
    const handleRemoveOption = (option: string) => {
        setSelectedOptions(selectedOptions.filter(selected => selected !== option));
    };

    // Event-Handler, damit sich das Dropdown schließt, wenn außerhalb des Elements geklickt wurde:
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        // Wir returnen eine Parameterlose Funktion:
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    //______________________ HTML: ________________________
    return (
        <div className={classNameWidth}>
            <InputLabel htmlFor={probs.id} label={probs.label}/>
            <div ref={dropdownRef} className="mt-2 relative">


                    <div className="border border-gray-300 rounded p-2 cursor-pointer"
                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {selectedOptions.length === 0 ? (
                            <span className="text-gray-400">Sprachen auswählen...</span>
                        ) : (
                            selectedOptions.map((option, index) => (
                                <span key={index}
                                      className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-sm mr-2">
                                {option}
                                    <button className="ml-2 text-red-500 hover:text-red-700"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveOption(option);
                                            }}>&times;</button>
                            </span>
                            ))
                        )}
                    </div>
                    {isDropdownOpen && (
                        <div
                            className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                            <ul>
                                {probs.selectOptions.map((option, index) => (
                                    <li key={index} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center 
                                    ${ selectedOptions.includes(option) ? 'bg-blue-100 text-blue-700' : ''}`}
                                        onClick={() => handleSelectOption(option)}>
                                        {option}
                                        {selectedOptions.includes(option) && (
                                            <span className="ml-2 text-red-500 hover:text-red-700"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveOption(option);
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