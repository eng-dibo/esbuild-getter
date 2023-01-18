const { readFileSync } = require("fs");

/**
 * makes ts paths available
 * @param options
 */
module.exports.tsConfigPaths = function (options) {
  let opts = {
    tsConfigPath: "./tsconfig.json",
    ...options,
  };

  return {
    name: "@engineers/ts-paths",
    setup(build) {
      console.log("setup", opts.tsConfigPath);
      let tsConfigFile = read(opts.tsConfigPath),
        paths = tsConfigFile?.compilerOptions?.paths || {};

      console.log({ paths });

      build.onResolve({ filter: /.*/ }, async (args) => {
        console.log("onResolve");
        let alias = Object.keys(paths).find((path) =>
          new RegExp(path.replace("*", "\\w*")).test(args.path)
        );

        if (!alias) {
          return null;
        }

        let aliasPart = alias.replace("*", ""),
          rest = args.path.replace("*", "").replace(aliasPart, "");

        console.log({
          alias,
          path: args.path,
          realPath: paths[args.path],
          aliasPart,
          rest,
          realPath1: paths[alias]?.[0],
          realPath2: paths[alias]?.[0].replace("*", rest),
          args
        });

        let realPath = paths[alias]?.[0]?.replace("*", rest);
        // prevent infinite looping
        if (!realPath || realPath === args.path) return null;
        let result = await build.resolve(realPath, {
          kind: args.kind,
          resolveDir: args.resolveDir,
          namespace: args.namespace
        });
        if (result.errors.length > 0) {
          return { errors: result.errors };
        }
        console.log({ result });
        

        // todo: auto detect if the path is external
        return result.external? null: { path: result.path, external: result.external };
      });
    },
  };
};

/**
 *
 * @param path
 * @param options
 */

/**
 *
 * @param path
 */
function read(path) {
  let data = readFileSync(path, {
    encoding: null,
    flag: "r",
  });

  data = data.toString();
  return path.toString().trim().slice(-5) === ".json" ? JSON.parse(data) : data;
}
