import React from 'react';

const CharacterHeader = ({ character }) => {
  return (
    <div className="header" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div className="character-avatar" style={{
        width: '30px',
        height: '30px',
        borderRadius: '15px',
        backgroundColor: 'var(--medium-gray)',
        marginRight: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px'
      }}>
        {character.name.charAt(0)}
      </div>
      <div>{character.name}</div>
    </div>
  );
};

export default CharacterHeader;
