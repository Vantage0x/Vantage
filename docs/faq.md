# Frequently Asked Questions (FAQ)

This FAQ covers the most common questions about Vantage. If you don't find your answer here, please check our [GitHub Issues](https://github.com/Vantage0x/Vantage/issues) or create a new issue.

## 📋 Table of Contents

- [General Questions](#general-questions)
- [Installation & Setup](#installation--setup)
- [Usage & Features](#usage--features)
- [Technical Questions](#technical-questions)
- [Pricing & Fees](#pricing--fees)
- [Security & Privacy](#security--privacy)
- [Troubleshooting](#troubleshooting)
- [Legal & Compliance](#legal--compliance)

---

## 🎯 General Questions

### What is Vantage?

**Vantage** is a Chrome extension designed specifically for Solana developers who want to deploy and manage memecoins on platforms like pump.fun with enhanced security, speed, and control. It offers features like stealth deploy, sniper protection, multi-wallet distribution, and instant relaunch capabilities.

### Who should use Vantage?

Vantage is designed for:
- **Solana developers** building memecoin projects
- **Crypto entrepreneurs** launching community tokens
- **DeFi teams** creating utility tokens
- **NFT projects** expanding into token ecosystems
- **Anyone** who wants professional-grade token launch tools

### Is Vantage free to use?

Vantage charges a **0.015 SOL fee per launch** (plus pump.fun's 0.02 SOL fee). There are no subscription costs, hidden fees, or percentage-based charges. You only pay when you actually launch a token.

### Which platforms does Vantage support?

Currently supported:
- ✅ **pump.fun** - Full integration with all features
- ✅ **Solana Mainnet** - Production-ready deployments

Coming soon:
- 🔄 **Raydium** - Planned for next major update
- 🔄 **Orca** - Under consideration
- 🔄 **Multi-chain** - Ethereum and BSC support planned

### Is Vantage open source?

Yes! Vantage is completely **open source** under the MIT License. You can view, audit, and contribute to the code on our [GitHub repository](https://github.com/Vantage0x/Vantage).

---

## 🛠️ Installation & Setup

### How do I install Vantage?

There are two methods:

**Method 1: Chrome Web Store (Coming Soon)**
- Visit Chrome Web Store and search for "Vantage"
- Click "Add to Chrome"

**Method 2: Manual Installation (Available Now)**
1. Download from [GitHub](https://github.com/Vantage0x/Vantage)
2. Extract the ZIP file
3. Go to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked" and select the Vantage folder

Detailed instructions: [Installation Guide](installation.md)

### What are the system requirements?

- **Chrome Browser** version 88 or later
- **Solana Wallet** (Phantom, Solflare, etc.)
- **Minimum 0.1 SOL** in your wallet
- **Stable internet connection**
- **4GB RAM** recommended for optimal performance

### Why do I need to enable Developer Mode?

Developer Mode is required for manual installation because Vantage isn't yet available on the Chrome Web Store (currently under review). This is a standard Chrome feature and is completely safe.

### Can I use Vantage on mobile?

Currently, Vantage is only available as a desktop Chrome extension. Mobile support is planned for future releases:
- **Mobile Chrome**: Under development
- **Firefox Mobile**: Planned for 2024
- **Safari iOS**: Under consideration

---

## 🚀 Usage & Features

### What is "Stealth Deploy"?

Stealth Deploy allows you to configure your entire token launch (metadata, settings, distribution) without any blockchain activity. This keeps your plans completely private until you choose to execute the launch, preventing bots from front-running your deployment.

### How does sniper protection work?

Vantage's sniper protection uses multiple methods:
- **Pattern Analysis**: Detects bot-like transaction patterns
- **Timing Protection**: Blocks transactions for 30-120 seconds after launch
- **Amount Limits**: Restricts maximum tokens per transaction
- **Blacklist Integration**: Blocks known bot wallet addresses

### Can I launch multiple tokens simultaneously?

Yes! Vantage supports:
- **Batch Configuration**: Prepare multiple launches in stealth mode
- **Sequential Launching**: Launch tokens with delays between them
- **Portfolio Management**: Track multiple token projects

### What happens if my launch fails?

Vantage's **Instant Relaunch** feature saves your complete configuration. If a launch fails, you can:
1. Analyze what went wrong
2. Modify settings if needed
3. Relaunch with one click
4. All within 30 seconds

### How do I distribute tokens across multiple wallets?

1. Enable "Multi-Wallet Distribution" in launch settings
2. Add up to 5 wallet addresses
3. Set percentage distribution for each wallet
4. Vantage automatically handles the distribution during launch

---

## 🔧 Technical Questions

### Does Vantage store my private keys?

**No, absolutely not.** Vantage never has access to your private keys. It integrates with your existing Solana wallet (Phantom, Solflare, etc.), which handles all key management and transaction signing.

### Where is my data stored?

All data is stored **locally in your browser**:
- Launch configurations saved in browser storage
- No external servers or databases
- Data never leaves your device
- You can export/backup configurations manually

### How does Vantage interact with the blockchain?

Vantage uses standard Solana Web3.js libraries to:
- Connect to Solana RPC endpoints
- Interact with token programs
- Submit transactions through your wallet
- Monitor blockchain activity for analytics

### Can I use Vantage with any Solana wallet?

Vantage supports most popular Solana wallets:
- ✅ **Phantom** (Recommended)
- ✅ **Solflare**
- ✅ **Backpack**
- ✅ **Glow**
- ✅ **Slope**

### What happens if I lose my browser data?

If you clear browser data or reinstall Chrome:
- Saved launch configurations will be lost
- You'll need to reconnect your wallet
- Previous launches are still on the blockchain
- Consider exporting important configurations as backup

---

## 💰 Pricing & Fees

### What are the exact costs?

**Per Launch Fees:**
- **Vantage Fee**: 0.015 SOL
- **pump.fun Fee**: 0.02 SOL
- **Total**: 0.035 SOL (~$7-10 USD)

**Additional Costs:**
- **Solana Network Fees**: ~0.001 SOL per transaction
- **No subscription fees**
- **No percentage-based fees**
- **No hidden charges**

### Why does Vantage charge a fee?

The 0.015 SOL fee covers:
- **Development and maintenance** of the extension
- **Server costs** for analytics and monitoring
- **Security audits** and code reviews
- **Customer support** and documentation
- **Future feature development**

### Are there any discounts available?

Currently, pricing is fixed at 0.015 SOL per launch. We're considering:
- **Volume discounts** for high-frequency users
- **Community discounts** for open-source projects
- **Educational discounts** for learning purposes

### Can I get a refund if my launch fails?

**Vantage Fee Refund Policy:**
- ✅ **Technical failures** on our end: Full refund
- ✅ **Network issues** preventing deployment: Full refund
- ❌ **Market performance** of your token: No refund
- ❌ **User error** in configuration: No refund

**pump.fun fees** are handled by pump.fun and subject to their policies.

---

## 🔒 Security & Privacy

### Is Vantage safe to use?

Yes, Vantage is designed with security as a top priority:
- **Open source** code for full transparency
- **No private key access** - works with your existing wallet
- **Local data storage** - no external servers
- **Regular security audits** by the community
- **No tracking or analytics** collection

### What permissions does Vantage need?

Vantage requires minimal permissions:
- **Active Tab**: To interact with pump.fun and supported platforms
- **Storage**: To save launch configurations locally
- **Web Request** (Optional): For enhanced sniper protection

### How do you protect against sniper bots?

Vantage uses multiple protection layers:
1. **Real-time Analysis**: Monitor all transactions during launch
2. **Pattern Recognition**: Identify bot-like behavior
3. **Automatic Blocking**: Prevent suspicious transactions
4. **Community Whitelist**: Allow verified community members
5. **Configurable Rules**: Customize protection settings

### What data does Vantage collect?

**Vantage collects NO personal data:**
- ❌ No wallet addresses stored
- ❌ No transaction history tracked
- ❌ No personal information collected
- ❌ No browsing behavior monitored
- ❌ No analytics or telemetry

**Local data only:**
- ✅ Launch configurations (stored locally)
- ✅ User preferences (stored locally)
- ✅ Extension settings (stored locally)

---

## 🐛 Troubleshooting

### Extension won't load or shows errors

**Common solutions:**
1. **Refresh the extension**: Go to `chrome://extensions/` and click refresh
2. **Restart Chrome**: Close and reopen the browser
3. **Clear cache**: Clear Chrome cache and cookies
4. **Check Developer Mode**: Ensure it's enabled for manual installations
5. **Reinstall**: Remove and reinstall the extension

### Wallet connection issues

**Troubleshooting steps:**
1. **Check wallet extension**: Ensure your Solana wallet is installed and unlocked
2. **Refresh both extensions**: Refresh both Vantage and your wallet
3. **Try different wallet**: Test with a different Solana wallet
4. **Check network**: Ensure you're connected to Solana mainnet
5. **Restart browser**: Close all tabs and restart Chrome

### Launch fails or gets stuck

**Possible causes and solutions:**
1. **Insufficient SOL**: Ensure you have 0.035+ SOL in your wallet
2. **Network congestion**: Wait for network to clear and retry
3. **Wallet locked**: Unlock your wallet and try again
4. **RPC issues**: Try switching to a different RPC endpoint
5. **Extension conflict**: Temporarily disable other extensions

### Sniper protection not working

**Check these settings:**
1. **Protection enabled**: Verify sniper protection is turned on
2. **Duration setting**: Ensure protection duration is appropriate (60+ seconds)
3. **Sensitivity level**: Try increasing to "High" sensitivity
4. **Custom rules**: Check if custom rules are properly configured
5. **Report issues**: Contact support with specific examples

### Metadata not displaying correctly

**Common fixes:**
1. **Image format**: Try PNG instead of JPG or vice versa
2. **File size**: Reduce image size to under 2MB
3. **Character limits**: Check name/description length limits
4. **Wait time**: Allow 5-10 minutes for metadata propagation
5. **Re-upload**: Try uploading the image again

---

## ⚖️ Legal & Compliance

### Is using Vantage legal?

Vantage is a legitimate software tool for blockchain development. However:
- **Your responsibility**: Comply with local laws and regulations
- **Token launches**: Ensure your tokens comply with securities laws
- **Tax obligations**: Report any income or gains as required
- **Platform terms**: Follow pump.fun and other platform terms of service

### What about securities regulations?

**Important disclaimers:**
- Vantage is a **software tool**, not financial advice
- **Token launches may be subject** to securities regulations
- **Consult legal counsel** before launching tokens
- **Different jurisdictions** have different rules
- **You are responsible** for compliance

### Can I use Vantage commercially?

Yes, under the MIT License:
- ✅ **Commercial use** permitted
- ✅ **Modification** allowed
- ✅ **Distribution** allowed
- ✅ **Private use** permitted
- ⚠️ **No warranty** provided
- ⚠️ **No liability** assumed

### What about pump.fun's terms of service?

Using Vantage with pump.fun:
- ✅ **Complies** with pump.fun's API usage
- ✅ **Enhances** rather than circumvents platform features
- ✅ **Respects** platform rate limits and guidelines
- ✅ **Supports** pump.fun's ecosystem growth

### Disclaimer and risks

**Important risk warnings:**
- ⚠️ **Cryptocurrency trading is risky** - you can lose money
- ⚠️ **No guarantee of success** - market performance varies
- ⚠️ **Technical risks exist** - software bugs are possible
- ⚠️ **Regulatory risks** - laws may change
- ⚠️ **Use at your own risk** - we provide no warranties

---

## 💬 Getting More Help

### Where can I get additional support?

1. **Documentation**: Check our comprehensive [docs](README.md)
2. **GitHub Issues**: Search or create issues on [GitHub](https://github.com/Vantage0x/Vantage/issues)
3. **Community Discussion**: Join [GitHub Discussions](https://github.com/Vantage0x/Vantage/discussions)
4. **Discord** (Coming Soon): Real-time community support
5. **Email Support**: For security issues, contact `security@vantage0x.com`

### How do I report bugs?

When reporting bugs, please include:
- **Chrome version** and operating system
- **Extension version** (found in chrome://extensions/)
- **Steps to reproduce** the issue
- **Error messages** or console logs
- **Screenshots** if applicable
- **Wallet type** you're using

### How can I contribute to Vantage?

We welcome contributions! See our [Contributing Guide](../CONTRIBUTING.md) for:
- **Code contributions**: Bug fixes and new features
- **Documentation**: Improve guides and help content
- **Testing**: Report bugs and test new features
- **Community**: Help other users in discussions
- **Translations**: Help make Vantage accessible globally

### What's on the roadmap?

**Coming Soon:**
- Raydium integration
- Mobile browser support
- Advanced analytics dashboard
- API access for developers

**Future Plans:**
- Multi-chain support (Ethereum, BSC)
- Professional enterprise features
- Advanced DeFi integrations
- NFT + Token combo launches

---

**Still have questions?** 🤔

👉 **Create an issue**: [GitHub Issues](https://github.com/Vantage0x/Vantage/issues/new)
👉 **Join discussions**: [GitHub Discussions](https://github.com/Vantage0x/Vantage/discussions)
👉 **Read more**: [Full Documentation](README.md)

---

*This FAQ is regularly updated based on community feedback and common questions. Last updated: June 2024* 📅 