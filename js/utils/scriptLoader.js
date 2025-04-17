/**
 * Script Loader Utility
 * 
 * This utility loads and parses script files in JSON format.
 */

// Cache for loaded scripts
const scriptCache = {};

/**
 * Load a script file for a character
 * 
 * @param {string} characterId - The ID of the character
 * @returns {Promise<Object>} - The parsed script data
 */
async function loadScript(characterId) {
  // Check if the script is already in the cache
  if (scriptCache[characterId]) {
    console.log(`Using cached script for ${characterId}`);
    return scriptCache[characterId];
  }
  
  try {
    console.log(`Loading script for ${characterId} from scripts/${characterId}.json`);
    const response = await fetch(`scripts/${characterId}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to load script for ${characterId}: ${response.status} ${response.statusText}`);
    }
    
    const scriptData = await response.json();
    console.log(`Successfully loaded script for ${characterId}:`, scriptData);
    
    // Cache the script
    scriptCache[characterId] = scriptData;
    
    return scriptData;
  } catch (error) {
    console.error(`Error loading script for ${characterId}:`, error);
    
    // Return an empty script if there's an error
    return {};
  }
}

/**
 * Get messages for a specific day from a character's script
 * 
 * @param {string} characterId - The ID of the character
 * @param {string} dayKey - The day key (e.g., "day001")
 * @returns {Promise<Array>} - The messages for the specified day
 */
async function getMessagesForDay(characterId, dayKey) {
  const script = await loadScript(characterId);
  return script[dayKey] || [];
}

/**
 * Get all messages up to a specific day from a character's script
 * 
 * @param {string} characterId - The ID of the character
 * @param {number} currentDay - The current game day
 * @returns {Promise<Array>} - All messages up to the specified day
 */
async function getAllMessagesUpToDay(characterId, currentDay) {
  const script = await loadScript(characterId);
  const allMessages = [];
  
  for (let day = 1; day <= currentDay; day++) {
    const dayKey = `day${day.toString().padStart(3, '0')}`;
    if (script[dayKey]) {
      allMessages.push(...script[dayKey]);
    }
  }
  
  return allMessages;
}

/**
 * Check if a character has messages for a specific day
 * 
 * @param {string} characterId - The ID of the character
 * @param {string} dayKey - The day key (e.g., "day001")
 * @returns {Promise<boolean>} - Whether the character has messages for the specified day
 */
async function hasMessagesForDay(characterId, dayKey) {
  const script = await loadScript(characterId);
  return !!script[dayKey];
}

// Export the functions
window.scriptLoader = {
  loadScript,
  getMessagesForDay,
  getAllMessagesUpToDay,
  hasMessagesForDay
};
