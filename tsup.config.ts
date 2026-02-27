import { defineConfig } from 'tsup';
import { copyFileSync } from 'node:fs';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm'],
  dts: true,
  clean: true,
  onSuccess: async () => {
    copyFileSync('src/style.css', 'dist/style.css');
  },
});
