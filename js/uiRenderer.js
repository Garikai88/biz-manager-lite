// js/uiRenderer.js

export const UiRenderer = {
    /**
     * Generates a reusable, accessible badge component for project priorities
     * @param {string} priority - Low, Medium, or High
     * @returns {string} HTML markup string for the badge element
     */
    renderPriorityBadge(priority) {
        let badgeColor = 'var(--text-muted)';
        if (priority === 'High') badgeColor = 'var(--accent-color)';
        if (priority === 'Medium') badgeColor = '#3B82F6'; // System blue

        return `<span style="background: ${badgeColor}; color: white; font-size: 11px; padding: 2px 8px; border-radius: 12px; font-weight: 500;">${priority}</span>`;
    },

    /**
     * Safely truncates long text fields to keep lists compact and readable
     * @param {string} text - Source string content
     * @param {number} maxLength - Character threshold limit
     * @returns {string} Truncated string appended with ellipses
     */
    truncateText(text, maxLength = 40) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    /**
     * Injects a dynamic banner element notification down onto an interface container
     * @param {string} containerId - Target DOM selector id string
     * @param {string} message - Notification text string content
     * @param {string} type - 'success' or 'error' alert state wrapper
     */
    renderAlertBanner(containerId, message, type = 'success') {
        const target = document.getElementById(containerId);
        if (!target) return;

        // Fixed: Explicitly defining both background and text color tokens for readable contrast
        const bgColor = type === 'success' ? '#D1FAE5' : '#FEE2E2'; // Light green or light red
        const textColor = type === 'success' ? '#065F46' : '#991B1B'; // Dark green or dark red text
        const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

        const banner = document.createElement('div');
        banner.style.cssText = `
            background-color: ${bgColor};
            color: ${textColor};
            padding: 12px 16px;
            border-radius: 6px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            font-weight: 500;
            animation: fadeIn 0.3s ease;
        `;

        banner.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

        // Prepend so it appears right at the top of the context block
        target.insertBefore(banner, target.firstChild);

        // Auto disappear after 3 seconds
        setTimeout(() => {
            banner.remove();
        }, 3000);
    }
};