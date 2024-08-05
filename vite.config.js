import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      rhino3dm: "rhino3dm/rhino3dm.js",
      ws: "/src/ws-mock.js", // Assuming ws-mock.js is in the src folder
      src: "/src",
      components: "/src/components",
      assets: "/src/assets",
      lib: "/src/lib",
      models: "/src/models",
    },
  },
  build: {
    rollupOptions: {
      external: ["ws"],
    },
  },
  optimizeDeps: {
    exclude: ["rhino3dm"],
  },
});
