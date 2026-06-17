const KEYS = {
    PROJECTS: 'biz_lite_projects',
    TASKS: 'biz_lite_tasks',
    LEDGER: 'biz_lite_ledger'
};

// We will mock data structured to perfectly align with our managers' ID linkages
const initialProjects = [
    {id: "proj_1", name: "Website Redesign", progress: 0},
    {id: "proj_2", name: "Mobile App Development", progress: 0},
    {id: "proj_3", name: "Portfolio Update", progress: 0}
];

const initialTasks = [
    // Website Redesign Tasks (proj_1) -> 1 complete, 1 pending = 50%
    {id: "task_1", projectId: "proj_1", title: "Design Landing Page UI Wireframes", priority: "High", completed: true },
    {id: "task_2", projectId: "proj_1", title: "Setup Flexbox & Grid Core Structural Layouts", priority: "Medium", completed: false },

    // Mobile App Tasks (proj_2) -> 0 complete, 1 pending = 0%
    {id: "task_3", projectId: "proj_2", title: "Connect Authentication REST API Endpoints", priority: "High", completed: false},

    // Portfolio Update Tasks (proj_3) -> 1 complete, 0 pending = 100%
    {id: "task_4", projectId:"proj_3", title:"Deploy Production Build to GitHub Pages", priority: "Low", completed: true}

];

const initialLedger = [
    {id: "tx_1", description: "Freelance Client Deposit", type: "income", amount: 1200.00, date: "2026-06-10"},
    {id: "tx_2", description: "Premium UI Asset Fonts Purchase", type: "expense", amount: 45.00, date: "2026-06-14"},
    {id: "tx_1", description: "Suno AI Business Subscription", type: "expense", amount: 30.00, date: "2026-06-15"},

];

export const StorageEngine = {
    /**
     * Bootstraps local storage keys with default structured layouts if empty
     */

    init() {
        if (!localStorage.getItem(KEYS.PROJECTS)) {
            localStorage.setItem(KEYS.PROJECTS, JSON.stringify(initialProjects));
        }

        if (!localStorage.getItem(KEYS.TASKS)) {
            localStorage.setItem(KEYS.TASKS, JSON.stringify(initialTasks));
        }

        if (!localStorage.getItem(KEYS.LEDGER)) {
            localStorage.setItem(KEYS.LEDGER, JSON.stringify(initialLedger));
        }
    },

    /**
     * Reads and parses data packages from local storage safely
     * @param {string} key - We target collection key flag matching KEYS dictionary
     */
    getData(key) {
        return JSON.parse(localStorage.getItem(KEYS[key])) || [];
    },

    /**
     * Overwrites state payloads back down to the client browser disk arrays
     * @param {string} key - Target collection key flag matching keys dictionary
     * @param {Array} data - Array data payload to serialize
     */

    saveData(key, data) {
        localStorage.setItem(KEYS[key], JSON.stringify(data));
    }
};