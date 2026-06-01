import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['dotenv/config'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/__tests__/helpers/**'],
    fileParallelism: false,
  },
});
