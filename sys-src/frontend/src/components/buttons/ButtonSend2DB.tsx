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

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}
    >
      Insert into DB
    </button>
  );
};

export default ButtonSend2DB;