import {getValue, setValue} from "./config";

setValue("test")
console.log(`value1= ${getValue()}`)


import('./get-config').then(m=>m.getConfig())
