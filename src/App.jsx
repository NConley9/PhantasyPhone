import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameContext } from './context/GameContext';

// Import screens
import HomeScreen from './screens/HomeScreen';
import MessagesHomeScreen from './screens/MessagesHomeScreen';
import MessagesChatScreen from './screens/MessagesChatScreen';
import NotesHomeScreen from './screens/NotesHomeScreen';
import NotesCharacterScreen from './screens/NotesCharacterScreen';
import SettingsScreen from './screens/SettingsScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';

// Import components
import PhoneContainer from './components/PhoneContainer';

function App() {
  const { isTransitioning } = useContext(GameContext);

  return (
    <Router>
      <PhoneContainer>
        <div className={`screen ${isTransitioning ? 'fade-transition' : ''}`}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/messages" element={<MessagesHomeScreen />} />
            <Route path="/messages/:characterId" element={<MessagesChatScreen />} />
            <Route path="/notes" element={<NotesHomeScreen />} />
            <Route path="/notes/:characterId" element={<NotesCharacterScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/photogram" element={<PlaceholderScreen title="Photogram" message="Under Construction" />} />
            <Route path="/datematch" element={<PlaceholderScreen title="DateMatch" message="Under Construction" />} />
            <Route path="/securecam" element={<PlaceholderScreen title="SecureCam" message="Under Construction" />} />
            <Route path="/shopmart" element={<PlaceholderScreen title="ShopMart" message="Under Construction" />} />
            <Route path="/wallet" element={<PlaceholderScreen title="Wallet" message="Under Construction" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </PhoneContainer>
    </Router>
  );
}

export default App;
