import React from 'react';
import { format } from 'date-fns';

const DateWidget = ({ date }) => {
  return (
    <div className="date-widget" style={{
      height: '33%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textShadow: '0 1px 3px rgba(0,0,0,0.5)'
    }}>
      <div className="date-day" style={{ fontSize: '48px', fontWeight: 'bold' }}>
        {format(date, 'dd')}
      </div>
      <div className="date-month" style={{ fontSize: '24px' }}>
        {format(date, 'EEEE, MMMM')}
      </div>
      <div className="date-weather" style={{ fontSize: '36px', marginTop: '10px' }}>
        ☀️ 72°
      </div>
    </div>
  );
};

export default DateWidget;
