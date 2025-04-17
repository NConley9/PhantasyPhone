# PhantasyPhone

A JavaScript text messaging game that simulates a smartphone experience with multiple character storylines.

## Overview

PhantasyPhone is an interactive fiction game where players interact with various characters through a simulated smartphone interface. The game features:

- Multiple character storylines told through text messages
- A smartphone-like UI with various apps
- An internal clock system that starts on May 10
- Support for images and media in conversations
- Unlockable content as the story progresses

## Features

- **Responsive Design**: Works on both desktop and mobile devices
- **No Dependencies**: Built with vanilla JavaScript, HTML, and CSS
- **No Build Tools Required**: Just open index.html in a browser
- **Multiple Character Storylines**: Each character has their own unique story
- **Day Advancement System**: Stories progress as in-game days advance
- **Notification System**: Get notified when new messages arrive

## Project Structure

```
PhantasyPhone/
├── index.html           # Main HTML file
├── styles.css           # CSS styles
├── js/
│   ├── app.js           # Main application initialization
│   ├── data.js          # Game state and data
│   ├── utils.js         # Utility functions
│   └── screens/         # Screen components
│       ├── home.js      # Home screen
│       ├── messages-home.js
│       ├── messages-chat.js
│       ├── notes-home.js
│       ├── notes-character.js
│       ├── settings.js
│       └── placeholder.js
└── README.md            # Project documentation
```

## Character Scripts Format

Character scripts are stored in the game data with a specific format:

```
{day004}
<character name>Yo!
<user>How are you today?
<character name>I am well. Thanks! 😉
<user>Great to hear! Here is my latest picture…
<user>[img_546.jpg]
{unlockWallpaper img_546.jpg}
<character name>❤️❤️❤️
{end}
{advanceDay-1}
```

- `{dayXXX}` marks the start of a script for a specific day
- `<character name>` or `<user>` indicates who is speaking
- Text after the speaker tag is the message content
- `[filename.jpg]` indicates an image
- `{unlockWallpaper filename.jpg}` unlocks a new wallpaper
- `{end}` marks the end of a day's script
- `{advanceDay-X}` advances the game clock by X days

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a web browser
3. That's it! No build tools or server required

## Extending the Game

To add new characters and storylines:

1. Add new character data to the `characters` array in `data.js`
2. Add character scripts to the `scripts` object in `data.js`
3. Add character notes to the `notes` object in `data.js`
4. Add any unlockable wallpapers to the `wallpapers` array in `data.js`

## Future Features

- Photogram: A social media app
- DateMatch: A dating app
- SecureCam: A security camera app
- ShopMart: An online shopping app
- Wallet: A digital wallet app
