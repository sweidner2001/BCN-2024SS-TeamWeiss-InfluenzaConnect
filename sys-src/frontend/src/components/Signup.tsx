import React from 'react';
import axios from 'axios';


interface InputFieldProps {
  label: string;
  type: string;
  // register: any;
  required: boolean;
  error?: string;
}


const InputField: React.FC<InputFieldProps> = ({ label, type, required, error }) => {
  return (
      <div className="sm:col-span-4">
        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        <div className="mt-2">
          <input type={type} name="first-name" id="first-name" autoComplete="given-name" placeholder={label} required={required}
                 className='px-4 py-2 rounded-lg block w-full
                              text-gray-900 placeholder:text-gray-400
                              border-0 shadow-sm ring-1 ring-inset ring-gray-300
                              focus:outline-none focus:ring-1 focus:ring-indigo-700'/>
        </div>
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
            <h3 className='text-xl font-bold my-6'>Username & Passwort</h3>
            <form className='flex flex-col space-y-4'>

              {/*Instagram Username*/}
              <div>
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


              {/*Normale Input-Felder*/}


              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                <InputField label="Email" type={"text"} required={true}/>
                <InputField label={"Email"} type={"text"} required={true}/>
                <InputField label={"Email"} type={"text"} required={true}/>
                <InputField label={"Email"} type={"text"} required={true}/>
                <InputField label={"Email"} type={"text"} required={true}/>


              </div>


              <input type="text" placeholder="Name"
                     className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-0 focus:ring-sky-500'/>
              <input type="email" placeholder="E-Mail"
                     className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'/>
              <input type="password" placeholder="Passwort"
                     className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'/>
              <button type="submit"
                      className='px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500'>Registrieren
              </button>
            </form>


            <Example/>
          </div>
        </div>
      </div>

  );
}


function Form1() {
  return(
  <div className="flex h-screen">
    <div className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
    <div className="flex items-center justify-end flex-1">
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-1/2 max-w-lg mr-4">
        <div className="mb-8">
          <InputField label="Email" type="email" required={true} error={"Fehler"}/>
        </div>
        <div className="mb-8">
          <InputField label="Password" type="password" required={true} error={""}/>
        </div>
        <div className="flex items-center justify-between">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button">
            Sign In
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  </div>
  );

}




export default Signup;