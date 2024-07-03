import React from 'react';

interface EditableInputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditableInputField: React.FC<EditableInputFieldProps> = ({ id, label, type, value, disabled, onChange }) => {
  return (
    <div className="sm:col-span-4">
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg block w-full text-gray-900 placeholder:text-gray-400 border-0 shadow-sm ring-1 ring-inset ring-gray-300 ${disabled ? '' : 'focus:outline-none focus:ring-1 focus:ring-indigo-700'}`}
        />

      </div>
    </div>
  );
};

export default EditableInputField;
