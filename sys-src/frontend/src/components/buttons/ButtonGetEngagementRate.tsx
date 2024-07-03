import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ButtonFetchEngagementRate = () => {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [engagementRate, setEngagementRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchSessionEmail = async () => {
      try {
        const response = await fetch('http://localhost:5001/get_session_email', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' // This ensures cookies (session data) are sent with the request
        });

        if (response.ok) {
          const data = await response.json();
          setSessionEmail(data.email);
        } else {
          console.error('Failed to fetch session email:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching session email:', error);
      }
    };

    fetchSessionEmail();
  }, []);

  const handleClick = async () => {
    if (sessionEmail) {
      try {
        const response = await axios.post('http://localhost:5001/getEngagementRate', {
          email: sessionEmail, // Use the session email
        });
        setEngagementRate(response.data.engagement_rate);
        console.log('Engagement Rate: ', response.data.engagement_rate);
      } catch (error) {
        console.error('Error fetching engagement rate: ', error);
      }
    }
  };

  return (
    <div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Fetch Engagement Rate
      </button>
      {engagementRate !== null && (
        <div>Engagement Rate: {engagementRate}</div>
      )}
    </div>
  );
};

export default ButtonFetchEngagementRate;
