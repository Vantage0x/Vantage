# Vantage Chrome Extension

A simplistic Chrome extension with a clean homepage interface featuring a header with profile picture, username, and settings gear icon, plus a footer.

## Features

- **Clean Interface**: Minimalist design with a beautiful gradient background
- **Profile Section**: Customizable profile picture and username
- **Interactive Settings**: Settings gear icon with hover animations
- **Persistent Storage**: User preferences saved using Chrome's storage API
- **Responsive Design**: Adapts to different screen sizes

## Installation

1. **Download/Clone** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** by toggling the switch in the top right corner
4. **Click "Load unpacked"** and select the folder containing the extension files
5. **Pin the extension** to your toolbar for easy access

## Usage

### Basic Interaction
- **Click the extension icon** in your Chrome toolbar to open Vantage
- **Click on your username** to change it
- **Click on your profile picture** to update it with a new image URL
- **Click the settings gear** to access basic settings

### Customization
- **Username**: Click on the username in the header to change it
- **Profile Picture**: Click on the profile picture to enter a new image URL
- **Settings**: Use the gear icon to access additional settings

## File Structure

```
vantage/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.js              # JavaScript functionality
├── styles.css            # Styling and layout
├── icons/                # Extension icons
│   ├── icon16.svg
│   ├── icon48.svg
│   └── icon128.svg
└── README.md             # This file
```

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: Storage (for saving user preferences)
- **Popup Dimensions**: 400x500px (responsive)
- **Storage**: Uses Chrome's sync storage for cross-device synchronization

## Customization

You can easily customize the extension by modifying:

- **Colors**: Edit the CSS variables in `styles.css`
- **Layout**: Modify the HTML structure in `popup.html`
- **Functionality**: Add new features in `popup.js`
- **Icons**: Replace the SVG icons in the `icons/` directory

## Browser Compatibility

- Chrome 88+ (Manifest V3 support required)
- Chromium-based browsers (Edge, Brave, etc.)

## Development

To modify the extension:

1. Make your changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Vantage extension card
4. Test your changes by clicking the extension icon

## License

This project is open source and available under the MIT License. 