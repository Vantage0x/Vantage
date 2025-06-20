// DOM elements
const profilePicture = document.getElementById('profilePicture');
const username = document.getElementById('username');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeModal = document.getElementById('closeModal');
const themeToggle = document.getElementById('themeToggle');
const notificationsToggle = document.getElementById('notificationsToggle');
const autoSaveToggle = document.getElementById('autoSaveToggle');

// Home action buttons
const createProjectBtn = document.getElementById('createProjectBtn');
const savedProjectsBtn = document.getElementById('savedProjectsBtn');
const getSolBtn = document.getElementById('getSolBtn');
const pfRewardsBtn = document.getElementById('pfRewardsBtn');
const docBtn = document.getElementById('docBtn');
const followTwitterBtn = document.getElementById('followTwitterBtn');

// Stats elements
const projectCount = document.getElementById('projectCount');
const launchCount = document.getElementById('launchCount');
const successRate = document.getElementById('successRate');

// Footer navigation buttons
const homeBtn = document.getElementById('homeBtn');
const walletBtn = document.getElementById('walletBtn');
const historyBtn = document.getElementById('historyBtn');
const shieldBtn = document.getElementById('shieldBtn');

// Create Project UI elements
const createProjectUI = document.getElementById('createProjectUI');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const deleteProjectBtn = document.getElementById('deleteProjectBtn');
const projectIdValue = document.getElementById('projectIdValue');
const mainContent = document.querySelector('.main-content');
const tokenNameInput = document.getElementById('tokenName');
const tokenSymbolInput = document.getElementById('tokenSymbol');
const tokenDescriptionInput = document.getElementById('tokenDescription');
const pumpfunOption = document.getElementById('pumpfunOption');
const launchlabOption = document.getElementById('launchlabOption');
const continueBtn = document.getElementById('continueBtn');

// Load user data and stats from storage
function loadUserData() {
    chrome.storage.sync.get(['theme', 'notifications', 'autoSave', 'projects', 'launches', 'successfulLaunches'], (result) => {
        // Load theme preference
        if (result.theme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.checked = true;
        }
        
        // Load settings
        if (result.notifications !== undefined) {
            notificationsToggle.checked = result.notifications;
        }
        if (result.autoSave !== undefined) {
            autoSaveToggle.checked = result.autoSave;
        }
        
        // Load stats
        const projects = result.projects || [];
        const launches = result.launches || 0;
        const successfulLaunches = result.successfulLaunches || 0;
        
        updateStats(projects.length, launches, successfulLaunches);
    });
}

// Update stats display
function updateStats(projects, launches, successful) {
    projectCount.textContent = projects;
    launchCount.textContent = launches;
    
    if (launches > 0) {
        const rate = Math.round((successful / launches) * 100);
        successRate.textContent = `${rate}%`;
    } else {
        successRate.textContent = '--%';
    }
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

// Notifications toggle handler
notificationsToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ notifications: notificationsToggle.checked });
});

// Auto save toggle handler
autoSaveToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ autoSave: autoSaveToggle.checked });
});

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
    // Already on home page
    console.log('Home clicked');
});

walletBtn.addEventListener('click', () => {
    setActiveFooterBtn(walletBtn);
    addButtonFeedback(walletBtn);
    // TODO: Navigate to wallet interface
    console.log('Wallet clicked - Navigate to wallet page');
    showNotification('Opening wallet...', 'info');
});

historyBtn.addEventListener('click', () => {
    setActiveFooterBtn(historyBtn);
    addButtonFeedback(historyBtn);
    // TODO: Navigate to launch history
    console.log('History clicked - Navigate to launch history');
    showNotification('Loading launch history...', 'info');
});

shieldBtn.addEventListener('click', () => {
    setActiveFooterBtn(shieldBtn);
    addButtonFeedback(shieldBtn);
    // TODO: Navigate to sniper shield
    console.log('Shield clicked - Navigate to sniper protection');
    showNotification('Opening sniper protection...', 'info');
});

// Home action button handlers
createProjectBtn.addEventListener('click', () => {
    addButtonFeedback(createProjectBtn);
    // Show Create Project UI
    showCreateProjectUI();
});

savedProjectsBtn.addEventListener('click', () => {
    addButtonFeedback(savedProjectsBtn);
    // TODO: Navigate to saved projects page
    console.log('Saved Projects clicked - Navigate to saved projects');
    showNotification('Loading saved projects...', 'info');
});

getSolBtn.addEventListener('click', () => {
    addButtonFeedback(getSolBtn);
    // TODO: Navigate to SOL purchase page
    console.log('Get SOL clicked - Navigate to SOL purchase');
    showNotification('Opening SOL purchase options...', 'info');
});

pfRewardsBtn.addEventListener('click', () => {
    addButtonFeedback(pfRewardsBtn);
    // TODO: Navigate to PF rewards page
    console.log('PF Rewards clicked - Navigate to pump.fun rewards');
    showNotification('Loading PF rewards...', 'info');
});

docBtn.addEventListener('click', () => {
    addButtonFeedback(docBtn);
    // Open documentation page in new tab
    chrome.tabs.create({ url: 'https://github.com/Vantage0x/Vantage/blob/main/docs/how-to-use.md' });
    showNotification('Opening documentation...', 'success');
});

followTwitterBtn.addEventListener('click', () => {
    addButtonFeedback(followTwitterBtn);
    // Open Twitter/X page in new tab
    chrome.tabs.create({ url: 'https://x.com/Vantage0x' });
    showNotification('Opening @Vantage0x on X...', 'success');
});

// Add visual feedback for button clicks
function addButtonFeedback(button) {
    button.style.transform = 'scale(0.95)';
    button.style.transition = 'transform 0.1s ease';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Add type-specific colors
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else if (type === 'warning') {
        notification.style.background = '#f59e0b';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add hover effects for action buttons
function addHoverEffects() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effect for follow button
    followTwitterBtn.addEventListener('mouseenter', () => {
        followTwitterBtn.style.transform = 'translateY(-2px)';
        followTwitterBtn.style.transition = 'transform 0.2s ease';
    });
    
    followTwitterBtn.addEventListener('mouseleave', () => {
        followTwitterBtn.style.transform = 'translateY(0)';
    });
}

// Simulate some demo data for stats (remove this in production)
function loadDemoStats() {
    // This is just for demo purposes - remove when implementing real data
    setTimeout(() => {
        updateStats(3, 5, 4); // 3 projects, 5 launches, 4 successful (80% success rate)
    }, 1000);
}

// User ID Management
async function generateUniqueUserId() {
    // Generate a unique ID using timestamp + random string
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 15);
    const randomStr2 = Math.random().toString(36).substring(2, 15);
    return `VTG-${timestamp}-${randomStr}${randomStr2}`.toUpperCase();
}

async function getUserId() {
    try {
        const result = await chrome.storage.sync.get(['vantageUserId']);
        if (result.vantageUserId) {
            return result.vantageUserId;
        } else {
            // Generate new user ID
            const newUserId = await generateUniqueUserId();
            await chrome.storage.sync.set({ vantageUserId: newUserId });
            return newUserId;
        }
    } catch (error) {
        console.error('Error getting user ID:', error);
        // Fallback to localStorage if chrome.storage fails
        let userId = localStorage.getItem('vantageUserId');
        if (!userId) {
            userId = await generateUniqueUserId();
            localStorage.setItem('vantageUserId', userId);
        }
        return userId;
    }
}

async function setUserId(userId) {
    try {
        await chrome.storage.sync.set({ vantageUserId: userId });
        localStorage.setItem('vantageUserId', userId); // Backup in localStorage
        return true;
    } catch (error) {
        console.error('Error setting user ID:', error);
        localStorage.setItem('vantageUserId', userId);
        return false;
    }
}

async function loadUserId() {
    const userId = await getUserId();
    const userIdDisplay = document.getElementById('userIdDisplay');
    if (userIdDisplay) {
        userIdDisplay.textContent = userId;
    }
}

// Copy User ID to clipboard
async function copyUserId() {
    const userId = await getUserId();
    try {
        await navigator.clipboard.writeText(userId);
        showNotification('User ID copied to clipboard!', 'success');
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = userId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('User ID copied to clipboard!', 'success');
    }
}

// Restore User ID
async function restoreUserId() {
    // Show the restore modal
    const modal = document.getElementById('restoreUserIdModal');
    modal.style.display = 'flex';
    
    // Clear and focus the input
    const input = document.getElementById('restoreUserIdInput');
    input.value = '';
    setTimeout(() => input.focus(), 100);
}

// Generate new User ID
async function regenerateUserId() {
    // Show the generate new ID modal
    const modal = document.getElementById('generateNewIdModal');
    modal.style.display = 'flex';
}

// Initialize the extension
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    addHoverEffects();
    loadDemoStats(); // Remove this line when implementing real stats
    loadUserId(); // Load the user ID
    
    // Add some startup animation
    setTimeout(() => {
        document.querySelector('.home-dashboard').style.opacity = '1';
        document.querySelector('.home-dashboard').style.transform = 'translateY(0)';
    }, 100);
});

// Add CSS for startup animation
const style = document.createElement('style');
style.textContent = `
    .home-dashboard {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(style);

// Create Project UI Functions
function showCreateProjectUI() {
    mainContent.style.display = 'none';
    createProjectUI.style.display = 'flex';
    // Reset form and generate new project ID
    resetCreateProjectForm();
    generateProjectID();
    // Scroll to top of the Create Project UI
    createProjectUI.scrollTop = 0;
}

function hideCreateProjectUI() {
    createProjectUI.style.display = 'none';
    mainContent.style.display = 'flex';
}

function generateProjectID() {
    // Generate random 4-character alphanumeric ID
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'VTG-';
    for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    projectIdValue.textContent = result;
}

function resetCreateProjectForm() {
    tokenNameInput.value = '';
    tokenSymbolInput.value = '';
    tokenDescriptionInput.value = '';
    // Reset platform selection
    document.querySelectorAll('.platform-option').forEach(option => {
        option.classList.remove('active');
    });
    pumpfunOption.classList.add('active');
    updateContinueButton();
}

function updateContinueButton() {
    const hasTokenName = tokenNameInput.value.trim().length > 0;
    const hasTokenSymbol = tokenSymbolInput.value.trim().length > 0;
    const hasDescription = tokenDescriptionInput.value.trim().length > 0;
    const hasActivePlatform = document.querySelector('.platform-option.active:not(.disabled)');
    
    if (hasTokenName && hasTokenSymbol && hasDescription && hasActivePlatform) {
        continueBtn.disabled = false;
        const platformName = hasActivePlatform.querySelector('h4').textContent;
        continueBtn.querySelector('span').textContent = `Continue with ${platformName}`;
    } else {
        continueBtn.disabled = true;
        continueBtn.querySelector('span').textContent = 'Continue';
    }
}

// Back to Home button
backToHomeBtn.addEventListener('click', () => {
    addButtonFeedback(backToHomeBtn);
    hideCreateProjectUI();
});

// Delete project button
if (deleteProjectBtn) {
    deleteProjectBtn.addEventListener('click', () => {
        // Show custom confirmation modal
        const modal = document.getElementById('deleteConfirmModal');
        const projectIdSpan = document.getElementById('deleteProjectId');
        const projectIdElement = document.getElementById('projectId');
        
        if (projectIdElement) {
            projectIdSpan.textContent = projectIdElement.textContent;
        }
        
        modal.classList.add('show');
    });
}

// Cancel delete button
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener('click', () => {
        const modal = document.getElementById('deleteConfirmModal');
        modal.classList.remove('show');
    });
}

// Confirm delete button
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
        // Hide modal
        const modal = document.getElementById('deleteConfirmModal');
        modal.classList.remove('show');
        
        // Get project ID for notification
        const projectIdElement = document.getElementById('projectId');
        const projectId = projectIdElement ? projectIdElement.textContent : 'Project';
        
        // Show success notification
        showNotification(`${projectId} deleted successfully`, 'success');
        
        // Reset form and return to home
        resetCreateProjectForm();
        hideCreateProjectUI();
    });
}

// Close modal when clicking outside
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
if (deleteConfirmModal) {
    deleteConfirmModal.addEventListener('click', (e) => {
        if (e.target === deleteConfirmModal) {
            deleteConfirmModal.classList.remove('show');
        }
    });
}

// User ID button event listeners
const copyUserIdBtn = document.getElementById('copyUserIdBtn');
if (copyUserIdBtn) {
    copyUserIdBtn.addEventListener('click', copyUserId);
}

const restoreUserIdBtn = document.getElementById('restoreUserIdBtn');
if (restoreUserIdBtn) {
    restoreUserIdBtn.addEventListener('click', restoreUserId);
}

const regenerateUserIdBtn = document.getElementById('regenerateUserIdBtn');
if (regenerateUserIdBtn) {
    regenerateUserIdBtn.addEventListener('click', regenerateUserId);
}

// Restore User ID Modal event listeners
const restoreUserIdModal = document.getElementById('restoreUserIdModal');
const cancelRestoreBtn = document.getElementById('cancelRestoreBtn');
const confirmRestoreBtn = document.getElementById('confirmRestoreBtn');
const restoreUserIdInput = document.getElementById('restoreUserIdInput');

if (cancelRestoreBtn) {
    cancelRestoreBtn.addEventListener('click', () => {
        restoreUserIdModal.style.display = 'none';
    });
}

if (confirmRestoreBtn) {
    confirmRestoreBtn.addEventListener('click', async () => {
        const userInput = restoreUserIdInput.value.trim();
        if (userInput) {
            const cleanUserId = userInput.toUpperCase();
            // Basic validation
            if (cleanUserId.startsWith('VTG-') && cleanUserId.length > 10) {
                await setUserId(cleanUserId);
                await loadUserId();
                showNotification('User ID restored successfully!', 'success');
                restoreUserIdModal.style.display = 'none';
            } else {
                showNotification('Invalid User ID format!', 'error');
            }
        }
    });
}

// Close modal when clicking outside
if (restoreUserIdModal) {
    restoreUserIdModal.addEventListener('click', (e) => {
        if (e.target === restoreUserIdModal) {
            restoreUserIdModal.style.display = 'none';
        }
    });
}

// Allow Enter key to confirm restore
if (restoreUserIdInput) {
    restoreUserIdInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            confirmRestoreBtn.click();
        }
    });
}

// Generate New ID Modal event listeners
const generateNewIdModal = document.getElementById('generateNewIdModal');
const cancelGenerateBtn = document.getElementById('cancelGenerateBtn');
const confirmGenerateBtn = document.getElementById('confirmGenerateBtn');

if (cancelGenerateBtn) {
    cancelGenerateBtn.addEventListener('click', () => {
        generateNewIdModal.style.display = 'none';
    });
}

if (confirmGenerateBtn) {
    confirmGenerateBtn.addEventListener('click', async () => {
        const newUserId = await generateUniqueUserId();
        await setUserId(newUserId);
        await loadUserId();
        showNotification('New User ID generated!', 'success');
        generateNewIdModal.style.display = 'none';
    });
}

// Close modal when clicking outside
if (generateNewIdModal) {
    generateNewIdModal.addEventListener('click', (e) => {
        if (e.target === generateNewIdModal) {
            generateNewIdModal.style.display = 'none';
        }
    });
}

// Form input validation
tokenNameInput.addEventListener('input', updateContinueButton);
tokenSymbolInput.addEventListener('input', updateContinueButton);
tokenSymbolInput.addEventListener('blur', () => {
    // Auto-uppercase symbol on blur (when user finishes typing)
    tokenSymbolInput.value = tokenSymbolInput.value.toUpperCase();
});
tokenDescriptionInput.addEventListener('input', updateContinueButton);

// Platform selection
pumpfunOption.addEventListener('click', () => {
    if (!pumpfunOption.classList.contains('disabled')) {
        selectPlatform(pumpfunOption);
    }
});

launchlabOption.addEventListener('click', () => {
    if (!launchlabOption.classList.contains('disabled')) {
        selectPlatform(launchlabOption);
    }
});

function selectPlatform(selectedOption) {
    // Remove active class from all options
    document.querySelectorAll('.platform-option').forEach(option => {
        option.classList.remove('active');
    });
    // Add active class to selected option
    selectedOption.classList.add('active');
    updateContinueButton();
}

// Continue button
continueBtn.addEventListener('click', () => {
    if (!continueBtn.disabled) {
        addButtonFeedback(continueBtn);
        const selectedPlatform = document.querySelector('.platform-option.active:not(.disabled)');
        const platformName = selectedPlatform.querySelector('h4').textContent;
        
        // TODO: Implement platform-specific launch flow
        showNotification(`Launching on ${platformName}...`, 'info');
        console.log('Token Details:', {
            name: tokenNameInput.value,
            symbol: tokenSymbolInput.value,
            description: tokenDescriptionInput.value,
            platform: platformName
        });
    }
}); 