import React, { useState } from 'react';
import EditableInputField from '../input/EditableInputField';
import { FormularButton, CancelButton } from '../buttons/FormularButton';
import PasswordChangeDialog from '../ChangePasswordDialog';

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
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleChangePassword = (currentPassword: string, newPassword: string) => {
    // Implement password change logic here
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
        <button
          onClick={() => setIsPasswordDialogOpen(true)}
          className="py-2 px-4 rounded-lg mt-4 border-blue-500 text-blue-500 hover:bg-blue-100"
        >
          Change Password
        </button>
      </div>
      {isEditing && (
        <div className="flex justify-end space-x-4 mt-4">
          <CancelButton type="button" text="Cancel" onClick={() => setIsEditing(false)} />
          <FormularButton type="button" text="Save" onClick={handleSave} />
        </div>
      )}
      <PasswordChangeDialog 
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        onSubmit={handleChangePassword}
      />
    </div>
  );
};

export default PrivateDataCard;