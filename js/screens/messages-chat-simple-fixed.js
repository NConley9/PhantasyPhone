/**
 * Messages Chat Screen - Simplified Fixed Version
 */

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

  // Message input
  const messageInput = document.createElement('div');
  messageInput.className = 'message-input';

  const messageInputField = document.createElement('div');
  messageInputField.className = 'message-input-field';
  messageInputField.textContent = '...';

  // Add click event for user input
  messageInputField.addEventListener('click', () => {
    handleUserInput();
  });

  messageInput.appendChild(messageInputField);

  content.appendChild(messagesContainer);
  content.appendChild(messageInput);

  screen.appendChild(content);

  return screen;
}

// Global variables for chat state
let currentCharacterId = null;
let currentCharacter = null;
let currentMessages = [];
let currentMessageIndex = 0;
let waitingForUserInput = false;
let typingIndicator = null;
let typingTimeout = null;

// Function called when navigating to this screen
function messagesChatOnNavigate(params) {
  console.log('Navigating to messages-chat with params:', params);

  // Clear any existing timeouts
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }

  if (!params || !params.characterId) {
    console.error('No character ID provided');
    navigateTo('messages-home');
    return;
  }

  // Get character info
  currentCharacterId = params.characterId;
  currentCharacter = gameState.characters.find(c => c.id === currentCharacterId);

  if (!currentCharacter) {
    console.error('Character not found:', currentCharacterId);
    navigateTo('messages-home');
    return;
  }

  console.log('Character found:', currentCharacter);

  // Mark messages as read
  markMessagesAsRead(currentCharacterId);

  // Update header
  updateHeader(currentCharacter);

  // Clear messages container
  const messagesContainer = document.querySelector('#messages-chat .messages-container');
  if (messagesContainer) {
    messagesContainer.innerHTML = '';
    console.log('Cleared messages container');
  } else {
    console.error('Messages container not found');

    // Debug: Check if the screen exists
    const screen = document.getElementById('messages-chat');
    console.log('Messages chat screen exists:', !!screen);

    if (screen) {
      // Try to find the content element
      const content = screen.querySelector('.content');
      console.log('Content element exists:', !!content);

      if (content) {
        // Create a new messages container
        const newMessagesContainer = document.createElement('div');
        newMessagesContainer.className = 'messages-container';
        content.appendChild(newMessagesContainer);
        console.log('Created new messages container');
      }
    }

    return;
  }

  // Reset state
  currentMessageIndex = 0;
  waitingForUserInput = false;

  // Load messages
  loadMessages(currentCharacterId);

  // Debug: Force display a test message
  const testMessage = {
    type: 'message',
    sender: 'alex',
    content: 'This is a test message to verify rendering.'
  };

  setTimeout(() => {
    const messageElement = createMessageElement(testMessage);
    messagesContainer.appendChild(messageElement);
    console.log('Added test message to container');
  }, 1000);
}

// Update the header with character info
function updateHeader(character) {
  const header = document.querySelector('#messages-chat .header');
  if (!header) return;

  header.innerHTML = '';

  const characterAvatar = document.createElement('div');
  characterAvatar.className = 'character-avatar';
  characterAvatar.style.width = '30px';
  characterAvatar.style.height = '30px';
  characterAvatar.style.borderRadius = '15px';
  characterAvatar.style.marginRight = '10px';
  characterAvatar.textContent = character.avatar;

  const characterName = document.createElement('div');
  characterName.textContent = character.name;

  header.appendChild(characterAvatar);
  header.appendChild(characterName);
}

// Load messages for the current character
function loadMessages(characterId) {
  const currentDay = getCurrentDay();
  console.log('Loading messages for day:', currentDay);

  // Get all messages up to the current day
  currentMessages = [];

  console.log('gameState.scripts:', gameState.scripts);
  console.log('characterId:', characterId);

  if (!gameState.scripts[characterId]) {
    console.error('No scripts found for character:', characterId);

    // Debug: Add hardcoded messages for testing
    currentMessages = [
      { type: 'message', sender: characterId, content: 'This is a hardcoded test message.' },
      { type: 'message', sender: 'user', content: 'This is a hardcoded user response.' },
      { type: 'message', sender: characterId, content: 'Thanks for responding!' }
    ];
  } else {
    for (let day = 1; day <= currentDay; day++) {
      const dayKey = `day${day.toString().padStart(3, '0')}`;
      console.log('Checking for messages on day:', dayKey);

      if (gameState.scripts[characterId][dayKey]) {
        console.log('Found messages for day:', dayKey, gameState.scripts[characterId][dayKey]);
        currentMessages = currentMessages.concat(gameState.scripts[characterId][dayKey]);
      } else {
        console.log('No messages found for day:', dayKey);
      }
    }
  }

  console.log('Loaded messages:', currentMessages);

  // Display the first message immediately
  if (currentMessages.length > 0) {
    console.log('Displaying first message');
    displayFirstMessage();
  } else {
    console.log('No messages to display');

    // Debug: Add a fallback message
    const messagesContainer = document.querySelector('#messages-chat .messages-container');
    if (messagesContainer) {
      const fallbackMessage = document.createElement('div');
      fallbackMessage.className = 'offline-message';
      fallbackMessage.textContent = 'No messages available.';
      messagesContainer.appendChild(fallbackMessage);
      console.log('Added fallback message');
    }
  }
}

// Display the first message immediately
function displayFirstMessage() {
  console.log('displayFirstMessage called');

  if (currentMessages.length === 0) {
    console.error('No messages to display');
    return;
  }

  const firstMessage = currentMessages[0];
  console.log('First message:', firstMessage);

  if (firstMessage.sender === 'user') {
    console.log('First message is from user, waiting for input');
    // If the first message is from the user, wait for input
    waitingForUserInput = true;
    return;
  }

  // Display the first message immediately
  const messagesContainer = document.querySelector('#messages-chat .messages-container');
  if (!messagesContainer) {
    console.error('Messages container not found in displayFirstMessage');

    // Try to find the screen and create a messages container
    const screen = document.getElementById('messages-chat');
    if (screen) {
      const content = screen.querySelector('.content');
      if (content) {
        const newMessagesContainer = document.createElement('div');
        newMessagesContainer.className = 'messages-container';
        content.appendChild(newMessagesContainer);
        console.log('Created new messages container in displayFirstMessage');

        // Try again with the new container
        const messageElement = createMessageElement(firstMessage);
        newMessagesContainer.appendChild(messageElement);
        newMessagesContainer.scrollTop = newMessagesContainer.scrollHeight;
        console.log('Added message to new container');

        // Move to the next message
        currentMessageIndex = 1;

        // Process the next message after a delay
        setTimeout(() => {
          processNextMessage();
        }, 1000);
      }
    }

    return;
  }

  console.log('Creating message element for first message');
  const messageElement = createMessageElement(firstMessage);
  console.log('Created message element:', messageElement);

  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  console.log('Added message to container');

  // Move to the next message
  currentMessageIndex = 1;

  // Process the next message after a delay
  setTimeout(() => {
    processNextMessage();
  }, 1000);
}

// Create a message element
function createMessageElement(message) {
  const isUser = message.sender === 'user';

  const messageElement = document.createElement('div');
  messageElement.className = `message ${isUser ? 'user-message' : 'character-message'}`;

  if (!isUser) {
    const messageAvatar = document.createElement('div');
    messageAvatar.className = 'message-avatar';
    messageAvatar.textContent = currentCharacter.avatar;
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

// Process the next message
function processNextMessage() {
  if (currentMessageIndex >= currentMessages.length) {
    // End of conversation
    showOfflineMessage();
    return;
  }

  const message = currentMessages[currentMessageIndex];

  if (message.sender === 'user') {
    // Wait for user input
    waitingForUserInput = true;
    return;
  }

  // Show typing indicator for character messages
  showTypingIndicator();
}

// Show typing indicator
function showTypingIndicator() {
  const messagesContainer = document.querySelector('#messages-chat .messages-container');
  if (!messagesContainer) return;

  // Create typing indicator
  typingIndicator = document.createElement('div');
  typingIndicator.className = 'typing-indicator';

  const messageAvatar = document.createElement('div');
  messageAvatar.className = 'message-avatar';
  messageAvatar.textContent = currentCharacter.avatar;
  typingIndicator.appendChild(messageAvatar);

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

  // Show typing indicator for 3-5 seconds
  const typingTime = Math.floor(Math.random() * 2000) + 3000;

  typingTimeout = setTimeout(() => {
    // Remove typing indicator
    if (typingIndicator && typingIndicator.parentNode) {
      typingIndicator.remove();
    }

    // Display the message
    displayCurrentMessage();
  }, typingTime);
}

// Display the current message
function displayCurrentMessage() {
  if (currentMessageIndex >= currentMessages.length) return;

  const message = currentMessages[currentMessageIndex];
  const messagesContainer = document.querySelector('#messages-chat .messages-container');
  if (!messagesContainer) return;

  if (message.type === 'message' || message.type === 'image') {
    // Display the message
    const messageElement = createMessageElement(message);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } else if (message.type === 'command' && message.action === 'advanceDay') {
    // Display day advance button
    const button = createDayAdvanceButton(message.value);
    messagesContainer.appendChild(button);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } else if (message.type === 'unlock' && message.item === 'wallpaper') {
    // Unlock wallpaper
    unlockWallpaper(message.id);
  }

  // Move to the next message
  currentMessageIndex++;

  // Process the next message after a delay
  setTimeout(() => {
    processNextMessage();
  }, 1000);
}

// Create a day advance button
function createDayAdvanceButton(days) {
  const button = document.createElement('div');
  button.className = 'day-advance-button';
  button.textContent = 'Continue to next day';
  button.style.padding = '10px';
  button.style.backgroundColor = 'var(--primary-color)';
  button.style.color = 'white';
  button.style.borderRadius = '5px';
  button.style.textAlign = 'center';
  button.style.margin = '10px 0';
  button.style.cursor = 'pointer';

  button.addEventListener('click', () => {
    advanceDay(days);
  });

  return button;
}

// Show offline message
function showOfflineMessage() {
  const messagesContainer = document.querySelector('#messages-chat .messages-container');
  if (!messagesContainer) return;

  const offlineMessage = document.createElement('div');
  offlineMessage.className = 'offline-message';
  offlineMessage.textContent = `${currentCharacter.name} has gone offline.`;
  offlineMessage.style.textAlign = 'center';
  offlineMessage.style.padding = '10px';
  offlineMessage.style.color = 'var(--dark-gray)';

  messagesContainer.appendChild(offlineMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Handle user input
function handleUserInput() {
  if (!waitingForUserInput) return;

  waitingForUserInput = false;

  // Display all consecutive user messages
  let hasDisplayedUserMessage = false;

  while (
    currentMessageIndex < currentMessages.length &&
    currentMessages[currentMessageIndex].sender === 'user'
  ) {
    const message = currentMessages[currentMessageIndex];
    const messagesContainer = document.querySelector('#messages-chat .messages-container');
    if (!messagesContainer) return;

    // Display the message
    const messageElement = createMessageElement(message);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Move to the next message
    currentMessageIndex++;
    hasDisplayedUserMessage = true;
  }

  if (hasDisplayedUserMessage) {
    // Process the next message after a delay
    setTimeout(() => {
      processNextMessage();
    }, 1000);
  }
}
