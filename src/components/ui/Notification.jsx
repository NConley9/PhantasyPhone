import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notification = ({ notification, onDismiss }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (notification.characterId) {
      navigate(`/messages/${notification.characterId}`);
    } else {
      navigate('/messages');
    }
    
    if (onDismiss) {
      onDismiss(notification.id);
    }
  };
  
  return (
    <div 
      className="notification"
      onClick={handleClick}
      style={{
        backgroundColor: 'var(--notification-color)',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '10px',
        margin: '10px 0',
        cursor: 'pointer',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div className="notification-title" style={{ fontWeight: 'bold' }}>
        New Message
      </div>
      <div className="notification-message">
        {notification.message}
      </div>
    </div>
  );
};

export default Notification;
