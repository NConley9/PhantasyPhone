import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { GameContext } from '../context/GameContext';
import Notification from '../components/Notification';

const HomeScreen = () => {
  const { gameDate, notifications, characters } = useContext(GameContext);
  const navigate = useNavigate();
  
  const apps = [
    { id: 'messages', name: 'Messages', icon: '💬', path: '/messages' },
    { id: 'notes', name: 'Notes', icon: '📝', path: '/notes' },
    { id: 'photogram', name: 'Photogram', icon: '📷', path: '/photogram' },
    { id: 'datematch', name: 'DateMatch', icon: '❤️', path: '/datematch' },
    { id: 'securecam', name: 'SecureCam', icon: '🔒', path: '/securecam' },
    { id: 'shopmart', name: 'ShopMart', icon: '🛒', path: '/shopmart' },
    { id: 'wallet', name: 'Wallet', icon: '💳', path: '/wallet' },
    { id: 'settings', name: 'Settings', icon: '⚙️', path: '/settings' }
  ];
  
  // Check if any character has new messages
  const hasNewMessages = characters.some(char => char.hasNewMessages);
  
  return (
    <div className="home-screen">
      {/* Date widget */}
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
          {format(gameDate, 'dd')}
        </div>
        <div className="date-month" style={{ fontSize: '24px' }}>
          {format(gameDate, 'EEEE, MMMM')}
        </div>
        <div className="date-weather" style={{ fontSize: '36px', marginTop: '10px' }}>
          ☀️ 72°
        </div>
      </div>
      
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="notifications-container" style={{ padding: '0 15px' }}>
          {notifications.map(notification => (
            <Notification 
              key={notification.id} 
              notification={notification} 
            />
          ))}
        </div>
      )}
      
      {/* App grid */}
      <div className="app-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        padding: '20px'
      }}>
        {apps.map(app => (
          <div 
            key={app.id} 
            className="app-icon"
            onClick={() => navigate(app.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <div style={{
              fontSize: '36px',
              marginBottom: '5px',
              position: 'relative'
            }}>
              {app.icon}
              {app.id === 'messages' && hasNewMessages && (
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--notification-color)'
                }}></div>
              )}
            </div>
            <div style={{
              fontSize: '12px',
              color: 'white',
              textShadow: '0 1px 3px rgba(0,0,0,0.7)'
            }}>
              {app.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
