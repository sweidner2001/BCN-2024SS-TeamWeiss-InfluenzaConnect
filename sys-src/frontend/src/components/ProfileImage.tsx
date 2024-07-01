import React from 'react';
import '../styles/ProfileImage.css'; 

interface ProfileImageProps {
  imageUrl?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl }) => {
  const defaultImageUrl = '/moneyboy.png';
  return (
    <div className="profile-image-container">
      <div className="profile-image">
        <img src={imageUrl || defaultImageUrl} alt="Profile" />
      </div>
    </div>
  );
};

export default ProfileImage;
