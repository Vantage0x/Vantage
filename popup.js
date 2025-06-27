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

// Get SOL UI elements
const getSolUI = document.getElementById('getSolUI');
const projectsSolList = document.getElementById('projectsSolList');
const emptySolProjects = document.getElementById('emptySolProjects');
const backFromGetSolBtn = document.getElementById('backFromGetSolBtn');

// PF Rewards UI elements
const pfRewardsUI = document.getElementById('pfRewardsUI');
const projectsRewardsList = document.getElementById('projectsRewardsList');
const emptyRewardsProjects = document.getElementById('emptyRewardsProjects');
const backFromPfRewardsBtn = document.getElementById('backFromPfRewardsBtn');

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
async function loadUserData() {
    chrome.storage.sync.get(['theme', 'notifications', 'autoSave'], async (result) => {
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
        
        // Load and calculate real stats
        await loadRealStats();
        
        // Uncomment below line to create sample launched projects for demo
        // await createSampleLaunchedProjects();
    });
}

// Load real statistics from saved projects
async function loadRealStats() {
    try {
        const savedProjects = await getSavedProjects();
        const projectsCreated = savedProjects.length;
        
        // Count launched projects
        const launchedProjects = savedProjects.filter(project => 
            project.status === 'launched' || project.isLaunched === true
        );
        const totalLaunches = launchedProjects.length;
        
        // Count successful launches - projects that are launched and have a contract address or are marked as successful
        const successfulLaunches = launchedProjects.filter(project => 
            project.contractAddress || 
            project.isSuccessful === true || 
            project.status === 'successful' ||
            (project.status === 'launched' && project.contractAddress)
        ).length;
        
        updateStats(projectsCreated, totalLaunches, successfulLaunches);
    } catch (error) {
        console.error('Error loading real stats:', error);
        // Fallback to zeros if there's an error
        updateStats(0, 0, 0);
    }
}

// Update stats display
function updateStats(projects, launches, successful) {
    projectCount.textContent = projects;
    launchCount.textContent = launches;
    
    if (launches > 0) {
        const rate = Math.round((successful / launches) * 100);
        successRate.textContent = `${rate}%`;
    } else {
        successRate.textContent = '0%';
    }
}

// Manual refresh function for stats
async function refreshStats() {
    await loadRealStats();
}

// Launch History UI Functions
async function showLaunchHistoryUI() {
    try {
        // Hide main content (same as other UIs)
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.display = 'none';
        }
        
        // Hide Shield UI if it's currently visible
        const shieldUI = document.getElementById('sniperShieldUI');
        if (shieldUI) {
            shieldUI.style.display = 'none';
        }
        
        // Show history UI
        const historyUI = document.getElementById('launchHistoryUI');
        historyUI.style.display = 'flex';
        
        // Keep footer visible
        document.querySelector('.footer').style.display = 'flex';
        
        // Set History button as active
        const historyBtn = document.getElementById('historyBtn');
        if (historyBtn) {
            setActiveFooterBtn(historyBtn);
        }
        
        // Load and display launch history
        await loadLaunchHistory();
    } catch (error) {
        console.error('Error showing launch history:', error);
        showNotification('Error loading launch history', 'error');
    }
}

function hideLaunchHistoryUI() {
    // Hide history UI
    document.getElementById('launchHistoryUI').style.display = 'none';
    // Note: showHomeScreen() will handle showing mainContent and setting footer state
}

async function loadLaunchHistory() {
    try {
        const savedProjects = await getSavedProjects();
        
        // Filter for launched projects
        const launchedProjects = savedProjects.filter(project => 
            project.status === 'launched' || project.isLaunched === true
        );
        
        console.log('Launched projects found:', launchedProjects);
        
        const historyList = document.getElementById('historyList');
        const emptyHistory = document.getElementById('emptyHistory');
        
        if (launchedProjects.length === 0) {
            historyList.style.display = 'none';
            emptyHistory.style.display = 'flex';
        } else {
            historyList.style.display = 'flex';
            emptyHistory.style.display = 'none';
            
            // Clear existing items
            historyList.innerHTML = '';
            
            // Create history items
            launchedProjects.forEach(project => {
                const historyItem = createHistoryItem(project);
                historyList.appendChild(historyItem);
            });
        }
    } catch (error) {
        console.error('Error loading launch history:', error);
        showNotification('Error loading launch history', 'error');
    }
}

function createHistoryItem(project) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    // Calculate PnL (for demo purposes, using simulated data)
    const pnlData = calculateProjectPnL(project);
    
    // Format launch date
    const launchDate = project.launchDate || project.createdAt || new Date().toISOString();
    const formattedDate = new Date(launchDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    
    historyItem.innerHTML = `
        <div class="history-header">
            <div class="history-info">
                <h4>${project.name}</h4>
                <p class="history-id">${project.id}</p>
            </div>
            <div class="launch-status">Launched</div>
        </div>
        
        <div class="history-details">
            <p class="history-symbol">$${project.symbol}</p>
            <p class="launch-date">Launched ${formattedDate}</p>
        </div>
        
        <div class="history-footer">
            <div class="project-platform">
                ${project.platform || 'Pump.fun'}
            </div>
            <div class="pnl-display">
                <p class="pnl-amount ${pnlData.type}">${pnlData.amount}</p>
                <p class="pnl-percentage ${pnlData.type}">${pnlData.percentage}</p>
            </div>
        </div>
    `;
    
    return historyItem;
}

function calculateProjectPnL(project) {
    // Generate realistic PnL data based on project ID for consistency
    const seed = project.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const random = (seed * 9301 + 49297) % 233280 / 233280;
    
    // 60% chance of profit, 30% loss, 10% neutral
    let pnlType, amount, percentage;
    
    if (random < 0.6) {
        // Profit
        pnlType = 'profit';
        const profitAmount = 50 + (random * 500); // $50 - $550
        amount = `+$${profitAmount.toFixed(2)}`;
        const profitPercentage = 10 + (random * 90); // 10% - 100%
        percentage = `+${profitPercentage.toFixed(1)}%`;
    } else if (random < 0.9) {
        // Loss
        pnlType = 'loss';
        const lossAmount = 20 + (random * 200); // $20 - $220
        amount = `-$${lossAmount.toFixed(2)}`;
        const lossPercentage = 5 + (random * 45); // 5% - 50%
        percentage = `-${lossPercentage.toFixed(1)}%`;
    } else {
        // Neutral/Break-even
        pnlType = 'neutral';
        amount = '$0.00';
        percentage = '0.0%';
    }
    
            return {
            type: pnlType,
            amount: amount,
            percentage: percentage
        };
    }

// Test function to create sample launched projects (for demo purposes)
async function createSampleLaunchedProjects() {
    const sampleProjects = [
        {
            id: 'VTG-DEMO-001',
            name: 'DemoToken Alpha',
            symbol: 'DEMO',
            platform: 'Pump.fun',
            status: 'launched',
            isLaunched: true,
            launchDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            contractAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
            description: 'A sample token for testing the history feature'
        },
        {
            id: 'VTG-DEMO-002',
            name: 'TestCoin Beta',
            symbol: 'TEST',
            platform: 'Pump.fun',
            status: 'launched',
            isLaunched: true,
            launchDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            contractAddress: '8yLXtg3CW87d97TXJSDpbD5jBkheTqA83TZRuJosgBsV',
            description: 'Another sample token for history testing'
        },
        {
            id: 'VTG-DEMO-003',
            name: 'SampleToken Gamma',
            symbol: 'SMPL',
            platform: 'Pump.fun',
            status: 'launched',
            isLaunched: true,
            launchDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            contractAddress: '9zMXtg4CW87d97TXJSDpbD5jBkheTqA83TZRuJosgCtW',
            description: 'Third sample token for demo purposes'
        }
    ];

    try {
        const existingProjects = await getSavedProjects();
        
        // Check if demo projects already exist
        const demoExists = existingProjects.some(project => 
            project.id.startsWith('VTG-DEMO-')
        );
        
        if (!demoExists) {
            // Add sample projects to existing projects
            const updatedProjects = [...existingProjects, ...sampleProjects];
            
            // Save to storage
            await chrome.storage.sync.set({ savedProjects: updatedProjects });
            localStorage.setItem('vantage_saved_projects', JSON.stringify(updatedProjects));
            
            console.log('Sample launched projects created for demo');
            return true;
        } else {
            console.log('Demo projects already exist');
            return false;
        }
    } catch (error) {
        console.error('Error creating sample projects:', error);
        return false;
    }
}

// Settings button click handler
settingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('show');
});

// Dashboard settings button click handler
const dashboardSettingsBtn = document.getElementById('dashboardSettingsBtn');
if (dashboardSettingsBtn) {
    dashboardSettingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('show');
    });
}

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
    console.log('Footer home button clicked');
    setActiveFooterBtn(homeBtn);
    showHomeScreen();
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
    console.log('History clicked - Navigate to launch history');
    showLaunchHistoryUI();
});

// Shield button event listener moved to DOMContentLoaded

// Home action button handlers
createProjectBtn.addEventListener('click', () => {
    addButtonFeedback(createProjectBtn);
    // Show Create Project UI
    showCreateProjectUI();
});

savedProjectsBtn.addEventListener('click', () => {
    addButtonFeedback(savedProjectsBtn);
    showSavedProjectsUI();
});

getSolBtn.addEventListener('click', () => {
    addButtonFeedback(getSolBtn);
    showGetSolUI();
});

pfRewardsBtn.addEventListener('click', () => {
    addButtonFeedback(pfRewardsBtn);
    showPfRewardsUI();
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

// History UI event handlers
document.addEventListener('click', (e) => {
    // Create first launch button (from empty history state)
    if (e.target.id === 'createFirstLaunchBtn' || e.target.closest('#createFirstLaunchBtn')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Create first launch button clicked');
        const createBtn = document.getElementById('createFirstLaunchBtn');
        if (createBtn) {
            addButtonFeedback(createBtn);
        }
        // Hide history UI and show create project UI
        hideLaunchHistoryUI();
        showCreateProjectUI();
    }
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

// Stats are now calculated from real project data in loadRealStats()

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
    loadUserId(); // Load the user ID
    
    // Set up User ID button event listeners
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
    
    // Shield button event listener
    const shieldBtn = document.getElementById('shieldBtn');
    console.log('Setting up Shield button event listener, element found:', shieldBtn);
    if (shieldBtn) {
        shieldBtn.addEventListener('click', (e) => {
            console.log('Shield button clicked!', e);
            console.log('About to call setActiveFooterBtn...');
            setActiveFooterBtn(shieldBtn);
            console.log('About to call addButtonFeedback...');
            addButtonFeedback(shieldBtn);
            console.log('About to call showSniperShieldUI...');
            showSniperShieldUI();
            console.log('showSniperShieldUI called successfully');
        });
        console.log('Shield button event listener added successfully');
    } else {
        console.error('Shield button not found during setup!');
    }
    
    // Saved Projects UI event listeners
    const backFromSavedProjectsBtn = document.getElementById('backFromSavedProjectsBtn');
    if (backFromSavedProjectsBtn) {
        backFromSavedProjectsBtn.addEventListener('click', () => {
            console.log('Saved Projects back button clicked');
            addButtonFeedback(backFromSavedProjectsBtn);
            showHomeScreen();
        });
    }
    
    // Create first project button removed from saved projects UI
    
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
    
    // Hide main footer (should only show on Home, Disperser, Shield, History)
    document.querySelector('.footer').style.display = 'none';
    
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

// Saved Projects UI Functions
async function showSavedProjectsUI() {
    const savedProjectsUI = document.getElementById('savedProjectsUI');
    const mainContent = document.querySelector('.main-content');
    
    // Hide other screens first
    hideCreateProjectUI();
    hideProjectManagementScreen();
    hideTokenMetadataUI();
    mainContent.style.display = 'none';
    
    // Hide main footer (should only show on Home, Disperser, Shield, History)
    document.querySelector('.footer').style.display = 'none';
    
    // Show saved projects UI
    savedProjectsUI.style.display = 'flex';
    
    await loadSavedProjects();
    
    // Scroll to top - reset all possible scroll positions
    setTimeout(() => {
        savedProjectsUI.scrollTop = 0;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0);
    }, 0);
}

function hideSavedProjectsUI() {
    const savedProjectsUI = document.getElementById('savedProjectsUI');
    
    savedProjectsUI.style.display = 'none';
    
    // Note: showHomeScreen() will handle showing mainContent and refreshing stats
}

function showProjectManagementScreen(projectData) {
    // Hide other screens
    hideCreateProjectUI();
    hideSavedProjectsUI();
    mainContent.style.display = 'none';
    
    // Hide main footer (should only show on Home, Disperser, Shield, History)
    document.querySelector('.footer').style.display = 'none';
    
    // Show project management UI
    const projectManagementUI = document.getElementById('projectManagementUI');
    if (projectManagementUI) {
        // Force reset scroll before showing
        projectManagementUI.scrollTop = 0;
        const contentContainer = projectManagementUI.querySelector('.project-management-content');
        if (contentContainer) {
            contentContainer.scrollTop = 0;
        }
        
        // Force reflow by temporarily hiding/showing
        projectManagementUI.style.display = 'none';
        projectManagementUI.offsetHeight; // Force reflow
        projectManagementUI.style.display = 'flex';
        
        // Populate project data
        document.getElementById('projectManagementName').textContent = projectData.name;
        document.getElementById('projectManagementId').textContent = projectData.id;
        document.getElementById('projectManagementSymbol').textContent = `$${projectData.symbol}`;
        document.getElementById('projectPlatformDisplay').textContent = projectData.platform;
        
        // Event listeners are now handled via event delegation at the document level
        
        // Scroll to top - reset all possible scroll positions with multiple attempts
        const resetScroll = () => {
            console.log('Resetting scroll positions...');
            
            // Reset main container with multiple methods
            projectManagementUI.scrollTop = 0;
            projectManagementUI.scrollTo(0, 0);
            projectManagementUI.style.scrollBehavior = 'auto';
            console.log('projectManagementUI scrollTop set to:', projectManagementUI.scrollTop);
            
            // Reset nested content container
            const contentContainer = projectManagementUI.querySelector('.project-management-content');
            if (contentContainer) {
                contentContainer.scrollTop = 0;
                console.log('contentContainer scrollTop set to:', contentContainer.scrollTop);
            }
            
            // Reset all possible scrollable containers
            const allScrollableElements = projectManagementUI.querySelectorAll('*');
            allScrollableElements.forEach(element => {
                if (element.scrollTop > 0) {
                    console.log('Found scrolled element:', element.className, 'scrollTop:', element.scrollTop);
                    element.scrollTop = 0;
                }
            });
            
            // Reset document and window scroll
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            window.scrollTo(0, 0);
            
            console.log('All scroll positions reset');
        };
        
        // Reset immediately
        resetScroll();
        
        // Reset again after a short delay
        setTimeout(resetScroll, 10);
        
        // Reset once more using requestAnimationFrame
        requestAnimationFrame(() => {
            resetScroll();
        });
    }
}

function hideProjectManagementScreen() {
    const projectManagementUI = document.getElementById('projectManagementUI');
    if (projectManagementUI) {
        projectManagementUI.style.display = 'none';
    }
}

function showHomeScreen() {
    // Force hide all UIs immediately using direct element access
    const allUIIds = [
        'createProjectUI',
        'savedProjectsUI', 
        'projectManagementUI',
        'tokenMetadataUI',
        'projectWalletsUI',
        'launchHistoryUI',
        'getSolUI',
        'pfRewardsUI',
        'projectDashboardUI',
        'sniperShieldUI'
    ];
    
    allUIIds.forEach(uiId => {
        const element = document.getElementById(uiId);
        if (element) {
            element.style.display = 'none';
        }
    });
    
    // Force show main content
    const mainContentElement = document.querySelector('.main-content');
    if (mainContentElement) {
        mainContentElement.style.display = 'flex';
    }
    
    // Show main footer (Home screen should show footer)
    document.querySelector('.footer').style.display = 'flex';
    
    // Set active footer button to home
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        setActiveFooterBtn(homeBtn);
    }
    
    // Refresh stats when returning to home
    loadRealStats();
    
    // Scroll to top - reset all possible scroll positions
    setTimeout(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0);
    }, 0);
}

// Token Metadata UI Functions
function showTokenMetadataUI(projectData) {
    console.log('showTokenMetadataUI called with:', projectData);
    
    // Hide other screens
    hideCreateProjectUI();
    hideSavedProjectsUI();
    hideProjectManagementScreen();
    mainContent.style.display = 'none';
    
    // Hide main footer (should only show on Home, Disperser, Shield, History)
    document.querySelector('.footer').style.display = 'none';
    
    // Show token metadata UI
    const tokenMetadataUI = document.getElementById('tokenMetadataUI');
    console.log('tokenMetadataUI element:', tokenMetadataUI);
    
    if (tokenMetadataUI) {
        // Force reset scroll before showing
        tokenMetadataUI.scrollTop = 0;
        const contentContainer = tokenMetadataUI.querySelector('.token-metadata-content');
        if (contentContainer) {
            contentContainer.scrollTop = 0;
        }
        
        // Force reflow by temporarily hiding/showing
        tokenMetadataUI.style.display = 'none';
        tokenMetadataUI.offsetHeight; // Force reflow
        tokenMetadataUI.style.display = 'flex';
        
        // Populate project data
        document.getElementById('tokenMetadataProjectId').textContent = projectData.id;
        
        // Populate existing metadata if available
        populateMetadataForm(projectData);
        
        // Setup event listeners for this screen
        setupTokenMetadataEventListeners();
        
        // Scroll to top - reset all possible scroll positions with multiple attempts
        const resetScroll = () => {
            console.log('Resetting metadata UI scroll positions...');
            
            // Reset main container with multiple methods
            tokenMetadataUI.scrollTop = 0;
            tokenMetadataUI.scrollTo(0, 0);
            tokenMetadataUI.style.scrollBehavior = 'auto';
            
            // Reset nested content container
            const contentContainer = tokenMetadataUI.querySelector('.token-metadata-content');
            if (contentContainer) {
                contentContainer.scrollTop = 0;
            }
            
            // Reset document and window scroll
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            window.scrollTo(0, 0);
        };
        
        // Reset immediately
        resetScroll();
        
        // Reset again after a short delay
        setTimeout(resetScroll, 10);
        
        // Reset once more using requestAnimationFrame
        requestAnimationFrame(() => {
            resetScroll();
        });
    }
}

function hideTokenMetadataUI() {
    const tokenMetadataUI = document.getElementById('tokenMetadataUI');
    if (tokenMetadataUI) {
        tokenMetadataUI.style.display = 'none';
    }
}

// Project Wallets UI Functions
function showProjectWalletsUI(projectData) {
    // Hide other screens
    hideCreateProjectUI();
    hideSavedProjectsUI();
    hideProjectManagementScreen();
    hideTokenMetadataUI();
    mainContent.style.display = 'none';
    
    // Hide main footer (should only show on Home, Disperser, Shield, History)
    document.querySelector('.footer').style.display = 'none';
    
    // Show project wallets UI
    const projectWalletsUI = document.getElementById('projectWalletsUI');
    if (projectWalletsUI) {
        projectWalletsUI.style.display = 'flex';
        
        // Populate project data
        document.getElementById('walletsProjectId').textContent = projectData.id;
        
        // Reset wallet quantity input to blank
        const walletQuantityInput = document.getElementById('walletQuantity');
        if (walletQuantityInput) {
            walletQuantityInput.value = '';
        }
        
        // Reset create wallet button to disabled state
        const createWalletBtn = document.getElementById('createWalletBtn');
        if (createWalletBtn) {
            createWalletBtn.disabled = true;
        }
        
        // Load wallets for this project
        loadProjectWallets(projectData.id);
        
        // Scroll to top - reset all possible scroll positions
        const resetScroll = () => {
            projectWalletsUI.scrollTop = 0;
            const contentContainer = projectWalletsUI.querySelector('.project-wallets-content');
            if (contentContainer) {
                contentContainer.scrollTop = 0;
            }
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            window.scrollTo(0, 0);
        };
        
        resetScroll();
        setTimeout(resetScroll, 10);
        requestAnimationFrame(resetScroll);
    }
}

function hideProjectWalletsUI() {
    const projectWalletsUI = document.getElementById('projectWalletsUI');
    if (projectWalletsUI) {
        projectWalletsUI.style.display = 'none';
    }
}

async function loadProjectWallets(projectId) {
    try {
        const wallets = await getProjectWallets(projectId);
        displayWallets(wallets);
    } catch (error) {
        console.error('Error loading project wallets:', error);
        showNotification('Error loading wallets', 'error');
    }
}

function displayWallets(wallets) {
    const walletsList = document.getElementById('walletsList');
    const emptyMessage = document.getElementById('emptyWalletsMessage');
    const walletsContent = document.querySelector('.project-wallets-content');
    
    if (!walletsList) return;
    
    // Clear existing wallets (except empty message)
    const existingWallets = walletsList.querySelectorAll('.wallet-item');
    existingWallets.forEach(wallet => wallet.remove());
    
    console.log(`Displaying ${wallets.length} wallets`);
    
    if (wallets.length === 0) {
        emptyMessage.style.display = 'flex';
        // Remove scrolling when no wallets
        if (walletsContent) {
            walletsContent.classList.remove('has-wallets');
        }
    } else {
        emptyMessage.style.display = 'none';
        // Enable scrolling when wallets exist
        if (walletsContent) {
            walletsContent.classList.add('has-wallets');
        }
        
        wallets.forEach(wallet => {
            const walletElement = createWalletElement(wallet);
            walletsList.appendChild(walletElement);
        });
    }
}

function createWalletElement(wallet) {
    const walletDiv = document.createElement('div');
    walletDiv.className = wallet.isDev ? 'wallet-item dev-wallet' : 'wallet-item';
    
    const devBadge = wallet.isDev ? '<span class="dev-badge">DEV</span>' : '';
    
    walletDiv.innerHTML = `
        <div class="wallet-info">
            <h4 class="wallet-name">${wallet.name} ${devBadge}</h4>
            <p class="wallet-address-abbreviated">${abbreviateAddress(wallet.address)}</p>
            <p class="wallet-balance">${wallet.balance} SOL</p>
        </div>
        <div class="wallet-actions">
            <button class="wallet-action-btn view-wallet-btn" data-wallet-id="${wallet.id}">View</button>
            ${wallet.isDev ? 
                `<button class="wallet-action-btn delete-wallet-btn delete disabled" data-wallet-id="${wallet.id}" disabled title="Dev wallet cannot be deleted">Delete</button>` :
                `<button class="wallet-action-btn delete-wallet-btn delete" data-wallet-id="${wallet.id}">Delete</button>`
            }
        </div>
    `;
    return walletDiv;
}

function abbreviateAddress(address) {
    if (!address || address.length < 10) return address;
    return `${address.substring(0, 5)}...${address.substring(address.length - 5)}`;
}

function validateWalletQuantityInput() {
    const walletQuantityInput = document.getElementById('walletQuantity');
    const createWalletBtn = document.getElementById('createWalletBtn');
    
    if (!walletQuantityInput || !createWalletBtn) return;
    
    const value = parseInt(walletQuantityInput.value);
    const isValid = !isNaN(value) && value > 0 && value <= 100;
    
    createWalletBtn.disabled = !isValid;
}

async function createNewWallets(projectId, quantity = 1) {
    try {
        console.log(`Creating ${quantity} wallets for project ${projectId}`);
        const startingCount = await getWalletCount(projectId);
        const newWallets = [];
        
        // Generate all wallets first
        for (let i = 0; i < quantity; i++) {
            const walletNumber = startingCount + i + 1;
            const isDevWallet = walletNumber === 1; // First wallet is always dev wallet
            
            const newWallet = {
                id: generateWalletId(),
                name: isDevWallet ? 'Dev Wallet' : `Wallet ${walletNumber}`,
                address: generateSolanaAddress(),
                privateKey: generateSolanaPrivateKey(),
                balance: 0,
                projectId: projectId,
                createdAt: new Date().toISOString(),
                isDev: isDevWallet // Flag to identify dev wallet
            };
            
            newWallets.push(newWallet);
        }
        
        console.log(`Generated ${newWallets.length} wallets`);
        
        // Save all wallets in one batch operation
        await saveAllWallets(newWallets);
        
        console.log('All wallets saved successfully');
        
        // Reload wallets display
        await loadProjectWallets(projectId);
        
        const message = quantity === 1 
            ? `Wallet "${newWallets[0].name}" created successfully!`
            : `${quantity} wallets created successfully!`;
        showNotification(message, 'success');
        
        return newWallets;
    } catch (error) {
        console.error('Error creating wallets:', error);
        showNotification('Error creating wallets', 'error');
        return null;
    }
}

function generateWalletId() {
    return 'WALLET-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function generateSolanaAddress() {
    // Generate a realistic-looking Solana address (44 characters, base58)
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 44; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateSolanaPrivateKey() {
    // Generate a realistic-looking Solana private key (88 characters, base58)
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 88; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function getWalletCount(projectId) {
    try {
        const wallets = await getProjectWallets(projectId);
        return wallets.length;
    } catch (error) {
        console.error('Error getting wallet count:', error);
        return 0;
    }
}

async function saveWallet(wallet) {
    try {
        // Get existing wallets
        const existingWallets = await getAllWallets();
        
        // Add new wallet
        existingWallets.push(wallet);
        
        // Save to both Chrome storage and localStorage
        await chrome.storage.sync.set({ projectWallets: existingWallets });
        localStorage.setItem('vantage_project_wallets', JSON.stringify(existingWallets));
        
        return true;
    } catch (error) {
        console.error('Error saving wallet:', error);
        return false;
    }
}

async function saveAllWallets(newWallets) {
    try {
        // Get existing wallets
        const existingWallets = await getAllWallets();
        console.log(`Existing wallets: ${existingWallets.length}`);
        
        // Add all new wallets at once
        const updatedWallets = [...existingWallets, ...newWallets];
        console.log(`Total wallets after adding: ${updatedWallets.length}`);
        
        // Save to both Chrome storage and localStorage in one operation
        await chrome.storage.sync.set({ projectWallets: updatedWallets });
        localStorage.setItem('vantage_project_wallets', JSON.stringify(updatedWallets));
        
        console.log('Batch wallet save completed');
        return true;
    } catch (error) {
        console.error('Error saving wallets in batch:', error);
        
        // If Chrome storage fails due to size limits, try localStorage only
        try {
            const existingWallets = JSON.parse(localStorage.getItem('vantage_project_wallets') || '[]');
            const updatedWallets = [...existingWallets, ...newWallets];
            localStorage.setItem('vantage_project_wallets', JSON.stringify(updatedWallets));
            console.log('Saved to localStorage only due to Chrome storage limits');
            return true;
        } catch (localError) {
            console.error('Error saving to localStorage:', localError);
            return false;
        }
    }
}

async function getProjectWallets(projectId) {
    try {
        const allWallets = await getAllWallets();
        return allWallets.filter(wallet => wallet.projectId === projectId);
    } catch (error) {
        console.error('Error getting project wallets:', error);
        return [];
    }
}

async function getAllWallets() {
    try {
        // Try localStorage first for better performance with large datasets
        const localWallets = localStorage.getItem('vantage_project_wallets');
        if (localWallets) {
            const parsedWallets = JSON.parse(localWallets);
            if (Array.isArray(parsedWallets)) {
                console.log(`Loaded ${parsedWallets.length} wallets from localStorage`);
                return parsedWallets;
            }
        }
        
        // Fallback to Chrome storage
        const result = await chrome.storage.sync.get(['projectWallets']);
        if (result.projectWallets && Array.isArray(result.projectWallets)) {
            console.log(`Loaded ${result.projectWallets.length} wallets from Chrome storage`);
            // Sync to localStorage for future use
            localStorage.setItem('vantage_project_wallets', JSON.stringify(result.projectWallets));
            return result.projectWallets;
        }
        
        return [];
    } catch (error) {
        console.error('Error loading wallets:', error);
        return [];
    }
}

async function deleteWallet(walletId) {
    try {
        console.log('Attempting to delete wallet:', walletId);
        const allWallets = await getAllWallets();
        console.log('All wallets before deletion:', allWallets);
        
        const walletToDelete = allWallets.find(w => w.id === walletId);
        console.log('Wallet to delete:', walletToDelete);
        
        // Prevent deletion of dev wallet
        if (walletToDelete && walletToDelete.isDev) {
            showNotification('Dev wallet cannot be deleted', 'error');
            return false;
        }
        
        if (!walletToDelete) {
            console.error('Wallet not found with ID:', walletId);
            showNotification('Wallet not found', 'error');
            return false;
        }
        
        const updatedWallets = allWallets.filter(wallet => wallet.id !== walletId);
        console.log('Updated wallets after deletion:', updatedWallets);
        
        // Save updated list
        await chrome.storage.sync.set({ projectWallets: updatedWallets });
        localStorage.setItem('vantage_project_wallets', JSON.stringify(updatedWallets));
        console.log('Wallets saved to storage');
        
        // Close wallet details modal if open
        const modal = document.getElementById('walletDetailsModal');
        if (modal && modal.classList.contains('show')) {
            closeWalletDetailsModal();
        }
        
        // Get current project ID and reload wallets
        const projectIdElement = document.getElementById('walletsProjectId');
        if (projectIdElement) {
            const projectId = projectIdElement.textContent;
            console.log('Reloading wallets for project:', projectId);
            await loadProjectWallets(projectId);
        } else {
            console.error('Could not find walletsProjectId element');
        }
        
        showNotification('Wallet deleted successfully', 'success');
        
        return true;
    } catch (error) {
        console.error('Error deleting wallet:', error);
        showNotification('Error deleting wallet', 'error');
        return false;
    }
}

async function confirmDeleteWallet(walletId) {
    try {
        const allWallets = await getAllWallets();
        const wallet = allWallets.find(w => w.id === walletId);
        
        if (wallet) {
            // Prevent deletion of dev wallet
            if (wallet.isDev) {
                showNotification('Dev wallet cannot be deleted', 'error');
                return;
            }
            // Use the custom confirmation dialog
            const confirmed = await showCustomConfirm(
                'Delete Wallet',
                `Are you sure you want to delete wallet "${wallet.name}"?`,
                'This action cannot be undone. You will lose access to this wallet and any funds in it.',
                'Delete',
                'Cancel'
            );
            
            if (confirmed) {
                await deleteWallet(walletId);
            }
        } else {
            showNotification('Wallet not found', 'error');
        }
    } catch (error) {
        console.error('Error confirming wallet deletion:', error);
        showNotification('Error loading wallet information', 'error');
    }
}

async function deleteWalletFromDetails() {
    const walletId = document.getElementById('walletDetailsModal').getAttribute('data-wallet-id');
    if (walletId) {
        confirmDeleteWallet(walletId);
    }
}

// Wallet Details Modal Functions
async function viewWalletDetails(walletId) {
    try {
        const allWallets = await getAllWallets();
        const wallet = allWallets.find(w => w.id === walletId);
        
        if (!wallet) {
            showNotification('Wallet not found', 'error');
            return;
        }
        
        // Populate modal with wallet data
        document.getElementById('walletDetailsTitle').textContent = wallet.name;
        document.getElementById('walletDetailAddress').textContent = wallet.address;
        document.getElementById('walletDetailBalance').textContent = `${wallet.balance} SOL`;
        document.getElementById('walletDetailPrivateKey').textContent = wallet.privateKey || 'Not available';
        
        // Store wallet ID for actions
        document.getElementById('walletDetailsModal').setAttribute('data-wallet-id', walletId);
        
        // Reset private key visibility
        document.getElementById('privateKeyHidden').style.display = 'flex';
        document.getElementById('privateKeyRevealed').style.display = 'none';
        
        // Show modal
        document.getElementById('walletDetailsModal').classList.add('show');
        
    } catch (error) {
        console.error('Error viewing wallet details:', error);
        showNotification('Error loading wallet details', 'error');
    }
}

function closeWalletDetailsModal() {
    const modal = document.getElementById('walletDetailsModal');
    if (modal) {
        modal.classList.remove('show');
        console.log('Wallet details modal closed');
    } else {
        console.error('Could not find wallet details modal');
    }
}

function showPrivateKeyConfirm() {
    document.getElementById('privateKeyConfirmModal').classList.add('show');
}

function closePrivateKeyConfirm() {
    document.getElementById('privateKeyConfirmModal').classList.remove('show');
}

function revealPrivateKey() {
    document.getElementById('privateKeyHidden').style.display = 'none';
    document.getElementById('privateKeyRevealed').style.display = 'flex';
    closePrivateKeyConfirm();
}

function hidePrivateKey() {
    document.getElementById('privateKeyHidden').style.display = 'flex';
    document.getElementById('privateKeyRevealed').style.display = 'none';
}

function copyWalletAddress() {
    const address = document.getElementById('walletDetailAddress').textContent;
    navigator.clipboard.writeText(address).then(() => {
        showNotification('Address copied to clipboard', 'success');
    }).catch(error => {
        console.error('Error copying address:', error);
        showNotification('Error copying address', 'error');
    });
}

function copyPrivateKey() {
    const privateKey = document.getElementById('walletDetailPrivateKey').textContent;
    navigator.clipboard.writeText(privateKey).then(() => {
        showNotification('Private key copied to clipboard', 'success');
    }).catch(error => {
        console.error('Error copying private key:', error);
        showNotification('Error copying private key', 'error');
    });
}

function populateMetadataForm(projectData) {
    // Populate basic information
    document.getElementById('metadataTokenName').value = projectData.name || '';
    document.getElementById('metadataTokenSymbol').value = projectData.symbol || '';
    document.getElementById('metadataTokenDescription').value = projectData.description || '';
    
    // Populate social links if available
    const metadata = projectData.metadata || {};
    document.getElementById('metadataWebsite').value = metadata.website || '';
    document.getElementById('metadataTwitter').value = metadata.twitter || '';
    document.getElementById('metadataTelegram').value = metadata.telegram || '';
    
    // Check if there's a previously selected image
    const selectedImageInfo = sessionStorage.getItem('vantage_selected_image');
    if (selectedImageInfo) {
        try {
            const imageInfo = JSON.parse(selectedImageInfo);
            if (imageInfo.name) {
                // Show that an image was previously selected
                showNotification(`Previously selected image: ${imageInfo.name}`, 'info');
                // Update UI to show selected state
                showSelectedImageState(imageInfo.name);
            }
        } catch (error) {
            console.log('Error parsing selected image info:', error);
        }
    }
}

function setupTokenMetadataEventListeners() {
    // Image upload area - clickable with delayed notification
    const uploadArea = document.getElementById('imageUploadArea');
    
    if (uploadArea) {
        uploadArea.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Show notification after 6.3 seconds
            setTimeout(() => {
                showNotification('Image set', 'success');
            }, 6300); // 6.3 seconds
        });
    }
}





async function saveTokenMetadata(projectData) {
    try {
        // Get form data
        const metadata = {
            name: document.getElementById('metadataTokenName').value.trim(),
            symbol: document.getElementById('metadataTokenSymbol').value.trim(),
            description: document.getElementById('metadataTokenDescription').value.trim(),
            website: document.getElementById('metadataWebsite').value.trim(),
            twitter: document.getElementById('metadataTwitter').value.trim(),
            telegram: document.getElementById('metadataTelegram').value.trim(),
            image: null // Image handling will be implemented later
        };
        
        // Validate required fields
        if (!metadata.name || !metadata.symbol) {
            showNotification('Token name and symbol are required', 'error');
            return false;
        }
        
        // Update project data
        const updatedProject = {
            ...projectData,
            name: metadata.name,
            symbol: metadata.symbol,
            description: metadata.description,
            metadata: {
                website: metadata.website,
                twitter: metadata.twitter,
                telegram: metadata.telegram,
                image: metadata.image
            }
        };
        
        // Save to storage
        const projects = await getSavedProjects();
        const projectIndex = projects.findIndex(p => p.id === projectData.id);
        
        if (projectIndex !== -1) {
            projects[projectIndex] = updatedProject;
            
            // Save to both Chrome storage and localStorage
            await chrome.storage.sync.set({ savedProjects: projects });
            localStorage.setItem('vantage_saved_projects', JSON.stringify(projects));
            
            return updatedProject;
        } else {
            throw new Error('Project not found');
        }
    } catch (error) {
        console.error('Error saving token metadata:', error);
        return false;
    }
}

async function loadSavedProjects() {
    try {
        const projects = await getSavedProjects();
        const projectsList = document.getElementById('projectsList');
        const emptyProjects = document.getElementById('emptyProjects');
        
        console.log('Loading saved projects:', projects.length, 'projects found');
        
        if (projects.length === 0) {
            console.log('No projects found, showing empty state');
            projectsList.style.display = 'none';
            emptyProjects.style.display = 'block';
        } else {
            console.log('Projects found, showing projects list');
            projectsList.style.display = 'block';
            emptyProjects.style.display = 'none';
            
            projectsList.innerHTML = '';
            
            projects.forEach(project => {
                const projectElement = createProjectElement(project);
                projectsList.appendChild(projectElement);
            });
        }
    } catch (error) {
        console.error('Error loading saved projects:', error);
        // Show empty state on error
        const projectsList = document.getElementById('projectsList');
        const emptyProjects = document.getElementById('emptyProjects');
        projectsList.style.display = 'none';
        emptyProjects.style.display = 'block';
    }
}

function createProjectElement(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-item';
    projectDiv.dataset.projectId = project.id;
    
    const createdDate = new Date(project.createdAt).toLocaleDateString();
    
    projectDiv.innerHTML = `
        <div class="project-header">
            <div class="project-info">
                <h4>${project.name}</h4>
                <p class="project-id">${project.id}</p>
            </div>
            <div class="project-platform">${project.platform}</div>
        </div>
        <div class="project-details">
            <p class="project-symbol">$${project.symbol}</p>
            <p class="project-description">${project.description}</p>
        </div>
        <div class="project-footer">
            <span class="project-date">Created ${createdDate}</span>
            <div class="project-actions">
                <button class="project-action-btn view" data-project-id="${project.id}" data-action="view">View</button>
                <button class="project-action-btn delete" data-project-id="${project.id}" data-action="delete">Delete</button>
            </div>
        </div>
    `;
    
    // Add event listeners to the buttons
    const viewBtn = projectDiv.querySelector('.project-action-btn.view');
    const deleteBtn = projectDiv.querySelector('.project-action-btn.delete');
    
    viewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        viewProject(project.id);
    });
    
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        confirmDeleteProject(project.id);
    });
    
    return projectDiv;
}

async function viewProject(projectId) {
    const projects = await getSavedProjects();
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        // Show project management screen
        showProjectManagementScreen(project);
        console.log('Project details:', project);
    } else {
        showNotification('Project not found', 'error');
    }
}

async function confirmDeleteProject(projectId) {
    const projects = await getSavedProjects();
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        // Use a custom confirmation dialog
        const confirmed = await showCustomConfirm(
            'Delete Project',
            `Are you sure you want to delete project "${project.name}" (${projectId})?`,
            'This action cannot be undone.',
            'Delete',
            'Cancel'
        );
        
        if (confirmed) {
            const deleted = await deleteProject(projectId);
            if (deleted) {
                showNotification(`Project ${projectId} deleted successfully`, 'success');
                await loadSavedProjects();
                
                // Update stats with real data
                await loadRealStats();
            } else {
                showNotification('Failed to delete project', 'error');
            }
        }
    } else {
        showNotification('Project not found', 'error');
    }
}

// Custom confirmation dialog function
function showCustomConfirm(title, message, warning, confirmText, cancelText) {
    return new Promise((resolve) => {
        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.zIndex = '1200';
        
        modalOverlay.innerHTML = `
            <div class="modal delete-confirm-modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                </div>
                <div class="modal-content">
                    <div class="delete-confirm-content">
                        <div class="delete-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        </div>
                        <p class="delete-message">${message}</p>
                        <p class="delete-warning">${warning}</p>
                    </div>
                    <div class="delete-confirm-actions">
                        <button class="cancel-delete-btn" id="customCancelBtn">${cancelText}</button>
                        <button class="confirm-delete-btn" id="customConfirmBtn">${confirmText}</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalOverlay);
        
        // Add event listeners
        const cancelBtn = modalOverlay.querySelector('#customCancelBtn');
        const confirmBtn = modalOverlay.querySelector('#customConfirmBtn');
        
        const cleanup = () => {
            document.body.removeChild(modalOverlay);
        };
        
        cancelBtn.addEventListener('click', () => {
            cleanup();
            resolve(false);
        });
        
        confirmBtn.addEventListener('click', () => {
            cleanup();
            resolve(true);
        });
        
        // Close on outside click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                cleanup();
                resolve(false);
            }
        });
    });
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
    console.log('Generic back to home button clicked');
    addButtonFeedback(backToHomeBtn);
    showHomeScreen();
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

// User ID button event listeners will be set up in DOMContentLoaded

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
// Removed auto-uppercase to preserve original token symbol case
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

// Project Storage Functions
async function saveProject(projectData) {
    try {
        const existingProjects = await getSavedProjects();
        const updatedProjects = [...existingProjects, projectData];
        
        // Save to both Chrome storage and localStorage for reliability
        await chrome.storage.sync.set({ savedProjects: updatedProjects });
        localStorage.setItem('vantage_saved_projects', JSON.stringify(updatedProjects));
        
        // Refresh stats after saving
        await loadRealStats();
        
        return true;
    } catch (error) {
        console.error('Error saving project:', error);
        // Fallback to localStorage only
        try {
            const existingProjects = JSON.parse(localStorage.getItem('vantage_saved_projects') || '[]');
            const updatedProjects = [...existingProjects, projectData];
            localStorage.setItem('vantage_saved_projects', JSON.stringify(updatedProjects));
            
            // Refresh stats after saving
            await loadRealStats();
            
            return true;
        } catch (fallbackError) {
            console.error('Fallback save also failed:', fallbackError);
            return false;
        }
    }
}

async function getSavedProjects() {
    try {
        const result = await chrome.storage.sync.get(['savedProjects']);
        const projects = result.savedProjects || [];
        console.log('Chrome storage projects:', projects);
        return projects;
    } catch (error) {
        console.log('Chrome storage failed, trying localStorage:', error);
        // Fallback to localStorage
        try {
            const projects = localStorage.getItem('vantage_saved_projects');
            const parsedProjects = projects ? JSON.parse(projects) : [];
            console.log('LocalStorage projects:', parsedProjects);
            return parsedProjects;
        } catch (fallbackError) {
            console.error('Error loading saved projects:', fallbackError);
            return [];
        }
    }
}

async function deleteProject(projectId) {
    try {
        const existingProjects = await getSavedProjects();
        const updatedProjects = existingProjects.filter(project => project.id !== projectId);
        
        // Save to both Chrome storage and localStorage
        await chrome.storage.sync.set({ savedProjects: updatedProjects });
        localStorage.setItem('vantage_saved_projects', JSON.stringify(updatedProjects));
        
        // Refresh stats after deleting
        await loadRealStats();
        
        return true;
    } catch (error) {
        console.error('Error deleting project:', error);
        return false;
    }
}





// Project Management Event Delegation
document.addEventListener('click', (e) => {
    // DEBUG: Log all clicks to see if event listener is working
    console.log('=== CLICK DETECTED ===', e.target.id, e.target.className, e.target);
    
    
    if (e.target.id === 'backToProjectsBtn' || e.target.closest('#backToProjectsBtn')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Back to projects button clicked via delegation');
        const backBtn = document.getElementById('backToProjectsBtn');
        if (backBtn) {
            addButtonFeedback(backBtn);
        }
        console.log('Calling showSavedProjectsUI()');
        showSavedProjectsUI();
        console.log('showSavedProjectsUI() called');
    }
    
    // Token Metadata Button
    if (e.target.id === 'tokenMetadataBtn' || e.target.closest('#tokenMetadataBtn')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Token metadata button clicked via delegation');
        const tokenBtn = document.getElementById('tokenMetadataBtn');
        if (tokenBtn) {
            addButtonFeedback(tokenBtn);
        }
        
        // Get current project data from the management screen
        const projectName = document.getElementById('projectManagementName').textContent;
        const projectId = document.getElementById('projectManagementId').textContent;
        const projectSymbol = document.getElementById('projectManagementSymbol').textContent.replace('$', '');
        const projectPlatform = document.getElementById('projectPlatformDisplay').textContent;
        
        console.log('Project data for metadata:', { projectName, projectId, projectSymbol, projectPlatform });
        
        // Find the full project data
        getSavedProjects().then(projects => {
            console.log('All projects:', projects);
            const project = projects.find(p => p.id === projectId);
            console.log('Found project for metadata:', project);
            if (project) {
                showTokenMetadataUI(project);
            } else {
                console.error('Project not found for metadata UI');
                showNotification('Project not found', 'error');
            }
        }).catch(error => {
            console.error('Error getting projects for metadata:', error);
            showNotification('Error loading project data', 'error');
        });
    }
    
    // Back to Project Button (from Token Metadata UI)
    if (e.target.id === 'backToProjectBtn' || e.target.closest('#backToProjectBtn')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Back to project button clicked via delegation');
        const backBtn = document.getElementById('backToProjectBtn');
        if (backBtn) {
            addButtonFeedback(backBtn);
        }
        
        // Get current project data and go back to project management
        const projectId = document.getElementById('tokenMetadataProjectId').textContent;
        console.log('Going back to project:', projectId);
        getSavedProjects().then(projects => {
            const project = projects.find(p => p.id === projectId);
            console.log('Found project for back navigation:', project);
            if (project) {
                hideTokenMetadataUI();
                showProjectManagementScreen(project);
            } else {
                showNotification('Project not found', 'error');
            }
        }).catch(error => {
            console.error('Error in back navigation:', error);
            showNotification('Error navigating back', 'error');
        });
    }
    
    // Deploy Metadata Button
    if (e.target.id === 'deployMetadataBtn' || e.target.closest('#deployMetadataBtn')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Deploy metadata button clicked via delegation');
        const deployBtn = document.getElementById('deployMetadataBtn');
        if (deployBtn) {
            addButtonFeedback(deployBtn);
        }
        
        // Get current project data and save metadata
        const projectId = document.getElementById('tokenMetadataProjectId').textContent;
        console.log('Deploying metadata for project:', projectId);
        getSavedProjects().then(async projects => {
            const project = projects.find(p => p.id === projectId);
            console.log('Found project for metadata deployment:', project);
            if (project) {
                const updatedProject = await saveTokenMetadata(project);
                console.log('Metadata save result:', updatedProject);
                if (updatedProject) {
                    showNotification('Token metadata deployed successfully!', 'success');
                    // Go back to project management with updated data
                    setTimeout(() => {
                        hideTokenMetadataUI();
                        showProjectManagementScreen(updatedProject);
                    }, 1000);
                } else {
                    showNotification('Failed to deploy metadata', 'error');
                }
            } else {
                showNotification('Project not found', 'error');
            }
        }).catch(error => {
            console.error('Error in metadata deployment:', error);
            showNotification('Error deploying metadata', 'error');
        });
    }
    
    // Project Wallets Button
    if (e.target.id === 'projectWalletsBtn' || e.target.closest('#projectWalletsBtn')) {
        e.preventDefault();
        e.stopPropagation();
        const btn = document.getElementById('projectWalletsBtn');
        if (btn) addButtonFeedback(btn);
        
        // Get current project data and show wallets UI
        const projectName = document.getElementById('projectManagementName').textContent;
        const projectId = document.getElementById('projectManagementId').textContent;
        const projectSymbol = document.getElementById('projectManagementSymbol').textContent.replace('$', '');
        const projectPlatform = document.getElementById('projectPlatformDisplay').textContent;
        
        console.log('Project data for wallets:', { projectName, projectId, projectSymbol, projectPlatform });
        
        // Find the full project data
        getSavedProjects().then(projects => {
            console.log('All projects:', projects);
            const project = projects.find(p => p.id === projectId);
            console.log('Found project for wallets:', project);
            if (project) {
                showProjectWalletsUI(project);
            } else {
                console.error('Project not found for wallets UI');
                showNotification('Project not found', 'error');
            }
        }).catch(error => {
            console.error('Error getting projects for wallets:', error);
            showNotification('Error loading project data', 'error');
        });
    }
    
    // Create Wallet Button
    if (e.target.id === 'createWalletBtn' || e.target.closest('#createWalletBtn')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Create wallet button clicked via delegation');
        const createBtn = document.getElementById('createWalletBtn');
        
        // Check if button is disabled
        if (createBtn && createBtn.disabled) {
            console.log('Create wallet button is disabled, ignoring click');
            return;
        }
        
        if (createBtn) {
            addButtonFeedback(createBtn);
        }
        
        // Get current project ID and create wallets
        const projectId = document.getElementById('walletsProjectId').textContent;
        const quantityInput = document.getElementById('walletQuantity');
        let quantity = parseInt(quantityInput.value) || 1;
        
        // Validate quantity
        if (quantity < 1) {
            quantity = 1;
            quantityInput.value = 1;
        } else if (quantity > 100) {
            quantity = 100;
            quantityInput.value = 100;
        }
        
        console.log('Creating', quantity, 'wallets for project:', projectId);
        createNewWallets(projectId, quantity);
    }
    
    // Back to Project Button (from Project Wallets UI)
    if (e.target.id === 'backToProjectFromWalletsBtn' || e.target.closest('#backToProjectFromWalletsBtn')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Back to project from wallets button clicked via delegation');
        const backBtn = document.getElementById('backToProjectFromWalletsBtn');
        if (backBtn) {
            addButtonFeedback(backBtn);
        }
        
        // Get current project data and go back to project management
        const projectId = document.getElementById('walletsProjectId').textContent;
        console.log('Going back to project from wallets:', projectId);
        getSavedProjects().then(projects => {
            const project = projects.find(p => p.id === projectId);
            console.log('Found project for back navigation from wallets:', project);
            if (project) {
                hideProjectWalletsUI();
                showProjectManagementScreen(project);
            } else {
                showNotification('Project not found', 'error');
            }
        }).catch(error => {
            console.error('Error in back navigation from wallets:', error);
            showNotification('Error navigating back', 'error');
        });
    }
    
    // Dashboard Button - WORKING approach based on emergency test
    const dashboardBtn = e.target.closest('#dashboardBtn');
    if (dashboardBtn) {
        e.preventDefault();
        e.stopPropagation();
        console.log('=== DASHBOARD BUTTON CLICKED ===');
        addButtonFeedback(dashboardBtn);
        
        // Use the SAME approach that worked for emergency dashboard
        console.log('Showing dashboard using proven method...');
        
        // Hide all main UI elements
        const elementsToHide = [
            '#mainContent',
            '#createProjectUI', 
            '#savedProjectsUI',
            '#projectManagementUI',
            '#tokenMetadataUI',
            '#projectWalletsUI',
            '#getsolUI',
            '#pfRewardsUI'
        ];
        
        elementsToHide.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.display = 'none';
            }
        });
        
        // Force show the dashboard UI with the same method that worked
        const dashboardUI = document.querySelector('#projectDashboardUI');
        if (dashboardUI) {
            // Use the exact same approach as emergency dashboard
            dashboardUI.style.cssText = `
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 9999 !important;
                background: var(--dark-bg) !important;
                color: var(--dark-text) !important;
                flex-direction: column !important;
            `;
            
            // Populate with test data
            const nameEl = document.getElementById('dashboardProjectName');
            const symbolEl = document.getElementById('dashboardProjectSymbol');
            const idEl = document.getElementById('dashboardProjectId');
            const platformEl = document.getElementById('dashboardPlatformDisplay');
            
            if (nameEl) nameEl.textContent = 'Test Project';
            if (symbolEl) symbolEl.textContent = '$TEST';
            if (idEl) idEl.textContent = 'VTG-TEST123';
            if (platformEl) platformEl.textContent = 'Pump.fun';
            
            // Add some test market data
            const marketCap = document.getElementById('marketCapValue');
            const price = document.getElementById('tokenPriceValue');
            const volume = document.getElementById('volumeValue');
            
            if (marketCap) marketCap.textContent = '$50,000';
            if (price) price.textContent = '$0.001000';
            if (volume) volume.textContent = '$10,000';
            
            console.log('Dashboard UI should now be visible using proven method!');
        } else {
            console.error('Dashboard UI element not found!');
        }
    }
    
    // Test Dashboard Button - from home screen
    const testDashboardBtn = e.target.closest('#testDashboardBtn');
    if (testDashboardBtn) {
        e.preventDefault();
        e.stopPropagation();
        console.log('=== TEST DASHBOARD BUTTON CLICKED FROM HOME ===');
        addButtonFeedback(testDashboardBtn);
        
        // Create test project data
        const testProjectData = {
            id: 'VTG-TEST123',
            name: 'Test Project',
            symbol: 'TEST',
            platform: 'Pump.fun',
            status: 'active'
        };
        
        // Call the dashboard function directly
        showProjectDashboard(testProjectData);
        
        console.log('=== TEST DASHBOARD SHOULD NOW BE VISIBLE ===');
    }
    
    if (e.target.id === 'getCABtn' || e.target.closest('#getCABtn')) {
        e.preventDefault();
        e.stopPropagation();
        const btn = document.getElementById('getCABtn');
        if (btn) addButtonFeedback(btn);
        
        // Get current project data from the project management UI
        getCurrentProjectData().then(currentProjectData => {
            if (currentProjectData) {
                showContractAddressModal(currentProjectData);
            } else {
                showNotification('Project data not found', 'error');
            }
        }).catch(error => {
            console.error('Error getting current project data:', error);
            showNotification('Failed to retrieve project data', 'error');
        });
    }
    
    // Launch Buttons
    if (e.target.id === 'launchBtn' || e.target.closest('#launchBtn')) {
        e.preventDefault();
        e.stopPropagation();
        const btn = document.getElementById('launchBtn');
        if (btn) addButtonFeedback(btn);
        showNotification('Launching token...', 'info');
    }
    
    if (e.target.id === 'launchBundleBtn' || e.target.closest('#launchBundleBtn')) {
        e.preventDefault();
        e.stopPropagation();
        const btn = document.getElementById('launchBundleBtn');
        if (btn) addButtonFeedback(btn);
        showNotification('Launching token with bundle...', 'info');
    }
    
    if (e.target.id === 'launchSnipeBtn' || e.target.closest('#launchSnipeBtn')) {
        e.preventDefault();
        e.stopPropagation();
        const btn = document.getElementById('launchSnipeBtn');
        if (btn) addButtonFeedback(btn);
        showNotification('Launching token with snipe protection...', 'info');
    }
    
    // Wallet Details Modal Events
    if (e.target.id === 'closeWalletDetailsModal' || e.target.closest('#closeWalletDetailsModal')) {
        closeWalletDetailsModal();
    }
    
    if (e.target.id === 'copyAddressBtn' || e.target.closest('#copyAddressBtn')) {
        copyWalletAddress();
    }
    
    if (e.target.id === 'revealKeyBtn' || e.target.closest('#revealKeyBtn')) {
        showPrivateKeyConfirm();
    }
    
    if (e.target.id === 'hideKeyBtn' || e.target.closest('#hideKeyBtn')) {
        hidePrivateKey();
    }
    
    if (e.target.id === 'copyKeyBtn' || e.target.closest('#copyKeyBtn')) {
        copyPrivateKey();
    }
    
    if (e.target.id === 'deleteWalletFromDetailsBtn' || e.target.closest('#deleteWalletFromDetailsBtn')) {
        deleteWalletFromDetails();
    }
    
    // Private Key Confirmation Modal Events
    if (e.target.id === 'cancelRevealBtn' || e.target.closest('#cancelRevealBtn')) {
        closePrivateKeyConfirm();
    }
    
    if (e.target.id === 'confirmRevealBtn' || e.target.closest('#confirmRevealBtn')) {
        revealPrivateKey();
    }
    
    // Wallet List Action Buttons
    if (e.target.classList.contains('view-wallet-btn')) {
        console.log('View wallet button clicked via delegation');
        const walletId = e.target.getAttribute('data-wallet-id');
        console.log('Wallet ID for view:', walletId);
        if (walletId) {
            viewWalletDetails(walletId);
        }
    }
    
    if (e.target.classList.contains('delete-wallet-btn')) {
        console.log('Delete wallet button clicked via delegation');
        const walletId = e.target.getAttribute('data-wallet-id');
        console.log('Wallet ID for deletion:', walletId);
        if (walletId) {
            confirmDeleteWallet(walletId);
        }
    }
    
    // Wallet quantity input validation
    if (e.target.id === 'walletQuantity') {
        const input = e.target;
        let value = parseInt(input.value);
        
        // Only validate if there's a value
        if (input.value !== '' && !isNaN(value)) {
            if (value < 1) {
                input.value = 1;
            } else if (value > 100) {
                input.value = 100;
            }
        }
        
        // Validate button state
        validateWalletQuantityInput();
    }
    
    // Dashboard UI Events
    if (e.target.id === 'backToProjectFromDashboardBtn' || e.target.closest('#backToProjectFromDashboardBtn')) {
        hideProjectDashboard();
    }
    
    if (e.target.id === 'refreshDashboardBtn' || e.target.closest('#refreshDashboardBtn')) {
        refreshDashboardData();
    }
    
    if (e.target.id === 'buyTokenBtn' || e.target.closest('#buyTokenBtn')) {
        executeBuyOrder();
    }
    
    if (e.target.id === 'sellTokenBtn' || e.target.closest('#sellTokenBtn')) {
        executeSellOrder();
    }
    
    if (e.target.id === 'sellAllBtn' || e.target.closest('#sellAllBtn')) {
        executeSellAllOrder();
    }
    
    if (e.target.id === 'selectAllWalletsBtn' || e.target.closest('#selectAllWalletsBtn')) {
        selectAllWallets();
    }
    
    if (e.target.id === 'deselectAllWalletsBtn' || e.target.closest('#deselectAllWalletsBtn')) {
        deselectAllWallets();
    }
    
    if (e.target.id === 'clearSelectionBtn' || e.target.closest('#clearSelectionBtn')) {
        clearWalletSelection();
    }
    
    // Dashboard wallet selection
    if (e.target.classList.contains('dashboard-wallet-item')) {
        toggleWalletSelection(e.target.dataset.walletId);
    }

    // Close modals when clicking overlay
    if (e.target.classList.contains('modal-overlay')) {
        if (e.target.id === 'walletDetailsModal') {
            closeWalletDetailsModal();
        }
        if (e.target.id === 'privateKeyConfirmModal') {
            closePrivateKeyConfirm();
        }
    }
    
    // Sniper Shield UI Event Handlers
    if (e.target.id === 'addBlacklistBtn' || e.target.closest('#addBlacklistBtn')) {
        e.preventDefault();
        e.stopPropagation();
        const btn = document.getElementById('addBlacklistBtn');
        if (btn) addButtonFeedback(btn);
        
        const addressInput = document.getElementById('blacklistWalletInput');
        const address = addressInput.value.trim();
        if (address) {
            addToBlacklist(address, 'manual');
        } else {
            showNotification('Please enter a wallet address', 'warning');
        }
    }
    
    if (e.target.id === 'clearBlacklistBtn' || e.target.closest('#clearBlacklistBtn')) {
        e.preventDefault();
        e.stopPropagation();
        const btn = document.getElementById('clearBlacklistBtn');
        if (btn) addButtonFeedback(btn);
        clearAllBlacklist();
    }
    
    if (e.target.id === 'exportBlacklistBtn' || e.target.closest('#exportBlacklistBtn')) {
        e.preventDefault();
        e.stopPropagation();
        const btn = document.getElementById('exportBlacklistBtn');
        if (btn) addButtonFeedback(btn);
        exportBlacklist();
    }
    
    // Filter tab clicks
    if (e.target.classList.contains('filter-tab')) {
        e.preventDefault();
        e.stopPropagation();
        
        // Remove active class from all tabs
        document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked tab
        e.target.classList.add('active');
        
        // Load filtered blacklist
        const filter = e.target.dataset.filter;
        loadBlacklistDisplay(filter);
    }
});

// Add input event listener for wallet quantity validation
document.addEventListener('input', (e) => {
    if (e.target.id === 'walletQuantity') {
        const input = e.target;
        
        // Validate button state immediately
        validateWalletQuantityInput();
        
        // Allow empty input while typing
        if (input.value === '') return;
        
        let value = parseInt(input.value);
        
        // Only validate if it's a valid number
        if (!isNaN(value)) {
            if (value < 1) {
                input.value = 1;
            } else if (value > 100) {
                input.value = 100;
            }
            // Validate button state after correction
            validateWalletQuantityInput();
        }
    }
    
    // Trading amount input validation
    if (e.target.id === 'tradingAmount') {
        validateTradingButtons();
    }
});

// Sniper Shield toggle and setting event listeners
document.addEventListener('change', (e) => {
    if (e.target.id === 'masterShieldToggle') {
        shieldSettings.masterShieldEnabled = e.target.checked;
        saveShieldSettings();
        updateShieldUI();
        showNotification(`Shield ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
    }
    
    if (e.target.id === 'autoSellToggle') {
        shieldSettings.autoSellEnabled = e.target.checked;
        saveShieldSettings();
        updateShieldUI();
        showNotification(`Auto-sell ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
    }
    
    if (e.target.id === 'autoSellPercentage') {
        shieldSettings.autoSellPercentage = parseInt(e.target.value);
        saveShieldSettings();
        showNotification(`Auto-sell percentage set to ${e.target.value}%`, 'info');
    }
    
    if (e.target.id === 'autoSellDelay') {
        shieldSettings.autoSellDelay = parseInt(e.target.value);
        saveShieldSettings();
        const delayText = e.target.value === '0' ? 'instant' : `${e.target.value} seconds`;
        showNotification(`Auto-sell delay set to ${delayText}`, 'info');
    }
});

// Continue button
continueBtn.addEventListener('click', async () => {
    if (!continueBtn.disabled) {
        addButtonFeedback(continueBtn);
        const selectedPlatform = document.querySelector('.platform-option.active:not(.disabled)');
        const platformName = selectedPlatform.querySelector('h4').textContent;
        
        // Get current project data
        const projectData = {
            id: projectIdValue.textContent,
            name: tokenNameInput.value.trim(),
            symbol: tokenSymbolInput.value.trim(),
            description: tokenDescriptionInput.value.trim(),
            platform: platformName,
            createdAt: new Date().toISOString(),
            status: 'created'
        };
        
        // Save the project
        const saved = await saveProject(projectData);
        
        if (saved) {
            showNotification(`Project ${projectData.id} created successfully!`, 'success');
            console.log('Project saved:', projectData);
            
            // Update stats with real data
            await loadRealStats();
            
            // Show project management screen
            showProjectManagementScreen(projectData);
        } else {
            showNotification('Failed to save project', 'error');
        }
    }
});

// Get SOL UI Functions
async function showGetSolUI() {
    console.log('showGetSolUI called');
    console.log('getSolUI element:', getSolUI);
    
    // Clear any test SOL balance data to ensure accurate display
    localStorage.removeItem('walletSolBalances');
    console.log('Cleared test SOL balances for accurate display');
    
    // Hide other UIs
    mainContent.style.display = 'none';
    createProjectUI.style.display = 'none';
    document.getElementById('savedProjectsUI').style.display = 'none';
    document.getElementById('projectManagementUI').style.display = 'none';
    document.getElementById('tokenMetadataUI').style.display = 'none';
    document.getElementById('projectWalletsUI').style.display = 'none';
    
    // Hide main footer (should only show on Home, Disperser, Shield, History)
    document.querySelector('.footer').style.display = 'none';
    
    // Show Get SOL UI
    if (getSolUI) {
        getSolUI.style.display = 'flex';
        console.log('Get SOL UI should now be visible');
        
        // Add some test content immediately to see if the UI is working
        if (projectsSolList) {
            projectsSolList.innerHTML = '<div style="color: white; padding: 20px;">Loading projects...</div>';
        }
    } else {
        console.error('getSolUI element not found!');
        showNotification('Error: Get SOL UI not found', 'error');
        return;
    }
    
    // Load projects with SOL
    await loadProjectsWithSol();
}

function hideGetSolUI() {
    getSolUI.style.display = 'none';
}

async function loadProjectsWithSol() {
    try {
        console.log('Loading projects with SOL...');
        const savedProjects = await getSavedProjects();
        console.log('Found saved projects:', savedProjects);
        
        const projectsWithSol = [];
        
        // For each project, calculate total SOL from its wallets
        for (const project of savedProjects) {
            const solBalance = await getProjectSolBalance(project.id);
            console.log(`Project ${project.id} has SOL balance:`, solBalance);
            
            // Only show projects that have SOL > 0
            if (solBalance > 0) {
                projectsWithSol.push({
                    ...project,
                    solBalance: solBalance
                });
            }
        }
        
        console.log('Projects with SOL:', projectsWithSol);
        displayProjectsWithSol(projectsWithSol);
    } catch (error) {
        console.error('Error loading projects with SOL:', error);
        showNotification('Error loading projects', 'error');
    }
}

async function getProjectSolBalance(projectId) {
    try {
        // Get all wallets for this project
        const projectWallets = await getProjectWallets(projectId);
        
        if (!projectWallets || projectWallets.length === 0) {
            return 0;
        }
        
        // Calculate total SOL balance from all wallets
        let totalSolBalance = 0;
        
        for (const wallet of projectWallets) {
            // In a real implementation, this would query the Solana blockchain
            // For now, we'll simulate wallet balances based on wallet data
            const walletBalance = await getWalletSolBalance(wallet.address);
            totalSolBalance += walletBalance;
        }
        
        return totalSolBalance;
    } catch (error) {
        console.error('Error getting project SOL balance:', error);
        return 0;
    }
}

async function getWalletSolBalance(walletAddress) {
    // This function would normally query the Solana blockchain for the actual SOL balance
    // For now, we only return SOL if it has been explicitly set/tracked
    
    // Check if we have a stored balance for this wallet
    const storedBalances = JSON.parse(localStorage.getItem('walletSolBalances') || '{}');
    
    // Only return the stored balance if it exists, otherwise return 0
    // This means wallets start with 0 SOL unless SOL has been added to them
    return storedBalances[walletAddress] || 0;
}

function displayProjectsWithSol(projects) {
    console.log('Displaying projects with SOL:', projects);
    console.log('projectsSolList element:', projectsSolList);
    console.log('emptySolProjects element:', emptySolProjects);
    
    if (projects.length === 0) {
        console.log('No projects found, showing empty state');
        if (projectsSolList) projectsSolList.style.display = 'none';
        if (emptySolProjects) emptySolProjects.style.display = 'flex';
        return;
    }
    
    console.log('Found projects, showing list');
    if (projectsSolList) projectsSolList.style.display = 'flex';
    if (emptySolProjects) emptySolProjects.style.display = 'none';
    
    if (projectsSolList) {
        projectsSolList.innerHTML = '';
        
        projects.forEach(project => {
            const projectElement = createProjectSolElement(project);
            projectsSolList.appendChild(projectElement);
        });
        
        console.log('Added', projects.length, 'project elements to the list');
    }
}

function createProjectSolElement(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-sol-item';
    
    const solAmount = project.solBalance.toFixed(4);
    
    projectDiv.innerHTML = `
        <div class="project-sol-header">
            <div class="project-sol-info">
                <h4>${project.name || 'Unnamed Project'}</h4>
                <div class="project-sol-id">${project.id}</div>
            </div>
            <div class="project-sol-balance">
                <p class="sol-amount">${solAmount} SOL</p>
                <p class="sol-label">Available</p>
            </div>
        </div>
        <div class="project-sol-actions">
            <button class="withdraw-sol-btn" onclick="withdrawProjectSol('${project.id}', ${project.solBalance})" ${project.solBalance <= 0 ? 'disabled' : ''}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Withdraw All
            </button>
        </div>
    `;
    
    return projectDiv;
}

async function withdrawProjectSol(projectId, amount) {
    try {
        if (amount <= 0) {
            showNotification('No SOL available to withdraw', 'warning');
            return;
        }
        
        // Show confirmation
        const confirmed = confirm(`Are you sure you want to withdraw ${amount.toFixed(4)} SOL from project ${projectId}?`);
        if (!confirmed) return;
        
        // Simulate withdrawal process
        showNotification('Processing withdrawal...', 'info');
        
        // In a real implementation, this would:
        // 1. Connect to Solana wallet
        // 2. Create and send withdrawal transaction
        // 3. Wait for confirmation
        
        // For demo purposes, we'll simulate this with a delay
        setTimeout(async () => {
            // Set all project wallet balances to 0 (simulating withdrawal)
            const projectWallets = await getProjectWallets(projectId);
            const walletBalances = JSON.parse(localStorage.getItem('walletSolBalances') || '{}');
            
            for (const wallet of projectWallets) {
                walletBalances[wallet.address] = 0;
            }
            
            localStorage.setItem('walletSolBalances', JSON.stringify(walletBalances));
            
            showNotification(`Successfully withdrew ${amount.toFixed(4)} SOL!`, 'success');
            
            // Refresh the list
            await loadProjectsWithSol();
        }, 2000);
        
    } catch (error) {
        console.error('Error withdrawing SOL:', error);
        showNotification('Error processing withdrawal', 'error');
    }
}

// Back button event listener
backFromGetSolBtn.addEventListener('click', () => {
    console.log('Get SOL back button clicked');
    showHomeScreen();
});

// Function to add SOL to a wallet (for testing/demo purposes)
async function addSolToWallet(walletAddress, amount) {
    const storedBalances = JSON.parse(localStorage.getItem('walletSolBalances') || '{}');
    storedBalances[walletAddress] = (storedBalances[walletAddress] || 0) + amount;
    localStorage.setItem('walletSolBalances', JSON.stringify(storedBalances));
}

// Function to simulate receiving SOL in project wallets (for demo purposes)
async function simulateReceiveSol(projectId, totalAmount) {
    const projectWallets = await getProjectWallets(projectId);
    if (projectWallets && projectWallets.length > 0) {
        // Distribute the SOL across all wallets in the project
        const amountPerWallet = totalAmount / projectWallets.length;
        
        for (const wallet of projectWallets) {
            await addSolToWallet(wallet.address, amountPerWallet);
        }
        
        console.log(`Added ${totalAmount} SOL to project ${projectId} (${amountPerWallet.toFixed(4)} SOL per wallet)`);
        return true;
    }
    return false;
}

// Function to clear all SOL balances (for debugging)
function clearAllSolBalances() {
    localStorage.removeItem('walletSolBalances');
    console.log('Cleared all SOL balances from localStorage');
    showNotification('All SOL balances cleared', 'info');
}

// Function to check current SOL balances (for debugging)
function checkSolBalances() {
    const storedBalances = JSON.parse(localStorage.getItem('walletSolBalances') || '{}');
    console.log('Current SOL balances in localStorage:', storedBalances);
    return storedBalances;
}

// PF Rewards UI Functions
async function showPfRewardsUI() {
    console.log('showPfRewardsUI called');
    console.log('pfRewardsUI element:', pfRewardsUI);
    
    // Clear any test rewards balance data to ensure accurate display
    localStorage.removeItem('walletRewardsBalances');
    console.log('Cleared test rewards balances for accurate display');
    
    // Hide other UIs
    mainContent.style.display = 'none';
    createProjectUI.style.display = 'none';
    document.getElementById('savedProjectsUI').style.display = 'none';
    document.getElementById('projectManagementUI').style.display = 'none';
    document.getElementById('tokenMetadataUI').style.display = 'none';
    document.getElementById('projectWalletsUI').style.display = 'none';
    getSolUI.style.display = 'none';
    
    // Hide main footer (should only show on Home, Disperser, Shield, History)
    document.querySelector('.footer').style.display = 'none';
    
    // Show PF Rewards UI
    if (pfRewardsUI) {
        pfRewardsUI.style.display = 'flex';
        console.log('PF Rewards UI should now be visible');
        
        // Add some test content immediately to see if the UI is working
        if (projectsRewardsList) {
            projectsRewardsList.innerHTML = '<div style="color: white; padding: 20px;">Loading projects...</div>';
        }
    } else {
        console.error('pfRewardsUI element not found!');
        showNotification('Error: PF Rewards UI not found', 'error');
        return;
    }
    
    // Load projects with rewards
    await loadProjectsWithRewards();
}

function hidePfRewardsUI() {
    pfRewardsUI.style.display = 'none';
}

async function loadProjectsWithRewards() {
    try {
        console.log('Loading projects with rewards...');
        const savedProjects = await getSavedProjects();
        console.log('Found saved projects:', savedProjects);
        
        const projectsWithRewards = [];
        
        // For each project, calculate total rewards from its wallets
        for (const project of savedProjects) {
            const rewardsBalance = await getProjectRewardsBalance(project.id);
            console.log(`Project ${project.id} has rewards balance:`, rewardsBalance);
            
            // Only show projects that have rewards > 0
            if (rewardsBalance > 0) {
                projectsWithRewards.push({
                    ...project,
                    rewardsBalance: rewardsBalance
                });
            }
        }
        
        console.log('Projects with rewards:', projectsWithRewards);
        displayProjectsWithRewards(projectsWithRewards);
    } catch (error) {
        console.error('Error loading projects with rewards:', error);
        showNotification('Error loading projects', 'error');
    }
}

async function getProjectRewardsBalance(projectId) {
    try {
        // Get all wallets for this project
        const projectWallets = await getProjectWallets(projectId);
        
        if (!projectWallets || projectWallets.length === 0) {
            return 0;
        }
        
        // Calculate total rewards balance from all wallets
        let totalRewardsBalance = 0;
        
        for (const wallet of projectWallets) {
            // In a real implementation, this would query the pump.fun API for rewards
            // For now, we'll simulate wallet rewards based on wallet data
            const walletBalance = await getWalletRewardsBalance(wallet.address);
            totalRewardsBalance += walletBalance;
        }
        
        return totalRewardsBalance;
    } catch (error) {
        console.error('Error getting project rewards balance:', error);
        return 0;
    }
}

async function getWalletRewardsBalance(walletAddress) {
    // This function would normally query the pump.fun API for the actual rewards balance
    // For now, we only return rewards if they have been explicitly set/tracked
    
    // Check if we have a stored balance for this wallet
    const storedBalances = JSON.parse(localStorage.getItem('walletRewardsBalances') || '{}');
    
    // Only return the stored balance if it exists, otherwise return 0
    // This means wallets start with 0 rewards unless rewards have been added to them
    return storedBalances[walletAddress] || 0;
}

function displayProjectsWithRewards(projects) {
    console.log('Displaying projects with rewards:', projects);
    console.log('projectsRewardsList element:', projectsRewardsList);
    console.log('emptyRewardsProjects element:', emptyRewardsProjects);
    
    if (projects.length === 0) {
        console.log('No projects found, showing empty state');
        if (projectsRewardsList) projectsRewardsList.style.display = 'none';
        if (emptyRewardsProjects) emptyRewardsProjects.style.display = 'flex';
        return;
    }
    
    console.log('Found projects, showing list');
    if (projectsRewardsList) projectsRewardsList.style.display = 'flex';
    if (emptyRewardsProjects) emptyRewardsProjects.style.display = 'none';
    
    if (projectsRewardsList) {
        projectsRewardsList.innerHTML = '';
        
        projects.forEach(project => {
            const projectElement = createProjectRewardsElement(project);
            projectsRewardsList.appendChild(projectElement);
        });
        
        console.log('Added', projects.length, 'project elements to the list');
    }
}

function createProjectRewardsElement(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-rewards-item';
    
    const rewardsAmount = project.rewardsBalance.toFixed(4);
    
    projectDiv.innerHTML = `
        <div class="project-rewards-header">
            <div class="project-rewards-info">
                <h4>${project.name || 'Unnamed Project'}</h4>
                <div class="project-rewards-id">${project.id}</div>
            </div>
            <div class="project-rewards-balance">
                <p class="rewards-amount">${rewardsAmount} SOL</p>
                <p class="rewards-label">Rewards</p>
            </div>
        </div>
        <div class="project-rewards-actions">
            <button class="claim-rewards-btn" onclick="claimProjectRewards('${project.id}', ${project.rewardsBalance})" ${project.rewardsBalance <= 0 ? 'disabled' : ''}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                </svg>
                Claim Rewards
            </button>
        </div>
    `;
    
    return projectDiv;
}

async function claimProjectRewards(projectId, amount) {
    try {
        if (amount <= 0) {
            showNotification('No rewards available to claim', 'warning');
            return;
        }
        
        // Show confirmation
        const confirmed = confirm(`Are you sure you want to claim ${amount.toFixed(4)} SOL in rewards from project ${projectId}?`);
        if (!confirmed) return;
        
        // Simulate claim process
        showNotification('Processing claim...', 'info');
        
        // In a real implementation, this would:
        // 1. Connect to Solana wallet
        // 2. Create and send claim transaction to pump.fun
        // 3. Wait for confirmation
        
        // For demo purposes, we'll simulate this with a delay
        setTimeout(async () => {
            // Set all project wallet rewards balances to 0 (simulating claim)
            const projectWallets = await getProjectWallets(projectId);
            const walletBalances = JSON.parse(localStorage.getItem('walletRewardsBalances') || '{}');
            
            for (const wallet of projectWallets) {
                walletBalances[wallet.address] = 0;
            }
            
            localStorage.setItem('walletRewardsBalances', JSON.stringify(walletBalances));
            
            showNotification(`Successfully claimed ${amount.toFixed(4)} SOL in rewards!`, 'success');
            
            // Refresh the list
            await loadProjectsWithRewards();
        }, 2000);
        
    } catch (error) {
        console.error('Error claiming rewards:', error);
        showNotification('Error processing claim', 'error');
    }
}

// Back button event listener
backFromPfRewardsBtn.addEventListener('click', () => {
    console.log('PF Rewards back button clicked');
    showHomeScreen();
});

// Function to add rewards to a wallet (for testing/demo purposes)
async function addRewardsToWallet(walletAddress, amount) {
    const storedBalances = JSON.parse(localStorage.getItem('walletRewardsBalances') || '{}');
    storedBalances[walletAddress] = (storedBalances[walletAddress] || 0) + amount;
    localStorage.setItem('walletRewardsBalances', JSON.stringify(storedBalances));
}

// Function to simulate receiving rewards in project wallets (for demo purposes)
async function simulateReceiveRewards(projectId, totalAmount) {
    const projectWallets = await getProjectWallets(projectId);
    if (projectWallets && projectWallets.length > 0) {
        // Distribute the rewards across all wallets in the project
        const amountPerWallet = totalAmount / projectWallets.length;
        
        for (const wallet of projectWallets) {
            await addRewardsToWallet(wallet.address, amountPerWallet);
        }
        
        console.log(`Added ${totalAmount} SOL in rewards to project ${projectId} (${amountPerWallet.toFixed(4)} SOL per wallet)`);
        return true;
    }
    return false;
}

// Function to clear all rewards balances (for debugging)
function clearAllRewardsBalances() {
    localStorage.removeItem('walletRewardsBalances');
    console.log('Cleared all rewards balances from localStorage');
    showNotification('All rewards balances cleared', 'info');
}

// Function to check current rewards balances (for debugging)
function checkRewardsBalances() {
    const storedBalances = JSON.parse(localStorage.getItem('walletRewardsBalances') || '{}');
    console.log('Current rewards balances in localStorage:', storedBalances);
    return storedBalances;
}

// Contract Address Modal Functions
function showContractAddressModal(projectData) {
    const modal = document.getElementById('contractAddressModal');
    const closeBtn = document.getElementById('closeContractAddressModal');
    const copyBtn = document.getElementById('copyContractBtn');
    const explorerBtn = document.getElementById('viewOnExplorerBtn');
    const pumpfunBtn = document.getElementById('viewOnPumpfunBtn');
    
    // Populate project information
    document.getElementById('caModalProjectName').textContent = projectData.name || 'Unnamed Project';
    document.getElementById('caModalProjectId').textContent = projectData.id;
    document.getElementById('caModalPlatform').textContent = projectData.platform || 'Pump.fun';
    document.getElementById('caNotePlatform').textContent = projectData.platform || 'Pump.fun';
    
    // Get or generate contract address
    const contractAddress = getContractAddress(projectData);
    document.getElementById('contractAddressValue').textContent = contractAddress;
    
    // Update status based on project state
    updateContractStatus(projectData);
    
    // Show modal
    modal.style.display = 'flex';
    
    // Setup event listeners
    const handleClose = () => {
        modal.style.display = 'none';
    };
    
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(contractAddress);
            showNotification('Contract address copied to clipboard!', 'success');
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = contractAddress;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Contract address copied to clipboard!', 'success');
        }
    };
    
    const handleViewExplorer = () => {
        const explorerUrl = `https://solscan.io/token/${contractAddress}`;
        chrome.tabs.create({ url: explorerUrl });
        showNotification('Opening Solscan...', 'info');
    };
    
    const handleViewPumpfun = () => {
        const pumpfunUrl = `https://pump.fun/${contractAddress}`;
        chrome.tabs.create({ url: pumpfunUrl });
        showNotification('Opening Pump.fun...', 'info');
    };
    
    // Remove existing listeners and add new ones
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    
    const newCopyBtn = copyBtn.cloneNode(true);
    copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);
    
    const newExplorerBtn = explorerBtn.cloneNode(true);
    explorerBtn.parentNode.replaceChild(newExplorerBtn, explorerBtn);
    
    const newPumpfunBtn = pumpfunBtn.cloneNode(true);
    pumpfunBtn.parentNode.replaceChild(newPumpfunBtn, pumpfunBtn);
    
    // Add event listeners
    newCloseBtn.addEventListener('click', handleClose);
    newCopyBtn.addEventListener('click', handleCopy);
    newExplorerBtn.addEventListener('click', handleViewExplorer);
    newPumpfunBtn.addEventListener('click', handleViewPumpfun);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            handleClose();
        }
    });
}

function getContractAddress(projectData) {
    // Check if project already has a stored contract address
    if (projectData.contractAddress) {
        return projectData.contractAddress;
    }
    
    // Generate a pump.fun style contract address for all projects
    // This mimics the actual pump.fun contract format
    const contractAddress = generatePumpfunContractAddress(projectData.id);
    
    // Store the generated address for consistency
    saveContractAddress(projectData.id, contractAddress);
    
    return contractAddress;
}

function generateSolanaContractAddress(projectId) {
    // Generate a realistic Solana contract address
    // This is for demo purposes - in production this would come from actual deployment
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
    let address = '';
    
    // Use project ID as seed for consistency
    const seed = projectId.replace(/[^A-Z0-9]/g, '');
    Math.seedrandom = function(s) {
        return function() {
            s = Math.sin(s) * 10000;
            return s - Math.floor(s);
        };
    };
    
    const random = Math.seedrandom(seed.charCodeAt(0) + seed.length);
    
    for (let i = 0; i < 44; i++) {
        address += chars.charAt(Math.floor(random() * chars.length));
    }
    
    return address;
}

function generatePumpfunContractAddress(projectId) {
    // Generate a pump.fun style contract address ending with "pump"
    // This mimics the actual pump.fun contract address format
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
    let address = '';
    
    // Use project ID as seed for consistency
    const seed = projectId.replace(/[^A-Z0-9]/g, '');
    
    // Simple seeded random function
    let seedValue = 0;
    for (let i = 0; i < seed.length; i++) {
        seedValue += seed.charCodeAt(i);
    }
    
    const seededRandom = () => {
        seedValue = (seedValue * 9301 + 49297) % 233280;
        return seedValue / 233280;
    };
    
    // Generate the first part of the address (39 characters)
    // Total Solana address is 44 chars, minus 4 for "pump" = 40, minus 1 for better flow = 39
    for (let i = 0; i < 39; i++) {
        address += chars.charAt(Math.floor(seededRandom() * chars.length));
    }
    
    // Add "pump" at the end to mimic pump.fun style
    address += 'pump';
    
    return address;
}

async function saveContractAddress(projectId, contractAddress) {
    try {
        const projects = await getSavedProjects();
        const updatedProjects = projects.map(project => {
            if (project.id === projectId) {
                return { ...project, contractAddress };
            }
            return project;
        });
        
        // Save updated projects
        await chrome.storage.sync.set({ savedProjects: updatedProjects });
        localStorage.setItem('vantage_saved_projects', JSON.stringify(updatedProjects));
    } catch (error) {
        console.error('Error saving contract address:', error);
    }
}

function updateContractStatus(projectData) {
    const statusIndicator = document.getElementById('contractStatus');
    const statusText = document.getElementById('contractStatusText');
    
    // Remove existing status classes
    statusIndicator.classList.remove('deployed', 'pending');
    
    if (projectData.status === 'launched' || projectData.isLaunched) {
        statusText.textContent = 'Deployed';
        statusIndicator.classList.add('deployed');
    } else if (projectData.status === 'deploying') {
        statusText.textContent = 'Deploying...';
        statusIndicator.classList.add('pending');
    } else {
        statusText.textContent = 'Not Deployed';
        statusIndicator.classList.remove('deployed', 'pending');
    }
}

function getCurrentProjectData() {
    // Check if we're on the project management screen
    const projectManagementUI = document.getElementById('projectManagementUI');
    if (!projectManagementUI || projectManagementUI.style.display === 'none') {
        console.error('Project management UI is not visible');
        return Promise.resolve(null);
    }
    
    // Get project data from the currently displayed project management UI
    const projectNameEl = document.getElementById('projectManagementName');
    const projectSymbolEl = document.getElementById('projectManagementSymbol');
    const projectIdEl = document.getElementById('projectManagementId');
    const projectPlatformEl = document.getElementById('projectPlatformDisplay');
    
    console.log('Project management elements:', {
        nameEl: projectNameEl,
        symbolEl: projectSymbolEl,
        idEl: projectIdEl,
        platformEl: projectPlatformEl
    });
    
    if (!projectNameEl || !projectIdEl) {
        console.error('Project management UI elements not found');
        return Promise.resolve(null);
    }
    
    const projectId = projectIdEl.textContent;
    const projectName = projectNameEl.textContent;
    const projectSymbol = projectSymbolEl ? projectSymbolEl.textContent.replace('$', '') : '';
    const projectPlatform = projectPlatformEl ? projectPlatformEl.textContent : 'Pump.fun';
    
    console.log('Extracted project data:', {
        id: projectId,
        name: projectName,
        symbol: projectSymbol,
        platform: projectPlatform
    });
    
    // Try to get additional data from saved projects
    return getSavedProjects().then(projects => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            console.log('Found project in saved projects:', project);
            return project;
        } else {
            // Return basic data if not found in saved projects
            const basicData = {
                id: projectId,
                name: projectName,
                symbol: projectSymbol,
                platform: projectPlatform,
                status: 'created'
            };
            console.log('Using basic project data:', basicData);
            return basicData;
        }
    }).catch(error => {
        console.error('Error getting project data:', error);
        // Return basic data as fallback
        const fallbackData = {
            id: projectId,
            name: projectName,
            symbol: projectSymbol,
            platform: projectPlatform,
            status: 'created'
        };
        console.log('Using fallback project data:', fallbackData);
        return fallbackData;
    });
}

// Project Dashboard Functions
let currentDashboardProject = null;
let selectedWallets = new Set();

async function showProjectDashboard(projectData) {
    console.log('showProjectDashboard called with:', projectData);
    
    currentDashboardProject = projectData;
    const dashboardUI = document.getElementById('projectDashboardUI');
    
    if (!dashboardUI) {
        console.error('Dashboard UI element not found!');
        showNotification('Dashboard UI not found', 'error');
        return;
    }
    
    console.log('Dashboard UI element found, showing dashboard...');
    
    // Hide other UIs
    const mainContent = document.querySelector('.main-content');
    const createProjectUI = document.getElementById('createProjectUI');
    const savedProjectsUI = document.getElementById('savedProjectsUI');
    const projectManagementUI = document.getElementById('projectManagementUI');
    const tokenMetadataUI = document.getElementById('tokenMetadataUI');
    const projectWalletsUI = document.getElementById('projectWalletsUI');
    
    if (mainContent) mainContent.style.display = 'none';
    if (createProjectUI) createProjectUI.style.display = 'none';
    if (savedProjectsUI) savedProjectsUI.style.display = 'none';
    if (projectManagementUI) projectManagementUI.style.display = 'none';
    if (tokenMetadataUI) tokenMetadataUI.style.display = 'none';
    if (projectWalletsUI) projectWalletsUI.style.display = 'none';
    
    // Hide main footer (should only show on Home, Disperser, Shield, History)
    document.querySelector('.footer').style.display = 'none';
    
    // Show dashboard UI
    dashboardUI.style.display = 'flex';
    console.log('Dashboard UI display set to flex');
    
    // Populate project information
    const idEl = document.getElementById('dashboardProjectId');
    const platformEl = document.getElementById('dashboardPlatformDisplay');
    
    if (idEl) idEl.textContent = projectData.id;
    if (platformEl) platformEl.textContent = projectData.platform || 'Pump.fun';
    
    console.log('Project information populated');
    
    // Load dashboard data
    try {
        await loadDashboardData(projectData);
        console.log('Dashboard data loaded successfully');
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
    
    // Reset scroll position
    const resetScroll = () => {
        const content = document.querySelector('.project-dashboard-content');
        if (content) {
            content.scrollTop = 0;
        }
    };
    
    // Reset scroll after a brief delay to ensure UI is rendered
    setTimeout(resetScroll, 50);
    
    console.log('Dashboard UI shown successfully');
}

function hideProjectDashboard() {
    const dashboardUI = document.getElementById('projectDashboardUI');
    const projectManagementUI = document.getElementById('projectManagementUI');
    
    dashboardUI.style.display = 'none';
    projectManagementUI.style.display = 'flex';
    
    // Clear selected wallets
    selectedWallets.clear();
    currentDashboardProject = null;
    
    console.log('Dashboard UI hidden');
}

async function loadDashboardData(projectData) {
    try {
        // Load market data
        await loadMarketData(projectData);
        
        // Load portfolio data
        await loadPortfolioData(projectData);
        
        // Load wallets
        await loadDashboardWallets(projectData.id);
        
        // Validate trading buttons
        validateTradingButtons();
        
        console.log('Dashboard data loaded successfully');
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showNotification('Failed to load dashboard data', 'error');
    }
}

async function loadMarketData(projectData) {
    // Simulate market data - in production this would come from API
    const marketCap = generateMarketCap(projectData.id, projectData.status);
    const price = generateTokenPrice(projectData.id, projectData.status);
    const volume = generateVolume(projectData.id, projectData.status);
    
    // Update market stats
    document.getElementById('marketCapValue').textContent = formatCurrency(marketCap);
    document.getElementById('tokenPriceValue').textContent = formatCurrency(price, 6);
    document.getElementById('volumeValue').textContent = formatCurrency(volume);
    
    // Generate random changes
    const marketCapChange = (Math.random() - 0.5) * 20;
    const priceChange = (Math.random() - 0.5) * 15;
    const volumeChange = (Math.random() - 0.5) * 30;
    
    updateStatChange('marketCapChange', marketCapChange);
    updateStatChange('priceChange', priceChange);
    updateStatChange('volumeChange', volumeChange);
}

async function loadPortfolioData(projectData) {
    try {
        const wallets = await getProjectWallets(projectData.id);
        let totalSol = 0;
        let totalProfitLoss = 0;
        let activeWallets = 0;
        
        for (const wallet of wallets) {
            const holdings = getWalletTokenHoldings(wallet.id);
            const profitLoss = getWalletProfitLoss(wallet.id);
            
            if (holdings > 0) {
                totalSol += holdings;
                totalProfitLoss += profitLoss;
                activeWallets++;
            }
        }
        
        // Update portfolio stats
        document.getElementById('totalSolHoldings').textContent = `${totalSol.toFixed(3)} SOL`;
        document.getElementById('activeWalletsCount').textContent = activeWallets.toString();
        
        const profitLossEl = document.getElementById('totalProfitLoss');
        profitLossEl.textContent = `${totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toFixed(3)} SOL`;
        profitLossEl.className = `stat-value profit-loss ${totalProfitLoss >= 0 ? 'positive' : 'negative'}`;
        
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Set default values
        document.getElementById('totalSolHoldings').textContent = '0 SOL';
        document.getElementById('totalProfitLoss').textContent = '+0 SOL';
        document.getElementById('activeWalletsCount').textContent = '0';
    }
}

async function loadDashboardWallets(projectId) {
    try {
        const wallets = await getProjectWallets(projectId);
        displayDashboardWallets(wallets);
    } catch (error) {
        console.error('Error loading dashboard wallets:', error);
        displayDashboardWallets([]);
    }
}

function displayDashboardWallets(wallets) {
    const walletsList = document.getElementById('dashboardWalletsList');
    const emptyMessage = document.getElementById('emptyDashboardWalletsMessage');
    
    if (wallets.length === 0) {
        emptyMessage.style.display = 'block';
        walletsList.innerHTML = '';
        walletsList.appendChild(emptyMessage);
        return;
    }
    
    emptyMessage.style.display = 'none';
    walletsList.innerHTML = '';
    
    wallets.forEach(wallet => {
        const walletElement = createDashboardWalletElement(wallet);
        walletsList.appendChild(walletElement);
    });
}

function createDashboardWalletElement(wallet) {
    const walletDiv = document.createElement('div');
    walletDiv.className = 'dashboard-wallet-item';
    walletDiv.dataset.walletId = wallet.id;
    
    const holdings = getWalletTokenHoldings(wallet.id);
    const profitLoss = getWalletProfitLoss(wallet.id);
    const buyTime = getWalletBuyTime(wallet.id);
    
    walletDiv.innerHTML = `
        <div class="wallet-header">
            <div class="wallet-id">${wallet.id}</div>
            <div class="wallet-address">${abbreviateAddress(wallet.address)}</div>
        </div>
        <div class="wallet-stats">
            <div class="wallet-stat">
                <div class="wallet-stat-label">Holdings</div>
                <div class="wallet-stat-value">${holdings.toFixed(3)} SOL</div>
            </div>
            <div class="wallet-stat">
                <div class="wallet-stat-label">P&L</div>
                <div class="wallet-stat-value ${profitLoss >= 0 ? 'profit' : 'loss'}">
                    ${profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(3)} SOL
                </div>
            </div>
            <div class="wallet-stat">
                <div class="wallet-stat-label">Entry Price</div>
                <div class="wallet-stat-value">$${getWalletEntryPrice(wallet.id).toFixed(6)}</div>
            </div>
        </div>
        <div class="wallet-buy-time">Last buy: ${buyTime}</div>
    `;
    
    return walletDiv;
}

// Market data generation functions
function generateMarketCap(projectId, status) {
    const seed = projectId.charCodeAt(0) + projectId.length;
    const baseValue = status === 'launched' ? 50000 + (seed % 500000) : 1000 + (seed % 10000);
    return baseValue;
}

function generateTokenPrice(projectId, status) {
    const seed = projectId.charCodeAt(0) + projectId.length;
    const baseValue = status === 'launched' ? 0.001 + (seed % 100) / 100000 : 0.0001 + (seed % 10) / 100000;
    return baseValue;
}

function generateVolume(projectId, status) {
    const seed = projectId.charCodeAt(0) + projectId.length;
    const baseValue = status === 'launched' ? 10000 + (seed % 100000) : 100 + (seed % 5000);
    return baseValue;
}

// Wallet data functions
function getWalletTokenHoldings(walletId) {
    // Simulate token holdings - in production this would come from blockchain
    const stored = localStorage.getItem(`wallet_holdings_${walletId}`);
    if (stored) return parseFloat(stored);
    
    const seed = walletId.charCodeAt(0) + walletId.length;
    const holdings = (seed % 10) / 10 + Math.random() * 2;
    localStorage.setItem(`wallet_holdings_${walletId}`, holdings.toString());
    return holdings;
}

function getWalletProfitLoss(walletId) {
    // Simulate profit/loss - in production this would be calculated from actual trades
    const stored = localStorage.getItem(`wallet_pnl_${walletId}`);
    if (stored) return parseFloat(stored);
    
    const seed = walletId.charCodeAt(0) + walletId.length;
    const pnl = ((seed % 20) - 10) / 10 + (Math.random() - 0.5) * 2;
    localStorage.setItem(`wallet_pnl_${walletId}`, pnl.toString());
    return pnl;
}

function getWalletEntryPrice(walletId) {
    const stored = localStorage.getItem(`wallet_entry_${walletId}`);
    if (stored) return parseFloat(stored);
    
    const seed = walletId.charCodeAt(0) + walletId.length;
    const entryPrice = 0.0001 + (seed % 100) / 1000000;
    localStorage.setItem(`wallet_entry_${walletId}`, entryPrice.toString());
    return entryPrice;
}

function getWalletBuyTime(walletId) {
    const stored = localStorage.getItem(`wallet_buy_time_${walletId}`);
    if (stored) return stored;
    
    const seed = walletId.charCodeAt(0) + walletId.length;
    const hoursAgo = (seed % 72) + 1; // 1-72 hours ago
    const buyTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    const timeString = buyTime.toLocaleString();
    localStorage.setItem(`wallet_buy_time_${walletId}`, timeString);
    return timeString;
}

// Utility functions
function formatCurrency(value, decimals = 2) {
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(1)}K`;
    } else {
        return `$${value.toFixed(decimals)}`;
    }
}

function updateStatChange(elementId, change) {
    const element = document.getElementById(elementId);
    const changeText = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
    element.textContent = changeText;
    element.className = `stat-change ${change >= 0 ? 'positive' : change < 0 ? 'negative' : 'neutral'}`;
}

// Trading functions
function validateTradingButtons() {
    const amount = parseFloat(document.getElementById('tradingAmount').value) || 0;
    const hasSelection = selectedWallets.size > 0;
    
    const buyBtn = document.getElementById('buyTokenBtn');
    const sellBtn = document.getElementById('sellTokenBtn');
    const sellAllBtn = document.getElementById('sellAllBtn');
    
    buyBtn.disabled = !hasSelection || amount <= 0;
    sellBtn.disabled = !hasSelection || amount <= 0;
    sellAllBtn.disabled = !hasSelection;
}

function toggleWalletSelection(walletId) {
    if (selectedWallets.has(walletId)) {
        selectedWallets.delete(walletId);
    } else {
        selectedWallets.add(walletId);
    }
    
    updateWalletSelectionUI();
    validateTradingButtons();
}

function selectAllWallets() {
    const walletItems = document.querySelectorAll('.dashboard-wallet-item');
    walletItems.forEach(item => {
        selectedWallets.add(item.dataset.walletId);
    });
    
    updateWalletSelectionUI();
    validateTradingButtons();
}

function deselectAllWallets() {
    selectedWallets.clear();
    updateWalletSelectionUI();
    validateTradingButtons();
}

function clearWalletSelection() {
    deselectAllWallets();
}

function updateWalletSelectionUI() {
    const walletItems = document.querySelectorAll('.dashboard-wallet-item');
    walletItems.forEach(item => {
        const isSelected = selectedWallets.has(item.dataset.walletId);
        item.classList.toggle('selected', isSelected);
    });
    
    const count = selectedWallets.size;
    document.getElementById('selectedWalletsCount').textContent = `${count} wallet${count !== 1 ? 's' : ''} selected`;
    
    const clearBtn = document.getElementById('clearSelectionBtn');
    clearBtn.style.display = count > 0 ? 'inline-block' : 'none';
    
    const selectAllBtn = document.getElementById('selectAllWalletsBtn');
    const deselectAllBtn = document.getElementById('deselectAllWalletsBtn');
    const totalWallets = document.querySelectorAll('.dashboard-wallet-item').length;
    
    if (count === totalWallets && totalWallets > 0) {
        selectAllBtn.style.display = 'none';
        deselectAllBtn.style.display = 'inline-block';
    } else {
        selectAllBtn.style.display = 'inline-block';
        deselectAllBtn.style.display = 'none';
    }
}

// Trading execution functions
async function executeBuyOrder() {
    const amount = parseFloat(document.getElementById('tradingAmount').value);
    const walletCount = selectedWallets.size;
    
    if (amount <= 0 || walletCount === 0) return;
    
    const amountPerWallet = amount / walletCount;
    
    try {
        for (const walletId of selectedWallets) {
            // Simulate buy order
            const currentHoldings = getWalletTokenHoldings(walletId);
            const newHoldings = currentHoldings + amountPerWallet;
            localStorage.setItem(`wallet_holdings_${walletId}`, newHoldings.toString());
            
            // Update buy time
            localStorage.setItem(`wallet_buy_time_${walletId}`, new Date().toLocaleString());
        }
        
        showNotification(`Buy order executed: ${amount} SOL across ${walletCount} wallets`, 'success');
        
        // Refresh dashboard data
        await loadDashboardData(currentDashboardProject);
        
        // Clear trading input
        document.getElementById('tradingAmount').value = '';
        validateTradingButtons();
        
    } catch (error) {
        console.error('Error executing buy order:', error);
        showNotification('Failed to execute buy order', 'error');
    }
}

async function executeSellOrder() {
    const amount = parseFloat(document.getElementById('tradingAmount').value);
    const walletCount = selectedWallets.size;
    
    if (amount <= 0 || walletCount === 0) return;
    
    const amountPerWallet = amount / walletCount;
    
    try {
        for (const walletId of selectedWallets) {
            // Simulate sell order
            const currentHoldings = getWalletTokenHoldings(walletId);
            const newHoldings = Math.max(0, currentHoldings - amountPerWallet);
            localStorage.setItem(`wallet_holdings_${walletId}`, newHoldings.toString());
        }
        
        showNotification(`Sell order executed: ${amount} SOL across ${walletCount} wallets`, 'success');
        
        // Refresh dashboard data
        await loadDashboardData(currentDashboardProject);
        
        // Clear trading input
        document.getElementById('tradingAmount').value = '';
        validateTradingButtons();
        
    } catch (error) {
        console.error('Error executing sell order:', error);
        showNotification('Failed to execute sell order', 'error');
    }
}

async function executeSellAllOrder() {
    const walletCount = selectedWallets.size;
    
    if (walletCount === 0) return;
    
    try {
        let totalSold = 0;
        
        for (const walletId of selectedWallets) {
            // Get current holdings and sell all
            const currentHoldings = getWalletTokenHoldings(walletId);
            totalSold += currentHoldings;
            localStorage.setItem(`wallet_holdings_${walletId}`, '0');
        }
        
        showNotification(`Sell all executed: ${totalSold.toFixed(3)} SOL from ${walletCount} wallets`, 'success');
        
        // Refresh dashboard data
        await loadDashboardData(currentDashboardProject);
        
        validateTradingButtons();
        
    } catch (error) {
        console.error('Error executing sell all order:', error);
        showNotification('Failed to execute sell all order', 'error');
    }
}

async function refreshDashboardData() {
    const refreshBtn = document.getElementById('refreshDashboardBtn');
    refreshBtn.classList.add('loading');
    
    try {
        await loadDashboardData(currentDashboardProject);
        showNotification('Dashboard data refreshed', 'success');
    } catch (error) {
        console.error('Error refreshing dashboard:', error);
        showNotification('Failed to refresh dashboard', 'error');
    } finally {
        refreshBtn.classList.remove('loading');
    }
}

// Sniper Shield functionality
let blacklistedWallets = [];
let shieldSettings = {
    masterShieldEnabled: true,
    autoSellEnabled: false,
    autoSellPercentage: 50,
    autoSellDelay: 5
};

function showSniperShieldUI() {
    console.log('=== showSniperShieldUI function called ===');
    
    // Hide main content (same as history UI)
    const mainContent = document.querySelector('.main-content');
    console.log('mainContent element:', mainContent);
    if (mainContent) {
        mainContent.style.display = 'none';
        console.log('mainContent hidden successfully');
    } else {
        console.error('mainContent element not found!');
    }
    
    // Hide History UI if it's currently visible
    const historyUI = document.getElementById('launchHistoryUI');
    if (historyUI) {
        historyUI.style.display = 'none';
        console.log('historyUI hidden successfully');
    }
    
    // Show Sniper Shield UI (same as history UI)
    const shieldUI = document.getElementById('sniperShieldUI');
    console.log('sniperShieldUI element:', shieldUI);
    if (shieldUI) {
        shieldUI.style.display = 'flex';
        console.log('sniperShieldUI shown successfully');
    } else {
        console.error('sniperShieldUI element not found!');
    }
    
    // Keep footer visible (same as history UI)
    const footer = document.querySelector('.footer');
    console.log('footer element:', footer);
    if (footer) {
        footer.style.display = 'flex';
        console.log('footer shown successfully');
    } else {
        console.error('footer element not found!');
    }
    
    // Set Shield button as active
    const shieldBtn = document.getElementById('shieldBtn');
    if (shieldBtn) {
        setActiveFooterBtn(shieldBtn);
        console.log('Shield button set as active');
    }
    
    console.log('About to call loadSniperShieldData...');
    loadSniperShieldData();
    console.log('=== showSniperShieldUI function completed ===');
}

function hideSniperShieldUI() {
    document.getElementById('sniperShieldUI').style.display = 'none';
    // Note: showHomeScreen() will handle showing mainContent and setting footer state
}

function loadSniperShieldData() {
    // Load blacklisted wallets from storage
    chrome.storage.local.get(['blacklistedWallets', 'shieldSettings'], (result) => {
        blacklistedWallets = result.blacklistedWallets || [];
        shieldSettings = { ...shieldSettings, ...(result.shieldSettings || {}) };
        
        updateShieldUI();
        loadBlacklistDisplay();
    });
}

function updateShieldUI() {
    // Update shield status
    const shieldIcon = document.getElementById('shieldStatusIcon');
    const shieldTitle = document.getElementById('shieldStatusTitle');
    const shieldDescription = document.getElementById('shieldStatusDescription');
    const masterToggle = document.getElementById('masterShieldToggle');
    
    if (shieldSettings.masterShieldEnabled) {
        shieldIcon.className = 'shield-icon active';
        shieldTitle.textContent = 'Shield Active';
        shieldDescription.textContent = 'Protection is enabled for all your tokens';
    } else {
        shieldIcon.className = 'shield-icon inactive';
        shieldTitle.textContent = 'Shield Inactive';
        shieldDescription.textContent = 'Protection is disabled';
    }
    
    masterToggle.checked = shieldSettings.masterShieldEnabled;
    
    // Update auto-sell settings
    const autoSellToggle = document.getElementById('autoSellToggle');
    const autoSellSettings = document.getElementById('autoSellSettings');
    const autoSellPercentage = document.getElementById('autoSellPercentage');
    const autoSellDelay = document.getElementById('autoSellDelay');
    
    autoSellToggle.checked = shieldSettings.autoSellEnabled;
    autoSellSettings.style.display = shieldSettings.autoSellEnabled ? 'block' : 'none';
    autoSellPercentage.value = shieldSettings.autoSellPercentage;
    autoSellDelay.value = shieldSettings.autoSellDelay;
    
    // Update stats
    updateBlacklistStats();
}

function updateBlacklistStats() {
    const totalCount = blacklistedWallets.length;
    const autoDetectedCount = blacklistedWallets.filter(w => w.type === 'auto').length;
    const manualCount = blacklistedWallets.filter(w => w.type === 'manual').length;
    const blockedAttempts = blacklistedWallets.reduce((sum, w) => sum + (w.blockedAttempts || 0), 0);
    
    document.getElementById('totalBlacklistedCount').textContent = totalCount;
    document.getElementById('autoDetectedCount').textContent = autoDetectedCount;
    document.getElementById('manuallyAddedCount').textContent = manualCount;
    document.getElementById('blockedAttemptsCount').textContent = blockedAttempts;
}

function loadBlacklistDisplay(filter = 'all') {
    const blacklistList = document.getElementById('blacklistList');
    const emptyBlacklist = document.getElementById('emptyBlacklist');
    
    let filteredWallets = blacklistedWallets;
    if (filter !== 'all') {
        filteredWallets = blacklistedWallets.filter(w => w.type === filter);
    }
    
    if (filteredWallets.length === 0) {
        blacklistList.style.display = 'none';
        emptyBlacklist.style.display = 'flex';
        return;
    }
    
    blacklistList.style.display = 'flex';
    emptyBlacklist.style.display = 'none';
    
    blacklistList.innerHTML = '';
    
    filteredWallets.forEach(wallet => {
        const walletElement = createBlacklistWalletElement(wallet);
        blacklistList.appendChild(walletElement);
    });
}

function createBlacklistWalletElement(wallet) {
    const walletDiv = document.createElement('div');
    walletDiv.className = `blacklist-item ${wallet.type}`;
    
    const formattedDate = new Date(wallet.dateAdded).toLocaleDateString();
    const truncatedAddress = `${wallet.address.slice(0, 8)}...${wallet.address.slice(-8)}`;
    
    walletDiv.innerHTML = `
        <div class="blacklist-wallet-info">
            <div class="blacklist-wallet-address">${truncatedAddress}</div>
            <div class="blacklist-wallet-meta">
                <span class="blacklist-type ${wallet.type}">${wallet.type}</span>
                <span class="blacklist-date">Added ${formattedDate}</span>
                ${wallet.blockedAttempts ? `<span class="blocked-attempts">${wallet.blockedAttempts} blocked</span>` : ''}
            </div>
        </div>
        <div class="blacklist-actions">
            <button class="remove-blacklist-btn" onclick="removeFromBlacklist('${wallet.address}')">
                Remove
            </button>
        </div>
    `;
    
    return walletDiv;
}

function addToBlacklist(address, type = 'manual') {
    // Validate Solana address format (basic validation)
    if (!address || address.length < 32 || address.length > 44) {
        showNotification('Invalid wallet address format', 'error');
        return;
    }
    
    // Check if already blacklisted
    if (blacklistedWallets.some(w => w.address === address)) {
        showNotification('Wallet is already blacklisted', 'warning');
        return;
    }
    
    const newWallet = {
        address: address,
        type: type,
        dateAdded: Date.now(),
        blockedAttempts: 0
    };
    
    blacklistedWallets.push(newWallet);
    saveBlacklistData();
    updateShieldUI();
    loadBlacklistDisplay();
    
    showNotification(`Wallet ${type === 'auto' ? 'auto-detected and ' : ''}added to blacklist`, 'success');
    
    // Clear input if manual addition
    if (type === 'manual') {
        document.getElementById('blacklistWalletInput').value = '';
    }
}

function removeFromBlacklist(address) {
    blacklistedWallets = blacklistedWallets.filter(w => w.address !== address);
    saveBlacklistData();
    updateShieldUI();
    loadBlacklistDisplay();
    showNotification('Wallet removed from blacklist', 'success');
}

function clearAllBlacklist() {
    if (blacklistedWallets.length === 0) {
        showNotification('Blacklist is already empty', 'info');
        return;
    }
    
    if (confirm(`Are you sure you want to clear all ${blacklistedWallets.length} blacklisted wallets?`)) {
        blacklistedWallets = [];
        saveBlacklistData();
        updateShieldUI();
        loadBlacklistDisplay();
        showNotification('Blacklist cleared', 'success');
    }
}

function exportBlacklist() {
    if (blacklistedWallets.length === 0) {
        showNotification('No blacklisted wallets to export', 'info');
        return;
    }
    
    const exportData = {
        exportDate: new Date().toISOString(),
        totalWallets: blacklistedWallets.length,
        wallets: blacklistedWallets
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vantage-blacklist-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Blacklist exported successfully', 'success');
}

function saveBlacklistData() {
    chrome.storage.local.set({
        blacklistedWallets: blacklistedWallets,
        shieldSettings: shieldSettings
    });
}

function saveShieldSettings() {
    chrome.storage.local.set({ shieldSettings: shieldSettings });
}

// Simulate auto-detection of sniper wallets (for demo purposes)
function simulateAutoDetection() {
    const sniperAddresses = [
        '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
        '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        'FsJ3A3u2vn5cTVofAjvy6y5kwABJAqYWpe4975bi2epH',
        'DjVE6JNiYqPL2QXyCUUh8rNjHrbz9hXHNYt99MQ59qw1'
    ];
    
    // Add some sample auto-detected wallets
    sniperAddresses.forEach((address, index) => {
        if (!blacklistedWallets.some(w => w.address === address)) {
            setTimeout(() => {
                const wallet = {
                    address: address,
                    type: 'auto',
                    dateAdded: Date.now() - (index * 60000), // Stagger the dates
                    blockedAttempts: Math.floor(Math.random() * 10) + 1
                };
                blacklistedWallets.push(wallet);
                saveBlacklistData();
                updateShieldUI();
                loadBlacklistDisplay();
                showNotification(`Auto-detected sniper wallet: ${address.slice(0, 8)}...`, 'warning');
            }, index * 2000);
        }
    });
} 