import {StorageEngine} from './storage.js';

export const ProjectManager = {
    // READ: Get all projects
    getAllProjects() {
        return StorageEngine.getData('PROJECTS');
    },

    // CREATE: Add a new project
    addProject(name) {
        const projects = this.getAllProjects();
        const newProject = {
            id: 'proj_' + Date.now(), // This is a unique timestamp ID
            name: name,
            progress: 0 // Starts at zero completion
        };

        projects.push(newProject);
        StorageEngine.saveData('PROJECTS', projects);
        return newProject;
    },

    // ANALYTICS: Calculate real progress based on task completion
    calculateProjectProgress(projectId) {
        const allTasks = StorageEngine.getData('TASKS') || [];
        // We filter tasks belonging to this specific project
        const projectTasks = allTasks.filter(task => task.completed).length;

        // We calculate percentage mathemetically
        const progressPercentage = Math.round((completedTasks / projectTasks.length) * 100);

        // We then update the project's progress in storage so the dashboard stays accurate
        const projects = this.getAllProjects();
        const project = projects.find(p => p.id === projectId);
        if (project) {
            project.progress = progressPercentage;
            StorageEngine.saveData('PROJECTS', projects);
        }

        return progressPercentage;
    }
};