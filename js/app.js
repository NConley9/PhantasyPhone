/**
 * Main application initialization
 */

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the status bar
  initStatusBar();

  // Create all screens
  const screenContainer = document.getElementById('screen-container');

  // Home screen
  screenContainer.appendChild(createHomeScreen());

  // Messages screens
  screenContainer.appendChild(createMessagesHomeScreen());
  screenContainer.appendChild(createMessagesChatScreen());

  // Notes screens
  screenContainer.appendChild(createNotesHomeScreen());
  screenContainer.appendChild(createNotesCharacterScreen());

  // Settings screen
  screenContainer.appendChild(createSettingsScreen());

  // Placeholder screens
  screenContainer.appendChild(createPlaceholderScreen('photogram', 'Photogram'));
  screenContainer.appendChild(createPlaceholderScreen('datematch', 'DateMatch'));
  screenContainer.appendChild(createPlaceholderScreen('securecam', 'SecureCam'));
  screenContainer.appendChild(createPlaceholderScreen('shopmart', 'ShopMart'));
  screenContainer.appendChild(createPlaceholderScreen('wallet', 'Wallet'));

  // Hide all screens except home
  document.querySelectorAll('.screen').forEach(screen => {
    if (screen.id !== 'home') {
      screen.classList.add('hidden');
    }
  });

  // Update wallpaper
  updateWallpaper();

  // Check for new messages
  checkForNewMessages();
});
