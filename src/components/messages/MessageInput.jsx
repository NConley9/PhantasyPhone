import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const MessageInput = () => {
  const { waitingForUserInput, handleUserInput } = useContext(ChatContext);

  return (
    <div className="message-input" style={{
      padding: '15px',
      borderTop: '1px solid var(--light-gray)',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div
        className="message-input-field"
        onClick={waitingForUserInput ? handleUserInput : undefined}
        style={{
          flex: 1,
          padding: '10px 15px',
          borderRadius: '20px',
          backgroundColor: 'var(--light-gray)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: waitingForUserInput ? 'pointer' : 'default',
          opacity: waitingForUserInput ? 1 : 0.7
        }}
      >
        <span style={{ color: 'var(--dark-gray)' }}>...</span>
      </div>
    </div>
  );
};

export default MessageInput;
