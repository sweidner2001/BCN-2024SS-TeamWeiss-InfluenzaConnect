import React from 'react';

interface MenuBarProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const ProfileMenu: React.FC<MenuBarProps> = ({ selectedTab, onSelectTab }) => {
  return (
    <div className="flex justify-center items-center w-full h-12 custom-menu-bar-buttons">
      <button
        className={`px-4 py-2 rounded-l-lg ${selectedTab === 'personalData' ? 'bg-blue-500 text-white' : 'bg-blue-900'}`}
        onClick={() => onSelectTab('personalData')}
      >
        Personal Data
      </button>
      <button
        className={`px-4 py-2 rounded-r-lg ${selectedTab === 'analytics' ? 'bg-blue-500 text-white' : 'bg-blue-900'}`}
        onClick={() => onSelectTab('analytics')}
      >
        Analytics
      </button>
    </div>
  );
};

export default ProfileMenu;
