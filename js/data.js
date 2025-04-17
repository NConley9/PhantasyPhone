/**
 * Game data and state management
 */

// Game state
const gameState = {
  // Set initial date to May 10 of current year (Tuesday)
  gameDate: new Date(new Date().getFullYear(), 4, 10), // Month is 0-indexed (4 = May)
  characters: [
    {
      id: 'alex',
      name: 'Alex',
      avatar: 'A',
      firstDay: 1, // Day 1 (May 10)
      hasNewMessages: false
    },
    {
      id: 'taylor',
      name: 'Taylor',
      avatar: 'T',
      firstDay: 2, // Day 2 (May 11)
      hasNewMessages: false
    }
  ],
  scripts: {
    'alex': {
      'day001': [
        { type: 'message', sender: 'alex', content: 'Hey there! Just got your number from the group chat.' },
        { type: 'message', sender: 'user', content: 'Oh hi! Nice to meet you!' },
        { type: 'message', sender: 'alex', content: 'Same here! Looking forward to working together on the project. 😊' },
        { type: 'message', sender: 'user', content: 'Me too! When do we start?' },
        { type: 'message', sender: 'alex', content: 'Tomorrow! I\'ll send you the details.' }
      ],
      'day002': [
        { type: 'message', sender: 'alex', content: 'Good morning! Ready for our first day?' },
        { type: 'message', sender: 'user', content: 'Absolutely! What\'s the plan?' },
        { type: 'message', sender: 'alex', content: 'I\'ll send you a picture of our schedule.' },
        { type: 'image', sender: 'alex', content: 'schedule.jpg' },
        { type: 'unlock', item: 'wallpaper', id: 'schedule.jpg' },
        { type: 'message', sender: 'user', content: 'Thanks! This looks great.' },
        { type: 'message', sender: 'alex', content: 'No problem! Let\'s meet at the coffee shop at 9am.' },
        { type: 'message', sender: 'user', content: 'I\'ll be there!' },
        { type: 'command', action: 'advanceDay', value: 1 }
      ],
      'day003': [
        { type: 'message', sender: 'alex', content: 'Hey, how was your first day?' },
        { type: 'message', sender: 'user', content: 'It was great! I learned a lot.' },
        { type: 'message', sender: 'alex', content: 'Awesome! You\'re a quick learner.' },
        { type: 'message', sender: 'user', content: 'Thanks! I\'m excited for tomorrow.' },
        { type: 'message', sender: 'alex', content: 'Me too! Get some rest, we have a big day ahead.' },
        { type: 'command', action: 'advanceDay', value: 1 }
      ]
    },
    'taylor': {
      'day002': [
        { type: 'message', sender: 'taylor', content: 'Hey, is this the new intern?' },
        { type: 'message', sender: 'user', content: 'Yes, that\'s me! Who\'s this?' },
        { type: 'message', sender: 'taylor', content: 'I\'m Taylor from HR. Welcome aboard!' },
        { type: 'message', sender: 'user', content: 'Thanks! Excited to be here.' },
        { type: 'message', sender: 'taylor', content: 'Great! Let me know if you need anything.' }
      ],
      'day004': [
        { type: 'message', sender: 'taylor', content: 'Hi there! How\'s your first week going?' },
        { type: 'message', sender: 'user', content: 'It\'s going well, thanks for asking!' },
        { type: 'message', sender: 'taylor', content: 'Glad to hear it! I wanted to check in and see if you have any questions.' },
        { type: 'message', sender: 'user', content: 'Actually, I was wondering about the company benefits.' },
        { type: 'message', sender: 'taylor', content: 'Of course! I\'ll send you a document with all the details.' },
        { type: 'image', sender: 'taylor', content: 'benefits.jpg' },
        { type: 'unlock', item: 'wallpaper', id: 'benefits.jpg' },
        { type: 'message', sender: 'user', content: 'This is very helpful, thank you!' },
        { type: 'message', sender: 'taylor', content: 'You\'re welcome! Let me know if you need anything else. 😊' },
        { type: 'command', action: 'advanceDay', value: 1 }
      ]
    }
  },
  notifications: [],
  unlockedWallpapers: ['default.jpg'],
  currentWallpaper: 'default.jpg',
  playerAvatar: 'U',
  isTransitioning: false,
  notes: {
    'alex': `
      <h2>Alex</h2>
      <p>- Works in the tech department</p>
      <p>- Loves coffee</p>
      <p>- Has a dog named Max</p>
    `,
    'taylor': `
      <h2>Taylor</h2>
      <p>- Works in HR</p>
      <p>- Very friendly and helpful</p>
      <p>- New to the company</p>
    `
  }
};

// Wallpapers data
const wallpapers = [
  { id: 'default.jpg', name: 'Default', color: '#1e88e5' },
  { id: 'schedule.jpg', name: 'Schedule', color: '#43a047' },
  { id: 'benefits.jpg', name: 'Benefits', color: '#e53935' }
];

// Avatars data
const avatars = [
  { id: 'default-avatar.jpg', name: 'Default', letter: 'U' }
];

// App icons data
const appIcons = [
  { id: 'messages', name: 'Messages', icon: '💬', path: 'messages-home' },
  { id: 'notes', name: 'Notes', icon: '📝', path: 'notes-home' },
  { id: 'photogram', name: 'Photogram', icon: '📷', path: 'photogram' },
  { id: 'datematch', name: 'DateMatch', icon: '❤️', path: 'datematch' },
  { id: 'securecam', name: 'SecureCam', icon: '🔒', path: 'securecam' },
  { id: 'shopmart', name: 'ShopMart', icon: '🛒', path: 'shopmart' },
  { id: 'wallet', name: 'Wallet', icon: '💳', path: 'wallet' },
  { id: 'settings', name: 'Settings', icon: '⚙️', path: 'settings' }
];

// Function to calculate the current game day
function getCurrentDay() {
  const initialDate = new Date(gameState.gameDate.getFullYear(), 4, 10);
  return Math.floor((gameState.gameDate - initialDate) / (1000 * 60 * 60 * 24)) + 1;
}

// Function to get the day key for the current day
function getCurrentDayKey() {
  const currentDay = getCurrentDay();
  return `day${currentDay.toString().padStart(3, '0')}`;
}

// Function to check for new messages
function checkForNewMessages() {
  const currentDay = getCurrentDay();
  const dayKey = getCurrentDayKey();

  const newNotifications = [];
  const updatedCharacters = gameState.characters.map(char => {
    // Only show characters whose first day has arrived
    if (currentDay >= char.firstDay) {
      // Check if the character has messages for the current day
      const hasNewMessage = hardcodedScripts[char.id] && hardcodedScripts[char.id][dayKey];

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

  gameState.characters = updatedCharacters;
  gameState.notifications = newNotifications;

  // Show notifications
  newNotifications.forEach(notification => {
    showNotification(notification.message, () => {
      navigateTo('messages-chat', { characterId: notification.characterId });
    });
  });
}

// Function to advance the game day
function advanceDay(days = 1) {
  gameState.isTransitioning = true;

  // Add a fade effect to the screen
  const screenContainer = document.getElementById('screen-container');
  screenContainer.classList.add('fade-transition');

  setTimeout(() => {
    // Update the game date
    gameState.gameDate.setDate(gameState.gameDate.getDate() + days);

    // Remove the fade effect
    screenContainer.classList.remove('fade-transition');

    // Navigate back to home
    navigateTo('home');

    // Check for new messages
    checkForNewMessages();

    gameState.isTransitioning = false;
  }, 1000);
}

// Function to unlock a wallpaper
function unlockWallpaper(wallpaperId) {
  if (!gameState.unlockedWallpapers.includes(wallpaperId)) {
    gameState.unlockedWallpapers.push(wallpaperId);
  }
}

// Function to change the current wallpaper
function changeWallpaper(wallpaperId) {
  if (gameState.unlockedWallpapers.includes(wallpaperId)) {
    gameState.currentWallpaper = wallpaperId;

    // Update the phone container background
    updateWallpaper();
  }
}

// Function to update the wallpaper display
function updateWallpaper() {
  const phoneContainer = document.querySelector('.phone-container');
  const wallpaper = wallpapers.find(w => w.id === gameState.currentWallpaper);

  if (wallpaper) {
    phoneContainer.style.backgroundColor = wallpaper.color;
  }
}

// Function to change the player avatar
function changePlayerAvatar(avatarId) {
  const avatar = avatars.find(a => a.id === avatarId);
  if (avatar) {
    gameState.playerAvatar = avatar.letter;
  }
}

// Function to mark messages as read
function markMessagesAsRead(characterId) {
  gameState.characters = gameState.characters.map(char =>
    char.id === characterId
      ? { ...char, hasNewMessages: false }
      : char
  );
}
