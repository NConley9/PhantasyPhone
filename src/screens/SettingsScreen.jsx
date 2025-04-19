import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { SettingsContext } from '../context/SettingsContext';
import BackButton from '../components/ui/BackButton';

const SettingsScreen = () => {
  const { advanceDay } = useContext(GameContext);
  const {
    unlockedWallpapers,
    currentWallpaper,
    playerAvatar,
    wallpapers,
    avatars,
    changeWallpaper,
    changePlayerAvatar
  } = useContext(SettingsContext);

  return (
    <div className="settings-screen">
      <BackButton to="/" />

      <div className="header">
        Settings
      </div>

      <div className="content">
        <div className="settings-section" style={{
          margin: '20px 0',
          backgroundColor: 'white',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <div className="settings-header" style={{
            padding: '15px',
            borderBottom: '1px solid var(--light-gray)',
            fontWeight: 'bold'
          }}>
            Wallpaper
          </div>

          <div className="wallpaper-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            padding: '15px'
          }}>
            {wallpapers.map(wallpaper => {
              const isUnlocked = unlockedWallpapers.includes(wallpaper.id);
              const isSelected = currentWallpaper === wallpaper.id;

              return (
                <div
                  key={wallpaper.id}
                  className={`wallpaper-item ${isUnlocked ? 'unlocked' : 'locked'} ${isSelected ? 'selected' : ''}`}
                  onClick={() => isUnlocked && changeWallpaper(wallpaper.id)}
                  style={{
                    position: 'relative',
                    aspectRatio: '9/16',
                    backgroundColor: 'var(--light-gray)',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    cursor: isUnlocked ? 'pointer' : 'not-allowed',
                    opacity: isUnlocked ? 1 : 0.5,
                    border: isSelected ? '2px solid var(--primary-color)' : 'none'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: '5px',
                    right: '5px',
                    padding: '3px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    fontSize: '10px',
                    borderRadius: '3px',
                    textAlign: 'center'
                  }}>
                    {wallpaper.name}
                  </div>

                  {!isUnlocked && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '20px'
                    }}>
                      🔒
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="settings-section" style={{
          margin: '20px 0',
          backgroundColor: 'white',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <div className="settings-header" style={{
            padding: '15px',
            borderBottom: '1px solid var(--light-gray)',
            fontWeight: 'bold'
          }}>
            Player Avatar
          </div>

          <div className="avatar-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            padding: '15px'
          }}>
            {avatars.map(avatar => {
              const isSelected = playerAvatar === avatar.id;

              return (
                <div
                  key={avatar.id}
                  className={`avatar-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => changePlayerAvatar(avatar.id)}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '30px',
                    backgroundColor: 'var(--medium-gray)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: isSelected ? '2px solid var(--primary-color)' : 'none'
                  }}
                >
                  U
                </div>
              );
            })}
          </div>
        </div>

        {/* Debug section - would be removed in production */}
        <div className="settings-section" style={{
          margin: '20px 0',
          backgroundColor: 'white',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <div className="settings-header" style={{
            padding: '15px',
            borderBottom: '1px solid var(--light-gray)',
            fontWeight: 'bold'
          }}>
            Debug
          </div>

          <div style={{ padding: '15px' }}>
            <button
              onClick={() => advanceDay(1)}
              style={{
                padding: '10px 15px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Advance 1 Day
            </button>

            <button
              onClick={() => advanceDay(7)}
              style={{
                padding: '10px 15px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Advance 1 Week
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
