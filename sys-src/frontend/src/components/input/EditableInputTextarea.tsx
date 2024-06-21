import React from 'react';

interface EditableInputTextareaProps {
  id: string;
  label: string;
  value: string;
  disabled: boolean;
  rows: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditableInputTextarea: React.FC<EditableInputTextareaProps> = ({ id, label, value, disabled, rows, onChange }) => {
  return (
    <div className="col-span-full">
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`px-2 py-2 block w-full text-gray-900 text-sm placeholder:text-gray-400 border-0 shadow-sm rounded-lg ring-1 ring-inset ring-gray-300 ${disabled ? '' : 'focus:outline-none focus:ring-1 focus:ring-indigo-700'}`}
        />

      </div>
    </div>
  );
};

export default EditableInputTextarea;
