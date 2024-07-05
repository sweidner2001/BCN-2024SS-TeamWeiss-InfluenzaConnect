import React, { useState, useEffect } from 'react';
import ProfileImage from '../ProfileImage';
import MenuBar from '../ProfileMenu';
import PrivateDataCard from '../cards/PrivateDataCard';
import PublicDataCard from '../cards/PublicDataCard';
import AnalyticsCard from '../cards/AnalyticsCard';
import '../../styles/ProfileView.css';
import '../NavBar'
import NavBar from '../NavBar';

interface UserData {
  email: string;
  password: string;
  title: string;
  first_name: string;
  last_name: string;
  country: string;
  phone: string;
  language: string;
  about_me: string;
  instagram_username: string;
  instagram_comments_avg: number;
  instagram_likes_avg: number;
  instagram_followers: number;
  instagram_engagement_rate: number;
  instagram_time_since_last_post: string;
  hashtags: string;
}

const ProfileView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('personalData');
  const [selectedDataCard, setSelectedDataCard] = useState('private');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

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

  const renderAnalyticsCards = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnalyticsCard title="Average Comments" value={userData.instagram_comments_avg} />
        <AnalyticsCard title="Average Likes" value={userData.instagram_likes_avg} />
        <AnalyticsCard title="Followers" value={userData.instagram_followers} />
        <AnalyticsCard title="Engagement Rate" value={userData.instagram_engagement_rate} />
        <AnalyticsCard title="Time Since Last Post" value={userData.instagram_time_since_last_post} />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
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
          <div className="flex flex-grow justify-center items-center p-4">
            {renderAnalyticsCards()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
