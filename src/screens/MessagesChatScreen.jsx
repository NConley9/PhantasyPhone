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
    const foundCharacter = characters.find(c => c.id === characterId);
    if (!foundCharacter) {
      navigate('/messages');
      return;
    }

    setCharacter(foundCharacter);
    initializeChat(characterId);
  }, [characterId, characters, navigate, initializeChat]);

  // Scroll to bottom when messages change or typing status changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages, isTyping]);

  // Handle day advancement
  const handleAdvanceDay = (days) => {
    advanceDay(days);
    navigate('/');
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="messages-chat-screen">
      <BackButton to="/messages" />

      <CharacterHeader character={character} />

      <div className="content" style={{
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="messages-container" style={{ flex: 1, padding: '10px' }}>
          {displayedMessages.length > 0 ? (
            <>
              {displayedMessages.map((message, index) => {
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

          <div ref={messagesEndRef} />
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
