// js/main.js
import { StorageEngine } from './storage.js';
import { CoinGeckoService } from './services/coingeckoService.js';
import { TrelloService } from './services/trelloServices.js';
import { ProjectManager } from './projectManager.js';
import { LedgerManager } from './ledgerManager.js'; // Make sure this is imported for financial metrics

// 1. YOUR DYNAMIC PROJECT RENDERER FUNCTION
function renderDashboardProjects(projects) {
    const container = document.getElementById('project-list-container');
    if (!container) return;
    container.innerHTML = '';

    if (projects.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No active projects listed.</p>';
        return;
    }

    projects.forEach(project => {
        const liveProgress = ProjectManager.calculateProjectProgress(project.id);

        const item = document.createElement('div');
        item.style.padding = "12px 0";
        item.style.borderBottom = "1px solid var(--bg-light)";
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <strong>${project.name}</strong>
                <span style="color: var(--secondary-color); font-weight: 600;">${liveProgress}% Complete</span>
            </div>
            <div style="background: var(--bg-light); width: 100%; height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="background: var(--secondary-color); width: ${liveProgress}%; height: 100%;"></div>
            </div>
        `;
        container.appendChild(item);
    });
}

// 2. COUNTER METRICS RENDERER (Updates the top layout badges)
function updateDashboardSummaryBadges() {
    const projects = StorageEngine.getData('PROJECTS') || [];
    const tasks = StorageEngine.getData('TASKS') || [];
    const financialSummary = LedgerManager.getFinancialSummary();

    // Target elements from your HTML markup structure
    const totalProjectsEl = document.getElementById('total-projects-badge');
    const pendingTasksEl = document.getElementById('pending-tasks-badge');
    const netRevenueEl = document.getElementById('net-revenue-badge');

    // Ingest dynamic lengths and values
    if (totalProjectsEl) totalProjectsEl.textContent = projects.length;
    if (pendingTasksEl) {
        const pendingCount = tasks.filter(t => !t.completed).length;
        pendingTasksEl.textContent = pendingCount;
    }
    if (netRevenueEl) {
        netRevenueEl.textContent = `$${financialSummary.netBalance.toFixed(2)}`;
    }
}

// 3. THIRD-PARTY API WORKSPACE LINK ROUTINES
async function loadExternalApiIntegrations() {
    // A. CoinGecko Integration Feed
    const cryptoPriceEl = document.getElementById('coingecko-rate-display');
    if (cryptoPriceEl) {
        const price = await CoinGeckoService.getBitcoinPrice();
        cryptoPriceEl.innerHTML = `<i class="fa-brands fa-bitcoin" style="color: #F7931A;"></i> BTC/USD: <strong>$${price.toLocaleString()}</strong>`;
    }

    // B. Trello Metrics Board Feed
    const trelloStatusEl = document.getElementById('trello-cards-display');
    if (trelloStatusEl) {
        // Using a sample public board ID token
        const samplePublicBoardId = '6091845bb083bc74d080c982'; 
        const cards = await TrelloService.getBoardCards(samplePublicBoardId);
        
        if (cards && cards.length > 0) {
            trelloStatusEl.innerHTML = `<i class="fa-brands fa-trello" style="color: #0079BF;"></i> Open Sprint Cards: <strong>${cards.length} Active</strong>`;
        } else {
            trelloStatusEl.innerHTML = `<i class="fa-brands fa-trello" style="color: var(--text-muted);"></i> Trello Board: <span style="color: var(--text-muted);">Disconnected</span>`;
        }
    }
}

// 4. MAIN CENTRALIZED ENTRY INITIALIZATION ENGINE
document.addEventListener('DOMContentLoaded', () => {
    // Ensure data collections are initialized on local client disk storage arrays
    StorageEngine.init();

    // Fire off UI view generation streams
    const currentProjects = StorageEngine.getData('PROJECTS') || [];
    renderDashboardProjects(currentProjects);
    updateDashboardSummaryBadges();

    // Pull async data over network pipelines
    loadExternalApiIntegrations();
});
