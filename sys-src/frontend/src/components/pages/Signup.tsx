import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import InputField from "../input/InputField";
import InputTextarea from "../input/InputTextarea";
import InputSelect from "../input/InputSelect";
import InputFieldWithFixedText from "../input/InputFieldWithFixedText";



//___________________ Formular Validation  ________________
interface IFormInputs {
    email: string;
    passwort: string;
    instaUsername: string;
    land: string;
    ueberMich: string;
    sprache: string;
    telefonnr: string;
    bundesland: string;
    vorname: string;
    nachname: string;
    anrede: string;
}

const SignupSchema = yup.object({
    email: yup.string().required('Bitte Geben Sie eine Email an!'),
    passwort: yup.string().required("Bitte Geben Sie ein Passwort an!"),
    instaUsername: yup.string().required("Bitte Geben Sie ein Username an!"),
    land: yup.string().required("Bitte Geben Sie ein land an!"),
    ueberMich: yup.string().required("Bitte Geben Sie ein Über Mich an!"),
    sprache: yup.string().required("Bitte Geben Sie ein Über Mich an!"),
    telefonnr: yup.string().required("Bitte Geben Sie ein Über Mich an!"),
    bundesland: yup.string().required("Bitte Geben Sie ein Über Mich an!"),
    vorname: yup.string().required("Bitte Geben Sie ein Über Mich an!"),
    nachname: yup.string().required("Bitte Geben Sie ein Über Mich an!"),
    anrede: yup.string().required("Bitte Geben Sie ein Über Mich an!")
});




const Signup: React.FC = () => {

    //________________ Variablen: ________________
    let countries: Array<string> = ['Deutschland', 'Österreich', 'Schweiz'];
    let bundesland: Array<string> = ['Bayern', 'Hessen', 'Sachsen'];
    let sex : Array<string> = ['Herr', 'Frau', 'Divers'];


    //___________________ Formular Logik ________________
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInputs>({
        resolver: yupResolver(SignupSchema)
    });
    const onSubmit = (data: IFormInputs) => {
        alert(JSON.stringify(data));
    };



    //___________________ HTML: Formular ________________
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
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>

                        {/*Hier Abstand zwischen den Input-Feldern bestimmen*/}
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

                            {/*Registrierungsdaten*/}
                            <InputField register={register("email")} id="email" label="Email" type="text"
                                        autoComplete="email" fieldWidth={4} error={errors.email?.message}/>
                            <InputField register={register("passwort")} id="passwort" label="Passwort" type="password"
                                        autoComplete="current-password" fieldWidth={4}
                                        error={errors.passwort?.message}/>

                            {/*Persönliche Daten*/}
                            <InputSelect id="anrede" label="Anrede" fieldWidth={4} selectOptions={sex} autoComplete="sex"
                                         register={register("anrede")} error={errors.anrede?.message}/>
                            <InputField id="vorname" label="Vorname" type="text" autoComplete="given-name" fieldWidth={4}
                                        register={register("vorname")} error={errors.vorname?.message}/>
                            <InputField id="nachname" label="Nachname" type="text" autoComplete="family-name" fieldWidth={4}
                                        register={register("nachname")} error={errors.nachname?.message}/>

                            <InputSelect id="land" label="Land" fieldWidth={4} selectOptions={countries} autoComplete="country-name"
                                         register={register("land")} error={errors.land?.message}/>
                            <InputSelect id="bundesland" label="Bundesland" fieldWidth={4} selectOptions={bundesland}
                                         register={register("bundesland")} error={errors.bundesland?.message}/>
                            <InputField id="telefonnr" label="Telefonnummer" type="tel" autoComplete="tel" fieldWidth={4}
                                        register={register("telefonnr")} error={errors.telefonnr?.message}/>

                            {/*/!*Sprachen*!/*/}
                            <InputField id="sprache" label="Sprache" type="text" fieldWidth={4}
                                        register={register("sprache")} error={errors.sprache?.message}/>


                            <InputTextarea id="ueberMich" label="Über mich" defaultValue="Ich heiße Sebastian" descr="Schreibe ein paar Sätze über dich." textboxRows={5}
                                           register={register("ueberMich")} error={errors.ueberMich?.message}/>

                            {/*Social-Media-Accounts*/}
                            <InputFieldWithFixedText register={register("instaUsername")} error={errors.instaUsername?.message} fixedText="instagram.com/" id="instaUsername" label="Instagram Username" type="text" fieldWidth={4}/>
                            <input type="submit"/>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}


export default Signup;