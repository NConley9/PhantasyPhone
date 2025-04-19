import React from 'react';

const OfflineMessage = ({ character }) => {
  return (
    <div 
      className="offline-message"
      style={{
        textAlign: 'center',
        padding: '15px',
        color: 'var(--dark-gray)',
        fontStyle: 'italic'
      }}
    >
      {character.name} has gone offline.
    </div>
  );
};

export default OfflineMessage;
