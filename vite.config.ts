import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/entry.ts',
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'style',
    },
    rolldownOptions: {
      external: ['graphql', 'graphql-language-service', /^react(?:\/|$)/],
    },
  },
  test: {
    environment: 'jsdom',
  },
});
