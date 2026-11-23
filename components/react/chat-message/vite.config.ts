import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ bundleTypes: true, insertTypesEntry: true })],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'MijnservicesChatMessage',
      fileName: 'chat-message',
      formats: ['es', 'cjs'],
    },
    rolldownOptions: {
      // Don't bundle React (peer dependency) and NLDS packages (dependencies)
      external: ['react', 'react-dom', 'react/jsx-runtime', /^@nl-design-system-candidate\//],
    },
    cssCodeSplit: false,
  },
});
