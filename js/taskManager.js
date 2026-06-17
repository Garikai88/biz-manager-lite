import { StorageEngine } from './storage.js';

export default class TaskManager {
    constructor() {
        this.storageKey = 'TASKS';
    }

    getAllTasks() {
        return StorageEngine.getData(this.storageKey) || [];
    }

    addTask(title, projectId, priority) {
        const tasks = this.getAllTasks();
        const newTask = {
            id: 'task_' + Date.now(),
            projectId: projectId,
            title: title,
            priority: priority,
            completed: false
        };
        tasks.push(newTask);
        StorageEngine.saveData(this.storageKey, tasks);
        return newTask;
    }

    toggleTaskStatus(taskId) {
        const tasks = this.getAllTasks();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            StorageEngine.saveData(this.storageKey, tasks);
        }
    }

    deleteTask(taskId) {
        let tasks = this.getAllTasks();
        tasks = tasks.filter(t => t.id !== taskId);
        StorageEngine.saveData(this.storageKey, tasks);
    }
}

