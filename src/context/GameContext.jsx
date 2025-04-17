import React, { createContext, useState, useEffect } from 'react';
import { format, addDays, parseISO } from 'date-fns';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // Set initial date to May 10 of current year
  const currentYear = new Date().getFullYear();
  const initialDate = new Date(currentYear, 4, 10); // Month is 0-indexed (4 = May)
  
  // Game state
  const [gameDate, setGameDate] = useState(initialDate);
  const [characters, setCharacters] = useState([]);
  const [scripts, setScripts] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [unlockedWallpapers, setUnlockedWallpapers] = useState(['default.jpg']);
  const [currentWallpaper, setCurrentWallpaper] = useState('default.jpg');
  const [playerAvatar, setPlayerAvatar] = useState('default-avatar.jpg');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Load initial game data
  useEffect(() => {
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
    
    setCharacters(initialCharacters);
    
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
    
    setScripts(scriptData);
    
    // Check for notifications
    checkForNotifications(initialCharacters, scriptData, initialDate);
  }, []);
  
  // Check for new messages whenever the game date changes
  useEffect(() => {
    checkForNotifications(characters, scripts, gameDate);
  }, [gameDate]);
  
  // Function to check for new messages based on the current game date
  const checkForNotifications = (chars, scriptData, date) => {
    const currentDay = Math.floor((date - initialDate) / (1000 * 60 * 60 * 24)) + 1;
    const dayKey = `day${currentDay.toString().padStart(3, '0')}`;
    
    const newNotifications = [];
    const updatedCharacters = chars.map(char => {
      // Only show characters whose first day has arrived
      if (currentDay >= char.firstDay) {
        const hasNewMessage = scriptData[char.id] && scriptData[char.id][dayKey];
        if (hasNewMessage) {
          newNotifications.push({
            id: Date.now() + Math.random(),
            characterId: char.id,
            message: `New message from ${char.name}`
          });
        }
        return { ...char, hasNewMessages: hasNewMessage };
      }
      return char;
    });
    
    setCharacters(updatedCharacters);
    setNotifications(newNotifications);
  };
  
  // Function to advance the game day
  const advanceDay = (days = 1) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setGameDate(prevDate => addDays(prevDate, days));
      setIsTransitioning(false);
    }, 1000);
  };
  
  // Function to unlock a wallpaper
  const unlockWallpaper = (wallpaperId) => {
    if (!unlockedWallpapers.includes(wallpaperId)) {
      setUnlockedWallpapers(prev => [...prev, wallpaperId]);
    }
  };
  
  // Function to change the current wallpaper
  const changeWallpaper = (wallpaperId) => {
    if (unlockedWallpapers.includes(wallpaperId)) {
      setCurrentWallpaper(wallpaperId);
    }
  };
  
  // Function to change the player avatar
  const changePlayerAvatar = (avatarId) => {
    setPlayerAvatar(avatarId);
  };
  
  // Function to mark messages as read
  const markMessagesAsRead = (characterId) => {
    setCharacters(prev => 
      prev.map(char => 
        char.id === characterId 
          ? { ...char, hasNewMessages: false } 
          : char
      )
    );
  };
  
  return (
    <GameContext.Provider
      value={{
        gameDate,
        characters,
        scripts,
        notifications,
        unlockedWallpapers,
        currentWallpaper,
        playerAvatar,
        isTransitioning,
        advanceDay,
        unlockWallpaper,
        changeWallpaper,
        changePlayerAvatar,
        markMessagesAsRead
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
