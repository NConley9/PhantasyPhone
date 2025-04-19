import React from 'react';

const MessageBubble = ({ message, character, isUser, onImageClick }) => {
  console.log('Rendering MessageBubble with message:', message);
  console.log('isUser:', isUser);
  console.log('character:', character);

  if (!message) {
    console.error('MessageBubble received null or undefined message');
    return null;
  }

  if (message.type === 'message') {
    return (
      <div 
        className={`message ${isUser ? 'user-message' : 'character-message'}`}
        style={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          marginBottom: '10px',
          width: '100%'
        }}
      >
        {!isUser && (
          <div className="message-avatar" style={{
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
        )}
        
        <div className="message-bubble" style={{
          maxWidth: '70%',
          padding: '10px 15px',
          borderRadius: '18px',
          backgroundColor: isUser ? 'var(--user-message-color)' : 'var(--character-message-color)',
          color: isUser ? 'black' : 'white',
          wordBreak: 'break-word'
        }}>
          {message.content}
        </div>
        
        {isUser && (
          <div className="message-avatar" style={{
            width: '30px',
            height: '30px',
            borderRadius: '15px',
            backgroundColor: 'var(--primary-color)',
            marginLeft: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '16px',
            color: 'white'
          }}>
            U
          </div>
        )}
      </div>
    );
  } else if (message.type === 'image') {
    return (
      <div 
        className={`message ${isUser ? 'user-message' : 'character-message'}`}
        style={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          marginBottom: '10px',
          width: '100%'
        }}
      >
        {!isUser && (
          <div className="message-avatar" style={{
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
        )}
        
        <div 
          className="message-image" 
          onClick={() => onImageClick(message.content)}
          style={{
            maxWidth: '70%',
            borderRadius: '18px',
            overflow: 'hidden',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '150px',
            height: '150px',
            backgroundColor: 'var(--medium-gray)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            textAlign: 'center'
          }}>
            [Image: {message.content}]
          </div>
        </div>
        
        {isUser && (
          <div className="message-avatar" style={{
            width: '30px',
            height: '30px',
            borderRadius: '15px',
            backgroundColor: 'var(--primary-color)',
            marginLeft: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '16px',
            color: 'white'
          }}>
            U
          </div>
        )}
      </div>
    );
  }
  
  console.log('MessageBubble: Unhandled message type:', message.type);
  return null;
};

export default MessageBubble;
