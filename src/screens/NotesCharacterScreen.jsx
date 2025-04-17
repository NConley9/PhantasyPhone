import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import BackButton from '../components/BackButton';

const NotesCharacterScreen = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const { characters } = useContext(GameContext);
  
  const [character, setCharacter] = useState(null);
  const [notes, setNotes] = useState('');
  
  // Find the character
  useEffect(() => {
    const foundCharacter = characters.find(c => c.id === characterId);
    if (!foundCharacter) {
      navigate('/notes');
      return;
    }
    
    setCharacter(foundCharacter);
    
    // In a real implementation, we would load notes from a file
    // For now, we'll use hardcoded data
    const characterNotes = {
      'alex': `
        <h2>Alex</h2>
        <p>- Works in the tech department</p>
        <p>- Loves coffee</p>
        <p>- Has a dog named Max</p>
      `,
      'taylor': `
        <h2>Taylor</h2>
        <p>- Works in HR</p>
        <p>- Very friendly and helpful</p>
        <p>- New to the company</p>
      `
    };
    
    setNotes(characterNotes[characterId] || '<p>No notes available yet.</p>');
  }, [characterId, characters, navigate]);
  
  if (!character) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="notes-character-screen">
      <BackButton to="/notes" />
      
      <div className="header">
        {character.name}'s Notes
      </div>
      
      <div className="content" style={{ padding: '20px' }}>
        <div className="character-info" style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div className="character-avatar" style={{
            width: '60px',
            height: '60px',
            borderRadius: '30px',
            backgroundColor: 'var(--medium-gray)',
            marginRight: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px'
          }}>
            {character.name.charAt(0)}
          </div>
          
          <div>
            <div className="character-name" style={{ fontWeight: 'bold', fontSize: '18px' }}>
              {character.name}
            </div>
          </div>
        </div>
        
        <div 
          className="notes-content"
          dangerouslySetInnerHTML={{ __html: notes }}
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>
    </div>
  );
};

export default NotesCharacterScreen;
