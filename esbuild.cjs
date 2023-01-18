const { build } = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");
const { TsconfigPathsPlugin } = require("@esbuild-plugins/tsconfig-paths");
const { tsConfigPaths } = require("./esbuild-plugin.cjs")
const {resolve} = require('path')


let esbuildConfig = {
  logLevel: "info",
  bundle: true,
  platform: "node",
  format: "esm",
  plugins: [
    nodeExternalsPlugin(),
    // TsconfigPathsPlugin({ tsconfig: "./tsconfig.json" }),
    tsConfigPaths({ tsConfigPath: resolve(__dirname, "./tsconfig.json") })
  ],
  external: [
    './config','#config','./src/config','config','src/config',    
    './config*','#config*','./src/config*','config*','src/config*',
    './config.ts','#config.ts','./src/config.ts','config.ts','src/config.ts',
    './config.mjs','#config.mjs','./src/config.mjs','config.mjs','src/config.mjs',
    resolve('./config'),resolve('#config'),resolve('./src/config'),resolve('config'),resolve('src/config'),
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
