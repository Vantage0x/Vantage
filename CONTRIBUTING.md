# Contributing to Vantage

Thank you for your interest in contributing to Vantage! 🚀 This Chrome extension helps developers launch tokens on Solana platforms like Pump.fun and Raydium with enhanced speed, security, and sniper resistance.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Security](#security)

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative and constructive
- Focus on what's best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Chrome Browser** (latest version)
- **Git** for version control
- Basic knowledge of **JavaScript**, **HTML**, and **CSS**
- Understanding of **Chrome Extension APIs**
- Familiarity with **Solana blockchain** (helpful but not required)

### Fork and Clone

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/Vantage.git
   cd Vantage
   ```
3. **Add upstream** remote:
   ```bash
   git remote add upstream https://github.com/Vantage0x/Vantage.git
   ```

## 🛠️ Development Setup

### Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (top-right toggle)
3. Click **"Load unpacked"**
4. Select the project directory
5. The extension should appear in your extensions list

### File Structure

```
vantage/
├── manifest.json       # Extension manifest
├── popup.html         # Extension popup UI
├── popup.js          # Main extension logic
├── styles.css        # Styling
├── icons/            # Extension icons
├── README.md         # Project documentation
└── CONTRIBUTING.md   # This file
```

### Testing Changes

1. Make your changes to the code
2. Go to `chrome://extensions/`
3. Click the **refresh icon** on the Vantage extension
4. Test your changes by clicking the extension icon

## 📝 Contributing Guidelines

### Branching Strategy

- `main` - Production-ready code
- `develop` - Development branch (if applicable)
- Feature branches: `feature/your-feature-name`
- Bug fixes: `bugfix/issue-description`

### Coding Standards

#### JavaScript
- Use **ES6+** syntax
- Follow **camelCase** naming convention
- Add comments for complex logic
- Use `const` and `let` instead of `var`
- Handle errors gracefully

#### HTML/CSS
- Use semantic HTML elements
- Follow **BEM** methodology for CSS classes
- Ensure responsive design
- Maintain accessibility standards

#### Example Code Style:
```javascript
// Good
const tokenAddress = await getTokenAddress();
const isValidToken = validateSolanaAddress(tokenAddress);

// Comment explaining complex logic
if (isValidToken && tokenAddress.length === 44) {
    await processTokenLaunch(tokenAddress);
}
```

### Commit Messages

Follow the **Conventional Commits** specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

#### Examples:
```
feat: add sniper protection mechanism
fix: resolve popup loading issue on Chrome 120+
docs: update installation instructions
style: improve button hover animations
```

## 🔄 Pull Request Process

### Before Submitting

1. **Sync** with upstream:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Test** your changes thoroughly
4. **Update** documentation if needed

### Submitting a Pull Request

1. **Push** your branch to your fork
2. **Create** a pull request from your fork to the main repository
3. **Fill out** the PR template completely
4. **Link** any related issues

### PR Requirements

- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Testing performed on latest Chrome version
- [ ] Documentation updated (if applicable)
- [ ] No console errors or warnings
- [ ] Extension loads and functions correctly

### Review Process

1. **Automated checks** will run
2. **Code review** by maintainers
3. **Requested changes** (if any) must be addressed
4. **Approval** from at least one maintainer
5. **Merge** into main branch

## 🐛 Issue Reporting

### Bug Reports

When reporting bugs, please include:

- **Chrome version** and OS
- **Extension version**
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Console errors** (if any)

### Bug Report Template

```markdown
**Describe the Bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- Chrome Version: [e.g. 120.0.6099.109]
- OS: [e.g. macOS 14.0]
- Extension Version: [e.g. 1.0.0]
```

## 💡 Feature Requests

We welcome feature requests! Please:

1. **Check** existing issues first
2. **Use** the feature request template
3. **Provide** clear use cases
4. **Explain** how it benefits users
5. **Consider** implementation complexity

## 🔒 Security

### Reporting Security Issues

⚠️ **DO NOT** create public issues for security vulnerabilities.

Instead:
1. Email security concerns to: `security@vantage0x.com`
2. Include detailed description
3. Provide steps to reproduce
4. We'll respond within 48 hours

### Security Best Practices

- Never expose private keys or sensitive data
- Validate all user inputs
- Use secure communication protocols
- Follow Chrome extension security guidelines
- Regularly update dependencies

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

### High Priority
- **Performance optimizations**
- **Security enhancements**
- **Cross-platform compatibility**
- **User experience improvements**

### Medium Priority
- **Code documentation**
- **Test coverage**
- **Error handling**
- **Accessibility features**

### Low Priority
- **Code cleanup**
- **Style improvements**
- **Additional features**

## 📚 Resources

### Helpful Links
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Solana Developer Docs](https://docs.solana.com/)
- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

### Community
- **Discord**: [Join our community](#) (coming soon)
- **Twitter**: [@Vantage0x](#) (coming soon)
- **GitHub Discussions**: Use for questions and discussions

## 🏆 Recognition

Contributors will be:
- **Listed** in our contributors section
- **Mentioned** in release notes
- **Invited** to our contributor Discord channel
- **Eligible** for contributor NFTs (planned)

## 📄 License

By contributing to Vantage, you agree that your contributions will be licensed under the same [MIT License](LICENSE) that covers the project.

---

## 💬 Questions?

If you have any questions about contributing, feel free to:
- **Open** a GitHub discussion
- **Create** an issue with the `question` label
- **Reach out** to maintainers

Thank you for helping make Vantage better! 🙏

---

**Happy Contributing!** 🚀 