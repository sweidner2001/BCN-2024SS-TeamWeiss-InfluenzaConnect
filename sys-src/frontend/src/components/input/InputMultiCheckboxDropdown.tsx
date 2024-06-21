import React, { useState } from 'react';

interface MultiSelectDropdownProps {
    options: string[];
    label: string;
    onChange: (selectedOptions: string[]) => void; // Callback für Änderungen hinzufügen
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, label, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionToggle = (option: string) => {
        // Neuen Zustand ermitteln
        const newSelectedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter(item => item !== option)
            : [...selectedOptions, option];

        // Zustand setzen und dann die Änderung an onChange übergeben
        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <span className="rounded-md shadow-sm">
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-medium
                        items-center
                        font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                             className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                      clip-rule="evenodd"/>
                            </svg>
                        Filter
                        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                            </svg>
                    </button>

                </span>
            </div>

            {isOpen && (
                // <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-min">

                <div className="absolute  mt-2 right-0  bg-white border border-gray-300 rounded shadow-lg z-10 min-w-min">
                    <ul>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm ${
                                    selectedOptions.includes(option) ? 'bg-blue-100 text-blue-700' : ''
                                }`}
                                onClick={() => handleOptionToggle(option)}
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-indigo-600 mr-3"
                                    onChange={() => handleOptionToggle(option)}
                                    checked={selectedOptions.includes(option)}
                                />
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
