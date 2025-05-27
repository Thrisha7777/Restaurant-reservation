import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/reservation': 'http://localhost:5001',
      '/admin': 'http://localhost:5001',
    },
    // ⬇️ This line ensures any unknown path serves index.html (React handles the route)
    fs: {
      allow: ['.'],
    }
  },
  // ⬇️ Most important for fixing 404 on refresh
  build: {
    rollupOptions: {
      input: '/index.html',
    },
  }
});




