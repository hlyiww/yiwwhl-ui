const path = require("path");
const vue = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");
const { defineConfig, build } = require("vite");
const fsExtra = require("fs-extra");

const entryFile = path.resolve(__dirname, "./entry.ts");
const outputDir = path.resolve(__dirname, "../build");

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
});

const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: "yiwwhl-ui",
          fileName: "yiwwhl-ui",
          formats: ["es", "umd"],
        },
        outDir: outputDir,
      },
    }),
  );
};

const createPackageJson = () => {
  const fileStr = `{
      "name": "yiwwhl-ui",
      "version": "0.0.0",
      "main": "yiwwhl-ui.umd.js",
      "module": "yiwwhl-ui.mjs",
      "author": "yiwwhl",
      "github": "https://github.com/yiwwhl/yiwwhl-ui",
      "description": "yiwwhl-ui 组件库",
      "repository": {
        "type": "git",
        "url": "git+https://github.com/yiwwhl/yiwwhl-ui.git"
      },
      "keywords": ["vue3", "组件库", "tsx", "UI"],
      "license": "",
      "bugs": {
        "url": "https://github.com/yiwwhl/yiwwhl-ui/issues"
      }
    }`;

  fsExtra.outputFile(path.resolve(outputDir, "package.json"), fileStr, "utf-8");
};

const buildLab = async () => {
  await buildAll();
  createPackageJson();
};

buildLab();
