/**
 * Messages Home Screen
 */

function createMessagesHomeScreen() {
  const screen = document.createElement('div');
  screen.id = 'messages-home';
  screen.className = 'screen';
  
  // Back button
  const backButton = createBackButton('home');
  screen.appendChild(backButton);
  
  // Header
  const header = document.createElement('div');
  header.className = 'header';
  header.textContent = 'Messages';
  screen.appendChild(header);
  
  // Content
  const content = document.createElement('div');
  content.className = 'content';
  
  // Character list
  const characterList = document.createElement('div');
  characterList.className = 'character-list';
  
  // Filter characters that should be visible (their first day has arrived)
  const currentDay = getCurrentDay();
  const visibleCharacters = gameState.characters.filter(char => currentDay >= char.firstDay);
  
  // Sort characters: those with new messages first, then alphabetically
  const sortedCharacters = [...visibleCharacters].sort((a, b) => {
    if (a.hasNewMessages && !b.hasNewMessages) return -1;
    if (!a.hasNewMessages && b.hasNewMessages) return 1;
    return a.name.localeCompare(b.name);
  });
  
  if (sortedCharacters.length === 0) {
    const noMessages = document.createElement('div');
    noMessages.className = 'no-messages';
    noMessages.style.textAlign = 'center';
    noMessages.style.marginTop = '50px';
    noMessages.style.color = 'var(--dark-gray)';
    noMessages.textContent = 'No conversations yet';
    content.appendChild(noMessages);
  } else {
    sortedCharacters.forEach(character => {
      const characterItem = document.createElement('div');
      characterItem.className = 'character-item';
      characterItem.addEventListener('click', () => {
        navigateTo('messages-chat', { characterId: character.id });
      });
      
      const characterAvatar = document.createElement('div');
      characterAvatar.className = 'character-avatar';
      characterAvatar.textContent = character.avatar;
      
      const characterInfo = document.createElement('div');
      characterInfo.className = 'character-info';
      
      const characterName = document.createElement('div');
      characterName.className = 'character-name';
      characterName.textContent = character.name;
      
      const characterPreview = document.createElement('div');
      characterPreview.className = 'character-preview';
      characterPreview.textContent = 'Tap to view conversation';
      
      characterInfo.appendChild(characterName);
      characterInfo.appendChild(characterPreview);
      
      characterItem.appendChild(characterAvatar);
      characterItem.appendChild(characterInfo);
      
      if (character.hasNewMessages) {
        const newMessageBadge = document.createElement('div');
        newMessageBadge.className = 'new-message-badge';
        characterItem.appendChild(newMessageBadge);
      }
      
      characterList.appendChild(characterItem);
    });
    
    content.appendChild(characterList);
  }
  
  screen.appendChild(content);
  
  return screen;
}

// Function called when navigating to this screen
function messagesHomeOnNavigate() {
  // Recreate the content to reflect any changes
  const screen = document.getElementById('messages-home');
  const oldContent = screen.querySelector('.content');
  
  if (oldContent) {
    // Remove old content
    oldContent.remove();
    
    // Create new content
    const content = document.createElement('div');
    content.className = 'content';
    
    // Character list
    const characterList = document.createElement('div');
    characterList.className = 'character-list';
    
    // Filter characters that should be visible (their first day has arrived)
    const currentDay = getCurrentDay();
    const visibleCharacters = gameState.characters.filter(char => currentDay >= char.firstDay);
    
    // Sort characters: those with new messages first, then alphabetically
    const sortedCharacters = [...visibleCharacters].sort((a, b) => {
      if (a.hasNewMessages && !b.hasNewMessages) return -1;
      if (!a.hasNewMessages && b.hasNewMessages) return 1;
      return a.name.localeCompare(b.name);
    });
    
    if (sortedCharacters.length === 0) {
      const noMessages = document.createElement('div');
      noMessages.className = 'no-messages';
      noMessages.style.textAlign = 'center';
      noMessages.style.marginTop = '50px';
      noMessages.style.color = 'var(--dark-gray)';
      noMessages.textContent = 'No conversations yet';
      content.appendChild(noMessages);
    } else {
      sortedCharacters.forEach(character => {
        const characterItem = document.createElement('div');
        characterItem.className = 'character-item';
        characterItem.addEventListener('click', () => {
          navigateTo('messages-chat', { characterId: character.id });
        });
        
        const characterAvatar = document.createElement('div');
        characterAvatar.className = 'character-avatar';
        characterAvatar.textContent = character.avatar;
        
        const characterInfo = document.createElement('div');
        characterInfo.className = 'character-info';
        
        const characterName = document.createElement('div');
        characterName.className = 'character-name';
        characterName.textContent = character.name;
        
        const characterPreview = document.createElement('div');
        characterPreview.className = 'character-preview';
        characterPreview.textContent = 'Tap to view conversation';
        
        characterInfo.appendChild(characterName);
        characterInfo.appendChild(characterPreview);
        
        characterItem.appendChild(characterAvatar);
        characterItem.appendChild(characterInfo);
        
        if (character.hasNewMessages) {
          const newMessageBadge = document.createElement('div');
          newMessageBadge.className = 'new-message-badge';
          characterItem.appendChild(newMessageBadge);
        }
        
        characterList.appendChild(characterItem);
      });
      
      content.appendChild(characterList);
    }
    
    screen.appendChild(content);
  }
}
