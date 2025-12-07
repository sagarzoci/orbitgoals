import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // optional alias
    },
  },
  build: {
    outDir: "build", // Azure workflow should match this folder
    emptyOutDir: true, // clears old build files before building
    sourcemap: false, // optional: enable if you want source maps
    rollupOptions: {
      output: {
        // optional: split large node_modules chunks
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // increase limit to reduce large chunk warnings
  },
  server: {
    port: 5173, // default dev server port
    open: true,
  },
});
