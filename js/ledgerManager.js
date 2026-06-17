import { StorageEngine } from './storage.js';

export const LedgerManager = {
    // This reads : Get all transactions
    getAllTransactions() {
        return StorageEngine.getData('LEDGER');
    },

    // wE CREATE: Add income or expense
    addTransaction(description, type, amount) {
        const transactions = this.getAllTransactions();
        const newTransaction = {
            id: 'tx_' + Date.now(),
            description: description,
            type: type, // income or expense
            amount: parseFloat(amount) || 0,
            date: new Date().toISOString().split('T')[0] // This will format as YYYY-MM-DD
        };

        transactions.push(newTransaction);
        StorageEngine.saveData('LEDGER', transactions);
        return newTransaction;
    },

    // We will then CALCULATE: Get financial balance
    getFinancialSummary() {
        const transactions = this.getAllTransactions();
        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach(tx => {
            if (tx.type === 'income') {
                totalIncome += tx.amount;
            } else if (tx.type === 'expense') {
                totalExpense += tx.amount;
            }
        });

        return {
            income: totalIncome,
            expense: totalExpense,
            netBalance: totalIncome - totalExpense
        };
    }
};