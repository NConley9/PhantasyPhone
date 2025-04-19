import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import StatusBar from './StatusBar';

const PhoneContainer = ({ children }) => {
  const { currentWallpaper } = useContext(SettingsContext);
  const [isPhoneSize, setIsPhoneSize] = useState(false);

  // Check if screen is phone-sized (below 450px wide and 970px tall)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsPhoneSize(window.innerWidth <= 450 && window.innerHeight <= 970);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const containerStyle = {
    backgroundImage: `url(/assets/wallpapers/${currentWallpaper})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: isPhoneSize ? 'none' : '10px solid black',
    borderRadius: isPhoneSize ? '0' : '30px'
  };

  return (
    <div className="phone-container" style={containerStyle}>
      <StatusBar />
      {children}
    </div>
  );
};

export default PhoneContainer;
