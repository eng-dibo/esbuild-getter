const { build } = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");
const { TsconfigPathsPlugin } = require("@esbuild-plugins/tsconfig-paths");
const { readdirSync } = require("node:fs");
const { resolve } = require("node:path");

// todo: add type
let esbuildConfig = {
  logLevel: "info",
  bundle: true,
  platform: "node",
  format: "esm",
  plugins: [
    nodeExternalsPlugin(),
    TsconfigPathsPlugin({ tsconfig: "./tsconfig.json" }),
  ],
  external: [],
  minify: false,
  packages: "external",
  splitting: false,
  outdir: "../dist",
  outExtension: { ".js": ".mjs" },
};


 build({
    ...esbuildConfig,
    entryPoints: ["src/index.ts"],
    entryNames: "[name]",
  })
