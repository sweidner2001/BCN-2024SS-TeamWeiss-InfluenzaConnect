import React from 'react';


/**
 * @function ErrorField Ausgabefeld für Fehlermeldungen unter Input-Feldern
 * @author Sebastian Weidner
 * @since 13.06.2024
 * @version 1.0
 *
 * @param error Text der Fehlermeldung
 */
const ErrorField: React.FC<{ errorMessage?:string }> = ({errorMessage}) => {

    return (
        <>
            {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
        </>
    );
};



export default ErrorField;