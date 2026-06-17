import {StorageEngine} from './storage.js';
import {CoinGeckoService} from './services/coingeckoService.js';
import {TrelloService} from './services/trelloServices.js';
import { ProjectManager } from './projectManager.js';

function renderDashboardProjects(projects) {
    const container = document.getElementById('project-list-container');
    if (!container) return;
    container.innerHTML = '';

    if (projects.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No active projects listed.</p>';
        return;
    }

    projects.forEach(project => {
        // DYNAMIC FIX: We calculate true real-time progress based on tasks engine
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
