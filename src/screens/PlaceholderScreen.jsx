import React from 'react';
import BackButton from '../components/BackButton';

const PlaceholderScreen = ({ title, message }) => {
  return (
    <div className="placeholder-screen">
      <BackButton to="/" />
      
      <div className="header">
        {title}
      </div>
      
      <div className="content" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>
          🚧
        </div>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          {message}
        </div>
        <div style={{ 
          color: 'var(--dark-gray)',
          textAlign: 'center',
          padding: '0 30px'
        }}>
          This feature is coming soon. Check back later!
        </div>
      </div>
    </div>
  );
};

export default PlaceholderScreen;
