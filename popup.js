// DOM elements
const profilePicture = document.getElementById('profilePicture');
const username = document.getElementById('username');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeModal = document.getElementById('closeModal');
const themeToggle = document.getElementById('themeToggle');

// Footer navigation buttons
const homeBtn = document.getElementById('homeBtn');
const walletBtn = document.getElementById('walletBtn');
const historyBtn = document.getElementById('historyBtn');
const shieldBtn = document.getElementById('shieldBtn');

// Load user data from storage
function loadUserData() {
    chrome.storage.sync.get(['username', 'profilePicture', 'theme'], (result) => {
        if (result.username) {
            username.textContent = result.username;
        }
        if (result.profilePicture) {
            profilePicture.src = result.profilePicture;
        } else {
            // Default to Vantage logo if no custom profile picture is set
            profilePicture.src = 'icons/icon48.png';
        }
        
        // Load theme preference
        if (result.theme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.checked = true;
        }
    });
}

// Settings button click handler
settingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('show');
});

// Close modal handlers
closeModal.addEventListener('click', () => {
    settingsModal.classList.remove('show');
});

settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.classList.remove('show');
    }
});

// Theme toggle handler
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('light-mode');
        chrome.storage.sync.set({ theme: 'light' });
    } else {
        document.body.classList.remove('light-mode');
        chrome.storage.sync.set({ theme: 'dark' });
    }
});

// Profile picture click handler for changing profile picture
profilePicture.addEventListener('click', () => {
    const imageUrl = prompt('Enter image URL for profile picture:');
    if (imageUrl && imageUrl.trim()) {
        profilePicture.src = imageUrl.trim();
        // Save to storage
        chrome.storage.sync.set({ profilePicture: imageUrl.trim() });
    }
});

// Initialize the extension
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
});

// Add some interactive feedback
profilePicture.addEventListener('mouseenter', () => {
    profilePicture.style.transform = 'scale(1.05)';
    profilePicture.style.transition = 'transform 0.2s ease';
});

profilePicture.addEventListener('mouseleave', () => {
    profilePicture.style.transform = 'scale(1)';
});

// Add click feedback for username
username.addEventListener('click', () => {
    const newUsername = prompt('Enter your username:', username.textContent);
    if (newUsername && newUsername.trim()) {
        username.textContent = newUsername.trim();
        chrome.storage.sync.set({ username: newUsername.trim() });
    }
});

username.style.cursor = 'pointer';
profilePicture.style.cursor = 'pointer';

// Footer navigation handlers
function setActiveFooterBtn(activeBtn) {
    // Remove active class from all buttons
    [homeBtn, walletBtn, historyBtn, shieldBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    // Add active class to clicked button
    activeBtn.classList.add('active');
}

homeBtn.addEventListener('click', () => {
    setActiveFooterBtn(homeBtn);
    // Show home content (already visible by default)
    console.log('Home clicked');
});

walletBtn.addEventListener('click', () => {
    setActiveFooterBtn(walletBtn);
    // TODO: Show wallet interface
    console.log('Wallet clicked');
});

historyBtn.addEventListener('click', () => {
    setActiveFooterBtn(historyBtn);
    // TODO: Show past launches history
    console.log('History clicked');
});

shieldBtn.addEventListener('click', () => {
    setActiveFooterBtn(shieldBtn);
    // TODO: Show sniper shield detection
    console.log('Shield clicked');
}); 