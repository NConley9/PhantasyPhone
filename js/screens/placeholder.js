/**
 * Placeholder Screen
 */

function createPlaceholderScreen(id, title) {
  const screen = document.createElement('div');
  screen.id = id;
  screen.className = 'screen';
  
  // Back button
  const backButton = createBackButton('home');
  screen.appendChild(backButton);
  
  // Header
  const header = document.createElement('div');
  header.className = 'header';
  header.textContent = title;
  screen.appendChild(header);
  
  // Content
  const content = document.createElement('div');
  content.className = 'content placeholder-content';
  
  const icon = document.createElement('div');
  icon.className = 'placeholder-icon';
  icon.textContent = '🚧';
  
  const placeholderTitle = document.createElement('div');
  placeholderTitle.className = 'placeholder-title';
  placeholderTitle.textContent = 'Under Construction';
  
  const message = document.createElement('div');
  message.className = 'placeholder-message';
  message.textContent = 'This feature is coming soon. Check back later!';
  
  content.appendChild(icon);
  content.appendChild(placeholderTitle);
  content.appendChild(message);
  
  screen.appendChild(content);
  
  return screen;
}
