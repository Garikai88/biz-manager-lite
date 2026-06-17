// js/taskManager.js
import { StorageEngine } from './storage.js';

export const TaskManager = {
    // READ: Get all tasks
    getAllTasks() {
        return StorageEngine.getData('TASKS');
    },

    // CREATE: Add a new task
    addTask(title, projectId, priority) {
        const tasks = this.getAllTasks();
        const newTask = {
            id: 'task_' + Date.now(), // Unique timestamp ID
            projectId: projectId || 'p1',
            title: title,
            priority: priority || 'Medium',
            completed: false // Kept as 'completed' to line up with our toggle logic
        };

        tasks.push(newTask);
        StorageEngine.saveData('TASKS', tasks);
        return newTask;
    },

    // UPDATE: Toggle completed status safely
    toggleTaskStatus(taskId) {
        const tasks = this.getAllTasks();
        const task = tasks.find(t => t.id === taskId); // Fixed 'task.find' to 'tasks.find'
        
        if (task) {
            task.completed = !task.completed; // Fixed property naming consistency
            StorageEngine.saveData('TASKS', tasks);
        }
        return task;
    },

    // DELETE: Remove a task
    deleteTask(taskId) {
        let tasks = this.getAllTasks();
        tasks = tasks.filter(t => t.id !== taskId);
        StorageEngine.saveData('TASKS', tasks);
    }
};

