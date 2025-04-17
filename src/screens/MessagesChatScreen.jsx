import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import BackButton from '../components/BackButton';

const MessagesChatScreen = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const { 
    gameDate, 
    characters, 
    scripts, 
    markMessagesAsRead, 
    advanceDay,
    unlockWallpaper
  } = useContext(GameContext);
  
  const [messages, setMessages] = useState([]);
  const [character, setCharacter] = useState(null);
  const [showLightbox, setShowLightbox] = useState(null);
  
  const messagesEndRef = useRef(null);
  
  // Find the character
  useEffect(() => {
    const foundCharacter = characters.find(c => c.id === characterId);
    if (!foundCharacter) {
      navigate('/messages');
      return;
    }
    
    setCharacter(foundCharacter);
    
    // Mark messages as read
    markMessagesAsRead(characterId);
  }, [characterId, characters, navigate, markMessagesAsRead]);
  
  // Load messages for this character
  useEffect(() => {
    console.log('Loading messages for character:', characterId);
    console.log('Scripts:', scripts);
    console.log('Character:', character);
    
    if (!character || !scripts[characterId]) {
      console.log('Character or scripts not found');
      return;
    }
    
    // Calculate current game day
    const initialDate = new Date(gameDate.getFullYear(), 4, 10);
    const currentDay = Math.floor((gameDate - initialDate) / (1000 * 60 * 60 * 24)) + 1;
    console.log('Current day:', currentDay);
    
    // Collect all messages up to the current day
    const allMessages = [];
    
    for (let day = 1; day <= currentDay; day++) {
      const dayKey = `day${day.toString().padStart(3, '0')}`;
      console.log('Checking day:', dayKey);
      if (scripts[characterId][dayKey]) {
        console.log('Found messages for day:', dayKey, scripts[characterId][dayKey]);
        allMessages.push(...scripts[characterId][dayKey]);
      }
    }
    
    console.log('All messages:', allMessages);
    setMessages(allMessages);
    
    // Process any commands
    const commands = allMessages.filter(msg => msg.type === 'command');
    commands.forEach(cmd => {
      if (cmd.action === 'advanceDay') {
        // We'll handle this separately
      }
      
      if (cmd.type === 'unlock' && cmd.item === 'wallpaper') {
        unlockWallpaper(cmd.id);
      }
    });
  }, [character, characterId, scripts, gameDate, unlockWallpaper]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
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
      
      <div className="header" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div className="character-avatar" style={{
          width: '30px',
          height: '30px',
          borderRadius: '15px',
          backgroundColor: 'var(--medium-gray)',
          marginRight: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '16px'
        }}>
          {character.name.charAt(0)}
        </div>
        <div>{character.name}</div>
      </div>
      
      <div className="content" style={{
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="messages-container" style={{ flex: 1, padding: '10px' }}>
          {messages.map((message, index) => {
            if (message.type === 'message') {
              const isUser = message.sender === 'user';
              return (
                <div 
                  key={index}
                  className={`message ${isUser ? 'user-message' : 'character-message'}`}
                  style={{
                    display: 'flex',
                    justifyContent: isUser ? 'flex-end' : 'flex-start',
                    marginBottom: '10px'
                  }}
                >
                  {!isUser && (
                    <div className="message-avatar" style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '15px',
                      backgroundColor: 'var(--medium-gray)',
                      marginRight: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '16px'
                    }}>
                      {character.name.charAt(0)}
                    </div>
                  )}
                  
                  <div className="message-bubble" style={{
                    maxWidth: '70%',
                    padding: '10px 15px',
                    borderRadius: '18px',
                    backgroundColor: isUser ? 'var(--user-message-color)' : 'var(--character-message-color)',
                    color: isUser ? 'black' : 'white'
                  }}>
                    {message.content}
                  </div>
                  
                  {isUser && (
                    <div className="message-avatar" style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '15px',
                      backgroundColor: 'var(--primary-color)',
                      marginLeft: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '16px',
                      color: 'white'
                    }}>
                      U
                    </div>
                  )}
                </div>
              );
            } else if (message.type === 'image') {
              const isUser = message.sender === 'user';
              return (
                <div 
                  key={index}
                  className={`message ${isUser ? 'user-message' : 'character-message'}`}
                  style={{
                    display: 'flex',
                    justifyContent: isUser ? 'flex-end' : 'flex-start',
                    marginBottom: '10px'
                  }}
                >
                  {!isUser && (
                    <div className="message-avatar" style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '15px',
                      backgroundColor: 'var(--medium-gray)',
                      marginRight: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '16px'
                    }}>
                      {character.name.charAt(0)}
                    </div>
                  )}
                  
                  <div 
                    className="message-image" 
                    onClick={() => setShowLightbox(message.content)}
                    style={{
                      maxWidth: '70%',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '150px',
                      height: '150px',
                      backgroundColor: 'var(--medium-gray)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      [Image: {message.content}]
                    </div>
                  </div>
                  
                  {isUser && (
                    <div className="message-avatar" style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '15px',
                      backgroundColor: 'var(--primary-color)',
                      marginLeft: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '16px',
                      color: 'white'
                    }}>
                      U
                    </div>
                  )}
                </div>
              );
            } else if (message.type === 'command' && message.action === 'advanceDay') {
              return (
                <div 
                  key={index}
                  className="day-advance-button"
                  onClick={() => handleAdvanceDay(message.value)}
                  style={{
                    margin: '20px auto',
                    padding: '10px 20px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '20px',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  Continue to next day
                </div>
              );
            }
            
            return null;
          })}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="message-input" style={{
          padding: '15px',
          borderTop: '1px solid var(--light-gray)',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="message-input-field" style={{
            flex: 1,
            padding: '10px 15px',
            borderRadius: '20px',
            backgroundColor: 'var(--light-gray)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'var(--dark-gray)' }}>...</span>
          </div>
        </div>
      </div>
      
      {/* Lightbox for images */}
      {showLightbox && (
        <div 
          className="lightbox"
          onClick={() => setShowLightbox(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100
          }}
        >
          <div className="lightbox-content" style={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%'
          }}>
            <div style={{
              width: '300px',
              height: '300px',
              backgroundColor: 'var(--medium-gray)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white'
            }}>
              [Full Image: {showLightbox}]
            </div>
            
            <div 
              className="lightbox-close"
              onClick={() => setShowLightbox(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                color: 'white',
                fontSize: '30px',
                cursor: 'pointer'
              }}
            >
              ✕
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesChatScreen;
