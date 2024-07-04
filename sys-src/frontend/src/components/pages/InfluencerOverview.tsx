import React, {useState, useEffect} from 'react';
import axios from 'axios';
import InputMultiCheckboxDropdown from "../input/InputMultiCheckboxDropdown";
import NavBar from "../NavBar";


// Funktion zur Generierung eines Hash-Wertes aus einem String
const stringToHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Konvertierung zu 32bit Integer
    }
    return hash;
};

// Funktion zur Generierung einer hellen Farbe aus einem String
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
 * @interface IUserData Datentyp für die anzuzeigenden Spalten
 * @author Sebastian Weidner
 * @since 30.06.2024
 * @version 1.0
 */
interface IUserData {
    profileImage: string;
    gender: string;
    name: string;
    //age: number;                // gibt es nicht
    advertisingDivision: string[];  // = hashtags im Backend
    nationality: string;
    language: string;
    statusColor: string;
    instagram_username: string;
    instagram_followers: string;
    instagram_comments_avg: string;
    instagram_likes_avg: string;
    instagram_engagement_rate: string;
    instagram_time_since_last_post: string;
    about_me: string;
}




/**
 * @function InfluencerOverview Tabelle, die alle Infos zu allen Influencer anzeigt
 * @author Sebastian Weidner
 * @since 30.06.2024
 * @version 1.0
 */
const InfluencerOverview: React.FC = () => {

    //__________________ Daten holen: _____________________
    const [data, setData] = useState<IUserData[]>([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        axios.post('http://localhost:5001/collectData')
        .then(response => {
          const newData: IUserData[] = Object.values(response.data).map((user: any) => ({
            gender: user.gender || '',
            name: user.first_name + ' ' + user.last_name,
            instagram_comments_avg: user.instagram_comments_avg.toString(), 
            instagram_username: user.instagram_username,
            language: user.language || 'Deutsch',
            nationality: user.country,
            profileImage: user.profileImage || '',  
            advertisingDivision: user.hashtags || ['UX Design', 'UI Design', 'Prototyping', 'User Research'],
            statusColor: user.statusColor || 'bg-green-500',
            about_me: user.about_me || 'Guten Tag, ich heiße Sebastian Weidner und bin der berühmteste Influencer, den es auf der ganzen Welt gibt!',
            instagram_followers: user.instagram_followers.toString(), 
            instagram_likes_avg: user.instagram_likes_avg.toString(), 
            instagram_engagement_rate: user.instagram_engagement_rate.toString(), 
            instagram_time_since_last_post: user.instagram_time_since_last_post.toString() 
          }));
  
          setData(newData);
        })
        .catch(error => {
          console.error('There was an error making the request!', error);

            // Testdaten holen, um in der Demo nicht blank dazustehen:
            axios.get('https://randomuser.me/api/?inc=gender,name,nat,location,email,picture,dob&results=50')
                .then(response => {


                    const newData: IUserData[] = response.data.results.map((user :any)=> ({
                        gender: user.gender,
                        name: user.name.last + ' ' + user.name.first,
                        instagram_comments_avg: user.dob.age,
                        instagram_username: 'festdamen.ffwschoenkirch2024',
                        language: 'Deutsch',
                        nationality: user.location.country,
                        profileImage: user.picture.medium,
                        advertisingDivision: ['UX Design', 'UI Design', 'Prototyping', 'User Research'],
                        statusColor: 'bg-green-500',
                        about_me: 'Guten Tag, ich heiße Sebastian Weidner und bin der berühmteste Influencer den es auf der ganzen Welt gibt!'
                    }));

                    setData(newData);

                })
                .catch(error => {
                    console.error('There was an error making the Testdata-request!', error);
                });
        }).finally(() => {

                setLoading(false);
        });

    }, []);




    //___________________ Suchleiste ___________________
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Daten filtern:
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    //__________________ Filterung der Spalten ___________________
    // Definiere das assoziative Array mit anzuzeigneden Texten als Wert. Der Key wird vom Filter zurückgegeben
    const columnsTableHead: { [key: string]: string } = {
        name: "Name",
        //age: "Alter",
        advertisingDivision: "Werbesparte",
        nationality: "Nationalität",
        language: "Sprache",
        instagram_username: "Instagram-Account",

        instagram_followers: "Instagram-Follower",
        instagram_comments_avg: "\u00D8 Kommentare",
        instagram_likes_avg: "\u00D8 Likes",
        instagram_engagement_rate: "Score",
        instagram_time_since_last_post: "letzter Post",
        about_me: "Über mich"
    };

    // anzuzeigende Standard-Spalten beim Laden der Tabelle
    const initialSelectedOptions = ['name', 'age', 'instagram_username', 'language', 'nationality', 'advertisingDivision'];
    const [selectedColumns, setSelectedColumns] = useState<string[]>(initialSelectedOptions);

    // Funktion zum Behandeln von Änderungen der ausgewählten Optionen
    const handleDropdownChange = (selectedOptions: string[]) => {
        setSelectedColumns(selectedOptions);
    };


    return (

        <>
            {/* Navigationsleiste */}
            <NavBar/>


            {/*------------------- Influencer Tabelle ---------------------*/}
            <div className="max-w-full mx-auto mt-4 px-4 sm:px-6 lg:px-8">


                {/*----- Tabelleneinstellungen und Filteroptionen ------*/}
                <div className="flex justify-between mb-4">

                    {/* Anzahl Tabelleneinträge */}
                    <div className="flex items-center space-x-4">
                        <div className="text-gray-700 font-medium">
                            Einträge: {filteredData.length}
                        </div>
                    </div>


                    {/* Suchfunktion */}
                    <div className="w-1/3">
                        <input type="text" placeholder="Search by name..."
                               className="w-full px-3 py-2 border border-gray-300 rounded-md"
                               value={searchTerm} onChange={handleSearchChange}/>
                    </div>

                    {/* Spaltenfilter */}
                    <InputMultiCheckboxDropdown selectOptions={columnsTableHead} label="Filter"
                                                onChange={handleDropdownChange}
                                                initialSelectedOptions={selectedColumns}/>

                </div>


                {/*----- Tabelle ------*/}
                <div className="w-full h-[calc(100vh-4.5rem)] overflow-hidden bg-white shadow-md sm:rounded-lg mb-2">

                    {/* Loding Animation, wenn Daten noch nicht vorhanden */}
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                        </div>
                    ) : (

                    <div className="w-full h-full overflow-x-auto overflow-y-auto ">
                        <table className="w-full text-sm text-left text-gray-700 ">


                            <thead
                                className="text-xs text-gray-200 uppercase bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-3 xl:py-4 xl:px-6">
                            <tr>
                                <th scope="col" className="pl-6 pr-3 py-3 xl:py-4 bg-blue-700">
                                    #
                                </th>

                                {/* Alle Überschriften */}
                                {Object.entries(columnsTableHead).map(([key, value]) => (
                                    selectedColumns.includes(key) && (
                                        <th scope="col" className="pl-3 pr-6 py-3 xl:py-4 xl:px-6">
                                            {value}
                                        </th>
                                    )
                                ))}

                                {/*<th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">*/}
                                {/*    Action*/}
                                {/*</th>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    {/* Tabellenindex */}
                                    <th className="pl-6 pr-3 py-4 text-blue-700">
                                        {index + 1}
                                    </th>

                                    {/* Name */}
                                    {selectedColumns.includes('name') && (
                                        <th
                                            scope="row"
                                            className="pl-3 pr-6 py-4 text-gray-900 whitespace-nowrap"
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={item.profileImage}
                                                    alt={'Bild'}
                                                />
                                                <div className="pl-3">
                                                    <div className="text-base font-semibold">
                                                        {item.name}
                                                    </div>
                                                    <div className="font-normal text-gray-500">
                                                        {item.gender}
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                    )}
                                    {/*{selectedColumns.includes('age') && (*/}
                                    {/*    <td className="px-6 py-4">*/}
                                    {/*        {item.age}*/}
                                    {/*    </td>*/}
                                    {/*)}*/}

                                    {/* Werbesparte */}
                                    {selectedColumns.includes('advertisingDivision') && (
                                        <td className="px-2 sm:px-4 py-4 min-w-80">
                                            <div className="flex flex-wrap gap-0.5">
                                                {item.advertisingDivision.map(
                                                    (category, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-xs font-medium px-2 py-1 m-0.5 rounded-md whitespace-nowrap"
                                                            style={{
                                                                backgroundColor: stringToColor(
                                                                    category
                                                                ),
                                                            }}
                                                        >
                                                            {category}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </td>
                                    )}

                                    {/* Nationalität */}
                                    {selectedColumns.includes('nationality') && (
                                        <td className="px-6 py-4">
                                            {item.nationality}
                                        </td>
                                    )}

                                    {/* Sprache */}
                                    {selectedColumns.includes('language') && (
                                        <td className="px-6 py-4">
                                            {item.language}
                                        </td>
                                    )}

                                    {/* Instagram Username */}
                                    {selectedColumns.includes('instagram_username') && (
                                        <td className="px-6 py-4">
                                            <a href={`https://www.instagram.com/${item.instagram_username}/`}
                                               className="font-medium hover:text-blue-600 hover:underline whitespace-nowrap">
                                                @{item.instagram_username}
                                            </a>
                                        </td>
                                    )}

                                    {/* Instagram - Follower  */}
                                    {selectedColumns.includes('instagram_followers') && (
                                        <td className="px-6 py-4">
                                            {item.instagram_followers}
                                        </td>
                                    )}

                                    {/* Instagram - durchschnittliche Kommentare  */}
                                    {selectedColumns.includes('instagram_comments_avg') && (
                                        <td className="px-6 py-4">
                                            {item.instagram_comments_avg}
                                        </td>
                                    )}

                                    {/* Instagram - durchschnittliche Likes  */}
                                    {selectedColumns.includes('instagram_likes_avg') && (
                                        <td className="px-6 py-4">
                                            {item.instagram_likes_avg}
                                        </td>
                                    )}

                                    {/* Instagram - Score  */}
                                    {selectedColumns.includes('instagram_engagement_rate') && (

                                        <td className="px-6 py-4">
                                            {/*<div className="flex items-center">*/}
                                            {/*    <div*/}
                                            {/*        className={`h-2.5 w-2.5 rounded-full ${item.statusColor} mr-2`}*/}
                                            {/*    ></div>*/}
                                            {/*    {' '}*/}
                                            {/*    {item.instagram_engagement_rate}*/}
                                            {/*</div>*/}
                                            {item.instagram_engagement_rate}
                                        </td>
                            )}

                            {/* Instagram - wann war letzter Post  */}
                            {selectedColumns.includes('instagram_time_since_last_post') && (
                                <td className="px-6 py-4">
                                    {item.instagram_time_since_last_post}
                                </td>
                            )}

                            {/* Über mich  */}
                            {selectedColumns.includes('about_me') && (
                                        <td className="px-6 py-4 text-xs min-w-80">
                                            {item.about_me}
                                        </td>
                                    )}

                                    {/* Button */}
                                    {/* <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 hover:underline whitespace-nowrap"
                                    >
                                        Edit user
                                    </a>
                                </td> */}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
};


export default InfluencerOverview;