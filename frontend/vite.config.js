import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  // ✅ Load .env variables correctly
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        workbox: {
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              // ✅ Fix: Use `env.VITE_BACKEND_URL` instead of `import.meta.env`
              urlPattern: new RegExp(`^${env.VITE_BACKEND_URL}/.*`),
              handler: "NetworkOnly",
            },
          ],
        },
        manifest: {
          name: "Aid On Time",
          short_name: "AOT",
          description: "An Efficient Healthcare Scheduling system",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          start_url: "/",
          icons: [
            {
              src: "/icons/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icons/icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    server: { port: 5173 },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
