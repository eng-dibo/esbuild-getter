import {getValue, setValue} from "./config";


setValue('test')
console.log(`value1= ${getValue()}`)



// import('./get-config').then(m=>m.getConfig('aaa'))
// import('./get-config.mjs').then(m=>m.getConfig('bbb'))
// import(`./${'get-config'}`).then(m=>m.getConfig('ccc'))
import(`./${'get-config.mjs'}`).then(m=>m.getConfig('ddd'))
