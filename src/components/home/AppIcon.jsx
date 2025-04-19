import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppIcon = ({ app, hasNotification }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="app-icon"
      onClick={() => navigate(app.path)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      <div style={{
        fontSize: '36px',
        marginBottom: '5px',
        position: 'relative'
      }}>
        {app.icon}
        {hasNotification && (
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: 'var(--notification-color)'
          }}></div>
        )}
      </div>
      <div style={{
        fontSize: '12px',
        color: 'white',
        textShadow: '0 1px 3px rgba(0,0,0,0.7)'
      }}>
        {app.name}
      </div>
    </div>
  );
};

export default AppIcon;
