import React, { useState, useEffect } from 'react';
import ProfileImage from '../ProfileImage';
import MenuBar from '../ProfileMenu';
import PrivateDataCard from '../cards/PrivateDataCard';
import PublicDataCard from '../cards/PublicDataCard';
import '../../styles/ProfileView.css';

const ProfileView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('personalData');
  const [selectedDataCard, setSelectedDataCard] = useState('private');
  const [userData, setUserData] = useState(null);
  const [sessionEmail, setSessionEmail] = useState(null);

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

  useEffect(() => {
    if (sessionEmail) {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:5001/profileView', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: sessionEmail }),
            credentials: 'include' // This ensures cookies (session data) are sent with the request
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error('Failed to fetch user data:', await response.text());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [sessionEmail]);

  const handleSave = (updatedData: any) => {
    fetch('http://localhost:5001/updateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    }).then(response => response.json())
      .then(data => {
        setUserData(data);
      });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const renderDataCard = () => {
    switch (selectedDataCard) {
      case 'private':
        return <PrivateDataCard userData={userData} onSave={handleSave} />;
      case 'public':
        return <PublicDataCard userData={userData} onSave={handleSave} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="relative flex flex-col sm:flex-row items-center custom-menu-bar text-white p-4">
        <ProfileImage />
        <MenuBar selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      </div>
      <div className="flex flex-grow flex-col sm:flex-row p-4 mt-4">
        {selectedTab === 'personalData' && (
          <div className="flex flex-col sm:flex-row flex-grow">
            <div className="flex flex-col w-full sm:w-1/4 p-4">
              <button
                onClick={() => setSelectedDataCard('private')}
                className={`py-2 px-4 rounded-lg mb-2 ${selectedDataCard === 'private' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Private
              </button>
              <button
                onClick={() => setSelectedDataCard('public')}
                className={`py-2 px-4 rounded-lg ${selectedDataCard === 'public' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Public
              </button>
            </div>
            <div className="flex flex-col w-full sm:w-3/4 p-4 bg-white shadow-lg rounded-lg">
              {renderDataCard()}
            </div>
          </div>
        )}
        {selectedTab === 'analytics' && (
          <div className="flex flex-grow justify-center items-center">
            <h2 className="text-2xl font-bold">Analytics View Placeholder</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
