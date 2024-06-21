import React, { useState } from 'react';
import EditableInputField from '../input/EditableInputField';
import EditableInputSelect from '../input/EditableInputSelect';
import { FormularButton, CancelButton } from '../buttons/FormularButton';

interface NeutralDataCardProps {
  userData: any;
  onSave: (data: any) => void;
}

const NeutralDataCard: React.FC<NeutralDataCardProps> = ({ userData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: userData.title,
    first_name: userData.first_name,
    last_name: userData.last_name
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Neutral Data</h2>
        <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:text-blue-700">
          {isEditing ? 'Stop Editing' : 'Edit'}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-4">
        <EditableInputSelect id="title" label="Title" value={formData.title} disabled={!isEditing} onChange={handleInputChange} options={['Mr', 'Mrs', 'Ms']} />
        <EditableInputField id="first_name" label="First Name" type="text" value={formData.first_name} disabled={!isEditing} onChange={handleInputChange} />
        <EditableInputField id="last_name" label="Last Name" type="text" value={formData.last_name} disabled={!isEditing} onChange={handleInputChange} />
      </div>
      {isEditing && (
        <div className="flex justify-end space-x-4 mt-4">
          <CancelButton type="button" text="Cancel" onClick={() => setIsEditing(false)} />
          <FormularButton type="button" text="Save" onClick={handleSave} />
        </div>
      )}
    </div>
  );
};

export default NeutralDataCard;
