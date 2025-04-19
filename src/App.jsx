import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameContext } from './context/GameContext';
import LoadingScreen from './components/ui/LoadingScreen';
import ErrorScreen from './components/ui/ErrorScreen';

// Import screens
import HomeScreen from './screens/HomeScreen';
import MessagesHomeScreen from './screens/MessagesHomeScreen';
import MessagesChatScreen from './screens/MessagesChatScreen';
import NotesHomeScreen from './screens/NotesHomeScreen';
import NotesCharacterScreen from './screens/NotesCharacterScreen';
import SettingsScreen from './screens/SettingsScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';

// Import components
import PhoneContainer from './components/layout/PhoneContainer';

function App() {
  const { isTransitioning, isLoading, error } = useContext(GameContext);

  // Show loading screen if data is loading
  if (isLoading) {
    return (
      <PhoneContainer>
        <LoadingScreen />
      </PhoneContainer>
    );
  }

  // Show error screen if there's an error
  if (error) {
    return (
      <PhoneContainer>
        <ErrorScreen />
      </PhoneContainer>
    );
  }

  return (
    <Router>
      <PhoneContainer>
        <div className={`screen ${isTransitioning ? 'fade-transition' : ''}`}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/messages" element={<div className="slide-in"><MessagesHomeScreen /></div>} />
            <Route path="/messages/:characterId" element={<div className="slide-in"><MessagesChatScreen /></div>} />
            <Route path="/notes" element={<div className="slide-in"><NotesHomeScreen /></div>} />
            <Route path="/notes/:characterId" element={<div className="slide-in"><NotesCharacterScreen /></div>} />
            <Route path="/settings" element={<div className="slide-in"><SettingsScreen /></div>} />
            <Route path="/photogram" element={<div className="slide-in"><PlaceholderScreen title="Photogram" message="Under Construction" /></div>} />
            <Route path="/datematch" element={<div className="slide-in"><PlaceholderScreen title="DateMatch" message="Under Construction" /></div>} />
            <Route path="/securecam" element={<div className="slide-in"><PlaceholderScreen title="SecureCam" message="Under Construction" /></div>} />
            <Route path="/shopmart" element={<div className="slide-in"><PlaceholderScreen title="ShopMart" message="Under Construction" /></div>} />
            <Route path="/wallet" element={<div className="slide-in"><PlaceholderScreen title="Wallet" message="Under Construction" /></div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </PhoneContainer>
    </Router>
  );
}

export default App;
