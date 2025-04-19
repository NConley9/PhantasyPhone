# PhantasyPhone

A React-based text messaging game that simulates a smartphone experience with multiple character storylines.

## Overview

PhantasyPhone is an interactive fiction game where players interact with various characters through a simulated smartphone interface. The game features:

- Multiple character storylines told through text messages
- A smartphone-like UI with various apps
- An internal clock system that starts on May 10
- Support for images and media in conversations
- Unlockable content as the story progresses

## Features

- **Responsive Design**: Works on both desktop and mobile devices
- **Modern React Architecture**: Built with React, Context API, and custom hooks
- **Component-Based Structure**: Modular and maintainable codebase
- **Multiple Character Storylines**: Each character has their own unique story
- **Day Advancement System**: Stories progress as in-game days advance
- **Notification System**: Get notified when new messages arrive
- **Realistic Chat Experience**: Typing indicators, message delays, and user input waiting

## Project Structure

```
phantasy-phone/
├── public/             # Static assets
│   └── assets/         # Game assets (images, wallpapers, etc.)
├── src/                # Source code
│   ├── components/     # React components
│   │   ├── home/       # Home screen components
│   │   ├── layout/     # Layout components
│   │   ├── messages/   # Message-related components
│   │   └── ui/         # UI components
│   ├── context/        # React context providers
│   │   ├── ChatContext.jsx      # Chat functionality
│   │   ├── GameContext.jsx      # Game state
│   │   ├── NotificationsContext.jsx # Notifications
│   │   └── SettingsContext.jsx  # Settings and customization
│   ├── screens/        # Screen components
│   ├── App.jsx         # Main App component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── task/               # Task documentation
├── package.json        # Project dependencies
└── vite.config.js      # Vite configuration
```

## Character Scripts Format

Character scripts are defined in a JSON format with the following structure:

```javascript
{
  "day001": [
    { "type": "message", "sender": "character", "content": "Hello!" },
    { "type": "message", "sender": "user", "content": "Hi there!" },
    { "type": "image", "sender": "character", "content": "image.jpg" },
    { "type": "unlock", "item": "wallpaper", "id": "schedule.jpg" },
    { "type": "command", "action": "advanceDay", "value": 1 }
  ],
  "day002": [
    // More messages for day 2
  ]
}
```

### Message Types

- `message`: A text message with `sender` and `content` properties
- `image`: An image message with `sender` and `content` (filename) properties
- `unlock`: A command to unlock content (e.g., wallpapers)
- `command`: A special command (e.g., advancing the day)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/phantasy-phone.git
   cd phantasy-phone
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Development

### Running Tests

```
npm test           # Run tests once
npm run test:watch # Run tests in watch mode
```

### Building for Production

```
npm run build
```

This will create a production-ready build in the `dist` directory.

## Extending the Game

To add new characters and storylines:

1. Add new character data to the `characters` array in `GameContext.jsx`
2. Add character scripts to the `scripts` object in `GameContext.jsx`
3. Add any unlockable wallpapers to the `wallpapers` array in `SettingsContext.jsx`

## Future Features

- Photogram: A social media app
- DateMatch: A dating app
- SecureCam: A security camera app
- ShopMart: An online shopping app
- Wallet: A digital wallet app
