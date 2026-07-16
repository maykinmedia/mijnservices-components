import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ bundleTypes: true, insertTypesEntry: true })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MijnservicesCardAsLink',
      fileName: 'card-as-link',
      formats: ['es', 'cjs'],
    },
    rolldownOptions: {
      // React blijft een peer dependency, dus niet meebundelen
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    cssCodeSplit: false,
  },
});
