import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import BackButton from '../components/ui/BackButton';
import CharacterListItem from '../components/messages/CharacterListItem';

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
              <CharacterListItem key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesHomeScreen;
