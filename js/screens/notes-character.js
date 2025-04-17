/**
 * Notes Character Screen
 */

function createNotesCharacterScreen() {
  const screen = document.createElement('div');
  screen.id = 'notes-character';
  screen.className = 'screen';
  
  // Back button
  const backButton = createBackButton('notes-home');
  screen.appendChild(backButton);
  
  // Header (will be populated when navigating to this screen)
  const header = document.createElement('div');
  header.className = 'header';
  screen.appendChild(header);
  
  // Content
  const content = document.createElement('div');
  content.className = 'content';
  content.style.padding = '20px';
  
  // Character info (will be populated when navigating to this screen)
  const characterInfo = document.createElement('div');
  characterInfo.className = 'character-info';
  characterInfo.style.display = 'flex';
  characterInfo.style.alignItems = 'center';
  characterInfo.style.marginBottom = '20px';
  
  // Notes content (will be populated when navigating to this screen)
  const notesContent = document.createElement('div');
  notesContent.className = 'notes-content';
  
  content.appendChild(characterInfo);
  content.appendChild(notesContent);
  
  screen.appendChild(content);
  
  return screen;
}

// Function called when navigating to this screen
function notesCharacterOnNavigate(params) {
  if (!params || !params.characterId) {
    navigateTo('notes-home');
    return;
  }
  
  // Find the character
  const character = gameState.characters.find(c => c.id === params.characterId);
  if (!character) {
    navigateTo('notes-home');
    return;
  }
  
  // Update header
  const header = document.querySelector('#notes-character .header');
  header.textContent = `${character.name}'s Notes`;
  
  // Update character info
  const characterInfo = document.querySelector('#notes-character .character-info');
  characterInfo.innerHTML = '';
  
  const characterAvatar = document.createElement('div');
  characterAvatar.className = 'character-avatar';
  characterAvatar.style.width = '60px';
  characterAvatar.style.height = '60px';
  characterAvatar.style.borderRadius = '30px';
  characterAvatar.style.marginRight = '15px';
  characterAvatar.textContent = character.avatar;
  
  const characterInfoText = document.createElement('div');
  
  const characterName = document.createElement('div');
  characterName.className = 'character-name';
  characterName.style.fontWeight = 'bold';
  characterName.style.fontSize = '18px';
  characterName.textContent = character.name;
  
  characterInfoText.appendChild(characterName);
  
  characterInfo.appendChild(characterAvatar);
  characterInfo.appendChild(characterInfoText);
  
  // Update notes content
  const notesContent = document.querySelector('#notes-character .notes-content');
  notesContent.innerHTML = gameState.notes[params.characterId] || '<p>No notes available yet.</p>';
}
