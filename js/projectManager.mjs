// js/projectManager.js
import { StorageEngine } from './storage.js';

export default class ProjectManager {
    constructor() {
        this.storageKey = 'BIZ_PROJECTS';
    }

    /**
     * READ: Retrieve all active project profiles
     */
    getAllProjects() {
        return StorageEngine.getData(this.storageKey) || [];
    }

    /**
     * CREATE: Provision a new project baseline tracking entity
     */
    addProject(name, client, budget) {
        const projects = this.getAllProjects();
        const newProject = {
            id: 'proj_' + Date.now(),
            name: name,
            client: client,
            budget: parseFloat(budget),
            progress: 0, // Fresh project baseline metrics start at 0%
            status: 'Active'
        };

        projects.push(newProject);
        StorageEngine.saveData(this.storageKey, projects);
        return newProject;
    }

    /**
     * UPDATE: Refresh incremental progress completion matrix values
     */
    updateProgress(projectId, progressValue) {
        const projects = this.getAllProjects();
        const index = projects.findIndex(p => p.id === projectId);
        
        if (index !== -1) {
            projects[index].progress = Math.min(100, Math.max(0, parseInt(progressValue)));
            StorageEngine.saveData(this.storageKey, projects);
        }
    }

    /**
     * DELETE: Evict a tracking profile out of storage blocks entirely
     */
    deleteProject(projectId) {
        let projects = this.getAllProjects();
        projects = projects.filter(p => p.id !== projectId);
        StorageEngine.saveData(this.storageKey, projects);
    }
}