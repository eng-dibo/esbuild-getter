import { Configuration } from 'webpack';
import { resolve } from 'node:path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';





let config: Configuration = {
  mode: 'development',
  target: 'node',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    symlinks: false,
     plugins: [new TsconfigPathsPlugin()],
  },

  output: {
    path: resolve(__dirname,'./dist'),
    filename: `[name].mjs`,
    libraryTarget:'module',
    chunkFormat:'module',
    module:true,
    library: {
      type: 'module',
    },
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            sourceMap: false,
          },
          onlyCompileBundledFiles: true,
          configFile: './tsconfig.json',
        },
      },
       ],
  },
  externals: [ ],
  experiments:{
    outputModule: true,
    topLevelAwait: true
  },
  node:{
    __dirname: true,
    __filename: true,
  }
};

export default config;
