/**
 * Messages Chat Screen
 */

// Global variables for chat state
let currentCharacterId = null;
let currentCharacter = null;
let currentDayMessages = [];
let currentMessageIndex = 0;
let waitingForUserInput = false;
let isTyping = false;

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
    displayUserMessages();
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

// Display a typing indicator
function displayTypingIndicator() {
  console.log('displayTypingIndicator called, isTyping:', isTyping);
  if (isTyping) {
    console.log('Already typing, returning');
    return;
  }

  isTyping = true;
  console.log('Setting isTyping to true');
  const messagesContainer = document.querySelector('#messages-chat .messages-container');
  console.log('Messages container:', messagesContainer);

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
  console.log('Added typing indicator to messages container');

  // Set a timeout to remove the typing indicator and display the message
  const typingTime = Math.floor(Math.random() * 3000) + 3000; // 3-6 seconds
  console.log('Typing for', typingTime / 1000, 'seconds');
  setTimeout(() => {
    console.log('Typing timeout completed');
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      console.log('Removing typing indicator');
      indicator.remove();
    } else {
      console.log('Typing indicator not found');
    }
    isTyping = false;
    console.log('Setting isTyping to false');
    displayNextMessage();
  }, typingTime);
}

// Display the next message
function displayNextMessage() {
  console.log('displayNextMessage called, currentMessageIndex:', currentMessageIndex, 'total messages:', currentDayMessages.length);

  if (currentMessageIndex >= currentDayMessages.length) {
    console.log('End of conversation reached');
    // End of conversation
    displayOfflineMessage();
    return;
  }

  const message = currentDayMessages[currentMessageIndex];
  console.log('Current message:', message);
  const messagesContainer = document.querySelector('#messages-chat .messages-container');
  console.log('Messages container:', messagesContainer);

  // Handle different message types
  if (message.type === 'message' || message.type === 'image') {
    if (message.sender === 'user') {
      console.log('User message, waiting for input');
      // If it's a user message, wait for input
      waitingForUserInput = true;
      return;
    } else {
      console.log('Character message, displaying');
      // If it's a character message, display it
      const messageElement = createMessageBubble(message, currentCharacter);
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      console.log('Added message to container');

      // Move to the next message after a delay
      currentMessageIndex++;
      const messageDelay = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
      console.log('Waiting', messageDelay / 1000, 'seconds before next message');

      setTimeout(() => {
        console.log('Message delay completed');
        if (currentMessageIndex < currentDayMessages.length) {
          const nextMessage = currentDayMessages[currentMessageIndex];
          console.log('Next message:', nextMessage);
          if (nextMessage.sender !== 'user') {
            console.log('Next message is from character, showing typing indicator');
            displayTypingIndicator();
          } else {
            console.log('Next message is from user, continuing');
            displayNextMessage();
          }
        } else {
          console.log('No more messages, showing offline message');
          displayOfflineMessage();
        }
      }, messageDelay);
    }
  } else if (message.type === 'command' && message.action === 'advanceDay') {
    console.log('Command: advanceDay', message.value);
    // Display day advance button
    const button = createDayAdvanceButton(message.value);
    messagesContainer.appendChild(button);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    currentMessageIndex++;
  } else if (message.type === 'unlock' && message.item === 'wallpaper') {
    console.log('Command: unlockWallpaper', message.id);
    // Unlock wallpaper
    unlockWallpaper(message.id);
    currentMessageIndex++;
    displayNextMessage(); // Continue to next message
  } else {
    console.log('Unknown message type, skipping');
    // Skip unknown message types
    currentMessageIndex++;
    displayNextMessage();
  }
}

// Display user messages
function displayUserMessages() {
  if (currentMessageIndex >= currentDayMessages.length) return;

  const message = currentDayMessages[currentMessageIndex];
  if (message.sender !== 'user') return;

  const messagesContainer = document.querySelector('#messages-chat .messages-container');

  // Display the user message
  const messageElement = createMessageBubble(message, currentCharacter);
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Move to the next message
  currentMessageIndex++;

  // Check if there are more consecutive user messages
  setTimeout(() => {
    if (currentMessageIndex < currentDayMessages.length) {
      const nextMessage = currentDayMessages[currentMessageIndex];
      if (nextMessage.sender === 'user') {
        // If next message is also from user, display it after a delay
        setTimeout(displayUserMessages, Math.floor(Math.random() * 2000) + 1000);
      } else {
        // If next message is from character, show typing indicator
        displayTypingIndicator();
      }
    } else {
      displayOfflineMessage();
    }
  }, 500);
}

// Display offline message
function displayOfflineMessage() {
  const messagesContainer = document.querySelector('#messages-chat .messages-container');

  // Create offline message
  const offlineMessage = document.createElement('div');
  offlineMessage.className = 'offline-message';
  offlineMessage.textContent = `${currentCharacter.name} has gone offline.`;

  messagesContainer.appendChild(offlineMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function called when navigating to this screen
function messagesChatOnNavigate(params) {
  console.log('messagesChatOnNavigate called with params:', params);

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
  isTyping = false;
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
  const messagesContainer = document.querySelector('#messages-chat .messages-container');
  messagesContainer.innerHTML = '';
  console.log('Cleared messages container');

  // Load messages for this character
  const currentDay = getCurrentDay();
  console.log('Current game day:', currentDay);

  // Collect all messages up to the current day
  for (let day = 1; day <= currentDay; day++) {
    const dayKey = `day${day.toString().padStart(3, '0')}`;
    console.log('Checking for messages on day:', dayKey);

    if (gameState.scripts[currentCharacterId] && gameState.scripts[currentCharacterId][dayKey]) {
      console.log('Found messages for day', dayKey, ':', gameState.scripts[currentCharacterId][dayKey]);
      currentDayMessages.push(...gameState.scripts[currentCharacterId][dayKey]);
    } else {
      console.log('No messages found for day', dayKey);
    }
  }

  console.log('Total messages loaded:', currentDayMessages.length);
  console.log('Current day messages:', currentDayMessages);
  console.log('Character scripts:', gameState.scripts[currentCharacterId]);

  // Start displaying messages
  if (currentDayMessages.length > 0) {
    console.log('Starting to display messages');
    // Start with the first character message
    setTimeout(() => {
      console.log('Initial timeout completed, displaying typing indicator');
      displayTypingIndicator();
    }, 500);
  } else {
    console.log('No messages to display');
  }
}
