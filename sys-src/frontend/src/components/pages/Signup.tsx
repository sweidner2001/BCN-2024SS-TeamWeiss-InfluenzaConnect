import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import InputField from "../input/InputField";
import InputTextarea from "../input/InputTextarea";
import InputSelect from "../input/InputSelect";
import InputFieldWithFixedText from "../input/InputFieldWithFixedText";






const Signup: React.FC = () => {

    let countries: Array<string> = ['Deutschland', 'Österreich', 'Schweiz'];
    let bundesland: Array<string> = ['Bayern', 'Hessen', 'Sachsen'];
    let sex : Array<string> = ['Herr', 'Frau', 'Divers'];

    return (
        <div className="w-full h-screen flex items-start">

            {/************* Linke Seite ***************/}
            <div className='relative w-1/2 h-full flex flex-col'>
                {/*--- Text ---*/}
                <div className='absolute top-[25%] left-[15%]'>
                    <h1 className='text-5xl font-extrabold text-slate-50 my-6'>Registrierung InfluenzaConnect</h1>
                    <p className='text-lg font-medium text-slate-50'>#InfluecerMarketing #Werbepartner #Karriere</p>
                </div>

                {/*--- Hintergrund ---*/}
                {/*<img src={} className='w-full h-full object-cover'/>*/}
                <div className="flex-1 bg-gradient-to-r from-gray-900 from-5% to-sky-900 to-90%"></div>
            </div>


            {/************* Rechte Seite ***************/}
            <div className='w-1/2 h-full flex flex-col items-center overflow-y-auto'>
                {/*von der halben Seite soll nur 3/4 davon mit unseren Formular ausgefüllt werden*/}
                <div className='w-3/4 mx-auto my-10'>

                    {/*--- Überschrift ---*/}
                    <div className="border-b-2 border-gray-900/10 pb-4">
                        <h3 className='text-xl font-bold mt-6 mb-0 text-gray-900 '>Username & Passwort</h3>
                        <p className="mt-1 pt-0 text-sm leading-6 text-gray-500">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>

                    {/*--- Formular ---*/}
                    <form className='flex flex-col space-y-4'>

                        {/*Hier Abstand zwischen den Input-Feldern bestimmen*/}
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

                            {/*Registrierungsdaten*/}
                            <InputField id="email" label="Email" type="text" required={true} autoComplete="email" fieldWidth={4}/>
                            <InputField id="passwort" label="Passwort" type="password" required={true} autoComplete="current-password" fieldWidth={4}/>

                            {/*Persönliche Daten*/}
                            <InputSelect id="anrede" label="Anrede" required={true} fieldWidth={4} selectOptions={sex} autoComplete="sex"/>
                            <InputField id="vorname" label="Vorname" type="text" required={true} autoComplete="given-name" fieldWidth={4}/>
                            <InputField id="nachname" label="Nachname" type="text" required={true} autoComplete="family-name" fieldWidth={4}/>

                            <InputSelect id="land" label="Land" required={true} fieldWidth={4} selectOptions={countries} autoComplete="country-name"/>
                            <InputSelect id="bundesland" label="Bundesland" required={false} fieldWidth={4} selectOptions={bundesland}/>
                            <InputField id="telefonnr" label="Telefonnummer" type="tel" required={true} autoComplete="tel" fieldWidth={4}/>

                            {/*Sprachen*/}
                            <InputField id="sprache" label="Sprache" type="text" required={false} fieldWidth={4}/>



                            <InputTextarea id="ueberMich" label="Über mich" required={false} defaultValue="Ich heiße Sebastian" descr="Schreibe ein paar Sätze über dich." textboxRows={5}/>

                            {/*Social-Media-Accounts*/}
                            <InputFieldWithFixedText fixedText="instagram.com/" id="instaUsername" label="Instagram Username" type="text" required={true} fieldWidth={4}/>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}


export default Signup;