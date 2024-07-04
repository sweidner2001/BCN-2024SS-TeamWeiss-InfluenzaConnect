/**
 * @function stringToHash Funktion zur Generierung eines Hash-Wertes aus einem String.
 * @author Sebastian Weidner
 * @since 04.07.2024
 * @version 1.0
 *
 * @param str String
 */
const stringToHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Konvertierung zu 32bit Integer
    }
    return hash;
};

/**
 * @function stringToColor Funktion zur Generierung einer hellen Farbe aus einem String. Wird bspw. für die Anzeige der
 * Produkt-Werbe-Sparte benötigt
 * @author Sebastian Weidner
 * @since 04.07.2024
 * @version 1.0
 *
 * @param str String
 */
const stringToColor = (str: string): string => {
    const hash = stringToHash(str);
    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;

    // Helle Farbe erzeugen
    const lightColor = `rgba(${r + 128}, ${g + 128}, ${b + 128}, 0.7)`;
    return lightColor;
};

/**
 * @function formatNumberToGerman Formatiert eine Nummer ins Deutsche Format
 * @author Sebastian Weidner
 * @since 04.07.2024
 * @version 1.0
 *
 * @param number Nummer die formatiert werden soll
 */
const formatNumberToGerman = (input: number | string): string => {
    let number;
    if (typeof(input) === 'string') {
        number = parseFloat(input);
        if (isNaN(number)) {
            return input;
        }
    } else {
        number = input;
    }

    return new Intl.NumberFormat("de-DE").format(number);
};




/**
 * @function generateRandomDateTime Gibt ein beliebiges Datum der letzten 30 Tage zurück
 * @author Sebastian Weidner
 * @since 04.07.2024
 * @version 1.0
 *
 * @param previousDays Wie viele Tage darf das Datum in der Vergangenheit sein?
 */
const generateRandomDateTime = (previousDays : number): Date => {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * previousDays);
    now.setDate(now.getDate() - daysAgo);
    now.setHours(Math.floor(Math.random() * 24));
    return now;
};



/**
 * @function formatDateTimeToGerman Gibt das Datum im Deutschen Format zurück (dd.mm.yyyy HH:00). Minuten werden immer auf 0 abgerundet
 * @author Sebastian Weidner
 * @since 04.07.2024
 * @version 1.0
 *
 * @param input Date-Objekt oder TimeStamp
 */
const formatDateTimeToGerman = (input: Date | number | string): string => {
    if (typeof input === 'string') {
        return input;
    }

    const date = input as Date;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:00`;
};





export {
    stringToColor,
    formatNumberToGerman,
    generateRandomDateTime,
    formatDateTimeToGerman
};
