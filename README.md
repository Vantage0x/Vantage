# Vantage Chrome Extension

🚀 **The premier Chrome extension for Solana developers** to deploy and manage memecoins on pump.fun with enhanced security, speed, and control.

> **Open Source** • **MIT Licensed** • **Built by developers, for developers**

## ✨ Key Features

- 🥷 **Stealth Deploy** - Preconfigure metadata and contracts before going live
- 🛡️ **Sniper Protection** - Advanced bot protection during token launches
- 💰 **Multi-Wallet Distribution** - Distribute token supply across multiple wallets
- 🔄 **Instant Relaunch** - Quickly recover from failed launches
- 🎨 **Custom Metadata** - Full control over token name, ticker, image, and description
- 💎 **Transparent Pricing** - 0.015 SOL Vantage fee (0.035 SOL total including pump.fun)

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

## 📚 Documentation

For comprehensive documentation, visit our [docs folder](docs/):

- **[Overview](docs/overview.md)** - Complete project overview and problem statement
- **[Installation Guide](docs/installation.md)** - Detailed installation instructions
- **[How to Use](docs/how-to-use.md)** - Complete usage guide with examples
- **[Features](docs/features.md)** - Detailed feature breakdown
- **[FAQ](docs/faq.md)** - Frequently asked questions

## ⚖️ Legal

- **[Privacy Policy](docs/privacy-policy.md)** - How we handle your data
- **[Terms of Service](docs/terms-of-service.md)** - User agreement and service terms
- **[Disclaimer](docs/disclaimer.md)** - Important legal and risk information
- **[License](LICENSE)** - MIT License details

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/Vantage0x/Vantage/issues)
- **Twitter**: [@Vantage0x](https://x.com/Vantage0x)

## License

This project is open source and available under the [MIT License](LICENSE). 