# How to Use Vantage

This comprehensive guide will walk you through using Vantage to deploy your first memecoin on Solana. From initial setup to successful launch, we'll cover everything you need to know.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [First Launch Walkthrough](#first-launch-walkthrough)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Prerequisites
Before using Vantage, ensure you have:
- ✅ **Vantage Extension** installed ([Installation Guide](installation.md))
- ✅ **Solana Wallet** (Phantom, Solflare, or compatible wallet)
- ✅ **SOL Balance** (minimum 0.1 SOL recommended for testing)
- ✅ **pump.fun Account** (create at [pump.fun](https://pump.fun))

### Initial Setup

#### 1. Connect Your Wallet
1. **Click** the Vantage icon in your Chrome toolbar
2. **Click** "Connect Wallet" 
3. **Select** your preferred Solana wallet (Phantom recommended)
4. **Approve** the connection in your wallet
5. **Verify** your wallet address appears in Vantage

#### 2. Check Your Balance
- **Minimum Required**: 0.035 SOL per launch
- **Recommended**: 0.1+ SOL for multiple attempts
- **Fee Breakdown**: 
  - Vantage Fee: 0.015 SOL
  - pump.fun Fee: 0.02 SOL

---

## 🎯 First Launch Walkthrough

Let's walk through creating and launching your first token using Vantage's stealth deploy feature.

### Step 1: Create New Launch Configuration

1. **Open Vantage** by clicking the extension icon
2. **Click** "New Launch" or the "+" button
3. **Select Platform**: Choose "pump.fun" (default)
4. **Choose Launch Type**: Select "Stealth Deploy" (recommended for first launch)

### Step 2: Configure Token Metadata

#### Basic Information
```
Token Name: "My Awesome Coin"
Token Symbol: "MAC"
Description: "The most awesome memecoin on Solana! 🚀"
```

**Best Practices:**
- **Name**: Keep it memorable and brandable (max 32 characters)
- **Symbol**: 3-6 characters, all caps, unique
- **Description**: Engaging, community-focused, use emojis sparingly

#### Token Image
1. **Click** "Upload Image" 
2. **Select** your token image (PNG/JPG, max 5MB)
3. **Preview** how it will appear on pump.fun
4. **Optimize** if needed (Vantage will auto-resize)

**Image Requirements:**
- **Format**: PNG or JPG
- **Size**: 400x400px minimum (square aspect ratio)
- **File Size**: Under 5MB
- **Content**: Original artwork, no copyrighted material

### Step 3: Configure Launch Settings

#### Supply Distribution
```
Total Supply: 1,000,000,000 tokens (default)
Initial Liquidity: 85% (850M tokens)
Dev Allocation: 15% (150M tokens)
```

#### Multi-Wallet Setup (Optional but Recommended)
1. **Enable** "Multi-Wallet Distribution"
2. **Add Wallet Addresses** (up to 5 wallets)
3. **Set Distribution Percentages**:
   ```
   Wallet 1 (Main): 60% of dev allocation
   Wallet 2 (Marketing): 25% of dev allocation  
   Wallet 3 (Team): 15% of dev allocation
   ```

#### Sniper Protection
1. **Enable** "Advanced Sniper Protection" ✅
2. **Set Protection Duration**: 60 seconds (recommended)
3. **Configure Sensitivity**: "High" for maximum protection

### Step 4: Review and Prepare

1. **Review** all settings in the "Summary" tab
2. **Check** fee calculation (should show 0.035 SOL total)
3. **Verify** wallet balance is sufficient
4. **Click** "Prepare Launch" to enter stealth mode

### Step 5: Stealth Mode Preparation

Once you click "Prepare Launch":
- ⏳ **Configuration Saved**: All settings stored locally
- 🥷 **Stealth Mode Active**: No blockchain activity yet
- ✅ **Ready to Deploy**: One-click launch when ready
- 🔄 **Editable**: Can still modify settings

**In Stealth Mode, you can:**
- Edit metadata and settings
- Test different configurations
- Wait for optimal market conditions
- Coordinate with your community

### Step 6: Execute the Launch

When you're ready to go live:

1. **Final Check**: Review all settings one last time
2. **Market Timing**: Choose optimal launch time
3. **Community Ready**: Ensure your community is prepared
4. **Click "LAUNCH NOW"** 🚀

**What Happens Next:**
1. **Instant Deployment** (5-10 seconds)
2. **Sniper Protection Activates** (60 seconds)
3. **Token Goes Live** on pump.fun
4. **Analytics Dashboard** appears in Vantage

---

## 🔧 Advanced Features

### Instant Relaunch

If your launch doesn't go as planned:

1. **Open** the failed launch in Vantage
2. **Click** "Relaunch" button
3. **Modify** settings if needed (optional)
4. **Click** "Launch Again" 
5. **New token** deploys with same/updated settings

### Batch Launching

For multiple token launches:

1. **Create** multiple launch configurations
2. **Prepare** all launches in stealth mode
3. **Schedule** launches with delays between them
4. **Execute** launches in sequence

### Advanced Sniper Protection Settings

#### Protection Levels
- **Low**: Basic bot detection (30 seconds)
- **Medium**: Standard protection (60 seconds) 
- **High**: Maximum protection (90 seconds)
- **Custom**: Set your own duration and rules

#### Custom Rules
```javascript
// Example custom sniper rule
{
  "maxTransactionSize": "1000000", // 1M tokens max per tx
  "minTimeBetweenTx": "5000", // 5 seconds between transactions
  "blacklistPatterns": ["bot", "sniper", "mev"]
}
```

### Analytics and Monitoring

#### Real-time Dashboard
- **Launch Status**: Live deployment progress
- **Transaction Monitoring**: All buys/sells in real-time
- **Sniper Blocks**: Number of blocked bot transactions
- **Community Metrics**: Holder count, distribution

#### Export Data
- **CSV Export**: Transaction history and analytics
- **API Access**: Webhook integrations (coming soon)
- **Custom Reports**: Detailed launch performance

---

## 💡 Best Practices

### Pre-Launch Checklist

#### Technical Preparation
- [ ] Test wallet connection
- [ ] Verify sufficient SOL balance
- [ ] Check internet connection stability
- [ ] Close unnecessary browser tabs
- [ ] Disable other extensions temporarily

#### Marketing Preparation  
- [ ] Community announcement ready
- [ ] Social media posts scheduled
- [ ] Influencer coordination confirmed
- [ ] Launch time communicated
- [ ] Backup communication channels ready

#### Content Preparation
- [ ] Token image optimized and tested
- [ ] Description proofread and engaging
- [ ] Symbol availability checked
- [ ] Website/social links ready
- [ ] Whitepaper or documentation complete

### Launch Timing Strategy

#### Optimal Launch Windows
- **Peak Hours**: 12-4 PM EST (highest activity)
- **Weekend Launches**: Saturday 2-6 PM EST
- **Avoid**: Monday mornings, late nights (low engagement)
- **Market Conditions**: Launch during green market days

#### Community Coordination
- **Pre-announcement**: 24-48 hours before
- **Final Notice**: 1-2 hours before launch
- **Live Updates**: Real-time launch progress
- **Post-launch**: Immediate community engagement

### Risk Management

#### Financial Safety
- **Never invest more than you can afford to lose**
- **Keep emergency SOL** for failed launch recovery
- **Diversify launch strategies** across different times/approaches
- **Monitor gas fees** and network congestion

#### Technical Safety
- **Backup configurations** before launching
- **Test with small amounts** first
- **Use stealth mode** for preparation
- **Have relaunch strategy** ready

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Launch Fails to Execute
**Symptoms**: "Launch Now" button doesn't work or shows error

**Solutions**:
1. **Check wallet connection** - reconnect if needed
2. **Verify SOL balance** - ensure 0.035+ SOL available
3. **Refresh extension** - click refresh icon in chrome://extensions/
4. **Clear browser cache** - restart Chrome completely
5. **Try incognito mode** - test in private browsing

#### Sniper Protection Not Working
**Symptoms**: Bots still buying immediately after launch

**Solutions**:
1. **Increase protection level** to "High"
2. **Extend protection duration** to 90+ seconds
3. **Check custom rules** configuration
4. **Report suspicious addresses** to Vantage team
5. **Use multiple protection methods** simultaneously

#### Metadata Not Displaying Correctly
**Symptoms**: Token image or description not showing on pump.fun

**Solutions**:
1. **Re-upload image** in different format (PNG vs JPG)
2. **Reduce image file size** under 2MB
3. **Check character limits** in name/description
4. **Wait for propagation** (can take 5-10 minutes)
5. **Contact pump.fun support** if persistent

#### Extension Performance Issues
**Symptoms**: Slow loading, freezing, or crashes

**Solutions**:
1. **Close other tabs** to free up memory
2. **Disable other extensions** temporarily
3. **Update Chrome browser** to latest version
4. **Restart browser** completely
5. **Reinstall Vantage** if problems persist

### Error Codes Reference

| Error Code | Meaning | Solution |
|------------|---------|----------|
| `VTG001` | Insufficient SOL balance | Add more SOL to wallet |
| `VTG002` | Wallet connection lost | Reconnect wallet |
| `VTG003` | Network congestion | Wait and retry |
| `VTG004` | Invalid metadata | Check image/text format |
| `VTG005` | Sniper protection timeout | Adjust protection settings |

### Getting Additional Help

If you're still experiencing issues:

1. **Check** the [FAQ](faq.md) for more solutions
2. **Search** [GitHub Issues](https://github.com/Vantage0x/Vantage/issues) for similar problems
3. **Join** our [Discord community](https://discord.gg/vantage) for real-time help
4. **Create** a detailed bug report with:
   - Error messages or codes
   - Steps to reproduce
   - Chrome version and OS
   - Screenshots if applicable

---

## 🎓 Advanced Use Cases

### Community Token Launches
- **Coordinate** with Discord/Telegram groups
- **Use polling** to decide launch timing
- **Implement** fair distribution mechanisms
- **Engage** community during launch process

### Project Utility Tokens
- **Plan tokenomics** carefully
- **Consider** long-term utility
- **Implement** vesting schedules
- **Coordinate** with development roadmap

### Memecoin Experiments
- **Test** different launch strategies
- **Analyze** community response patterns
- **Iterate** based on performance data
- **Build** on successful launches

---

## 📊 Success Metrics

Track your launch success with these key metrics:

### Immediate Metrics (0-1 hour)
- **Launch Speed**: Time from click to live (<10 seconds target)
- **Sniper Blocks**: Number of bot transactions blocked
- **Initial Holders**: Unique wallet count in first hour
- **Price Stability**: Minimal price manipulation

### Short-term Metrics (1-24 hours)
- **Holder Growth**: Rate of new unique holders
- **Trading Volume**: Total transaction volume
- **Community Engagement**: Social media activity
- **Market Cap**: Peak and sustained market cap

### Long-term Metrics (1+ weeks)
- **Holder Retention**: Percentage of holders still active
- **Organic Growth**: New holders from organic discovery
- **Utility Development**: Real-world use case adoption
- **Community Health**: Active community participation

---

**Ready to launch your first token?** 🚀

👉 **Next**: [Explore Advanced Features](features.md) | [Check FAQ](faq.md) | [Join Community](https://github.com/Vantage0x/Vantage)

---

*Remember: Always do your own research and never invest more than you can afford to lose. Vantage is a tool - success depends on your project, community, and market conditions.* ⚠️ 