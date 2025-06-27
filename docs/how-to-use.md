# How to Use Vantage

This comprehensive guide will walk you through using Vantage to deploy your first memecoin on Solana. From initial setup to successful launch, we'll cover everything you need to know.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Navigation Overview](#navigation-overview)
- [First Launch Walkthrough](#first-launch-walkthrough)
- [Dashboard Features](#dashboard-features)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Prerequisites
Before using Vantage, ensure you have:
- ✅ **Vantage Extension** installed ([Installation Guide](installation.md))
- ✅ **SOL for funding** (minimum 0.1 SOL recommended for testing)
- ✅ **pump.fun Account** (create at [pump.fun](https://pump.fun))

### Initial Setup

#### 1. Open Vantage
1. **Click** the Vantage icon in your Chrome toolbar
2. **Familiarize** yourself with the main dashboard
3. **Access** wallet creation tools within the extension

#### 2. Funding Your Wallets
- **Minimum Required**: 0.035 SOL per launch
- **Recommended**: 0.1+ SOL for multiple attempts
- **Fee Breakdown**: 
  - Vantage Fee: 0.015 SOL
  - pump.fun Fee: 0.02 SOL
- **Funding Method**: Use the SOL disperser feature to fund created wallets

---

## 🧭 Navigation Overview

Vantage features an intuitive navigation system designed for efficiency and ease of use.

### Main Navigation Structure

```
🏠 Home Dashboard (Main Hub)
├── 🚀 Create Project (Token Creation Workflow)
│   ├── 📝 Token Metadata (Name, Symbol, Image)
│   ├── 💼 Project Wallets (Multi-wallet Setup)
│   └── 📊 Project Dashboard (Analytics & Trading)
├── 📁 Saved Projects (Draft Management)
├── 💰 Get SOL (Wallet Funding)
├── 🎁 PF Rewards (Reward Management)
├── 📈 Launch History (Past Launches)
└── 🛡️ Sniper Shield (Bot Protection)
```

### Navigation Features

#### Smart Footer Navigation
- **Home Button** 🏠: Return to main dashboard
- **Shield Button** 🛡️: Access sniper protection
- **History Button** 📈: View launch history
- **Disperser Button** 💼: Wallet management (future feature)

#### Contextual Navigation
- **Footer Visibility**: Only shows on main screens (Home, Shield, History, Disperser)
- **Workflow Navigation**: Hidden during project creation for focused workflow
- **Smart Back Buttons**: Always know how to return to previous screen
- **State Preservation**: Your work is saved when navigating between screens

#### Navigation Tips
- **Always Visible Path Home**: Every screen has a clear path back to home
- **Breadcrumb Awareness**: Current location always indicated
- **Quick Access**: Settings accessible from any screen with header
- **Mobile Optimized**: Touch-friendly navigation on mobile browsers

---

## 🎯 First Launch Walkthrough

Let's walk through creating and launching your first token using Vantage's stealth deploy feature.

### Step 1: Create New Launch Configuration

1. **Open Vantage** by clicking the extension icon
2. **Navigate to Home**: Ensure you're on the main dashboard
3. **Click** "Create Project" button
4. **Select Platform**: Choose "pump.fun" (default)

### Step 2: Configure Token Metadata

#### Basic Information
```
Token Name: "My Awesome Coin"
Token Symbol: "MAC"
Description: "The most awesome memecoin on Solana! 🚀"
```

**Best Practices:**
- **Name**: Keep it memorable and brandable (max 32 characters)
- **Symbol**: 3-6 characters
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

### Step 3: Configure Project Wallets

#### Multi-Wallet Setup (Recommended)
1. **Navigate** to "Project Wallets" from metadata screen
2. **Click** "Create Wallets" button
3. **Set Quantity**: Choose number of wallets (1-10 recommended)

**Example Distribution:**
```
Wallet 1 (Main): 60% of dev allocation
Wallet 2 (Marketing): 25% of dev allocation  
Wallet 3 (Team): 15% of dev allocation
```

#### Wallet Management Features
- **Automatic Generation**: Secure wallet creation
- **Address Display**: Full and abbreviated address views
- **Private Key Access**: Secure private key management
- **Balance Tracking**: Real-time SOL balance monitoring

### Step 4: Configure Launch Settings

#### Supply Distribution
```
Total Supply: 1,000,000,000 tokens (default)
Initial Liquidity: 85% (850M tokens)
Dev Allocation: 15% (150M tokens)
```

#### Sniper Protection
1. **Navigate** to Sniper Shield from footer
2. **Enable** "Advanced Sniper Protection" ✅
3. **Set Protection Duration**: 60 seconds (recommended)
4. **Configure Sensitivity**: "High" for maximum protection

### Step 5: Review and Prepare

1. **Navigate** back to project management
2. **Review** all settings in the project overview
3. **Check** fee calculation (should show 0.035 SOL total)
4. **Verify** wallet balance is sufficient
5. **Click** "Deploy Metadata" to prepare launch

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

## 📊 Dashboard Features

### Accessing the Dashboard

After launching a token, access the comprehensive dashboard through:
1. **From Project Management**: Click "View Dashboard" button
2. **From Saved Projects**: Select project and click "Dashboard"
3. **From Launch History**: Click on any launched project

### Dashboard Overview

#### Integrated Header
- **Vantage Branding**: Consistent logo and branding
- **Settings Access**: Quick access to extension settings
- **Project Context**: Current project ID and platform display

#### Market Overview Section
```
Real-time Market Data:
📈 Market Cap: Live market capitalization with 24h change
💰 Token Price: Current price with percentage change
📊 Trading Volume: 24h volume with trend indicators
```

#### Portfolio Management
```
Portfolio Metrics:
💎 Total SOL Holdings: Across all project wallets
📈 Profit/Loss Tracking: Real-time P&L calculation
👥 Active Wallets: Number of wallets with token holdings
📊 Distribution Analysis: Detailed wallet breakdown
```

### Trading Interface

#### Direct Trading Features
- **Buy Orders**: Purchase tokens directly from dashboard
- **Sell Orders**: Sell tokens with precise amount control
- **Sell All**: Quick liquidation of all holdings
- **Multi-Wallet Trading**: Execute trades across multiple wallets

#### Wallet Selection
```
Trading Controls:
✅ Select All Wallets: Trade from all project wallets
🎯 Individual Selection: Choose specific wallets
📊 Selection Summary: View selected wallet count
🔄 Clear Selection: Reset wallet selection
```

### Wallet Management Dashboard

#### Wallet Display Features
- **Real-time Balances**: Live SOL and token balance updates
- **Performance Tracking**: Individual wallet profit/loss
- **Transaction History**: Complete transaction log per wallet
- **Selection Controls**: Multi-select for batch operations

#### Wallet Information
```
Per-Wallet Data:
🆔 Wallet ID: Unique identifier
📍 Address: Full Solana address (abbreviated display)
💰 Holdings: Current token balance
📈 P&L: Profit/loss since acquisition
⏰ Buy Time: Initial purchase timestamp
```

---

## 🔧 Advanced Features

### Enhanced Sniper Shield

#### Accessing Shield Interface
1. **Click Shield Button** in footer navigation
2. **Available from**: Home, History, or any main screen
3. **Persistent Access**: Always available when needed

#### Protection Status Management
- **Visual Status Indicator**: Clear active/inactive display
- **One-Click Toggle**: Enable/disable protection instantly
- **Real-time Monitoring**: Live protection status updates
- **Status Descriptions**: Clear explanation of current state

#### Auto-Sell Protection
```
Configuration Options:
📊 Sell Percentage: 25%, 50%, 75%, or 100%
⏱️ Trigger Delay: Instant, 5s, 10s, or 30s
🎯 Custom Rules: Advanced trigger conditions
```

#### Blacklist Management
```
Blacklist Features:
➕ Manual Addition: Add wallet addresses manually
🤖 Auto-Detection: Automatic bot identification
🔍 Filter Views: All, auto-detected, or manual
📊 Statistics: Real-time blocking metrics
🗑️ Bulk Operations: Clear all or export data
```

### Instant Relaunch System

#### Relaunch Process
1. **Access Failed Launch**: From launch history or saved projects
2. **Click "Relaunch"**: One-click relaunch button
3. **Modify Settings** (Optional): Update any configuration
4. **Execute Relaunch**: Deploy with same or updated settings

#### Relaunch Benefits
- **Speed**: Sub-30-second redeployment
- **Learning**: Apply lessons from previous attempts
- **Flexibility**: Modify any settings before relaunch
- **Cost Efficiency**: No need to reconfigure everything

### Advanced Analytics

#### Launch Performance Tracking
- **Real-time Metrics**: Live launch progress monitoring
- **Community Response**: Track holder acquisition
- **Market Impact**: Price and volume analysis
- **Success Indicators**: Key performance metrics

#### Historical Analysis
- **Launch Comparison**: Compare multiple launches
- **Trend Analysis**: Identify patterns and improvements
- **Performance Optimization**: Data-driven launch improvements

---

## 💡 Best Practices

### Pre-Launch Checklist

#### Technical Preparation
- [ ] Test wallet connection and verify balance
- [ ] Complete metadata configuration and review
- [ ] Set up multi-wallet distribution
- [ ] Configure sniper protection settings
- [ ] Test navigation and familiarize with interface

#### Marketing Preparation  
- [ ] Community announcement prepared and scheduled
- [ ] Social media posts ready for launch
- [ ] Influencer coordination confirmed
- [ ] Launch timing communicated to community
- [ ] Backup communication channels prepared

#### Content Preparation
- [ ] Token image optimized and tested in preview
- [ ] Description proofread and engaging
- [ ] Symbol availability verified on platform
- [ ] Website and social links prepared
- [ ] Documentation or whitepaper completed

### Navigation Efficiency Tips

#### Workflow Optimization
- **Use Footer Navigation**: Quick access to main features
- **Leverage State Preservation**: Work saved across navigation
- **Utilize Back Buttons**: Always clear path to return
- **Access Settings Globally**: Available from any screen

#### Time-Saving Features
- **Draft Management**: Save multiple project configurations
- **Quick Relaunch**: Instant redeployment capability
- **Batch Operations**: Multi-wallet management
- **Real-time Updates**: Live data without refresh



### Risk Management

#### Financial Safety
- **Budget Management**: Never invest more than you can afford to lose
- **Emergency Reserves**: Keep backup SOL for failed launch recovery
- **Diversification**: Use multiple launch strategies and timing
- **Fee Monitoring**: Track gas fees and network congestion

#### Technical Safety
- **Configuration Backup**: Save all launch configurations
- **Testing Strategy**: Test with small amounts first
- **Stealth Preparation**: Use stealth mode for thorough preparation
- **Recovery Planning**: Have relaunch strategy ready

---

## 🐛 Troubleshooting

### Common Navigation Issues

#### Footer Not Visible
**Problem**: Footer navigation not showing
**Solution**: 
- Check if you're on a main screen (Home, Shield, History, Disperser)
- Footer is hidden during project workflows by design
- Navigate back to home to restore footer

#### Back Button Not Working
**Problem**: Back button doesn't respond
**Solution**:
- Refresh the extension by closing and reopening
- Check browser console for errors
- Ensure you're not in a modal or overlay

#### State Not Preserved
**Problem**: Work lost when navigating
**Solution**:
- Ensure auto-save is enabled in settings
- Check browser storage permissions
- Avoid closing extension during active work

### Dashboard Issues

#### Data Not Loading
**Problem**: Dashboard shows no data or loading indefinitely
**Solution**:
- Check internet connection
- Verify wallet connection
- Refresh the dashboard view
- Check Solana network status

#### Trading Interface Disabled
**Problem**: Buy/Sell buttons are disabled
**Solution**:
- Ensure sufficient SOL balance
- Verify wallet connection
- Select at least one wallet for trading
- Check token launch status

### Launch Problems

#### Launch Fails Immediately
**Problem**: Launch fails within seconds
**Solution**:
- Check SOL balance (minimum 0.035 SOL required)
- Verify network connection stability
- Ensure metadata is properly configured
- Try relaunching with same configuration

#### Sniper Protection Not Working
**Problem**: Bots still purchasing during protection window
**Solution**:
- Increase protection sensitivity in Shield settings
- Extend protection duration
- Check blacklist configuration
- Monitor protection analytics for effectiveness

### Performance Issues

#### Extension Running Slowly
**Problem**: Vantage interface is laggy or unresponsive
**Solution**:
- Close unnecessary browser tabs
- Disable other extensions temporarily
- Clear browser cache and restart
- Check available system memory

#### Network Connection Problems
**Problem**: Unable to connect to Solana network
**Solution**:
- Check internet connection stability
- Try different RPC endpoint in settings
- Verify firewall isn't blocking connections
- Check Solana network status

### Recovery Procedures

#### Lost Configuration
**Problem**: Project configuration disappeared
**Solution**:
- Check Saved Projects for auto-saved drafts
- Look in browser storage for backup data
- Use relaunch feature if project was previously launched
- Contact support with project details

#### Wallet Connection Issues
**Problem**: Cannot connect or wallet disconnected
**Solution**:
- Refresh wallet extension
- Clear wallet cache and reconnect
- Try different wallet if available
- Check wallet compatibility with Vantage

---

## 🎓 Advanced Usage Tips

### Power User Features

#### Keyboard Shortcuts
- **Ctrl/Cmd + R**: Refresh current view
- **Esc**: Close modals and return to previous screen
- **Tab**: Navigate between form fields efficiently

#### Batch Operations
- **Multi-Wallet Selection**: Select multiple wallets for batch trading
- **Bulk Configuration**: Apply settings across multiple projects
- **Mass Export**: Export data from multiple launches

#### Automation Features
- **Auto-Save**: Automatic configuration saving
- **Smart Defaults**: Intelligent default settings based on usage
- **Quick Actions**: One-click common operations

### Integration Tips

#### External Tool Integration
- **Export Data**: CSV export for external analysis
- **API Access**: Programmatic access (coming soon)
- **Webhook Integration**: Real-time notifications

#### Community Management
- **Launch Coordination**: Tools for community launches
- **Analytics Sharing**: Share performance data with community
- **Feedback Integration**: Incorporate community suggestions

---

**Ready to launch your first token?** Start with the [Getting Started](#getting-started) section and follow the step-by-step walkthrough. For additional help, check our [FAQ](faq.md) or join our community discussions.

---

*Vantage: Making memecoin deployment accessible, secure, and successful for everyone.* 🚀 