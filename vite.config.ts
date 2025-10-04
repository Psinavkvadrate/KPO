import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'app': resolve(__dirname, 'src/app'),
      'shared': resolve(__dirname, 'src/shared'),
      'entities': resolve(__dirname, 'src/entities'),
      'features': resolve(__dirname, 'src/features'),
      'widgets': resolve(__dirname, 'src/widgets'),
      'pages': resolve(__dirname, 'src/pages'),
    },
  },
})
