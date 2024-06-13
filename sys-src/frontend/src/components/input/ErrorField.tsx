import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

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

        <div className="px-2 pt-1">
            {errorMessage && (
                <p className="text-red-500 text-xs italic flex items-center">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                    {errorMessage}
                </p>
            )}
        </div>
        // <div className="px-2">
        //     {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
        // </div>
    );
};



export default ErrorField;