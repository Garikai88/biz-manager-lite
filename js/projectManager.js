import { StorageEngine } from './storage.js';

export const ProjectManager = {
    // READ: Get all projects
    getAllProjects() {
        return StorageEngine.getData('PROJECTS') || [];
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
        
        // 1. Filter tasks belonging to *this specific project* first
        const projectTasks = allTasks.filter(task => task.projectId === projectId);
        
        // Safety guard: If the project has no tasks yet, progress is 0%
        if (projectTasks.length === 0) return 0;

        // 2. Count how many tasks for *this project* are actually completed
        const completedTasksCount = projectTasks.filter(task => task.completed).length;

        // 3. Calculate percentage mathematically using your formula: (Part / Total) * 100
        const progressPercentage = Math.round((completedTasksCount / projectTasks.length) * 100);

        // 4. Update the project's progress in storage so the dashboard stays accurate
        const projects = this.getAllProjects();
        const project = projects.find(p => p.id === projectId);
        if (project) {
            project.progress = progressPercentage;
            StorageEngine.saveData('PROJECTS', projects);
        }

        return progressPercentage;
    }
};