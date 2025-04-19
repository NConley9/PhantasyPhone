import React, { createContext, useState, useCallback } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  // Settings state
  const [unlockedWallpapers, setUnlockedWallpapers] = useState(['default.jpg']);
  const [currentWallpaper, setCurrentWallpaper] = useState('default.jpg');
  const [playerAvatar, setPlayerAvatar] = useState('default-avatar.jpg');
  
  // Wallpapers data
  const wallpapers = [
    { id: 'default.jpg', name: 'Default', color: '#1e88e5' },
    { id: 'schedule.jpg', name: 'Schedule', color: '#43a047' },
    { id: 'benefits.jpg', name: 'Benefits', color: '#e53935' }
  ];
  
  // Avatars data
  const avatars = [
    { id: 'default-avatar.jpg', name: 'Default', letter: 'U' }
  ];
  
  // Function to unlock a wallpaper
  const unlockWallpaper = useCallback((wallpaperId) => {
    if (!unlockedWallpapers.includes(wallpaperId)) {
      setUnlockedWallpapers(prev => [...prev, wallpaperId]);
    }
  }, [unlockedWallpapers]);
  
  // Function to change the current wallpaper
  const changeWallpaper = useCallback((wallpaperId) => {
    if (unlockedWallpapers.includes(wallpaperId)) {
      setCurrentWallpaper(wallpaperId);
    }
  }, [unlockedWallpapers]);
  
  // Function to change the player avatar
  const changePlayerAvatar = useCallback((avatarId) => {
    const avatar = avatars.find(a => a.id === avatarId);
    if (avatar) {
      setPlayerAvatar(avatarId);
    }
  }, [avatars]);
  
  return (
    <SettingsContext.Provider
      value={{
        unlockedWallpapers,
        currentWallpaper,
        playerAvatar,
        wallpapers,
        avatars,
        unlockWallpaper,
        changeWallpaper,
        changePlayerAvatar
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
