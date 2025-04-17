/**
 * Parse a script file in the specified format
 * 
 * Example format:
 * {day004}
 * <character name>Yo!
 * <user>How are you today?
 * <character name>I am well. Thanks! 😉
 * <user>Great to hear! Here is my latest picture…
 * <user>[img_546.jpg]
 * {unlockWallpaper img_546.jpg}
 * <character name>❤️❤️❤️
 * {end}
 * {advanceDay-1}
 * 
 * @param {string} scriptContent - The content of the script file
 * @returns {Object} - Parsed script data organized by day
 */
export const parseScript = (scriptContent) => {
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
};

/**
 * Load a script file and parse it
 * 
 * @param {string} characterId - The ID of the character
 * @returns {Promise<Object>} - Parsed script data
 */
export const loadScript = async (characterId) => {
  try {
    const response = await fetch(`/assets/scripts/${characterId}.txt`);
    const scriptContent = await response.text();
    return parseScript(scriptContent);
  } catch (error) {
    console.error(`Error loading script for ${characterId}:`, error);
    return {};
  }
};
