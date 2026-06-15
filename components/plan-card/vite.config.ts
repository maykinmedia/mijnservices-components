import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        'card.react': 'src/plan-card.react.tsx',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['lit', /^lit\//, 'react', '@lit/react'],
    },
  },
  plugins: [dts({ include: ['src'] })],
});
