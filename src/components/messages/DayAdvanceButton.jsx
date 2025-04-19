import React from 'react';

const DayAdvanceButton = ({ onClick }) => {
  return (
    <div 
      className="day-advance-button"
      onClick={onClick}
      style={{
        margin: '20px auto',
        padding: '10px 20px',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        borderRadius: '20px',
        textAlign: 'center',
        cursor: 'pointer'
      }}
    >
      Continue to next day
    </div>
  );
};

export default DayAdvanceButton;
