import React, {useState} from 'react';
import axios from 'axios';
import {SubmitHandler, useForm} from "react-hook-form";
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

interface IFormInputs1 {
    email: string;
    passwort: string;
}

interface IFormInputs2 {
    anrede: string;
    vorname: string;
    nachname: string;
    land: string;
    bundesland: string;
    telefonnr: string;
    sprache: string;
    ueberMich: string;
}

interface IFormInputs3 {
    instaUsername: string;
}



const getMaxFieldLength = (maxLength: number): [number, string] => {
    const maxFieldLengthText = `Eingabefeld ist auf ${maxLength} Zeichen begrenzt`;
    return [maxLength, maxFieldLengthText];
};


const maxFieldLengthText = "Eingabefeld ist auf 25 Zeichen begrenzt";
const maxFieldLength = 25;

const SignupSchema1 = yup.object({
    email: yup.string().trim().email("Bitte geben Sie eine gültige Email-Adresse ein!").required('Bitte geben Sie eine Email an!').max(...getMaxFieldLength(40)),
    passwort: yup.string().required("Bitte geben Sie ein Passwort an!").min(10, "Das Passwort muss min. 10 Zeichen lang sein!").max(...getMaxFieldLength(25))
});


const SignupSchema2 = yup.object({
    anrede: yup.string().required("Bitte geben Sie eine Anrede an!").max(maxFieldLength, maxFieldLengthText),
    vorname: yup.string().trim().required("Bitte geben Sie Ihren Vornamen an!").max(...getMaxFieldLength(25)),
    nachname: yup.string().trim().required("Bitte geben Sie Ihren Nachnamen an!").max(maxFieldLength, maxFieldLengthText),
    land: yup.string().trim().required("Bitte geben Sie Ihr Herkunftsland an!"),
    bundesland: yup.string().trim().required("Bitte geben Sie Ihr Bundesland an!"),
    telefonnr: yup.string().trim().required("Bitte Geben Sie Ihre Telefonnummer an!").max(...getMaxFieldLength(25)),
    sprache: yup.string().trim().required("Bitte geben Sie Ihre Sprachen ein, die Sie beherrschen!").max(...getMaxFieldLength(25)),
    ueberMich: yup.string().trim().defined().max(...getMaxFieldLength(500))
});


const SignupSchema3 = yup.object({
    instaUsername: yup.string().trim().required("Bitte Geben Sie Ihren Instagram-Usernamen an!").max(...getMaxFieldLength(25))
});


const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

const Signup: React.FC = () => {
    const countries = ['Deutschland', 'Österreich', 'Schweiz'];
    const bundesland = ['Bayern', 'Hessen', 'Sachsen'];
    const sex = ['Herr', 'Frau', 'Divers'];

    const [currentForm, setCurrentForm] = useState(1);
    const [formData, setFormData] = useState<any>({});
    const [transition, setTransition] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right'>('left');

    const form1 = useForm<IFormInputs1>({
        resolver: yupResolver(SignupSchema1),
        defaultValues: formData.form1 || {}
    });

    const form2 = useForm<IFormInputs2>({
        resolver: yupResolver(SignupSchema2),
        defaultValues: formData.form2 || {}
    });

    const form3 = useForm<IFormInputs3>({
        resolver: yupResolver(SignupSchema3),
        defaultValues: formData.form3 || {}
    });

    const handleNext = (formNumber: number) => {
        setDirection('left');
        setTransition(true);
        setTimeout(() => {
            let data = {};
            if (formNumber === 1) {
                data = form1.getValues();
            } else if (formNumber === 2) {
                data = form2.getValues();
            }
            setFormData((prevData: any) => ({
                ...prevData,
                [`form${formNumber}`]: data
            }));
            setCurrentForm(formNumber + 1);
            setTransition(false);
        }, 500);
    };

    const handleBack = (formNumber: number) => {
        setDirection('left');
        setTransition(true);
        setTimeout(() => {
            setCurrentForm(formNumber);
            setTransition(false);
        }, 500);
    };

    const onSubmitForm3: SubmitHandler<any> = async data => {
        const finalData = {
            ...formData,
            form3: data
        };
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert(JSON.stringify(finalData));
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
                <div className="flex-1 bg-gradient-to-r from-gray-900 from-5% to-sky-900 to-90%"></div>
            </div>

            {/************* Rechte Seite ***************/}
            {/*<div className='w-1/2 h-full flex flex-col items-center overflow-y-auto transition-transform duration-500'>*/}
            <div className={`w-1/2 h-full flex flex-col items-center overflow-y-auto transition-transform duration-500 ${transition ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
            {/*<div className={`w-1/2 h-full flex flex-col items-center overflow-y-auto transition-transform duration-500 ${transition ? (direction === 'left' ? 'translate-x-full' : '-translate-x-full') : 'translate-x-0'}`}>*/}

                <div className='w-3/4 mx-auto my-10'>
                    {currentForm === 1 && (
                        <form onSubmit={form1.handleSubmit(() => handleNext(1))} className='flex flex-col space-y-4'>
                            {/*--- Überschrift ---*/}
                            <div className="border-b-2 border-gray-900/10 pb-4">
                                <h3 className='text-xl font-bold mt-6 mb-0 text-gray-900 '>Username & Passwort</h3>
                                <p className="mt-1 pt-0 text-sm leading-6 text-gray-500">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                            </div>
                            <div className="mt-6 mb-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

                                <InputField id="email" label="Email" type="text"
                                            autoComplete="email" fieldWidth={4}
                                            register={form1.register("email")} error={form1.formState.errors.email?.message}/>

                                <InputField id="passwort" label="Passwort" type="password"
                                            autoComplete="current-password" fieldWidth={4}
                                            register={form1.register("passwort")} error={form1.formState.errors.passwort?.message}/>
                            </div>
                            <div className="flex items-center justify-end gap-x-6 border-t-2 border-gray-900/10 pt-6">
                                <CancelButton type="button" text="Abbrechen" linkTo="/landing"/>
                                <FormularButton type="submit" text="Weiter"/>
                            </div>
                        </form>
                    )}

                    {currentForm === 2 && (
                    <div className={`transition-transform duration-500 ${currentForm == 2 ? 'translate-x-0' : '-translate-x-full'}`}>

                        <form onSubmit={form2.handleSubmit(() => handleNext(2))} className='flex flex-col space-y-4'>
                            {/*--- Überschrift ---*/}
                            <div className="border-b-2 border-gray-900/10 pb-4">
                                <h3 className='text-xl font-bold mt-6 mb-0 text-gray-900 '>Persönliche Daten</h3>
                                <p className="mt-1 pt-0 text-sm leading-6 text-gray-500">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                            </div>
                            <div className="mt-6 mb-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                                <InputSelect id="anrede" label="Anrede" fieldWidth={4} selectOptions={sex}
                                             autoComplete="sex"
                                             register={form2.register("anrede")} error={form2.formState.errors.anrede?.message}/>
                                <InputField id="vorname" label="Vorname" type="text" autoComplete="given-name"
                                            fieldWidth={4}
                                            register={form2.register("vorname")} error={form2.formState.errors.vorname?.message}/>
                                <InputField id="nachname" label="Nachname" type="text" autoComplete="family-name"
                                            fieldWidth={4}
                                            register={form2.register("nachname")} error={form2.formState.errors.nachname?.message}/>


                                <InputSelect id="land" label="Land" fieldWidth={4} selectOptions={countries}
                                             autoComplete="country-name"
                                             register={form2.register("land")} error={form2.formState.errors.land?.message}/>
                                <InputSelect id="bundesland" label="Bundesland" fieldWidth={4} selectOptions={bundesland}
                                             register={form2.register("bundesland")} error={form2.formState.errors.bundesland?.message}/>

                                <InputField id="telefonnr" label="Telefonnummer" type="tel" autoComplete="tel"
                                            fieldWidth={4}
                                            register={form2.register("telefonnr")} error={form2.formState.errors.telefonnr?.message}/>

                                <InputField id="sprache" label="Sprache" type="text" fieldWidth={4}
                                            register={form2.register("sprache")} error={form2.formState.errors.sprache?.message}/>

                                <InputTextarea id="ueberMich" label="Über mich" defaultValue=""
                                               descr="Schreibe ein paar Sätze über dich." textboxRows={5}
                                               register={form2.register("ueberMich")} error={form2.formState.errors.ueberMich?.message}/>

                            </div>
                            <div className="flex items-center justify-end gap-x-6 border-t-2 border-gray-900/10 pt-6">
                                <button type="button" onClick={() => handleBack(1)} className="text-orange-700 font-medium text-lg text-center shadow-lg rounded-lg px-5 py-2.5 transform hover:scale-105 transition-transform ring-1 ring-orange-700 hover:bg-slate-100">Zurück</button>
                                <FormularButton type="submit" text="Weiter"/>
                            </div>
                        </form>
                    </div>
                    )}

                    {currentForm === 3 && (
                        <form onSubmit={form3.handleSubmit(onSubmitForm3)} className='flex flex-col space-y-4'>
                            {/*--- Überschrift ---*/}
                            <div className="border-b-2 border-gray-900/10 pb-4">
                                <h3 className='text-xl font-bold mt-6 mb-0 text-gray-900 '>Über dich</h3>
                                <p className="mt-1 pt-0 text-sm leading-6 text-gray-500">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                            </div>
                            <div className="mt-6 mb-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">


                                <InputFieldWithFixedText register={form3.register("instaUsername")}
                                                         error={form3.formState.errors.instaUsername?.message} fixedText="instagram.com/"
                                                         id="instaUsername" label="Instagram Username" type="text"
                                                         fieldWidth={4}/>
                            </div>
                            <div className="flex items-center justify-end gap-x-6 border-t-2 border-gray-900/10 pt-6">
                                <button type="button" onClick={() => handleBack(2)} className="text-orange-700 font-medium text-lg text-center shadow-lg rounded-lg px-5 py-2.5 transform hover:scale-105 transition-transform ring-1 ring-orange-700 hover:bg-slate-100">Zurück</button>
                                <FormularButton type="submit" text="Registrieren"/>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};




export default Signup;