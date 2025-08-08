import { initializeMockData } from './services/mockService.js';
import { initializeRouter } from './router.js';
import { initializeTheme } from './services/themeService.js';

export function bootstrapApplication() {
  initializeMockData();
  initializeTheme();
  initializeRouter();
}

// Auto bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication();
});


