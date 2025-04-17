import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import BackButton from '../components/BackButton';

const MessagesHomeScreen = () => {
  const { characters, gameDate } = useContext(GameContext);
  const navigate = useNavigate();
  
  // Calculate current game day
  const initialDate = new Date(gameDate.getFullYear(), 4, 10);
  const currentDay = Math.floor((gameDate - initialDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // Filter characters that should be visible (their first day has arrived)
  const visibleCharacters = characters.filter(char => currentDay >= char.firstDay);
  
  // Sort characters: those with new messages first, then alphabetically
  const sortedCharacters = [...visibleCharacters].sort((a, b) => {
    if (a.hasNewMessages && !b.hasNewMessages) return -1;
    if (!a.hasNewMessages && b.hasNewMessages) return 1;
    return a.name.localeCompare(b.name);
  });
  
  return (
    <div className="messages-home-screen">
      <BackButton to="/" />
      
      <div className="header">
        Messages
      </div>
      
      <div className="content">
        {sortedCharacters.length === 0 ? (
          <div className="no-messages" style={{ 
            textAlign: 'center', 
            marginTop: '50px',
            color: 'var(--dark-gray)'
          }}>
            No conversations yet
          </div>
        ) : (
          <div className="character-list">
            {sortedCharacters.map(character => (
              <div 
                key={character.id}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesHomeScreen;
