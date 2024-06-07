import React from 'react';
import axios from 'axios';


interface InputFieldProps {
  label: string;
  type: string;
  // register: any;
  required: boolean;
  error?: string;
}


const InputField: React.FC<InputFieldProps> = ({label, type, required, error}) => {
  return (
      <div className="sm:col-span-4">
        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        <div className="mt-2">
          <input type={type} name="first-name" id="first-name" autoComplete="given-name" placeholder={label}
                 required={required}
                 className='px-4 py-2 rounded-lg block w-full
                              text-gray-900 placeholder:text-gray-400
                              border-0 shadow-sm ring-1 ring-inset ring-gray-300
                              focus:outline-none focus:ring-1 focus:ring-indigo-700'/>
        </div>
      </div>
  );
};


const InputFieldWithFixedText: React.FC<InputFieldProps> = ({label, type, required, error}) => {
  return (
      <div className="sm:col-span-4">
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          Username
        </label>
        <div className="mt-2">
          <div
              className="flex rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-700 sm:max-w-md">
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">instagram.com/</span>
            <input type="text" name="insta_user" id="Instagram Username" placeholder="weidner.2001"
                   className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"/>
          </div>
        </div>
      </div>
  );
};

const InputSelect:React.FC<InputFieldProps> = ({label, type, required, error}) => {
  return (

  <div className="sm:col-span-4">
    <label htmlFor="country"
           className="block text-sm font-medium leading-6 text-gray-900">country</label>
    <div className="mt-2">
      <select id="country" name="country" autoComplete="country-name"
              className="px-2 py-2 rounded-lg block w-full
                                text-gray-900 placeholder:text-gray-400
                                border-0 shadow-sm
                                ring-1 ring-inset ring-gray-300
                                focus:outline-none focus:ring-1 focus:ring-indigo-700">
        <option>United States</option>
        <option>Canada</option>
        <option>Mexico</option>
      </select>


    </div>
  </div>
  );
};



const InputTextBox:React.FC<InputFieldProps> = ({label, type, required, error}) => {
  return (

      <div className="col-span-full">
        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
          About
        </label>
        <p className="mt-1 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
        <textarea
            id="about"
            name="about"
            rows={5} defaultValue={''}
            className="px-2 py-2 block w-full
                                text-gray-900 text-sm placeholder:text-gray-400
                                border-0 shadow-sm rounded-lg
                                ring-1 ring-inset ring-gray-300
                                focus:outline-none focus:ring-1 focus:ring-indigo-700"/>
      </div>
  );
};


const Signup: React.FC = () => {


  return (

      <div className="w-full h-screen flex items-start">

        {/************* Linke Seite ***************/}
        <div className='relative w-1/2 h-full flex flex-col'>
          <div className='absolute top-[25%] left-[15%]'>
            <h1 className='text-5xl font-extrabold text-slate-50 my-6'>Registrierung InfluenzaConnect</h1>
            <p className='text-lg font-medium text-slate-50'>#InfluecerMarketing #Werbepartner #Karriere</p>
          </div>

          {/*<img src={} className='w-full h-full object-cover'/>*/}
          <div className="flex-1 bg-gradient-to-r from-gray-900 from-5% to-sky-900 to-90%"></div>
        </div>


        {/************* Rechte Seite ***************/}
        <div className='w-1/2 h-full flex flex-col items-center overflow-y-auto'>
          {/*von der halben Seite soll nur 3/4 davon mit unseren Formular ausgefüllt werden*/}
          <div className='w-3/4 mx-auto mt-10'>

            <div className="border-b-2 border-gray-900/10 pb-4">
              <h3 className='text-xl font-bold mt-6 mb-0 text-gray-900 '>Username & Passwort</h3>
              <p className="mt-1 pt-0 text-sm leading-6 text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <form className='flex flex-col space-y-4'>

                {/*Hier Abstand zwischen den Input-Feldern bestimmen*/}
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">


                  <InputField label="Email" type={"text"} required={true}/>
                  <InputFieldWithFixedText label="Email" type={"text"} required={true}/>
                  <InputSelect label="Email" type={"text"} required={true}/>
                  <InputTextBox label="Email" type={"text"} required={true}/>

                </div>


            </form>


            <Example/>
          </div>
        </div>
      </div>

  );
}


export default Signup;