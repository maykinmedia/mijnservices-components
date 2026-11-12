import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ bundleTypes: true, insertTypesEntry: true })],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'MijnservicesMessages',
      fileName: 'messages',
      formats: ['es', 'cjs'],
    },
    rolldownOptions: {
      // React blijft een peer dependency, en NLDS-componenten worden door het project zelf geïnstalleerd: niet meebundelen
      external: ['react', 'react-dom', 'react/jsx-runtime', /^@nl-design-system-candidate\//],
    },
    cssCodeSplit: false,
  },
});
