import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from '../../context/GameContext';
import { format } from 'date-fns';

const StatusBar = () => {
  const { gameDate } = useContext(GameContext);
  const [time, setTime] = useState(new Date());
  
  // Update the time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="status-bar">
      <div className="status-bar-time">
        {format(time, 'h:mm')}
      </div>
      <div className="status-bar-icons">
        <span className="status-bar-icon">📶</span>
        <span className="status-bar-icon">🔋</span>
      </div>
    </div>
  );
};

export default StatusBar;
