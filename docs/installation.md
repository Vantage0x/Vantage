# Installation Guide

This guide will walk you through installing the Vantage Chrome extension using multiple methods. Choose the method that works best for you.

## 📦 Installation Methods

### Method 1: Chrome Web Store (Recommended)
*Coming Soon - Currently in review process*

### Method 2: Manual Installation (Available Now)
*Install directly from the GitHub repository*

---

## 🚀 Method 1: Chrome Web Store Installation

> **Note**: The Chrome Web Store version is currently under review by Google. We'll update this section once it's available.

### When Available:
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore)
2. Search for "Vantage - Solana Token Launcher"
3. Click **"Add to Chrome"**
4. Confirm installation by clicking **"Add extension"**
5. The Vantage icon will appear in your Chrome toolbar

---

## 🛠️ Method 2: Manual Installation

### Prerequisites
- **Chrome Browser** (version 88 or later)
- **Developer Mode** enabled in Chrome
- **Basic file management** skills

### Step-by-Step Instructions

#### Step 1: Download the Extension
1. Go to the [Vantage GitHub Repository](https://github.com/Vantage0x/Vantage)
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. Save the ZIP file to your computer

#### Step 2: Extract the Files
1. **Locate** the downloaded ZIP file (usually in your Downloads folder)
2. **Right-click** on `Vantage-main.zip`
3. Select **"Extract All"** (Windows) or **"Open"** (Mac)
4. **Choose** a location to extract (e.g., Desktop or Documents)
5. **Remember** the extraction location - you'll need it in Step 4

#### Step 3: Enable Developer Mode in Chrome
1. **Open Chrome** browser
2. **Navigate** to `chrome://extensions/`
   - Or: Click the three dots menu → More tools → Extensions
3. **Toggle ON** the "Developer mode" switch in the top-right corner

![Developer Mode Toggle](https://developer.chrome.com/static/docs/extensions/mv3/getstarted/image/developer-mode-toggle_720.png)

#### Step 4: Load the Extension
1. **Click** the **"Load unpacked"** button (appears after enabling Developer mode)
2. **Browse** to the folder where you extracted the Vantage files
3. **Select** the main Vantage folder (contains `manifest.json`)
4. **Click** "Select Folder" (Windows) or "Open" (Mac)

#### Step 5: Verify Installation
1. **Look** for the Vantage icon in your Chrome toolbar
2. **Click** the Vantage icon to open the extension
3. **Confirm** you see the Vantage interface

### Alternative: Git Clone Method
If you're familiar with Git:

```bash
# Clone the repository
git clone https://github.com/Vantage0x/Vantage.git

# Navigate to the directory
cd Vantage

# Follow steps 3-5 above, selecting the cloned directory
```

---

## 🔧 Post-Installation Setup

### 1. Pin the Extension (Recommended)
1. **Click** the puzzle piece icon in Chrome toolbar
2. **Find** "Vantage - Solana Token Launcher"
3. **Click** the pin icon to keep it visible

### 2. Grant Necessary Permissions
Vantage requires the following permissions:
- **Active Tab**: To interact with pump.fun and other supported platforms
- **Storage**: To save your launch configurations locally
- **Web Request**: To monitor for sniper bots (optional but recommended)

### 3. Verify Functionality
1. **Click** the Vantage icon
2. **Check** that the interface loads properly
3. **Confirm** you can see the main dashboard

---

## 🔄 Updating the Extension

### Chrome Web Store Version
- **Automatic Updates**: Chrome will update the extension automatically
- **Manual Check**: Go to `chrome://extensions/` and click "Update"

### Manual Installation Version
1. **Download** the latest version from GitHub
2. **Extract** to the same location (overwrite existing files)
3. **Go** to `chrome://extensions/`
4. **Click** the refresh icon on the Vantage extension
5. **Verify** the version number has updated

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Extension Not Loading
**Problem**: Extension appears but doesn't load properly
**Solution**: 
1. Disable and re-enable the extension
2. Refresh the browser
3. Check Chrome console for errors

#### "Load unpacked" Button Missing
**Problem**: Can't find the "Load unpacked" button
**Solution**: 
1. Ensure Developer mode is enabled
2. Refresh the extensions page
3. Try a different Chrome profile

#### Permission Errors
**Problem**: Extension requests permissions but fails
**Solution**: 
1. Clear Chrome cache and cookies
2. Restart Chrome completely
3. Try incognito mode for testing

#### Manifest Errors
**Problem**: "Manifest file is missing or unreadable"
**Solution**: 
1. Re-extract the ZIP file
2. Ensure you're selecting the correct folder
3. Check that `manifest.json` exists in the selected folder

### Getting Help
If you encounter issues not covered here:

1. **Check** the [FAQ](faq.md) for common questions
2. **Search** existing [GitHub Issues](https://github.com/Vantage0x/Vantage/issues)
3. **Create** a new issue with:
   - Chrome version
   - Operating system
   - Error messages (if any)
   - Steps you've already tried

---

## 🔒 Security Considerations

### Safe Installation Practices
- **Only download** from official sources (GitHub repository or Chrome Web Store)
- **Verify** the repository URL: `https://github.com/Vantage0x/Vantage`
- **Check** the file integrity if you're security-conscious
- **Review** the permissions requested by the extension

### What Vantage Does NOT Do
- ❌ **Access your private keys** (they stay in your wallet)
- ❌ **Store sensitive data** on external servers
- ❌ **Track your browsing** outside of supported platforms
- ❌ **Collect personal information** without consent

---

## 🎯 Next Steps

Once you've successfully installed Vantage:

1. **📚 Read** the [How to Use Guide](how-to-use.md)
2. **🔧 Explore** the [Feature Breakdown](features.md)
3. **❓ Check** the [FAQ](faq.md) for common questions
4. **🚀 Start** your first token launch!

---

## 📱 Mobile Support

Currently, Vantage is available only as a Chrome extension for desktop browsers. Mobile support is planned for future releases:

- **📱 Mobile Chrome**: Under development
- **🦊 Firefox Mobile**: Planned for 2024
- **📱 Safari iOS**: Considering for future releases

---

**Installation complete?** 🎉 

👉 **Next**: [Learn How to Use Vantage](how-to-use.md)

---

*Need help with installation? Join our [GitHub Discussions](https://github.com/Vantage0x/Vantage/discussions) for community support!* 