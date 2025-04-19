import React from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterListItem = ({ character }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="character-item"
      onClick={() => navigate(`/messages/${character.id}`)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '15px 0',
        borderBottom: '1px solid var(--light-gray)',
        cursor: 'pointer'
      }}
    >
      <div className="character-avatar" style={{
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        backgroundColor: 'var(--medium-gray)',
        marginRight: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px'
      }}>
        {character.name.charAt(0)}
      </div>
      
      <div className="character-info" style={{ flex: 1 }}>
        <div className="character-name" style={{ fontWeight: 'bold' }}>
          {character.name}
        </div>
        <div className="character-preview" style={{ 
          color: 'var(--dark-gray)',
          fontSize: '14px'
        }}>
          Tap to view conversation
        </div>
      </div>
      
      {character.hasNewMessages && (
        <div className="new-message-badge" style={{
          width: '10px',
          height: '10px',
          borderRadius: '5px',
          backgroundColor: 'var(--notification-color)'
        }}></div>
      )}
    </div>
  );
};

export default CharacterListItem;
