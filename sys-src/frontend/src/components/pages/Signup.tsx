// React Imports:
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Imports eigene Componenten:
import { FormularButton, CancelButton } from "../buttons/FormularButton";
import { SignupFormInputs1, SignupSchema1 } from "../forms/SignupFormInputs1";
import type { IFormInputs1 } from "../forms/SignupFormInputs1";
import { SignupFormInputs2, SignupSchema2 } from "../forms/SignupFormInputs2";
import type { IFormInputs2 } from "../forms/SignupFormInputs2";
import { SignupFormInputs3, SignupSchema3 } from "../forms/SignupFormInputs3";
import type { IFormInputs3 } from "../forms/SignupFormInputs3";

//___________________ Formular Validation  ________________
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Signup: React.FC = () => {

    //___________________ Hooks: ___________________
    const [currentForm, setCurrentForm] = useState(1);
    const [formData, setFormData] = useState<any>({});
    const [transition, setTransition] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right'>('left');
    const [headerText, setHeaderText] = useState("Registrierung InfluenzaConnect");
    const [subHeaderText, setSubHeaderText] = useState("#InfluencerMarketing #Werbepartner #Karriere");
    const [headerHeight, setHeaderHeight] = useState('h-1/3');

    useEffect(() => {
        if (currentForm === 2) {
            setHeaderText("InfluenzaConnect");
            setSubHeaderText("");
            setHeaderHeight('h-40'); 
        } else if (currentForm === 3) {
            setHeaderText("Fast fertig!");
            setSubHeaderText("Nur noch ein Schritt, um die Registrierung abzuschließen.");
            setHeaderHeight('h-3/5');
        } else {
            setHeaderText("Registrierung InfluenzaConnect");
            setSubHeaderText("#InfluencerMarketing #Werbepartner #Karriere");
            setHeaderHeight('h-1/3');
        }
    }, [currentForm]);

    //___________________ Variablen ________________
    const form1 = useForm<IFormInputs1>({
        resolver: yupResolver(SignupSchema1),

        // Default-Werte, um beim Zurückgehen die Daten nicht zu verlieren
        defaultValues: formData.form1 || {}
    });

    const form2 = useForm<IFormInputs2>({
        resolver: yupResolver(SignupSchema2),

        // Default-Werte, um beim Zurückgehen die Daten nicht zu verlieren
        defaultValues: formData.form2 || {}

    });

    const form3 = useForm<IFormInputs3>({
        resolver: yupResolver(SignupSchema3),

        // Default-Werte, um beim Zurückgehen die Daten nicht zu verlieren
        defaultValues: formData.form3 || {}
    });

    // Error-Messages vom Backend anzeigen:
    // const errorMessages = {
    //     email: {
    //         message: "Dont Forget Your Username Should Be Cool!",
    //     },
    //     passwort:{
    //         message: "Username Should Be Cool!",
    //     }
    // }
    // // form1.formState.errors.email = test.email;
    // // form1.formState.errors.passwort = test.passwort;
    // Object.assign(form1.formState.errors, errorMessages);

    //___________________ Event-Handler ________________
    /**
     * @event function Event-Handler-Funktion wenn auf den Weiter-Button gedrückt wird
     * @param formNumber Nummer des Formulars, auf das auf nächstes aufgerufen werden soll
     */
    const handleNext = (formNumber: number) => {
        // Übergang zum nächsten Formular
        setDirection('left');
        setTransition(true);

        setTimeout(() => {
            // Formulardaten zwischenspeichern, um Sie beim zurückgehen
            // im Formular nicht zu verlieren
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

            // Formular wechseln:
            setCurrentForm(formNumber + 1);

            // Übergang zum nächsten Formular
            setTransition(false);
        }, 500);
    };

    /**
     * @function handleBack Event-Handler-Funktion für den Zurückbutton
     * @param formNumber Nummer des Formulars, auf das zurückgewechselt werden soll
     */
    const handleBack = (formNumber: number) => {
        // Übergang zum nächsten Formular
        setDirection('left');
        setTransition(true);

        setTimeout(() => {
            // Formular wechseln:
            setCurrentForm(formNumber);

            // Übergang zum nächsten Formular
            setTransition(false);
        }, 500);
    };

    /**
     * @event function Event-Handler-Funktion wenn auf den Registrierungs-Button gedrückt wird
     */
    const onSubmitForm3: SubmitHandler<any> = async data => {
        const finalData = {
            ...formData,
            form3: data
        };

        // await new Promise(resolve => setTimeout(resolve, 1000));
        // alert(JSON.stringify(finalData));

        // Daten ans Backend senden:
        fetch('http://localhost:5001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)
        })
            .then(response => response.json())
            .then(data => {
                // Weiterverarbeitung der Antwort
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    //___________________ HTML: Formular ________________
    return (
        <div className="w-full h-screen flex flex-col md:flex-row items-start">
            {/************* Linke Seite ***************/}
            <div className={`relative w-full md:w-1/2 ${headerHeight} md:h-full flex flex-col transition-all duration-500`}>
                {/*--- Text ---*/}
                <div className='absolute top-[35%] left-[10%] md:left-[15%]'> {/* Adjusted top margin */}
                    <h1 className='text-3xl md:text-5xl font-extrabold text-slate-50 my-6'>{headerText}</h1>
                    {subHeaderText && <p className='text-md md:text-lg font-medium text-slate-50'>{subHeaderText}</p>}
                </div>

                {/*--- Hintergrund ---*/}
                <div className="flex-1 bg-gradient-to-r from-gray-900 to-blue-900 to-90%"></div>
            </div>

            {/************* Rechte Seite ***************/}
            <div className={`w-full md:w-1/2 h-full flex flex-col items-center overflow-y-auto transition-transform duration-500 ${transition ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
                <div className='w-3/4 mx-auto my-10'>
                    {currentForm === 1 && (
                        <form onSubmit={form1.handleSubmit(() => handleNext(1))} className='flex flex-col space-y-4'>

                            <SignupFormInputs1 form1={form1} />

                            <div className="flex items-center justify-end gap-x-6 border-t-2 border-gray-900/10 pt-6">
                                <CancelButton type="button" text="Abbrechen" linkTo="/landing" />
                                <FormularButton type="submit" text="Weiter" />
                            </div>
                        </form>
                    )}

                    {currentForm === 2 && (
                        <form onSubmit={form2.handleSubmit(() => handleNext(2))} className='flex flex-col space-y-4'>

                            <SignupFormInputs2 form2={form2} />

                            <div className="flex items-center justify-between md:justify-end gap-x-6 border-t-2 border-gray-900/10 pt-6">
                                <CancelButton type="button" text="Zurück" onClick={() => handleBack(1)} />
                                <FormularButton type="submit" text="Weiter" />
                            </div>
                        </form>
                    )}

                    {currentForm === 3 && (
                        <form onSubmit={form3.handleSubmit(onSubmitForm3)} className='flex flex-col space-y-4'>

                            <SignupFormInputs3 form3={form3} />

                            <div className="flex items-center justify-between md:justify-end gap-x-6 border-t-2 border-gray-900/10 pt-6">
                                <CancelButton type="button" text="Zurück" onClick={() => handleBack(2)} />
                                <FormularButton type="submit" text="Registrieren" />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
