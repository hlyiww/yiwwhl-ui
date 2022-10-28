const path = require("path");
const fs = require("fs");
const vue = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");
const { defineConfig, build } = require("vite");
const fsExtra = require("fs-extra");

const entryFile = path.resolve(__dirname, "./entry.ts");
const outputDir = path.resolve(__dirname, "../build");
const componentsDir = path.resolve(__dirname, "../src");

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

  createPackageJson();
};

const buildSingle = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(componentsDir, name),
          name: "index",
          fileName: "index",
          formats: ["es", "umd"],
        },
        outDir: path.resolve(outputDir, name),
      },
    }),
  );

  createPackageJson(name);
};

const createPackageJson = name => {
  const fileStr = `{
      "name": "${name ? name : "yiwwhl-ui"}",
      "version": "0.0.1",
      "main": "${name ? "index.umd.js" : "yiwwhl-ui.umd.js"}",
      "module": "${name ? "index.mjs" : "yiwwhl-ui.mjs"}",
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

  if (name) {
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      "utf-8",
    );
  } else {
    fsExtra.outputFile(
      path.resolve(outputDir, "package.json"),
      fileStr,
      "utf-8",
    );
  }
};

const buildLab = async () => {
  await buildAll();
  fs.readdirSync(componentsDir)
    .filter(name => {
      const componentDir = path.resolve(componentsDir, name);
      const isDir = fs.lstatSync(componentDir).isDirectory();
      return isDir && fs.readdirSync(componentDir).includes("index.ts");
    })
    .forEach(async name => {
      await buildSingle(name);
    });
};

buildLab();
