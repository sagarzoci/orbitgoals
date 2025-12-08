import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Safe check for process.cwd to avoid errors in browser-based environments
  const cwd = typeof process !== 'undefined' && typeof (process as any).cwd === 'function' ? (process as any).cwd() : '';
  const env = loadEnv(mode, cwd, '');
  
  return {
    plugins: [react()],
    // No "resolve: { alias: ... }" here, ensuring we strictly use relative paths
    define: {
      // Polyfill process.env for the @google/genai SDK
      'process.env': {
        API_KEY: env.API_KEY || ''
      }
    }
  }
})