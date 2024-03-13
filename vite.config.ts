import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import libCss from "vite-plugin-libcss";

export default defineConfig({
  plugins: [react(), libCss()],
  build: {
    lib: {
      // 入口文件将包含可以由你的包的用户导入的导出：
      entry: resolve(__dirname, "src/components/index.tsx"),
      name: "kztui",
      fileName: (format) => `kztui.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "react-dom",
        },
      },
    },
  },
});
