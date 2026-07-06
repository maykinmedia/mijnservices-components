import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        'section-wrapper.react': 'src/section-wrapper.react.tsx',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['lit', /^lit\//, 'react', '@lit/react'],
    },
  },
  plugins: [dts({ include: ['src'], exclude: ['src/**/*.stories.*'] })],
});
