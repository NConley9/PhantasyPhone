import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { addDays } from 'date-fns';
import { NotificationsContext } from './NotificationsContext';
import { SettingsContext } from './SettingsContext';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const { addNotification, clearNotifications } = useContext(NotificationsContext);
  const { unlockWallpaper } = useContext(SettingsContext);

  // Set initial date to May 10 of current year
  const currentYear = new Date().getFullYear();
  const initialDate = new Date(currentYear, 4, 10); // Month is 0-indexed (4 = May)

  // Game state
  const [gameDate, setGameDate] = useState(initialDate);
  const [characters, setCharacters] = useState([]);
  const [scripts, setScripts] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial game data
  useEffect(() => {
    try {
      setIsLoading(true);

      // In a real implementation, we would load character data from files
      // For now, we'll use hardcoded data
      const initialCharacters = [
        {
          id: 'alex',
          name: 'Alex',
          avatar: 'alex-avatar.jpg',
          firstDay: 1, // Day 1 (May 10)
          hasNewMessages: false
        },
        {
          id: 'taylor',
          name: 'Taylor',
          avatar: 'taylor-avatar.jpg',
          firstDay: 2, // Day 2 (May 11)
          hasNewMessages: false
        }
      ];

      // Hardcoded script data from JSON files
      const scriptData = {
        'alex': {
          "day001": [
            { "type": "message", "sender": "alex", "content": "Hey there! Just got your number from the group chat." },
            { "type": "message", "sender": "user", "content": "Oh hi! Nice to meet you!" },
            { "type": "message", "sender": "alex", "content": "Same here! Looking forward to working together on the project. 😊" },
            { "type": "message", "sender": "user", "content": "Me too! When do we start?" },
            { "type": "message", "sender": "alex", "content": "Tomorrow! I'll send you the details." },
            { "type": "command", "action": "advanceDay", "value": 1 }
          ],
          "day002": [
            { "type": "message", "sender": "alex", "content": "Good morning! Ready for our first day?" },
            { "type": "message", "sender": "user", "content": "Absolutely! What's the plan?" },
            { "type": "message", "sender": "alex", "content": "I'll send you a picture of our schedule." },
            { "type": "image", "sender": "alex", "content": "schedule.jpg" },
            { "type": "unlock", "item": "wallpaper", "id": "schedule.jpg" },
            { "type": "message", "sender": "user", "content": "Thanks! This looks great." },
            { "type": "message", "sender": "alex", "content": "No problem! Let's meet at the coffee shop at 9am." },
            { "type": "message", "sender": "user", "content": "I'll be there!" },
            { "type": "command", "action": "advanceDay", "value": 1 }
          ],
          "day003": [
            { "type": "message", "sender": "alex", "content": "Hey, how was your first day?" },
            { "type": "message", "sender": "user", "content": "It was great! I learned a lot." },
            { "type": "message", "sender": "alex", "content": "Awesome! You're a quick learner." },
            { "type": "message", "sender": "user", "content": "Thanks! I'm excited for tomorrow." },
            { "type": "message", "sender": "alex", "content": "Me too! Get some rest, we have a big day ahead." },
            { "type": "command", "action": "advanceDay", "value": 1 }
          ]
        },
        'taylor': {
          "day002": [
            { "type": "message", "sender": "taylor", "content": "Hey, is this the new intern?" },
            { "type": "message", "sender": "user", "content": "Yes, that's me! Who's this?" },
            { "type": "message", "sender": "taylor", "content": "I'm Taylor from HR. Welcome aboard!" },
            { "type": "message", "sender": "user", "content": "Thanks! Excited to be here." },
            { "type": "message", "sender": "taylor", "content": "Great! Let me know if you need anything." },
            { "type": "command", "action": "advanceDay", "value": 1 }
          ],
          "day004": [
            { "type": "message", "sender": "taylor", "content": "Hi there! How's your first week going?" },
            { "type": "message", "sender": "user", "content": "It's going well, thanks for asking!" },
            { "type": "message", "sender": "taylor", "content": "Glad to hear it! I wanted to check in and see if you have any questions." },
            { "type": "message", "sender": "user", "content": "Actually, I was wondering about the company benefits." },
            { "type": "message", "sender": "taylor", "content": "Of course! I'll send you a document with all the details." },
            { "type": "image", "sender": "taylor", "content": "benefits.jpg" },
            { "type": "unlock", "item": "wallpaper", "id": "benefits.jpg" },
            { "type": "message", "sender": "user", "content": "This is very helpful, thank you!" },
            { "type": "message", "sender": "taylor", "content": "You're welcome! Let me know if you need anything else. 😊" },
            { "type": "command", "action": "advanceDay", "value": 1 }
          ]
        }
      };

      setCharacters(initialCharacters);
      setScripts(scriptData);

      // Check for notifications
      checkForNewMessages(initialCharacters, scriptData, initialDate);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading game data:', err);
      setError('Failed to load game data. Please try again.');
      setIsLoading(false);
    }
  }, []);

  // Check for new messages whenever the game date changes
  useEffect(() => {
    if (!isLoading && !error) {
      checkForNewMessages(characters, scripts, gameDate);
    }
  }, [gameDate, isLoading, error, characters, scripts]);

  // Function to check for new messages based on the current game date
  const checkForNewMessages = useCallback((chars, scriptData, date) => {
    try {
      // Clear previous notifications
      clearNotifications();

      const currentDay = Math.floor((date - initialDate) / (1000 * 60 * 60 * 24)) + 1;
      const dayKey = `day${currentDay.toString().padStart(3, '0')}`;

      const updatedCharacters = chars.map(char => {
        // Only show characters whose first day has arrived
        if (currentDay >= char.firstDay) {
          const hasNewMessage = scriptData[char.id] && scriptData[char.id][dayKey];
          if (hasNewMessage) {
            // Add notification
            addNotification({
              characterId: char.id,
              message: `New message from ${char.name}`
            });

            // Process any unlock commands
            const dayMessages = scriptData[char.id][dayKey];
            const unlockCommands = dayMessages.filter(msg => msg.type === 'unlock' && msg.item === 'wallpaper');
            unlockCommands.forEach(cmd => {
              unlockWallpaper(cmd.id);
            });
          }
          return { ...char, hasNewMessages: hasNewMessage };
        }
        return char;
      });

      setCharacters(updatedCharacters);
    } catch (err) {
      console.error('Error checking for new messages:', err);
      setError('Failed to check for new messages. Please try again.');
    }
  }, [addNotification, clearNotifications, initialDate, unlockWallpaper]);

  // Function to advance the game day
  const advanceDay = useCallback((days = 1) => {
    try {
      setIsTransitioning(true);

      setTimeout(() => {
        setGameDate(prevDate => addDays(prevDate, days));
        setIsTransitioning(false);
      }, 1000);
    } catch (err) {
      console.error('Error advancing day:', err);
      setError('Failed to advance day. Please try again.');
      setIsTransitioning(false);
    }
  }, []);

  // Function to mark messages as read
  const markMessagesAsRead = useCallback((characterId) => {
    try {
      setCharacters(prev =>
        prev.map(char =>
          char.id === characterId
            ? { ...char, hasNewMessages: false }
            : char
        )
      );
    } catch (err) {
      console.error('Error marking messages as read:', err);
      setError('Failed to mark messages as read. Please try again.');
    }
  }, []);

  // Function to reset error state
  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameDate,
        characters,
        scripts,
        isTransitioning,
        isLoading,
        error,
        advanceDay,
        markMessagesAsRead,
        resetError
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
