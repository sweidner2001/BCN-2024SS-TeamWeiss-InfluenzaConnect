import React, { useState } from 'react';
import EditableInputField from '../input/EditableInputField';
import { FormularButton, CancelButton } from '../buttons/FormularButton';

interface PrivateDataCardProps {
  userData: any;
  onSave: (data: any) => void;
}

const PrivateDataCard: React.FC<PrivateDataCardProps> = ({ userData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: userData.phone,
    email: userData.email,
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <h2 className="text-2xl font-bold">Private Data</h2>
        <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:text-blue-700">
          {isEditing ? 'Stop Editing' : 'Edit'}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-4">
        <EditableInputField id="phone" label="Phone" type="tel" value={formData.phone} disabled={!isEditing} onChange={handleInputChange} />
        <EditableInputField id="email" label="Email" type="email" value={formData.email} disabled={!isEditing} onChange={handleInputChange} />
        <EditableInputField id="password" label="Password" type="password" value={formData.password} disabled={!isEditing} onChange={handleInputChange} />
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

export default PrivateDataCard;
