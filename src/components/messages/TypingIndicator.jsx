import React from 'react';

const TypingIndicator = ({ character }) => {
  return (
    <div 
      className="typing-indicator"
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
      }}
    >
      <div 
        className="message-avatar" 
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '15px',
          backgroundColor: 'var(--medium-gray)',
          marginRight: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '16px'
        }}
      >
        {character.name.charAt(0)}
      </div>
      
      <div 
        className="typing-indicator-dots"
        style={{
          display: 'flex',
          backgroundColor: 'var(--character-message-color)',
          padding: '10px 15px',
          borderRadius: '18px',
          gap: '5px'
        }}
      >
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="typing-indicator-dot"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: 'white',
              borderRadius: '50%',
              opacity: 0.7,
              animation: `typingAnimation 1s infinite ${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;
