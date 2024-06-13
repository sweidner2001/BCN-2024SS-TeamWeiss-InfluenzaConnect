import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import InputField from "../input/InputField";
import InputTextarea from "../input/InputTextarea";
import InputSelect from "../input/InputSelect";
import InputFieldWithFixedText from "../input/InputFieldWithFixedText";
import {FormularButton, CancelButton} from "../FormularButton";



//___________________ Formular Validation  ________________
interface IFormInputs {
    email: string;
    passwort: string;
    anrede: string;
    vorname: string;
    nachname: string;
    bundesland: string;
    land: string;
    telefonnr: string;
    sprache: string;
    ueberMich: string;
    instaUsername: string;
}


const getMaxFieldLength = (maxLength: number): [number, string] => {
    const maxFieldLengthText = `Eingabefeld ist auf ${maxLength} Zeichen begrenzt`;
    return [maxLength, maxFieldLengthText];
};


const maxFieldLengthText = "Eingabefeld ist auf 25 Zeichen begrenzt";
const maxFieldLength = 25;

const SignupSchema = yup.object({
    email: yup.string().trim().email("Bitte geben Sie eine gültige Email-Adresse ein!").required('Bitte geben Sie eine Email an!').max(...getMaxFieldLength(25)),
    passwort: yup.string().required("Bitte geben Sie ein Passwort an!").min(10, "Das Passwort muss min. 10 Zeichen lang sein!").max(...getMaxFieldLength(25)),
    anrede: yup.string().required("Bitte geben Sie eine Anrede an!").max(maxFieldLength, maxFieldLengthText),
    vorname: yup.string().trim().required("Bitte geben Sie Ihren Vornamen an!").max(...getMaxFieldLength(25)),
    nachname: yup.string().trim().required("Bitte geben Sie Ihren Nachnamen an!").max(maxFieldLength, maxFieldLengthText),
    land: yup.string().trim().required("Bitte geben Sie Ihr Herkunftsland an!"),
    bundesland: yup.string().trim().required("Bitte geben Sie Ihr Bundesland an!"),
    telefonnr: yup.string().trim().required("Bitte Geben Sie Ihre Telefonnummer an!").max(...getMaxFieldLength(25)),
    sprache: yup.string().trim().required("Bitte geben Sie Ihre Sprachen ein, die Sie beherrschen!").max(...getMaxFieldLength(25)),
    ueberMich: yup.string().trim().defined().max(...getMaxFieldLength(500)),
    instaUsername: yup.string().trim().required("Bitte Geben Sie Ihren Instagram-Usernamen an!").max(...getMaxFieldLength(25))
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
                    <p className='text-lg font-medium text-slate-50'>#InfluencerMarketing #Werbepartner #Karriere</p>
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
                        <div className="mt-6 mb-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

                            {/*Registrierungsdaten*/}
                            <InputField register={register("email")} id="email" label="Email" type="text"
                                        autoComplete="email" fieldWidth={4} error={errors.email?.message}/>
                            <InputField register={register("passwort")} id="passwort" label="Passwort" type="password"
                                        autoComplete="current-password" fieldWidth={4}
                                        error={errors.passwort?.message}/>

                            {/*Persönliche Daten*/}
                            <InputSelect id="anrede" label="Anrede" fieldWidth={4} selectOptions={sex}
                                         autoComplete="sex"
                                         register={register("anrede")} error={errors.anrede?.message}/>
                            <InputField id="vorname" label="Vorname" type="text" autoComplete="given-name"
                                        fieldWidth={4}
                                        register={register("vorname")} error={errors.vorname?.message}/>
                            <InputField id="nachname" label="Nachname" type="text" autoComplete="family-name"
                                        fieldWidth={4}
                                        register={register("nachname")} error={errors.nachname?.message}/>

                            <InputSelect id="land" label="Land" fieldWidth={4} selectOptions={countries}
                                         autoComplete="country-name"
                                         register={register("land")} error={errors.land?.message}/>
                            <InputSelect id="bundesland" label="Bundesland" fieldWidth={4} selectOptions={bundesland}
                                         register={register("bundesland")} error={errors.bundesland?.message}/>
                            <InputField id="telefonnr" label="Telefonnummer" type="tel" autoComplete="tel"
                                        fieldWidth={4}
                                        register={register("telefonnr")} error={errors.telefonnr?.message}/>

                            {/*/!*Sprachen*!/*/}
                            <InputField id="sprache" label="Sprache" type="text" fieldWidth={4}
                                        register={register("sprache")} error={errors.sprache?.message}/>


                            <InputTextarea id="ueberMich" label="Über mich" defaultValue="Ich heiße Sebastian"
                                           descr="Schreibe ein paar Sätze über dich." textboxRows={5}
                                           register={register("ueberMich")} error={errors.ueberMich?.message}/>

                            {/*Social-Media-Accounts*/}
                            <InputFieldWithFixedText register={register("instaUsername")}
                                                     error={errors.instaUsername?.message} fixedText="instagram.com/"
                                                     id="instaUsername" label="Instagram Username" type="text"
                                                     fieldWidth={4}/>
                        </div>


                        <div className="flex items-center justify-end gap-x-6 border-t-2 border-gray-900/10 pt-6">
                            <CancelButton type="button" text="Abbrechen" linkTo="/landing"/>
                            <FormularButton type="submit" text="Registrieren" linkTo="/landing"/>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}


export default Signup;