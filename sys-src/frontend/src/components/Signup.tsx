import React from 'react';
import axios from 'axios';

/**
 * @interface InputFieldProps Datentyp
 * @author Sebastian Weidner
 * @version 1.0
 *
 * @member fieldWidth Breite des Elements
 * @member id ID des Input-Feldes
 * @member label Text über Input-Feld
 * @member type Input-Type
 * @member register Ist das Feld ein Pflichtfeld?
 * @member autoComplete Wert für die Auto-Vervollständigung {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete}
 * @member error anzuzeigende Fehlernachricht
 */
interface InputFieldProps {
    fieldWidth: number;
    id: string;
    label: string;
    type: string;
    // register: any;
    required: boolean;
    autoComplete?: string;
    error?: string;
}


const InputLabel: React.FC<{htmlFor:string, label:string}> = ({htmlFor, label}) => {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
    );
};

/**
 * @function InputField normales Input-Feld
 * @author Sebastian Weidner
 * @version 1.0
 *
 * @param InputFieldProps Eigenschaften
 */
const InputField: React.FC<InputFieldProps> = ({...probs}) => {
    return (
        <div className={"sm:col-span-" + probs.fieldWidth}>
            <InputLabel htmlFor={probs.id} label={probs.label}/>
            <div className="mt-2">
                <input type={probs.type} id={probs.id} autoComplete={probs.autoComplete} placeholder={probs.label} required={probs.required}
                       className='px-4 py-2 rounded-lg block w-full
                              text-gray-900 placeholder:text-gray-400
                              border-0 shadow-sm ring-1 ring-inset ring-gray-300
                              focus:outline-none focus:ring-1 focus:ring-indigo-700'/>
            </div>
        </div>
    );
};


/**
 * @function InputFieldWithFixedText Input-Feld mit feststehenden Text am Anfang
 * @author Sebastian Weidner
 * @version 1.0
 *
 * @param InputFieldProps Eigenschaften
 */
const InputFieldWithFixedText: React.FC<InputFieldProps & {fixedText:string}> = ({fixedText, ...probs}) => {
    return (
        <div className={"sm:col-span-" + probs.fieldWidth}>
            <InputLabel htmlFor={probs.id} label={probs.label}/>
            <div className="mt-2">
                <div className="flex rounded-lg shadow-sm sm:max-w-md
                                ring-1 ring-inset ring-gray-300
                                focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-700">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{fixedText}</span>
                    <input type={probs.type} id={probs.id} autoComplete={probs.autoComplete} placeholder={probs.label} required={probs.required}
                           className="block flex-1 border-0 bg-transparent py-1.5 pl-1 sm:text-sm sm:leading-6
                                       text-gray-900 placeholder:text-gray-400
                                       focus:ring-0 focus:outline-none "/>
                </div>
            </div>
        </div>
    );
};


interface InputSelectProps {
    fieldWidth: number;
    id: string;
    label: string;
    // register: any;
    required: boolean;
    selectOptions:Array<string>
    autoComplete?: string;
    error?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({...probs}) => {
    return (

        <div className={"sm:col-span-" + probs.fieldWidth}>
            <InputLabel htmlFor={probs.id} label={probs.label}/>
            <div className="mt-2">
                <select id={probs.id} autoComplete={probs.autoComplete} required={probs.required}
                        className="px-2 py-2 rounded-lg block w-full
                                    text-gray-900 placeholder:text-gray-400
                                    border-0 shadow-sm
                                    ring-1 ring-inset ring-gray-300
                                    focus:outline-none focus:ring-1 focus:ring-indigo-700">
                    {probs.selectOptions.map(elem =>
                    <option key={elem} value={elem}>{elem}</option>)
                    }
                </select>
            </div>
        </div>
    );
};


interface TextFieldProps {
    fieldWidth?: number;
    id: string;
    label: string;
    descr:string;
    defaultValue?:string;
    textboxRows:number;
    // register: any;
    required: boolean;
    error?: string;
}

const InputTextBox: React.FC<TextFieldProps> = ({...probs}) => {
    return (
        <div className={ probs.fieldWidth ? 'sm:col-span-' + probs.fieldWidth : 'col-span-full'}>
            <InputLabel htmlFor={probs.id} label={probs.label}/>
            <p className="mt-1 text-sm leading-6 text-gray-600">{probs.descr}</p>
            <textarea id={probs.id} required={probs.required}
                rows={probs.textboxRows} defaultValue={probs.defaultValue}
                className="px-2 py-2 block w-full
                                text-gray-900 text-sm placeholder:text-gray-400
                                border-0 shadow-sm rounded-lg
                                ring-1 ring-inset ring-gray-300
                                focus:outline-none focus:ring-1 focus:ring-indigo-700"/>
        </div>
    );
};


const Signup: React.FC = () => {

    let countries: Array<string> = ['Deutschland', 'Österreich', 'Schweiz'];


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
                <div className='w-3/4 mx-auto mt-10'>

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

                            <InputField id="email" label="Email" type="text" required={true} fieldWidth={4}/>
                            <InputFieldWithFixedText fixedText="instagram.com/" id="instaUsername" label="Instagram Username" type="text" required={true} fieldWidth={4}/>
                            <InputSelect id="land" label="Land" required={true} fieldWidth={4} selectOptions={countries}/>
                            <InputTextBox id="ueberMich" label="Über mich" required={false} defaultValue="Ich heiße Sebastian" descr="Schreibe ein paar Sätze über dich." textboxRows={5}/>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}


export default Signup;