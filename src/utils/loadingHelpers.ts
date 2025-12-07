/**
 * Loading Helper Functions
 * Handles showing/hiding loading overlay with animated dots
 */

let loadingOverlay: HTMLDivElement | null = null;

/**
 * Shows a loading overlay with animated three-dot loader
 * @param message - The message to display (e.g., "Processing payment...")
 */
export function showLoading(message: string): void {
    // Remove existing overlay if any
    hideLoading();

    // Create overlay
    loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';

    // Create content container
    const content = document.createElement('div');
    content.className = 'loading-content';

    // Create message
    const messageElement = document.createElement('p');
    messageElement.className = 'loading-message';
    messageElement.textContent = message;

    // Create dot loader
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'loading-dots';

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        dot.className = 'loading-dot';
        dotsContainer.appendChild(dot);
    }

    // Assemble
    content.appendChild(messageElement);
    content.appendChild(dotsContainer);
    loadingOverlay.appendChild(content);

    // Add to DOM
    document.body.appendChild(loadingOverlay);
}

/**
 * Hides and removes the loading overlay
 */
export function hideLoading(): void {
    if (loadingOverlay && loadingOverlay.parentNode) {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
        loadingOverlay = null;
    }
}
