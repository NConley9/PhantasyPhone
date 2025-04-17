/**
 * Home Screen
 */

function createHomeScreen() {
  const screen = document.createElement('div');
  screen.id = 'home';
  screen.className = 'screen';
  
  // Date widget
  const dateWidget = document.createElement('div');
  dateWidget.className = 'date-widget';
  
  const dateDay = document.createElement('div');
  dateDay.className = 'date-day';
  dateDay.style.fontSize = '48px';
  dateDay.style.fontWeight = 'bold';
  dateDay.textContent = formatDate(gameState.gameDate, 'day');
  
  const dateMonth = document.createElement('div');
  dateMonth.className = 'date-month';
  dateMonth.style.fontSize = '24px';
  dateMonth.textContent = formatDate(gameState.gameDate, 'full');
  
  const dateWeather = document.createElement('div');
  dateWeather.className = 'date-weather';
  dateWeather.style.fontSize = '36px';
  dateWeather.style.marginTop = '10px';
  dateWeather.textContent = '☀️ 72°';
  
  dateWidget.appendChild(dateDay);
  dateWidget.appendChild(dateMonth);
  dateWidget.appendChild(dateWeather);
  
  // App grid
  const appGrid = document.createElement('div');
  appGrid.className = 'app-grid';
  
  appIcons.forEach(app => {
    const appIcon = document.createElement('div');
    appIcon.className = 'app-icon';
    appIcon.addEventListener('click', () => {
      navigateTo(app.path);
    });
    
    const appIconImage = document.createElement('div');
    appIconImage.className = 'app-icon-image';
    appIconImage.textContent = app.icon;
    
    // Add badge for messages if there are new messages
    if (app.id === 'messages' && gameState.characters.some(char => char.hasNewMessages)) {
      const badge = document.createElement('div');
      badge.className = 'app-icon-badge';
      appIconImage.appendChild(badge);
    }
    
    const appIconName = document.createElement('div');
    appIconName.className = 'app-icon-name';
    appIconName.textContent = app.name;
    
    appIcon.appendChild(appIconImage);
    appIcon.appendChild(appIconName);
    
    appGrid.appendChild(appIcon);
  });
  
  screen.appendChild(dateWidget);
  screen.appendChild(appGrid);
  
  return screen;
}

// Function called when navigating to this screen
function homeOnNavigate() {
  // Update the date display
  const dateDay = document.querySelector('.date-day');
  const dateMonth = document.querySelector('.date-month');
  
  if (dateDay && dateMonth) {
    dateDay.textContent = formatDate(gameState.gameDate, 'day');
    dateMonth.textContent = formatDate(gameState.gameDate, 'full');
  }
  
  // Update app badges
  const messagesApp = document.querySelector('.app-icon:nth-child(1) .app-icon-image');
  if (messagesApp) {
    // Remove existing badge if any
    const existingBadge = messagesApp.querySelector('.app-icon-badge');
    if (existingBadge) {
      existingBadge.remove();
    }
    
    // Add badge if there are new messages
    if (gameState.characters.some(char => char.hasNewMessages)) {
      const badge = document.createElement('div');
      badge.className = 'app-icon-badge';
      messagesApp.appendChild(badge);
    }
  }
  
  // Update wallpaper
  updateWallpaper();
}
