import React, {useState} from 'react';
import * as yup from "yup";


import InputField from "../input/InputField";



interface ISignupForm1 {
    form1: any;
}




//___________________ Formular Validation  ________________
interface IFormInputs1 {
    email: string;
    passwort: string;
}


const getMaxFieldLength = (maxLength: number): [number, string] => {
    const maxFieldLengthText = `Eingabefeld ist auf ${maxLength} Zeichen begrenzt`;
    return [maxLength, maxFieldLengthText];
};

const SignupSchema1 = yup.object({
    email: yup.string().trim().email("Bitte geben Sie eine gültige Email-Adresse ein!").required('Bitte geben Sie eine Email an!').max(...getMaxFieldLength(40)),
    passwort: yup.string().required("Bitte geben Sie ein Passwort an!").min(10, "Das Passwort muss min. 10 Zeichen lang sein!").max(...getMaxFieldLength(25))
});



const SignupFormInputs1: React.FC<ISignupForm1> = ({form1}) => {

    //___________________ HTML: Formular ________________
    return (
        <>
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
        </>
    );
};




export {
    SignupFormInputs1,
    SignupSchema1
}

export type {
    IFormInputs1
}
