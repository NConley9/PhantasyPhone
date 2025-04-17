/**
 * Notes Home Screen
 */

function createNotesHomeScreen() {
  const screen = document.createElement('div');
  screen.id = 'notes-home';
  screen.className = 'screen';
  
  // Back button
  const backButton = createBackButton('home');
  screen.appendChild(backButton);
  
  // Header
  const header = document.createElement('div');
  header.className = 'header';
  header.textContent = 'Notes';
  screen.appendChild(header);
  
  // Content
  const content = document.createElement('div');
  content.className = 'content';
  
  // Character grid
  const characterGrid = document.createElement('div');
  characterGrid.className = 'character-grid';
  
  // Filter characters that should be visible (their first day has arrived)
  const currentDay = getCurrentDay();
  const visibleCharacters = gameState.characters.filter(char => currentDay >= char.firstDay);
  
  // Sort characters alphabetically
  const sortedCharacters = [...visibleCharacters].sort((a, b) => a.name.localeCompare(b.name));
  
  if (sortedCharacters.length === 0) {
    const noNotes = document.createElement('div');
    noNotes.className = 'no-notes';
    noNotes.style.textAlign = 'center';
    noNotes.style.marginTop = '50px';
    noNotes.style.color = 'var(--dark-gray)';
    noNotes.textContent = 'No character notes yet';
    content.appendChild(noNotes);
  } else {
    sortedCharacters.forEach(character => {
      const characterCard = document.createElement('div');
      characterCard.className = 'character-card';
      characterCard.addEventListener('click', () => {
        navigateTo('notes-character', { characterId: character.id });
      });
      
      const characterAvatar = document.createElement('div');
      characterAvatar.className = 'character-avatar';
      characterAvatar.textContent = character.avatar;
      
      const characterName = document.createElement('div');
      characterName.className = 'character-name';
      characterName.textContent = character.name;
      
      characterCard.appendChild(characterAvatar);
      characterCard.appendChild(characterName);
      
      characterGrid.appendChild(characterCard);
    });
    
    content.appendChild(characterGrid);
  }
  
  screen.appendChild(content);
  
  return screen;
}

// Function called when navigating to this screen
function notesHomeOnNavigate() {
  // Recreate the content to reflect any changes
  const screen = document.getElementById('notes-home');
  const oldContent = screen.querySelector('.content');
  
  if (oldContent) {
    // Remove old content
    oldContent.remove();
    
    // Create new content
    const content = document.createElement('div');
    content.className = 'content';
    
    // Character grid
    const characterGrid = document.createElement('div');
    characterGrid.className = 'character-grid';
    
    // Filter characters that should be visible (their first day has arrived)
    const currentDay = getCurrentDay();
    const visibleCharacters = gameState.characters.filter(char => currentDay >= char.firstDay);
    
    // Sort characters alphabetically
    const sortedCharacters = [...visibleCharacters].sort((a, b) => a.name.localeCompare(b.name));
    
    if (sortedCharacters.length === 0) {
      const noNotes = document.createElement('div');
      noNotes.className = 'no-notes';
      noNotes.style.textAlign = 'center';
      noNotes.style.marginTop = '50px';
      noNotes.style.color = 'var(--dark-gray)';
      noNotes.textContent = 'No character notes yet';
      content.appendChild(noNotes);
    } else {
      sortedCharacters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        characterCard.addEventListener('click', () => {
          navigateTo('notes-character', { characterId: character.id });
        });
        
        const characterAvatar = document.createElement('div');
        characterAvatar.className = 'character-avatar';
        characterAvatar.textContent = character.avatar;
        
        const characterName = document.createElement('div');
        characterName.className = 'character-name';
        characterName.textContent = character.name;
        
        characterCard.appendChild(characterAvatar);
        characterCard.appendChild(characterName);
        
        characterGrid.appendChild(characterCard);
      });
      
      content.appendChild(characterGrid);
    }
    
    screen.appendChild(content);
  }
}
