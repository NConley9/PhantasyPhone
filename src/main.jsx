import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GameProvider } from './context/GameContext';
import { ChatProvider } from './context/ChatContext';
import { SettingsProvider } from './context/SettingsContext';
import { NotificationsProvider } from './context/NotificationsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationsProvider>
      <SettingsProvider>
        <GameProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </GameProvider>
      </SettingsProvider>
    </NotificationsProvider>
  </React.StrictMode>
);
