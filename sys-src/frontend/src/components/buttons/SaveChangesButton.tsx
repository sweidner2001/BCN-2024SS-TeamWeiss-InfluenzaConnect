// SaveChangesButton.tsx

import React from 'react';

interface SaveChangesButtonProps {
    onSaveClick: () => void;
}

const SaveChangesButton: React.FC<SaveChangesButtonProps> = ({ onSaveClick }) => {
    return (
        <button onClick={onSaveClick} className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
            Übernehmen
        </button>
    );
};

export default SaveChangesButton;
