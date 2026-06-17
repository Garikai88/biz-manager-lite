// js/main.js
import ProjectManager from './projectManager.js';
import LedgerManager from './ledgerManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize our core object-oriented class layers
    const projectRepo = new ProjectManager();
    const financialRepo = new LedgerManager();

    // Pull datasets safely through our class methods
    const activeProjects = projectRepo.getAllProjects();
    const financialSummary = financialRepo.getBalanceMetrics();

    // Inject analytics right into your HTML interface nodes
    updateDashboardDOM(activeProjects, financialSummary);
});

function updateDashboardDOM(projects, finances) {
    // 1. Update Project Counter Metrics
    const totalProjectsCountNode = document.getElementById('total-projects-count');
    if (totalProjectsCountNode) {
        totalProjectsCountNode.innerText = projects.length;
    }

    // 2. Update Finance Overview Cards
    const absoluteBalanceNode = document.getElementById('dashboard-net-balance');
    if (absoluteBalanceNode) {
        absoluteBalanceNode.innerText = `$${finances.netBalance.toFixed(2)}`;
        // Highlight green if profitable, red if negative balance
        absoluteBalanceNode.style.color = finances.netBalance >= 0 ? '#10B981' : '#EF4444';
    }

    // 3. Render quick-view items into a project layout pipeline
    const listContainer = document.getElementById('quick-projects-list');
    if (listContainer) {
        listContainer.innerHTML = '';
        if (projects.length === 0) {
            listContainer.innerHTML = '<p style="color: var(--text-muted)">No active projects running.</p>';
            return;
        }

        projects.slice(0, 3).forEach(project => {
            const element = document.createElement('div');
            element.style.padding = '8px 0';
            element.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <span style="font-weight:500;">${project.name}</span>
                    <span style="color:var(--accent-color); font-weight:600;">${project.progress}%</span>
                </div>
                <div style="background:#E5E7EB; height:6px; border-radius:4px; overflow:hidden;">
                    <div style="background:var(--accent-color); height:100%; width:${project.progress}%"></div>
                </div>
            `;
            listContainer.appendChild(element);
        });
    }
}
