import React, { createContext, useState, useContext, useCallback } from 'react';
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

  // Initialize chat with a character
  const initializeChat = useCallback((characterId) => {
    setCurrentCharacterId(characterId);
    markMessagesAsRead(characterId);

    // Calculate current game day
    const initialDate = new Date(gameDate.getFullYear(), 4, 10);
    const currentDay = Math.floor((gameDate - initialDate) / (1000 * 60 * 60 * 24)) + 1;

    // Collect all messages up to the current day
    const allMessages = [];

    if (scripts[characterId]) {
      for (let day = 1; day <= currentDay; day++) {
        const dayKey = `day${day.toString().padStart(3, '0')}`;
        if (scripts[characterId][dayKey]) {
          allMessages.push(...scripts[characterId][dayKey]);
        }
      }
    }

    setCurrentMessages(allMessages);
    setDisplayedMessages([]);
    setIsTyping(false);
    setWaitingForUserInput(false);
    setConversationEnded(false);

    // Start displaying messages
    if (allMessages.length > 0) {
      startMessageSequence(allMessages);
    }
  }, [gameDate, markMessagesAsRead, scripts]);

  // Start displaying messages in sequence
  const startMessageSequence = (messages) => {
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
          processNextMessage(messages, 1);
        }, 1000);
      }
    }
  };

  // Process the next message in the sequence
  const processNextMessage = (messages, index) => {
    if (index >= messages.length) {
      // End of conversation
      setConversationEnded(true);
      return;
    }

    const message = messages[index];

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
        processNextMessage(messages, index + 1);
      }, 1000);
    }, typingTime);
  };

  // Handle user input
  const handleUserInput = () => {
    if (!waitingForUserInput) return;

    setWaitingForUserInput(false);

    // Find the index of the next user message
    const nextUserMessageIndex = displayedMessages.length;

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

    // Add user messages to displayed messages
    setDisplayedMessages(prev => [...prev, ...userMessages]);

    // Process the next message after a delay
    setTimeout(() => {
      processNextMessage(currentMessages, currentIndex);
    }, 1000);
  };

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
