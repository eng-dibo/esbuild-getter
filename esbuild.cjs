const { build } = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");
const { TsconfigPathsPlugin } = require("@esbuild-plugins/tsconfig-paths");

let esbuildConfig = {
  logLevel: "info",
  bundle: true,
  platform: "node",
  format: "esm",
  plugins: [
    nodeExternalsPlugin(),
    TsconfigPathsPlugin({ tsconfig: "./tsconfig.json" }),
  ],
  external: [
    './config','#config','./src/config','config','src/config'
  ],
  minify: false,
  packages: "external",
  splitting: false,
  outdir: "./dist",
  outExtension: { ".js": ".mjs" },
  // alias:{'config':'config.mjs'}
};


Promise.all([
  "index",
  // "config"
].map(el=>build({
  ...esbuildConfig,
  entryPoints: [`src/${el}.ts`],
})))
.then(()=>console.log('==============================='))
