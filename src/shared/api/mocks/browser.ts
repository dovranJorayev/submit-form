import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Set up the Mock Service Worker
export const worker = setupWorker(...handlers);
