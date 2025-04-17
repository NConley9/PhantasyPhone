import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import BackButton from '../components/BackButton';

const NotesHomeScreen = () => {
  const { characters, gameDate } = useContext(GameContext);
  const navigate = useNavigate();
  
  // Calculate current game day
  const initialDate = new Date(gameDate.getFullYear(), 4, 10);
  const currentDay = Math.floor((gameDate - initialDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // Filter characters that should be visible (their first day has arrived)
  const visibleCharacters = characters.filter(char => currentDay >= char.firstDay);
  
  // Sort characters alphabetically
  const sortedCharacters = [...visibleCharacters].sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <div className="notes-home-screen">
      <BackButton to="/" />
      
      <div className="header">
        Notes
      </div>
      
      <div className="content">
        {sortedCharacters.length === 0 ? (
          <div className="no-notes" style={{ 
            textAlign: 'center', 
            marginTop: '50px',
            color: 'var(--dark-gray)'
          }}>
            No character notes yet
          </div>
        ) : (
          <div className="character-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            padding: '20px'
          }}>
            {sortedCharacters.map(character => (
              <div 
                key={character.id}
                className="character-card"
                onClick={() => navigate(`/notes/${character.id}`)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div className="character-avatar" style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '30px',
                  backgroundColor: 'var(--medium-gray)',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '24px'
                }}>
                  {character.name.charAt(0)}
                </div>
                
                <div className="character-name" style={{ fontWeight: 'bold' }}>
                  {character.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesHomeScreen;
