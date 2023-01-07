// issue: https://github.com/evanw/esbuild/issues/2803
// to test if the code is splitting (i.e. excluded from bundling), change the log of each function in dist/config.mjs
// then run `npm run serve` again without rebuilding

// it works in all cases if src/config.ts doesn't exist, but TS will complain about missing the module

// error: doesn't split
import {example1} from "#config";
example1()

// split, but doesn't support aliases i.e: `#config`
import('./config').then(m=>m.example2())

// doesn't split
import('#config').then(m=>m.example3())

// split, but types for example4() doesn't imported, i.e example()'s type is any
import(`${'#config'}`).then(m=>m.example4())



