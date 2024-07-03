import React from 'react';

interface EditableInputSelectProps {
  id: string;
  label: string;
  value: string;
  disabled: boolean;
  options: Array<string>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EditableInputSelect: React.FC<EditableInputSelectProps> = ({ id, label, value, disabled, options, onChange }) => {
  return (
    <div className="sm:col-span-4">
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`px-2 py-2 rounded-lg block w-full text-gray-900 placeholder:text-gray-400 border-0 shadow-sm ring-1 ring-inset ring-gray-300 ${disabled ? '' : 'focus:outline-none focus:ring-1 focus:ring-indigo-700'}`}
        >
        {options.map(option => (
            <option key={option} value={option}>{option}</option>
        ))}
        </select>

      </div>
    </div>
  );
};

export default EditableInputSelect;
