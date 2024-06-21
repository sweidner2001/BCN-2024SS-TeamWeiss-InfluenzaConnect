import React, { useState, useEffect } from 'react';
import ProfileImage from '../ProfileImage';
import MenuBar from '../ProfileMenu';
import PrivateDataCard from '../cards/PrivateDataCard';
import PublicDataCard from '../cards/PublicDataCard';
import PasswordChangeDialog from '../ChangePasswordDialog';
import '../../styles/ProfileView.css'; 

const ProfileView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('personalData');
  const [selectedDataCard, setSelectedDataCard] = useState('private');
  const [userData, setUserData] = useState(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:5001/profileView', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'nils.baierl1@gmail.com' })
      });
      const data = await response.json();
      setUserData(data.user);
    };

    fetchUserData();
  }, []);

  const handleSave = (updatedData: any) => {
    fetch('http://localhost:5001/updateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    }).then(response => response.json())
      .then(data => {
        setUserData(data.user);
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
        <div className="relative flex items-center custom-menu-bar text-white p-4">
          <ProfileImage />
          <MenuBar selectedTab={selectedTab} onSelectTab={setSelectedTab} />
        </div>
        <div className="flex flex-grow p-4 mt-4">
          {selectedTab === 'personalData' && (
            <div className="flex flex-grow">
              <div className="flex flex-col w-1/4 p-4">
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
              <div className="flex flex-col w-3/4 p-4 bg-white shadow-lg rounded-lg">
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
