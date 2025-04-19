import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import BackButton from '../components/ui/BackButton';
import CharacterListItem from '../components/messages/CharacterListItem';

const MessagesHomeScreen = () => {
  const { characters, gameDate, scripts } = useContext(GameContext);
  const navigate = useNavigate();
  const [visibleCharacters, setVisibleCharacters] = useState([]);

  // Calculate current game day and filter characters
  useEffect(() => {
    const initialDate = new Date(gameDate.getFullYear(), 4, 10);
    const currentDay = Math.floor((gameDate - initialDate) / (1000 * 60 * 60 * 24)) + 1;
    console.log('MessagesHomeScreen: Current day is', currentDay);
    console.log('MessagesHomeScreen: All characters:', characters);

    // Filter characters that should be visible (their first day has arrived)
    const filtered = characters.filter(char => {
      const isVisible = currentDay >= char.firstDay;
      console.log(`Character ${char.name} (firstDay: ${char.firstDay}) is ${isVisible ? 'visible' : 'not visible'}`);
      return isVisible;
    });

    console.log('MessagesHomeScreen: Visible characters:', filtered);

    // Sort characters: those with new messages first, then alphabetically
    const sorted = [...filtered].sort((a, b) => {
      if (a.hasNewMessages && !b.hasNewMessages) return -1;
      if (!a.hasNewMessages && b.hasNewMessages) return 1;
      return a.name.localeCompare(b.name);
    });

    setVisibleCharacters(sorted);
  }, [characters, gameDate, scripts]);

  return (
    <div className="messages-home-screen">
      <BackButton to="/" />

      <div className="header" style={{
        padding: '15px',
        fontSize: '24px',
        fontWeight: 'bold',
        borderBottom: '1px solid var(--light-gray)'
      }}>
        Messages
      </div>

      <div className="content">
        {visibleCharacters.length === 0 ? (
          <div className="no-messages" style={{
            textAlign: 'center',
            marginTop: '50px',
            color: 'var(--dark-gray)'
          }}>
            No conversations yet
          </div>
        ) : (
          <div className="character-list" style={{ padding: '0 15px' }}>
            {visibleCharacters.map(character => (
              <CharacterListItem key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesHomeScreen;
