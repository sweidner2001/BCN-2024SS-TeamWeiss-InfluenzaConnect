// React Imports:
import React, {useState} from 'react';
import * as yup from "yup";

// Imports eigene Componenten:
import InputFieldWithFixedText from "../input/InputFieldWithFixedText";




//___________________ Datentypen  ________________
interface ISignupForm1 {
    form3: any;
}

interface IFormInputs3 {
    instaUsername: string;
}




//___________________ Formular Validation  ________________
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


const SignupSchema3 = yup.object({
    instaUsername: yup.string().trim().required("Bitte Geben Sie Ihren Instagram-Usernamen an!").max(...getMaxFieldLength(25))
});






/**
 * @function SignupFormInputs3 Formular-Input-Felder für die Verknüpfung von Socail-Media Accounts
 * @author Sebastian Weidner
 * @since 14.06.2024
 * @version 1.0
 *
 * @param ISignupForm3 "react-hook-form" Daten
 */
const SignupFormInputs3: React.FC<ISignupForm1> = ({form3}) => {

    //___________________ HTML: Formular ________________
    return (
        <>
            {/*--- Überschrift ---*/}
            <div className="border-b-2 border-gray-900/10 pb-4">
                <h3 className='text-xl font-bold mt-6 mb-0 text-gray-900 '>Verknüpfung Socail-Media Accounts</h3>
                <p className="mt-1 pt-0 text-sm leading-6 text-gray-500">
                    Diese Informationen dienen dazu, Sie als Influencer zu vermarkten und sind öffentlich sichtbar.
                </p>
            </div>
            <div className="mt-6 mb-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

                <InputFieldWithFixedText register={form3.register("instaUsername")}
                                         error={form3.formState.errors.instaUsername?.message} fixedText="instagram.com/"
                                         id="instaUsername" label="Instagram Username" type="text"
                                         fieldWidth={4}/>
            </div>
        </>
    );
};



//__________ Exporte: ___________
export {
    SignupFormInputs3,
    SignupSchema3
}

export type {
    IFormInputs3
}
