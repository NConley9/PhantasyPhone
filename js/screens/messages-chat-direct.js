/**
 * Messages Chat Screen - Direct JSON Implementation
 */

// Global variables for chat state
let currentCharacterId = null;
let currentCharacter = null;
let currentDayMessages = [];
let currentMessageIndex = 0;
let waitingForUserInput = false;
let typingTimeoutId = null;

// Hardcoded script data (as a fallback)
const hardcodedScripts = {
  'alex': {
    'day001': [
      { type: 'message', sender: 'alex', content: 'Hey there! Just got your number from the group chat.' },
      { type: 'message', sender: 'user', content: 'Oh hi! Nice to meet you!' },
      { type: 'message', sender: 'alex', content: 'Same here! Looking forward to working together on the project. 😊' },
      { type: 'message', sender: 'user', content: 'Me too! When do we start?' },
      { type: 'message', sender: 'alex', content: 'Tomorrow! I\'ll send you the details.' },
      { type: 'command', action: 'advanceDay', value: 1 }
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
      { type: 'message', sender: 'taylor', content: 'Great! Let me know if you need anything.' },
      { type: 'command', action: 'advanceDay', value: 1 }
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
};

// Create the chat screen
function createMessagesChatScreen() {
  const screen = document.createElement('div');
  screen.id = 'messages-chat';
  screen.className = 'screen';

  // Back button
  const backButton = createBackButton('messages-home');
  screen.appendChild(backButton);

  // Header
  const header = document.createElement('div');
  header.className = 'header';
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.justifyContent = 'center';
  screen.appendChild(header);

  // Content
  const content = document.createElement('div');
  content.className = 'content';
  content.style.backgroundColor = '#f0f0f0';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';

  // Messages container
  const messagesContainer = document.createElement('div');
  messagesContainer.className = 'messages-container';
  messagesContainer.id = 'messages-container';
  console.log('Created messages container:', messagesContainer);

  // Message input
  const messageInput = document.createElement('div');
  messageInput.className = 'message-input';

  const messageInputField = document.createElement('div');
  messageInputField.className = 'message-input-field';
  messageInputField.textContent = '...';
  messageInputField.id = 'message-input-field';

  // Add click event for user input
  messageInputField.addEventListener('click', handleUserInputClick);

  messageInput.appendChild(messageInputField);

  content.appendChild(messagesContainer);
  content.appendChild(messageInput);

  screen.appendChild(content);

  return screen;
}

// Handle user input click
function handleUserInputClick() {
  console.log('Message input clicked, waitingForUserInput:', waitingForUserInput);
  if (waitingForUserInput) {
    waitingForUserInput = false;
    processUserMessages();
  }
}

// Create a message bubble
function createMessageBubble(message, character) {
  const isUser = message.sender === 'user';

  const messageElement = document.createElement('div');
  messageElement.className = `message ${isUser ? 'user-message' : 'character-message'}`;

  if (!isUser) {
    const messageAvatar = document.createElement('div');
    messageAvatar.className = 'message-avatar';
    messageAvatar.textContent = character.avatar;
    messageElement.appendChild(messageAvatar);
  }

  if (message.type === 'message') {
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';
    messageBubble.textContent = message.content;
    messageElement.appendChild(messageBubble);
  } else if (message.type === 'image') {
    const messageImage = document.createElement('div');
    messageImage.className = 'message-image';
    messageImage.addEventListener('click', () => {
      showLightbox(message.content);
    });

    const messageImageContent = document.createElement('div');
    messageImageContent.className = 'message-image-content';
    messageImageContent.textContent = `[Image: ${message.content}]`;

    messageImage.appendChild(messageImageContent);
    messageElement.appendChild(messageImage);
  }

  if (isUser) {
    const messageAvatar = document.createElement('div');
    messageAvatar.className = 'message-avatar';
    messageAvatar.textContent = gameState.playerAvatar;
    messageElement.appendChild(messageAvatar);
  }

  return messageElement;
}

// Create a day advance button
function createDayAdvanceButton(days) {
  const button = document.createElement('div');
  button.className = 'day-advance-button';
  button.textContent = 'Continue to next day';

  button.addEventListener('click', () => {
    advanceDay(days);
  });

  return button;
}

// Add a typing indicator
function addTypingIndicator() {
  const messagesContainer = document.getElementById('messages-container');

  // Create typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.id = 'typing-indicator';
  typingIndicator.className = 'typing-indicator';

  // Add character avatar
  const messageAvatar = document.createElement('div');
  messageAvatar.className = 'message-avatar';
  messageAvatar.textContent = currentCharacter.avatar;
  typingIndicator.appendChild(messageAvatar);

  // Add typing dots
  const dots = document.createElement('div');
  dots.className = 'typing-indicator-dots';

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.className = 'typing-indicator-dot';
    dots.appendChild(dot);
  }

  typingIndicator.appendChild(dots);
  messagesContainer.appendChild(typingIndicator);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  return typingIndicator;
}

// Remove typing indicator
function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

// Add a character message with typing indicator
function addCharacterMessage(message, delay = true) {
  return new Promise((resolve) => {
    const messagesContainer = document.getElementById('messages-container');
    console.log('Adding character message to container:', messagesContainer);

    if (!messagesContainer) {
      console.error('Messages container not found!');
      resolve();
      return;
    }

    if (delay) {
      // Add typing indicator
      addTypingIndicator();

      // Wait for 3-5 seconds
      const typingTime = Math.floor(Math.random() * 2000) + 3000;
      console.log(`Setting typing timeout for ${typingTime/1000} seconds`);

      typingTimeoutId = setTimeout(() => {
        // Remove typing indicator
        removeTypingIndicator();

        // Add the message
        const messageElement = createMessageBubble(message, currentCharacter);
        console.log('Created message element:', messageElement);

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        console.log('Added message to container');

        resolve();
      }, typingTime);
    } else {
      // Add the message immediately
      const messageElement = createMessageBubble(message, currentCharacter);
      console.log('Created message element (immediate):', messageElement);

      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      console.log('Added message to container (immediate)');

      resolve();
    }
  });
}

// Add a user message
function addUserMessage(message) {
  return new Promise((resolve) => {
    const messagesContainer = document.getElementById('messages-container');

    // Add the message
    const messageElement = createMessageBubble(message, currentCharacter);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Wait for 1-3 seconds
    const messageDelay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(resolve, messageDelay);
  });
}

// Add a command
function addCommand(message) {
  return new Promise((resolve) => {
    const messagesContainer = document.getElementById('messages-container');

    if (message.type === 'command' && message.action === 'advanceDay') {
      // Display day advance button
      const button = createDayAdvanceButton(message.value);
      messagesContainer.appendChild(button);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } else if (message.type === 'unlock' && message.item === 'wallpaper') {
      // Unlock wallpaper
      unlockWallpaper(message.id);
    }

    resolve();
  });
}

// Add offline message
function addOfflineMessage() {
  const messagesContainer = document.getElementById('messages-container');

  // Create offline message
  const offlineMessage = document.createElement('div');
  offlineMessage.className = 'offline-message';
  offlineMessage.textContent = `${currentCharacter.name} has gone offline.`;

  messagesContainer.appendChild(offlineMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Process character messages
async function processCharacterMessages() {
  console.log('Processing character messages, currentMessageIndex:', currentMessageIndex, 'total messages:', currentDayMessages.length);

  if (currentDayMessages.length === 0) {
    console.log('No messages to process');
    return;
  }

  while (currentMessageIndex < currentDayMessages.length) {
    const message = currentDayMessages[currentMessageIndex];
    console.log('Processing message:', message);

    // If we encounter a user message, wait for input
    if (message.sender === 'user') {
      console.log('User message encountered, waiting for input');
      waitingForUserInput = true;
      return;
    }

    // Process the current message
    if (message.type === 'message' || message.type === 'image') {
      // Add character message with typing indicator (except for the first message)
      console.log('Adding character message, delay:', currentMessageIndex > 0);
      await addCharacterMessage(message, currentMessageIndex > 0);
    } else {
      // Process command
      console.log('Processing command message');
      await addCommand(message);
    }

    // Move to the next message
    currentMessageIndex++;
    console.log('Moved to next message, index:', currentMessageIndex);

    // Add a small delay between messages
    if (currentMessageIndex < currentDayMessages.length) {
      console.log('Adding delay before next message');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // If we've reached the end of the conversation
  console.log('End of conversation reached, showing offline message');
  addOfflineMessage();
}

// Process user messages
async function processUserMessages() {
  while (currentMessageIndex < currentDayMessages.length &&
         currentDayMessages[currentMessageIndex].sender === 'user') {

    const message = currentDayMessages[currentMessageIndex];

    // Add user message
    await addUserMessage(message);

    // Move to the next message
    currentMessageIndex++;
  }

  // Continue with character messages
  processCharacterMessages();
}

// Get messages for a character up to the current day
function getMessagesForCharacter(characterId, currentDay) {
  console.log('Getting messages for character:', characterId, 'up to day:', currentDay);

  // First try to get messages from gameState.scripts
  const script = gameState.scripts[characterId] || {};
  console.log('Script from gameState:', script);

  // If that fails, fall back to hardcodedScripts
  const fallbackScript = hardcodedScripts[characterId] || {};
  console.log('Fallback script:', fallbackScript);

  const allMessages = [];

  for (let day = 1; day <= currentDay; day++) {
    const dayKey = `day${day.toString().padStart(3, '0')}`;
    console.log('Checking for messages on day:', dayKey);

    if (script[dayKey]) {
      console.log('Found messages in gameState for day', dayKey, ':', script[dayKey]);
      allMessages.push(...script[dayKey]);
    } else if (fallbackScript[dayKey]) {
      console.log('Found messages in fallback for day', dayKey, ':', fallbackScript[dayKey]);
      allMessages.push(...fallbackScript[dayKey]);
    } else {
      console.log('No messages found for day', dayKey);
    }
  }

  console.log('Total messages loaded:', allMessages.length);
  return allMessages;
}

// Function called when navigating to this screen
function messagesChatOnNavigate(params) {
  console.log('messagesChatOnNavigate called with params:', params);

  // Clear any existing timeouts
  if (typingTimeoutId) {
    clearTimeout(typingTimeoutId);
    typingTimeoutId = null;
  }

  if (!params || !params.characterId) {
    console.log('No characterId provided, navigating back to messages-home');
    navigateTo('messages-home');
    return;
  }

  // Reset state
  currentCharacterId = params.characterId;
  console.log('Setting currentCharacterId:', currentCharacterId);

  currentCharacter = gameState.characters.find(c => c.id === currentCharacterId);
  console.log('Found character:', currentCharacter);

  currentDayMessages = [];
  currentMessageIndex = 0;
  waitingForUserInput = false;
  console.log('Reset state variables');

  if (!currentCharacter) {
    console.log('Character not found, navigating back to messages-home');
    navigateTo('messages-home');
    return;
  }

  // Mark messages as read
  markMessagesAsRead(currentCharacterId);
  console.log('Marked messages as read');

  // Update header
  const header = document.querySelector('#messages-chat .header');
  header.innerHTML = '';

  const characterAvatar = document.createElement('div');
  characterAvatar.className = 'character-avatar';
  characterAvatar.style.width = '30px';
  characterAvatar.style.height = '30px';
  characterAvatar.style.borderRadius = '15px';
  characterAvatar.style.marginRight = '10px';
  characterAvatar.textContent = currentCharacter.avatar;

  const characterName = document.createElement('div');
  characterName.textContent = currentCharacter.name;

  header.appendChild(characterAvatar);
  header.appendChild(characterName);
  console.log('Updated header with character info');

  // Clear messages container
  const messagesContainer = document.getElementById('messages-container');
  if (messagesContainer) {
    messagesContainer.innerHTML = '';
    console.log('Cleared messages container');
  } else {
    console.error('Messages container not found! This is a critical error.');

    // Try to find the content element and recreate the messages container
    const content = document.querySelector('#messages-chat .content');
    if (content) {
      console.log('Found content element, recreating messages container');

      // Remove all children from content
      while (content.firstChild) {
        content.removeChild(content.firstChild);
      }

      // Create a new messages container
      const newMessagesContainer = document.createElement('div');
      newMessagesContainer.className = 'messages-container';
      newMessagesContainer.id = 'messages-container';
      content.appendChild(newMessagesContainer);

      // Create a new message input
      const messageInput = document.createElement('div');
      messageInput.className = 'message-input';

      const messageInputField = document.createElement('div');
      messageInputField.className = 'message-input-field';
      messageInputField.textContent = '...';
      messageInputField.id = 'message-input-field';

      // Add click event for user input
      messageInputField.addEventListener('click', handleUserInputClick);

      messageInput.appendChild(messageInputField);
      content.appendChild(messageInput);

      console.log('Recreated messages container and input');
    } else {
      console.error('Content element not found! Cannot proceed.');
      return;
    }
  }

  // Load messages for this character
  const currentDay = getCurrentDay();
  console.log('Current game day:', currentDay);

  // Get messages directly from hardcoded scripts
  currentDayMessages = getMessagesForCharacter(currentCharacterId, currentDay);
  console.log('Loaded messages:', currentDayMessages);

  // Start displaying messages
  if (currentDayMessages.length > 0) {
    console.log('Starting to display messages, count:', currentDayMessages.length);

    // Display the first message immediately without delay
    if (currentDayMessages[0].sender !== 'user') {
      console.log('First message is from character, displaying immediately');
      const messagesContainer = document.getElementById('messages-container');

      if (messagesContainer) {
        const message = currentDayMessages[0];
        const messageElement = createMessageBubble(message, currentCharacter);
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Move to the next message
        currentMessageIndex = 1;

        // Process the rest of the messages after a short delay
        setTimeout(() => {
          console.log('Processing remaining messages');
          processCharacterMessages();
        }, 500);
      } else {
        console.error('Messages container still not found after recreation attempt!');
      }
    } else {
      // If the first message is from the user, wait for input
      console.log('First message is from user, waiting for input');
      waitingForUserInput = true;
    }
  } else {
    console.log('No messages to display');
  }
}
