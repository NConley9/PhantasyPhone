import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import { NotificationsContext } from '../context/NotificationsContext';
import { SettingsContext } from '../context/SettingsContext';
import Notification from '../components/ui/Notification';
import AppIcon from '../components/home/AppIcon';
import DateWidget from '../components/home/DateWidget';

const HomeScreen = () => {
  const { gameDate, characters } = useContext(GameContext);
  const { notifications, removeNotification } = useContext(NotificationsContext);
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
      <DateWidget date={gameDate} />

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="notifications-container" style={{ padding: '0 15px' }}>
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              notification={notification}
              onDismiss={removeNotification}
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
          <AppIcon
            key={app.id}
            app={app}
            hasNotification={app.id === 'messages' && hasNewMessages}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
