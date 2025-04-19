import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

const ErrorScreen = () => {
  const { error, resetError } = useContext(GameContext);
  
  return (
    <div className="error-screen" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      backgroundColor: 'var(--background-color)',
      padding: '20px'
    }}>
      <div className="error-icon" style={{
        fontSize: '48px',
        marginBottom: '20px',
        color: 'var(--notification-color)'
      }}>
        ⚠️
      </div>
      <div className="error-message" style={{
        fontSize: '18px',
        color: 'var(--text-color)',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        {error || 'An error occurred. Please try again.'}
      </div>
      <button 
        className="retry-button"
        onClick={resetError}
        style={{
          padding: '10px 20px',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorScreen;
