import { StorageEngine } from './storage.js';

export default class LedgerManager {
    constructor() {
        this.storageKey = 'LEDGER_LOGS';
    }

    // READ: Fetch all financial records
    getAllLogs() {
        return StorageEngine.getData(this.storageKey) || [];
    }

    // CREATE: Add an income or expense entry
    addLog(description, amount, type) {
        const logs = this.getAllLogs();
        const newLog = {
            id: 'log_' + Date.now(),
            description: description,
            amount: parseFloat(amount),
            type: type, // 'income' or 'expense'
            date: new Date().toLocaleDateString()
        };

        logs.push(newLog);
        StorageEngine.saveData(this.storageKey, logs);
        return newLog;
    }

    // DELETE: Remove a record
    deleteLog(logId) {
        let logs = this.getAllLogs();
        logs = logs.filter(log => log.id !== logId);
        StorageEngine.saveData(this.storageKey, logs);
    }

    // CALCULATE: Get totals for dashboard metrics
    getBalanceMetrics() {
        const logs = this.getAllLogs();
        let totalIncome = 0;
        let totalExpenses = 0;

        logs.forEach(log => {
            if (log.type === 'income') {
                totalIncome += log.amount;
            } else if (log.type === 'expense') {
                totalExpenses += log.amount;
            }
        });

        return {
            income: totalIncome,
            expenses: totalExpenses,
            netBalance: totalIncome - totalExpenses
        };
    }
}