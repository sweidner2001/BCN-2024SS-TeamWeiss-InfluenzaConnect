import React from 'react'
import {Link} from 'react-router-dom';


/**
 * @interface ButtonProbs Datentyp
 * @author Sebastian Weidner
 * @since 13.06.2024
 * @version 1.0
 *
 * @member text Text des Buttons
 * @member type Button-Type
 * @member linkTo Route, zu der navigiert werden soll z.B. "/landing"
 */
interface ButtonProbs {
    text: string;
    type: "button" | "submit" | "reset";
    linkTo?: string;
    onClick?: () => void;
}


/**
 * @function FormularButton Button
 * @author Sebastian Weidner
 * @since 13.06.2024
 * @version 1.0
 *
 * @param text
 */
const FormularButton: React.FC<ButtonProbs> = ({...probs}) => {

    let linkTo = probs.linkTo ?? "";

    return (
        probs.linkTo ? (
            <Link to={linkTo}>
                <button type={probs.type} className="text-white font-medium text-lg px-12 py-2.5 text-center
                                                    transform hover:scale-105 transition-transform
                                                    bg-gradient-to-r from-sky-900 to-blue-600 shadow-lg rounded-lg
                                                    focus:outline-none">{probs.text}</button>
            </Link>
        ) : (
            <button type={probs.type} className="text-white font-medium text-lg px-12 py-2.5 text-center
                                                    transform hover:scale-105 transition-transform
                                                    bg-gradient-to-r from-sky-900 to-blue-600 shadow-lg rounded-lg
                                                    focus:outline-none">{probs.text}</button>
        )
    );
};


/**
 * @function CancelButton Abbrechen-Button
 * @author Sebastian Weidner
 * @since 13.06.2024
 * @version 1.0
 *
 * @param ButtonProbs Button-Properties
 */
const CancelButton: React.FC<ButtonProbs> = ({...probs}) => {

    let linkTo = probs.linkTo ?? "";

    return (
        probs.linkTo ? (
            <Link to={linkTo}>
                <button type={probs.type} onClick={probs.onClick} className="text-orange-700 font-medium text-lg text-center
                                                    shadow-lg rounded-lg px-5 py-2.5
                                                    transform hover:scale-105 transition-transform
                                                    ring-1 ring-orange-700 hover:bg-slate-100">{probs.text}</button>
            </Link>
        ) : (
            <button type={probs.type} onClick={probs.onClick} className="text-orange-700 font-medium text-lg text-center
                                                    shadow-lg rounded-lg px-5 py-2.5
                                                    transform hover:scale-105 transition-transform
                                                    ring-1 ring-orange-700 hover:bg-slate-100">{probs.text}</button>
        )
    );
};


export {
    FormularButton,
    CancelButton
};
