import React, {useState} from 'react';
import * as yup from "yup";


import InputField from "../input/InputField";
import InputSelect from "../input/InputSelect";
import InputTextarea from "../input/InputTextarea";



interface ISignupForm2 {
    form2: any;
}




//___________________ Formular Validation  ________________
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


const getMaxFieldLength = (maxLength: number): [number, string] => {
    const maxFieldLengthText = `Eingabefeld ist auf ${maxLength} Zeichen begrenzt`;
    return [maxLength, maxFieldLengthText];
};

const SignupSchema2 = yup.object({
    anrede: yup.string().required("Bitte geben Sie eine Anrede an!"),
    vorname: yup.string().trim().required("Bitte geben Sie Ihren Vornamen an!").max(...getMaxFieldLength(30)),
    nachname: yup.string().trim().required("Bitte geben Sie Ihren Nachnamen an!").max(...getMaxFieldLength(25)),
    land: yup.string().trim().required("Bitte geben Sie Ihr Herkunftsland an!"),
    bundesland: yup.string().trim().required("Bitte geben Sie Ihr Bundesland an!"),
    telefonnr: yup.string().trim().required("Bitte Geben Sie Ihre Telefonnummer an!").max(...getMaxFieldLength(25)),
    sprache: yup.string().trim().required("Bitte geben Sie Ihre Sprachen ein, die Sie beherrschen!").max(...getMaxFieldLength(25)),
    ueberMich: yup.string().trim().defined().max(...getMaxFieldLength(500))
});



const SignupFormInputs2: React.FC<ISignupForm2> = ({form2}) => {

    const countries = ['Deutschland', 'Österreich', 'Schweiz'];
    const bundesland = ['Bayern', 'Hessen', 'Sachsen'];
    const sex = ['Herr', 'Frau', 'Divers'];


    //___________________ HTML: Formular ________________
    return (
        <>
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
        </>
    );
};




export {
    SignupFormInputs2,
    SignupSchema2
}

export type {
    IFormInputs2
}
