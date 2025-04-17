/**
 * Utility functions for the PhantasyPhone game
 */

// Format a date as a string
function formatDate(date, format) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const day = date.getDate();
  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  if (format === 'full') {
    return `${dayOfWeek}, ${month} ${day}`;
  } else if (format === 'day') {
    return day.toString();
  } else if (format === 'dayOfWeek') {
    return dayOfWeek;
  } else if (format === 'month') {
    return month;
  } else if (format === 'time') {
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} ${ampm}`;
  }

  return `${month} ${day}, ${year}`;
}

// Calculate the number of days between two dates
function daysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
  return diffDays;
}

// Parse a script file
function parseScript(scriptContent) {
  const scriptData = {};
  let currentDay = null;
  let currentDayMessages = [];

  // Split the script into lines
  const lines = scriptContent.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) continue;

    // Check for day marker
    if (line.match(/^\{day\d{3}\}$/)) {
      // If we were already processing a day, save it
      if (currentDay) {
        scriptData[currentDay] = currentDayMessages;
      }

      // Start a new day
      currentDay = line.replace(/[{}]/g, '');
      currentDayMessages = [];
      continue;
    }

    // Check for end marker
    if (line === '{end}') {
      continue;
    }

    // Check for advance day command
    if (line.match(/^\{advanceDay-\d+\}$/)) {
      const days = parseInt(line.match(/\d+/)[0]);
      currentDayMessages.push({ type: 'command', action: 'advanceDay', value: days });
      continue;
    }

    // Check for unlock wallpaper command
    if (line.match(/^\{unlockWallpaper .+\}$/)) {
      const wallpaperId = line.replace(/^\{unlockWallpaper (.+)\}$/, '$1');
      currentDayMessages.push({ type: 'unlock', item: 'wallpaper', id: wallpaperId });
      continue;
    }

    // Check for message
    if (line.match(/^<.+>/)) {
      const sender = line.replace(/^<(.+)>.*$/, '$1');
      const content = line.replace(/^<.+>(.*)$/, '$1');

      // Check if it's an image
      if (content.match(/^\[.+\]$/)) {
        const imageId = content.replace(/^\[(.+)\]$/, '$1');
        currentDayMessages.push({
          type: 'image',
          sender: sender === 'user' ? 'user' : sender,
          content: imageId
        });
      } else {
        currentDayMessages.push({
          type: 'message',
          sender: sender === 'user' ? 'user' : sender,
          content
        });
      }

      continue;
    }
  }

  // Save the last day if there is one
  if (currentDay) {
    scriptData[currentDay] = currentDayMessages;
  }

  return scriptData;
}

// Show a notification
function showNotification(message, onClick) {
  const notificationContainer = document.getElementById('notification-container');

  const notification = document.createElement('div');
  notification.className = 'notification';

  const title = document.createElement('div');
  title.className = 'notification-title';
  title.textContent = 'New Message';

  const content = document.createElement('div');
  content.className = 'notification-message';
  content.textContent = message;

  notification.appendChild(title);
  notification.appendChild(content);

  if (onClick) {
    notification.addEventListener('click', () => {
      onClick();
      notification.remove();
    });
  }

  notificationContainer.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Show the lightbox
function showLightbox(imageId) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');

  lightboxImage.textContent = `[Full Image: ${imageId}]`;
  lightbox.classList.remove('hidden');

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add('hidden');
    }
  });

  // Close lightbox when clicking the close button
  document.getElementById('lightbox-close').addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });
}

// Navigate to a screen
function navigateTo(screenId, params = {}) {
  // Hide all screens
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.add('hidden');
  });

  // Show the requested screen
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.remove('hidden');

    // Call the screen's onNavigate function if it exists
    if (window[`${screenId}OnNavigate`]) {
      window[`${screenId}OnNavigate`](params);
    }
  }
}

// Create a back button
function createBackButton(targetScreen) {
  const backButton = document.createElement('div');
  backButton.className = 'back-button';
  backButton.textContent = '←';

  backButton.addEventListener('click', () => {
    navigateTo(targetScreen);
  });

  return backButton;
}

// Update the status bar time
function updateStatusBarTime() {
  const statusTime = document.getElementById('status-time');
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');

  statusTime.textContent = `${hours}:${minutes}`;
}

// Initialize the status bar
function initStatusBar() {
  updateStatusBarTime();
  setInterval(updateStatusBarTime, 60000); // Update every minute
}

// Random delay between min and max seconds
function randomDelay(min, max) {
  console.log(`Setting up delay between ${min} and ${max} seconds`);
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
    console.log(`Delaying for ${delay/1000} seconds`);
    setTimeout(() => {
      console.log('Delay completed');
      resolve();
    }, delay);
  });
}

// Create a typing indicator element
function createTypingIndicator(character) {
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'typing-indicator';

  if (character) {
    const messageAvatar = document.createElement('div');
    messageAvatar.className = 'message-avatar';
    messageAvatar.textContent = character.avatar;
    typingIndicator.appendChild(messageAvatar);
  }

  const dots = document.createElement('div');
  dots.className = 'typing-indicator-dots';

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.className = 'typing-indicator-dot';
    dots.appendChild(dot);
  }

  typingIndicator.appendChild(dots);

  return typingIndicator;
}

// Create an offline message
function createOfflineMessage(characterName) {
  const offlineMessage = document.createElement('div');
  offlineMessage.className = 'offline-message';
  offlineMessage.textContent = `${characterName} has gone offline.`;
  return offlineMessage;
}
