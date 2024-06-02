// ein Button der mit einer Get request die Daten an die DB sendet

import React from 'react';
import axios from 'axios';

const ButtonSend2DB = () => {
  const handleClick = async () => {
    try {
        const response = await axios.get('http://localhost:5001/testdb');
        console.log(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return <button onClick={handleClick}>Click me32</button>;
};

export default ButtonSend2DB;