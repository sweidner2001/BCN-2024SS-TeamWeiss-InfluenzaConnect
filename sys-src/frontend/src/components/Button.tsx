import React from 'react';
import axios from 'axios';

const MyButton = () => {
  const handleClick = async () => {
    try {
      const response = await axios.get('http://localhost:5001/test');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return <button onClick={handleClick}>Click me</button>;
};

export default MyButton;