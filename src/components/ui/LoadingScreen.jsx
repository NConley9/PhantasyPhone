import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      backgroundColor: 'var(--background-color)'
    }}>
      <div className="loading-spinner" style={{
        width: '50px',
        height: '50px',
        border: '5px solid var(--light-gray)',
        borderTop: '5px solid var(--primary-color)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }}></div>
      <div className="loading-text" style={{
        fontSize: '18px',
        color: 'var(--dark-gray)'
      }}>
        Loading...
      </div>
    </div>
  );
};

export default LoadingScreen;
