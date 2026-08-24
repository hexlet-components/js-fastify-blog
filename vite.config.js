// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
    // Точка входа это css, а не js: своего кода на клиенте у блога нет. Формы
    // отправляет браузер, подтверждение удаления делает `confirm` в атрибуте.
    // Клиентский бандл существовал ради javascript Bootstrap и @rails/ujs, и
    // ушёл вместе с ними.
    //
    // Имя без хеша: страницу рендерит pug, а он просит файл по имени
    // (`assetPath('main.css')`). Хеш потребовал бы читать manifest.json из
    // шаблона, а кеш ассетов у демо-приложения не проблема.
    rollupOptions: {
      input: "src/styles.css",
      output: {
        assetFileNames: "main[extname]",
      },
    },
  },
});
