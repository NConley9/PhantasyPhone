import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import StatusBar from './StatusBar';

const PhoneContainer = ({ children }) => {
  const { currentWallpaper } = useContext(GameContext);
  
  const containerStyle = {
    backgroundImage: `url(/assets/wallpapers/${currentWallpaper})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  
  return (
    <div className="phone-container" style={containerStyle}>
      <StatusBar />
      {children}
    </div>
  );
};

export default PhoneContainer;
