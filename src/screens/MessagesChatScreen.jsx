import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import { ChatContext } from '../context/ChatContext';
import BackButton from '../components/ui/BackButton';
import MessageBubble from '../components/messages/MessageBubble';
import DayAdvanceButton from '../components/messages/DayAdvanceButton';
import MessageInput from '../components/messages/MessageInput';
import ImageLightbox from '../components/messages/ImageLightbox';
import CharacterHeader from '../components/messages/CharacterHeader';
import TypingIndicator from '../components/messages/TypingIndicator';
import OfflineMessage from '../components/messages/OfflineMessage';

const MessagesChatScreen = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const { characters, advanceDay } = useContext(GameContext);
  const {
    displayedMessages,
    isTyping,
    waitingForUserInput,
    conversationEnded,
    initializeChat
  } = useContext(ChatContext);

  const [character, setCharacter] = useState(null);
  const [showLightbox, setShowLightbox] = useState(null);

  const messagesEndRef = useRef(null);

  // Find the character and initialize chat
  useEffect(() => {
    console.log('MessagesChatScreen: Finding character with ID:', characterId);
    console.log('Available characters:', characters);
    
    const foundCharacter = characters.find(c => c.id === characterId);
    if (!foundCharacter) {
      console.error('Character not found, navigating back to messages');
      navigate('/messages');
      return;
    }

    console.log('Found character:', foundCharacter);
    setCharacter(foundCharacter);
    
    // Initialize chat with a small delay to ensure state is updated
    setTimeout(() => {
      initializeChat(characterId);
    }, 100);
  }, [characterId, characters, navigate, initializeChat]);

  // Scroll to bottom when messages change or typing status changes
  useEffect(() => {
    console.log('MessagesChatScreen: Messages changed, scrolling to bottom');
    console.log('Current displayed messages:', displayedMessages);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages, isTyping]);

  // Handle day advancement
  const handleAdvanceDay = (days) => {
    advanceDay(days);
    navigate('/');
  };

  if (!character) {
    console.log('MessagesChatScreen: Character not loaded yet');
    return <div>Loading...</div>;
  }

  console.log('MessagesChatScreen: Rendering with displayedMessages:', displayedMessages);

  return (
    <div className="messages-chat-screen" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%'
    }}>
      <BackButton to="/messages" />

      <CharacterHeader character={character} />

      <div className="content" style={{
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden'
      }}>
        <div className="messages-container" style={{ 
          flex: 1, 
          padding: '10px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {displayedMessages && displayedMessages.length > 0 ? (
            <>
              {displayedMessages.map((message, index) => {
                console.log('Rendering message:', message);
                if (message.type === 'message' || message.type === 'image') {
                  const isUser = message.sender === 'user';
                  return (
                    <MessageBubble
                      key={index}
                      message={message}
                      character={character}
                      isUser={isUser}
                      onImageClick={setShowLightbox}
                    />
                  );
                } else if (message.type === 'command' && message.action === 'advanceDay') {
                  return (
                    <DayAdvanceButton
                      key={index}
                      onClick={() => handleAdvanceDay(message.value)}
                    />
                  );
                }

                return null;
              })}

              {isTyping && <TypingIndicator character={character} />}
              {conversationEnded && <OfflineMessage character={character} />}
              
              <div ref={messagesEndRef} style={{ height: '1px' }} />
            </>
          ) : (
            <div className="no-messages-placeholder" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              color: 'var(--medium-gray)'
            }}>
              No messages to display
            </div>
          )}
        </div>

        <MessageInput />
      </div>

      {/* Lightbox for images */}
      {showLightbox && (
        <ImageLightbox
          imageSrc={showLightbox}
          onClose={() => setShowLightbox(null)}
        />
      )}
    </div>
  );
};

export default MessagesChatScreen;
