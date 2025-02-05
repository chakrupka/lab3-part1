/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from "autoprefixer";
import eslint from "vite-plugin-eslint";
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint()],
  css: {
    postcss: {
      plugins: [autoprefixer(), tailwindcss()],
    },
  },
});
