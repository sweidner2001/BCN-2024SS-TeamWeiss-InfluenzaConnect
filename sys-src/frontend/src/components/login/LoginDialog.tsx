import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../input/InputField';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: { firstName: string }) => void;  // Add this prop
}

interface ILoginInputs {
  email: string;
  password: string;
}

const LoginSchema = yup.object({
  email: yup.string().trim().required('Email is required'),
  password: yup.string().required('Password is required')
});

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose, onLoginSuccess }) => {  // Add onLoginSuccess here
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginInputs>({
    resolver: yupResolver(LoginSchema)
  });

  const handleLogin = async (data: ILoginInputs) => {
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (response.ok) {
        // const loginData = await response.json(); // Remove this line

        const setSessionResponse = await fetch('http://localhost:5001/set_session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: data.email }),
          credentials: 'include'
        });

        // const emailResponse = await fetch('http://localhost:5001/get_session_email', { // Remove this line
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   credentials: 'include' // This ensures cookies (session data) are sent with the request
        // });

        if (setSessionResponse.ok) {
          // const sessionData = await setSessionResponse.json(); // Remove this line

          const userResponse = await fetch('http://localhost:5001/profileView', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: data.email }),
            credentials: 'include'
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            onLoginSuccess({ firstName: userData.user.first_name });  // Call the callback with user data
            onClose();  // Close the dialog
          }
        } else {
          console.error('Fehler beim Setzen der Session:', await setSessionResponse.text());
        }
      } else {
        console.error('Anmeldung fehlgeschlagen:', await response.text());
      }
    } catch (error) {
      console.error('Fehler:', error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto border-blue-500" onClose={onClose}>
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
                  <InputField 
                    fieldWidth={4} 
                    id="email" 
                    label="Email" 
                    type="text" 
                    register={register("email")} 
                    autoComplete="email" 
                    error={errors.email?.message} 
                  />
                </div>
                <div className="mt-4">
                  <InputField 
                    fieldWidth={4} 
                    id="password" 
                    label="Password" 
                    type="password" 
                    register={register("password")} 
                    autoComplete="current-password" 
                    error={errors.password?.message} 
                  />
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
