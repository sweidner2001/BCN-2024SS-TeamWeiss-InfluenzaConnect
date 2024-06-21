import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ILoginInputs {
  email: string;
  password: string;
}

/**
 * @function getMaxFieldLength Gibt die max. Länge zurück und einen Fehlertext für die Formulardaten-Validation
 * @author Sebastian Weidner
 * @since 13.06.2024
 * @version 1.0
 *
 * @param maxLength Maximale Textlänge des input-Feldes
 */
const getMaxFieldLength = (maxLength: number): [number, string] => {
  const maxFieldLengthText = `Eingabefeld ist auf ${maxLength} Zeichen begrenzt`;
  return [maxLength, maxFieldLengthText];
};

const LoginSchema = yup.object({
  email: yup.string().trim().required('Email is required'),
  password: yup.string().required('Password is required')
});

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginInputs>({
    resolver: yupResolver(LoginSchema)
  });

  const handleLogin = async (data: ILoginInputs) => {
    alert(JSON.stringify(data));

    // Daten ans Backend senden:
    fetch('http://localhost:5001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        // Weiterverarbeitung der Antwort
        console.log(data);
        alert('Anmeldung erfolgreich');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Fehler!');
      });
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
            <div className="fixed inset-0 bg-black bg-opacity-50" />
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
              <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 mb-4">
                Welcome Back
              </Dialog.Title>
              <p className="text-sm text-gray-500 mb-6">
                Please log in to your account
              </p>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-12"
                    {...register("email")}
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-12"
                    {...register("password")}
                  />
                  {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>
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
                    Login
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

export default LoginDialog;
