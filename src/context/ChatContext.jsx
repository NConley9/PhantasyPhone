import React, { createContext, useState, useContext, useCallback, useRef, useEffect } from 'react';
import { GameContext } from './GameContext';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { scripts, gameDate, markMessagesAsRead } = useContext(GameContext);
  
  // Chat state
  const [currentCharacterId, setCurrentCharacterId] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForUserInput, setWaitingForUserInput] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  
  // Refs for functions to avoid circular dependencies
  const processNextMessageRef = useRef(null);
  
  // Process the next message in the sequence
  const processNextMessage = useCallback((messages, index) => {
    console.log('Processing next message at index:', index);
    if (index >= messages.length) {
      // End of conversation
      setConversationEnded(true);
      return;
    }
    
    const message = messages[index];
    console.log('Processing message:', message);
    
    if (message.sender === 'user') {
      // Wait for user input
      setWaitingForUserInput(true);
      return;
    }
    
    // Show typing indicator for character messages
    setIsTyping(true);
    
    // Show typing indicator for 3-5 seconds
    const typingTime = Math.floor(Math.random() * 2000) + 3000;
    
    setTimeout(() => {
      // Remove typing indicator
      setIsTyping(false);
      
      // Display the message
      setDisplayedMessages(prev => [...prev, message]);
      
      // Process the next message after a delay
      setTimeout(() => {
        processNextMessageRef.current(messages, index + 1);
      }, 1000);
    }, typingTime);
  }, []);
  
  // Update the ref when the function changes
  useEffect(() => {
    processNextMessageRef.current = processNextMessage;
  }, [processNextMessage]);
  
  // Start displaying messages in sequence
  const startMessageSequence = useCallback((messages) => {
    console.log('Starting message sequence with messages:', messages);
    // Display the first message immediately
    if (messages.length > 0) {
      const firstMessage = messages[0];
      
      if (firstMessage.sender === 'user') {
        // If the first message is from the user, wait for input
        setWaitingForUserInput(true);
      } else {
        // Display the first message immediately
        setDisplayedMessages([firstMessage]);
        
        // Process the next message after a delay
        setTimeout(() => {
          if (processNextMessageRef.current) {
            processNextMessageRef.current(messages, 1);
          }
        }, 1000);
      }
    }
  }, []);
  
  // Initialize chat with a character
  const initializeChat = useCallback((characterId) => {
    console.log('Initializing chat with character:', characterId);
    setCurrentCharacterId(characterId);
    markMessagesAsRead(characterId);
    
    // Calculate current game day
    const initialDate = new Date(gameDate.getFullYear(), 4, 10);
    const currentDay = Math.floor((gameDate - initialDate) / (1000 * 60 * 60 * 24)) + 1;
    console.log('Current game day:', currentDay);
    
    // Collect all messages up to the current day
    const allMessages = [];
    
    if (scripts[characterId]) {
      console.log('Found scripts for character:', characterId);
      for (let day = 1; day <= currentDay; day++) {
        const dayKey = `day${day.toString().padStart(3, '0')}`;
        console.log('Checking day:', dayKey);
        if (scripts[characterId][dayKey]) {
          console.log('Found messages for day:', dayKey, scripts[characterId][dayKey]);
          allMessages.push(...scripts[characterId][dayKey]);
        }
      }
    } else {
      console.warn('No scripts found for character:', characterId);
    }
    
    console.log('All messages collected:', allMessages);
    setCurrentMessages(allMessages);
    setDisplayedMessages([]);
    setIsTyping(false);
    setWaitingForUserInput(false);
    setConversationEnded(false);
    
    // Start displaying messages
    if (allMessages.length > 0) {
      console.log('Starting message sequence with', allMessages.length, 'messages');
      startMessageSequence(allMessages);
    } else {
      console.warn('No messages to display');
    }
  }, [gameDate, markMessagesAsRead, scripts, startMessageSequence]);
  
  // Handle user input
  const handleUserInput = useCallback(() => {
    console.log('Handling user input, waitingForUserInput:', waitingForUserInput);
    if (!waitingForUserInput) return;
    
    setWaitingForUserInput(false);
    
    // Find the index of the next user message
    const nextUserMessageIndex = displayedMessages.length;
    console.log('Next user message index:', nextUserMessageIndex);
    
    // Display all consecutive user messages
    let currentIndex = nextUserMessageIndex;
    const userMessages = [];
    
    while (
      currentIndex < currentMessages.length &&
      currentMessages[currentIndex].sender === 'user'
    ) {
      userMessages.push(currentMessages[currentIndex]);
      currentIndex++;
    }
    
    console.log('User messages to display:', userMessages);
    
    // Add user messages to displayed messages
    setDisplayedMessages(prev => [...prev, ...userMessages]);
    
    // Process the next message after a delay
    setTimeout(() => {
      if (processNextMessageRef.current) {
        processNextMessageRef.current(currentMessages, currentIndex);
      }
    }, 1000);
  }, [waitingForUserInput, displayedMessages, currentMessages]);
  
  return (
    <ChatContext.Provider
      value={{
        currentCharacterId,
        displayedMessages,
        isTyping,
        waitingForUserInput,
        conversationEnded,
        initializeChat,
        handleUserInput
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
