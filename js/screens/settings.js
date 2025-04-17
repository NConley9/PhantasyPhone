/**
 * Settings Screen
 */

function createSettingsScreen() {
  const screen = document.createElement('div');
  screen.id = 'settings';
  screen.className = 'screen';
  
  // Back button
  const backButton = createBackButton('home');
  screen.appendChild(backButton);
  
  // Header
  const header = document.createElement('div');
  header.className = 'header';
  header.textContent = 'Settings';
  screen.appendChild(header);
  
  // Content
  const content = document.createElement('div');
  content.className = 'content';
  
  // Wallpaper section
  const wallpaperSection = document.createElement('div');
  wallpaperSection.className = 'settings-section';
  
  const wallpaperHeader = document.createElement('div');
  wallpaperHeader.className = 'settings-header';
  wallpaperHeader.textContent = 'Wallpaper';
  
  const wallpaperGrid = document.createElement('div');
  wallpaperGrid.className = 'wallpaper-grid';
  
  wallpapers.forEach(wallpaper => {
    const isUnlocked = gameState.unlockedWallpapers.includes(wallpaper.id);
    const isSelected = gameState.currentWallpaper === wallpaper.id;
    
    const wallpaperItem = document.createElement('div');
    wallpaperItem.className = `wallpaper-item ${isUnlocked ? 'unlocked' : 'locked'} ${isSelected ? 'selected' : ''}`;
    wallpaperItem.style.backgroundColor = wallpaper.color;
    
    if (isUnlocked) {
      wallpaperItem.addEventListener('click', () => {
        changeWallpaper(wallpaper.id);
        
        // Update selection
        document.querySelectorAll('.wallpaper-item').forEach(item => {
          item.classList.remove('selected');
        });
        wallpaperItem.classList.add('selected');
      });
    }
    
    const wallpaperName = document.createElement('div');
    wallpaperName.className = 'wallpaper-name';
    wallpaperName.textContent = wallpaper.name;
    
    wallpaperItem.appendChild(wallpaperName);
    
    if (!isUnlocked) {
      const wallpaperLock = document.createElement('div');
      wallpaperLock.className = 'wallpaper-lock';
      wallpaperLock.textContent = '🔒';
      wallpaperItem.appendChild(wallpaperLock);
    }
    
    wallpaperGrid.appendChild(wallpaperItem);
  });
  
  wallpaperSection.appendChild(wallpaperHeader);
  wallpaperSection.appendChild(wallpaperGrid);
  
  // Avatar section
  const avatarSection = document.createElement('div');
  avatarSection.className = 'settings-section';
  
  const avatarHeader = document.createElement('div');
  avatarHeader.className = 'settings-header';
  avatarHeader.textContent = 'Player Avatar';
  
  const avatarGrid = document.createElement('div');
  avatarGrid.className = 'avatar-grid';
  
  avatars.forEach(avatar => {
    const isSelected = gameState.playerAvatar === avatar.letter;
    
    const avatarItem = document.createElement('div');
    avatarItem.className = `avatar-item ${isSelected ? 'selected' : ''}`;
    avatarItem.textContent = avatar.letter;
    
    avatarItem.addEventListener('click', () => {
      changePlayerAvatar(avatar.id);
      
      // Update selection
      document.querySelectorAll('.avatar-item').forEach(item => {
        item.classList.remove('selected');
      });
      avatarItem.classList.add('selected');
    });
    
    avatarGrid.appendChild(avatarItem);
  });
  
  avatarSection.appendChild(avatarHeader);
  avatarSection.appendChild(avatarGrid);
  
  // Debug section
  const debugSection = document.createElement('div');
  debugSection.className = 'settings-section';
  
  const debugHeader = document.createElement('div');
  debugHeader.className = 'settings-header';
  debugHeader.textContent = 'Debug';
  
  const debugContent = document.createElement('div');
  debugContent.style.padding = '15px';
  
  const advanceDayButton = document.createElement('button');
  advanceDayButton.className = 'settings-button';
  advanceDayButton.textContent = 'Advance 1 Day';
  advanceDayButton.addEventListener('click', () => {
    advanceDay(1);
  });
  
  const advanceWeekButton = document.createElement('button');
  advanceWeekButton.className = 'settings-button';
  advanceWeekButton.textContent = 'Advance 1 Week';
  advanceWeekButton.addEventListener('click', () => {
    advanceDay(7);
  });
  
  debugContent.appendChild(advanceDayButton);
  debugContent.appendChild(advanceWeekButton);
  
  debugSection.appendChild(debugHeader);
  debugSection.appendChild(debugContent);
  
  content.appendChild(wallpaperSection);
  content.appendChild(avatarSection);
  content.appendChild(debugSection);
  
  screen.appendChild(content);
  
  return screen;
}

// Function called when navigating to this screen
function settingsOnNavigate() {
  // Update wallpaper selection
  document.querySelectorAll('.wallpaper-item').forEach(item => {
    item.classList.remove('selected');
  });
  
  const selectedWallpaper = document.querySelector(`.wallpaper-item:nth-child(${wallpapers.findIndex(w => w.id === gameState.currentWallpaper) + 1})`);
  if (selectedWallpaper) {
    selectedWallpaper.classList.add('selected');
  }
  
  // Update avatar selection
  document.querySelectorAll('.avatar-item').forEach(item => {
    item.classList.remove('selected');
  });
  
  const selectedAvatar = document.querySelector(`.avatar-item:nth-child(${avatars.findIndex(a => a.letter === gameState.playerAvatar) + 1})`);
  if (selectedAvatar) {
    selectedAvatar.classList.add('selected');
  }
}
