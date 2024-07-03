import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import InputField from './input/InputField'; // Ensure this import points to the correct file

interface ChangePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (currentPassword: string, newPassword: string) => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const handleFormSubmit = (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    if (data.newPassword !== data.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    onSubmit(data.currentPassword, data.newPassword);
    reset();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                Change Password
              </Dialog.Title>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField
                  fieldWidth={4}
                  id="currentPassword"
                  label="Current Password"
                  type="password"
                  register={register('currentPassword', { required: true })}
                  error={errors.currentPassword && 'Current password is required'}
                />
                <InputField
                  fieldWidth={4}
                  id="newPassword"
                  label="New Password"
                  type="password"
                  register={register('newPassword', { required: true })}
                  error={errors.newPassword && 'New password is required'}
                />
                <InputField
                  fieldWidth={4}
                  id="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  register={register('confirmPassword', { required: true })}
                  error={errors.confirmPassword && 'Passwords must match'}
                />
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChangePasswordDialog;
