import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/emagrece/",
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/gsap") || id.includes("node_modules/lenis")) return "motion";
        },
      },
    },
  },
});
